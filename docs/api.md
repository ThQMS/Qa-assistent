# API

Três rotas — `/api/analyze`, `/api/chat` e `/api/review` — todas atrás do rate limit (100 req/15min) e respondendo em **NDJSON streaming** no caminho feliz (ver [arquitetura.md](arquitetura.md#protocolo-de-streaming-ndjson)). Qualquer outra rota sob `/api` responde `404` com JSON `{"error": "Rota de API não encontrada."}`.

## POST /api/analyze

Analisa um documento em um dos 12 modos.

**Corpo:** `multipart/form-data`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `mode` | string | sim | `resumo`, `casos`, `dados`, `estimativa`, `redator`, `bug`, `sla`, `prioridade`, `checklist`, `cobertura`, `espec`, `daily` |
| `text` | string | um dos dois | documento colado (máx. efetivo 50k chars) |
| `file` | arquivo | um dos dois | PDF ou DOCX, máx. 10 MB |
| `textOld` | string | não | só no modo `espec`: versão anterior colada |
| `fileOld` | arquivo | não | só no modo `espec`: versão anterior em arquivo |

**Comportamentos especiais:**
- `espec`: se houver versão anterior, os textos são unidos com o separador `=== VERSÃO ANTERIOR ===` antes de ir ao modelo.
- `cobertura`: a primeira linha contendo apenas `---` é convertida em `=== CENÁRIOS ===` (o separador que o prompt espera), a menos que este já esteja presente.
- **Auto-correção**: após o modelo terminar, o backend verifica se as seções obrigatórias do modo estão presentes; se faltar alguma, dispara uma chamada complementar e os deltas extras continuam no mesmo stream — o cliente não precisa fazer nada.
- **Retry**: falhas transitórias (429/5xx/rede) na abertura da chamada são retentadas 2x com backoff antes de virar erro.

**Resposta (sucesso):** stream NDJSON — evento `context` (documento processado, para o chat), depois `delta`s, depois `done`.

**Resposta (erro de validação):** JSON `{"error": "..."}` com status 400 (modo inválido, sem texto/arquivo, arquivo > 10 MB, formato não suportado, PDF/DOCX ilegível).

**Exemplo:**

```bash
curl -N -X POST http://localhost:3001/api/analyze \
  -F "mode=bug" \
  -F "text=Bug: GET /health retorna 500 quando o banco cai. Esperado: 503. Reproduz sempre."
```

## POST /api/chat

Pergunta de acompanhamento sobre uma análise já gerada.

**Corpo:** `application/json`

```json
{
  "mode": "casos",
  "messages": [
    { "role": "user",      "content": "CONTEXTO:\n<documento>" },
    { "role": "assistant", "content": "<resultado da análise>" },
    { "role": "user",      "content": "Gere mais 2 edge cases" }
  ]
}
```

- `messages` precisa ter **ao menos 2 itens**; o frontend sempre envia `[contexto, resultado, ...turnos, pergunta]`.
- Para controlar o custo de contexto, o backend envia ao modelo apenas as **2 primeiras + 5 últimas** mensagens quando o histórico passa de 7 — o corte em número ímpar mantém a alternância user/assistant.
- O chat usa um **prompt de sistema próprio e conversacional** (não o do relatório): responde direto ao que foi perguntado, mantendo as regras anti-alucinação, e só gera tabela quando pedem novos itens.

**Resposta:** stream NDJSON (`delta`s → `done`), ou JSON 400 para validação.

## POST /api/review

Auto-revisão: uma segunda passada da IA audita uma análise já gerada contra o documento original — rastreabilidade (itens inventados), cobertura faltante e precisão dos critérios. **Custa uma chamada extra de API**; a UI só a dispara sob demanda (botão "🔍 Revisar análise").

**Corpo:** `application/json`

```json
{ "mode": "casos", "document": "<texto do documento>", "result": "<análise a revisar>" }
```

- `mode` e `result` são obrigatórios; `document` é opcional (sem ele, a revisão avalia apenas a consistência interna).

**Resposta:** stream NDJSON (`delta`s → `done`), ou JSON 400 para validação.

## Erros do modelo

Falhas de conexão com a Groq viram mensagem amigável ("Sem conexão com a API da Groq...") com status 502 (pré-stream) ou evento `error` (mid-stream). Outros erros da API são repassados com prefixo `Erro na API Groq:`. No evento `error` mid-stream, o frontend preserva o conteúdo parcial já exibido e anexa um aviso de interrupção — só descarta quando nada chegou.
