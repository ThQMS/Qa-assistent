# Guia de desenvolvimento

## Pré-requisitos

- Node.js 20+ (desenvolvido com Node 24)
- Chave gratuita da Groq: [console.groq.com](https://console.groq.com)

## Setup

```bash
cd backend
npm install
cp .env.example .env    # edite e coloque sua GROQ_API_KEY
npm run dev             # sobe com --watch; o navegador abre sozinho
```

## Scripts npm

| Script | O que faz |
|--------|-----------|
| `npm run dev` | servidor com reload automático (`node --watch`) |
| `npm start` | servidor em modo normal |
| `npm run build:front` | compila `frontend/app.jsx` → `public/app.js` |
| `npm test` | testes unitários offline (sem API, sem custo) — truncamento, normalizações, auto-correção, conversores Jira/CSV |
| `npm run eval` | roda o golden set dos prompts (14 chamadas reais à Groq) |
| `npm run package:win` | gera `../Qa Assistent-app/Qa-Assistent.exe` (Node 22 embutido) |
| `npm run package:mac` | gera `../dist/Qa-Assistent-mac` |

O build do frontend roda automaticamente antes dos `package:*`.

## Fluxos de trabalho

### Mexi na interface (`frontend/app.jsx` ou `public/index.html`)

1. `npm run build:front` (só se mexeu no `.jsx` — o `index.html` é servido direto)
2. Recarregue o navegador. **Nunca edite `public/app.js`** — é gerado.

### Mexi nos prompts (`src/services/groqService.js`)

1. `npm run eval` — os 14 casos precisam passar. (Dica: se a cota diária do modelo padrão estourar, rode com `GROQ_MODEL` apontando para outro modelo da Groq.)
2. Se mudou a estrutura de seções de um modo, atualize `REQUIRED_SECTIONS` (auto-correção), o caso correspondente em `test/eval.js` e a ajuda do modo em `MODES` (`frontend/app.jsx`).

### Mexi no backend (rotas/serviços)

O `npm run dev` recarrega sozinho. Teste as validações:

```bash
# validação: modo inválido → 400 JSON
curl -s -X POST http://localhost:3001/api/analyze -F "mode=foo" -F "text=x"
# caminho feliz: streaming NDJSON
curl -N -X POST http://localhost:3001/api/analyze -F "mode=bug" -F "text=Bug: ... Esperado: ... Impacto: ..."
```

### Vou entregar uma versão nova

```bash
npm run package:win
```

Copie `Qa-Assistent.exe` + um `.env` com a chave para a pasta de entrega. Dois cliques: o servidor sobe em `127.0.0.1` e o navegador abre.

## CI

`.github/workflows/ci.yml` roda a cada push/PR: sintaxe do backend, build do frontend, `npm test` (offline — nenhum segredo necessário) e `npm audit`. Os evals com API real ficam de fora do CI por dependerem de chave e cota; rode-os localmente ao mexer em prompts.

## Ícone

- **Favicon**: `public/assets/favicon.svg` (robô desenhado à mão em SVG — edite direto).
- **Ícone do .exe**: `build/icon.ico`, aplicado automaticamente pelo `set-icon.cjs` após `npm run package:win` (via rcedit, com metadados de versão). Para regenerar o `.ico` após mudar o SVG: renderize o SVG em PNG 256×256 (qualquer conversor) e rode `node -e "require('png-to-ico').default('caminho.png').then(b => require('fs').writeFileSync('build/icon.ico', b))"`.

## Checklist antes de commit/push

- [ ] `npm test` verde (offline, sempre)
- [ ] `npm run eval` verde (se tocou em prompts)
- [ ] `node --check` passa nos arquivos alterados do backend
- [ ] `npm run build:front` rodado (se tocou no `.jsx`) — o `public/app.js` gerado **é versionado**
- [ ] Nenhum `.env` ou chave no diff (`git diff --staged | grep -i "gsk_"` não deve retornar nada)
- [ ] `npm audit` sem vulnerabilidades novas

## Estrutura de pastas

```text
qa-assistent/
├── backend/
│   ├── src/
│   │   ├── routes/            # analyze.js, chat.js
│   │   ├── services/          # groqService.js (prompts), pdfParser.js, docxParser.js
│   │   └── server.js
│   ├── frontend/app.jsx       # FONTE da interface
│   ├── public/                # index.html (fonte), app.js (gerado), vendor/
│   ├── test/eval.js           # golden set dos prompts
│   ├── compile-frontend.cjs   # build do frontend
│   └── package.json
├── docs/                      # esta documentação
└── Qa Assistent-app/          # entrega (fora do git)
```

## Solução de problemas

| Sintoma | Causa provável |
|---------|----------------|
| `[ERRO] GROQ_API_KEY não configurada` na subida | `.env` ausente ou com o placeholder |
| "Sem conexão com a API da Groq" | internet/DNS/proxy — o backend detecta e explica |
| Resposta corta no meio com aviso de truncamento | documento muito grande para `max_tokens`; divida o documento |
| Mudei o `.jsx` e nada aconteceu | faltou `npm run build:front` |
| "Muitas requisições" | rate limit (100/15min) — aguarde ou reinicie o servidor |
