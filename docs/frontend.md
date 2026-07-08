# Frontend

Interface React de **arquivo único**, sem bundler: o fonte é `backend/frontend/app.jsx`, compilado por Babel (vendorado) para `backend/public/app.js`. O `backend/public/index.html` é fonte também — contém o HTML e todo o CSS.

## Pipeline de build

```text
frontend/app.jsx ──(npm run build:front / compile-frontend.cjs)──► public/app.js
```

- O build é **não-destrutivo**: nunca sobrescreve fontes. `public/app.js` leva um banner "arquivo gerado — não edite".
- Roda automaticamente antes de `package:win`/`package:mac` (hooks `prepackage:*`).
- Dependências do navegador ficam em `public/vendor/` (React 18.3.1 production, marked, DOMPurify, pdf.js, Babel standalone para o build) — o app funciona **offline** exceto pela chamada à Groq (e as fontes do Google Fonts, que têm fallback local).

## Mapa do app.jsx

| Bloco | O que é |
|-------|---------|
| `MODES` | os 12 modos: título, chip, descrição, placeholder e os 4 campos de ajuda (`helpWhat`, `helpPaste`, `helpGet`, `helpTip`) |
| `MODE_GROUPS` / `ORDERED_MODES` | agrupamento visual da lista de modos por etapa do fluxo de QA (entender → planejar → executar → bugs → entregar); modo fora de grupo ainda aparece ao final (defensivo) |
| `EXAMPLES` | exemplo de entrada por modo — alimenta o botão "✨ Testar com um exemplo", exibido quando o campo está vazio |
| `CHAINS` | encadeamento: para cada modo, os próximos passos naturais (ex.: `casos → estimativa, prioridade, sla, cobertura, checklist`) |
| `mdToHtml` | markdown → HTML **sanitizado** (marked + DOMPurify) — todo HTML renderizado do modelo passa por aqui |
| `mdToJira` / `tablesToCsv` | conversores de export: markdown → Jira wiki markup; tabelas markdown → CSV (BOM + aspas escapadas) |
| `readNdjson` | leitor do protocolo de streaming (uma linha JSON por evento) |
| `smartTruncate` | truncamento inteligente (início+fim), espelho do backend |
| `Modal` | modal acessível compartilhado pelos 3 diálogos: `role=dialog`, foco inicial e Tab preso dentro (focus trap) |
| `NumberStepper` | campo numérico com −/+ próprios (substitui as setinhas do navegador) |
| `SlaExplainer` | painel "O que é SLA?" exibido no modo de SLA |
| `extractPdf` | extração de texto de PDF no navegador (pdf.js) |
| `App` | estado, handlers e o JSX da tela |

## Recursos e onde vivem

- **Streaming**: `generate()` e `sendChat()` leem NDJSON e re-renderizam o markdown a cada delta (o spinner só aparece até o primeiro trecho chegar). Se um evento `error` chegar no meio do stream, o conteúdo parcial é preservado com um aviso de interrupção ao final — análises interrompidas não entram no histórico.
- **Encadeamento**: `chainTo(targetId)` leva o resultado como entrada do modo alvo; para `cobertura`, compõe `docContext + "=== CENÁRIOS ===" + resultado` (o separador oficial do prompt, imune a `---` no meio do documento). Foca o campo de entrada ao trocar.
- **Histórico**: `pushHistory` grava a análise no sucesso do `generate`; modal restaura modo+doc+resultado+contexto. Máx. 20 entradas, com fallback se o localStorage encher. Com busca por título/modo e exportar/importar JSON (merge com dedupe por id).
- **Auto-revisão**: `runReview()` chama `/api/review` e exibe o resultado como turno do chat. O botão avisa o custo (+1 chamada de API).
- **Configurações**: `settings` (capacidade diária, overhead, SLA padrão); `settingsPrefix()` injeta os valores no texto enviado quando o modo os usa (`estimativa`, `sla`).
- **Export**: botões no cabeçalho do resultado — Copiar (markdown), Copiar p/ Jira (wiki markup), CSV (só quando o resultado tem tabela), Baixar .md.
- **Modo do resultado** (`resultMode`): o chat, a revisão, o chip do painel e os nomes de arquivo dos exports usam o modo que **gerou** o resultado — trocar de modo depois de gerar não mistura os contextos.
- **Exemplos embutidos**: com o campo vazio, o botão "✨ Testar com um exemplo" (no lugar do contador de caracteres) preenche a entrada com um exemplo pronto do modo (`EXAMPLES`) — inclusive as convenções de separador (`---` na cobertura, `=== VERSÃO ANTERIOR ===` no espec).
- **Contador de caracteres**: avisa "⚠ doc grande" acima de 28k e "✂ será truncado (início+fim)" acima de 50k.
- **Atalhos**: `Ctrl+Enter` gera (keydown no textarea principal); `Esc` fecha os três modais (listener global); `Enter` envia no chat (`Shift+Enter` quebra linha).

## Chaves de localStorage

| Chave | Conteúdo |
|-------|----------|
| `qa_assistent_mode` | último modo selecionado |
| `qa_assistent_doc` | texto do campo de entrada (persiste entre sessões) |
| `qa_assistent_history` | array das últimas 20 análises `{id, ts, mode, title, doc, result, context}` |
| `qa_assistent_settings` | `{dailyHours, overheadPct, slaDefaults}` |

## Convenções de CSS

- Tema em variáveis CSS no `:root` (`--bg`, `--surface*`, `--lilac`, `--purple`, `--text*`, `--border*`) — mudar a paleta é mudar essas variáveis.
- **Nada de azul padrão do navegador**: setinhas de `input[type=number]` removidas (stepper próprio), focus ring lilás via `:focus-visible`, autofill neutralizado, `accent-color` no tema.
- Modais (ajuda, histórico, configurações) compartilham as classes `help-overlay`/`help-modal`/`help-top`/`help-body`; variações por classe extra (`hist-body`, `settings-modal`).
- Fontes: `Space Grotesk` (texto) e `JetBrains Mono` (rótulos, badges e dados) via Google Fonts — único recurso remoto da página; com a fonte indisponível, caem os fallbacks do sistema.
