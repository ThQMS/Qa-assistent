# Arquitetura

## Visão geral

O Qa Assistent é uma aplicação **local-first**: um servidor Express roda na máquina da usuária, serve um frontend React de arquivo único e conversa com a API da Groq (único serviço externo que recebe dados — a página também carrega fontes do Google Fonts, sem enviar nada). Nada é enviado para servidores próprios; nenhum dado da análise é persistido no backend.

```text
┌─────────────────────────── máquina local ───────────────────────────┐
│                                                                      │
│  Navegador (React via public/app.js)                                 │
│    │  POST /api/analyze (multipart)                                   │
│    │  POST /api/chat · POST /api/review (JSON)                        │
│    ▼                                                                 │
│  Express (127.0.0.1:3001)                                            │
│    ├── helmet + CORS restrito a localhost + rate limit               │
│    ├── routes/analyze.js ──► services/pdfParser | docxParser         │
│    ├── routes/chat.js  (chat de refinamento + auto-revisão)          │
│    └── services/groqService.js  (12 prompts de sistema)              │
│           │                                                          │
└───────────┼──────────────────────────────────────────────────────────┘
            ▼  HTTPS (streaming)
      API da Groq (llama-3.3-70b-versatile por padrão)
```

## Fluxo de uma análise

1. A usuária escolhe um **modo**, cola o texto ou solta um arquivo.
2. **PDF** é extraído no próprio navegador (pdf.js) e enviado como texto; **DOCX** é enviado como arquivo e extraído no backend (mammoth). Documentos acima de **50.000 caracteres** passam por truncamento inteligente: início (60%) e fim (40%) são preservados, o meio é omitido com marcador — porque critérios e erros costumam estar no final da spec.
3. O backend normaliza entradas especiais (ver [prompts.md](prompts.md)) e monta a conversa: prompt de sistema do modo + texto do documento.
4. A chamada à Groq usa `stream: true` com retry para falhas transitórias; cada trecho é repassado ao navegador via **NDJSON** (abaixo). Ao final, o backend confere as seções obrigatórias do modo e, se o modelo pulou alguma, dispara uma chamada complementar no mesmo stream (auto-correção).
5. O frontend acumula os deltas e re-renderiza o markdown progressivamente (marked).
6. Ao concluir, a análise entra no **histórico** (localStorage, 20 entradas) e o **chat de refinamento** fica disponível usando o documento como contexto.

## Protocolo de streaming (NDJSON)

As rotas `/api/analyze` e `/api/chat` respondem `Content-Type: application/x-ndjson`. Cada linha é um JSON:

| Evento | Payload | Quando |
|--------|---------|--------|
| `{"type":"context","text":"..."}` | documento processado em até 30.000 chars (início e fim preservados via truncamento inteligente) | só no analyze, antes do modelo responder |
| `{"type":"delta","text":"..."}` | trecho da resposta | a cada chunk do modelo |
| `{"type":"done"}` | — | fim normal |
| `{"type":"error","message":"..."}` | mensagem legível | erro após o streaming começar |

Erros **antes** do streaming (validação, arquivo ilegível) retornam JSON comum com status 4xx/5xx — o frontend decide pelo `Content-Type` da resposta. Para o evento `error` **no meio** do stream, o frontend preserva o conteúdo parcial já recebido e anexa um aviso de interrupção ao final (em vez de descartar tudo); análises interrompidas não entram no histórico.

Se o modelo estourar `max_tokens` (`finish_reason: "length"`), um aviso de truncamento é anexado ao final da resposta.

## Decisões de segurança

- **Bind em `127.0.0.1`** — o servidor nunca escuta na rede; impossível acessar de outra máquina.
- **CORS** restrito a origens `http://localhost*` — origem negada recebe `403` JSON.
- **Rate limit** de 100 req/15min por IP — proteção contra loop acidental, com folga para sessões de chat.
- **Helmet** para headers de segurança (CSP desabilitado por ser app local com scripts inline).
- **Sanitização do HTML renderizado** — todo markdown vindo do modelo passa por DOMPurify (vendorado) antes de entrar no DOM; mesmo que um documento malicioso induza o modelo a emitir `<script>` ou atributos de evento, nada executa.
- **Uploads** só PDF/DOCX, em memória (nunca tocam o disco), limite de 10 MB.
- **Rotas de API desconhecidas** respondem `404` JSON (não caem no catch-all que serve o `index.html`).
- **Sem persistência server-side** — histórico e configurações vivem no localStorage do navegador da usuária.
- A **chave da Groq** vive no `.env`, fora do controle de versão.

## Limites e calibrações

| O quê | Valor | Onde |
|-------|-------|------|
| Texto de entrada | 50.000 chars | frontend (`generate`) e parsers |
| Contexto do chat | 30.000 chars (início + fim preservados) | `analyze.js` |
| Resposta da análise | 8.192 tokens | `groqService.js` |
| Resposta do chat | 4.096 tokens | `groqService.js` |
| Histórico do chat enviado | 2 primeiras + 5 últimas mensagens (preserva alternância user/assistant) | `groqService.chat` |
| Upload | 10 MB | multer |
| Histórico de análises | 20 entradas | frontend (localStorage) |
