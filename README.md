<div align="center">

# 🤖 Qa Assistent

**Assistente local de QA para análise de documentação e planejamento de testes.**

Cole a documentação → receba critérios de aceite, cenários de teste, estimativas,
priorização por risco e checklist de sign-off — prontos para virar tarefa no Jira.

*Feito para o dia a dia de quem testa APIs e sistemas de redes com testes mockados.*

</div>

---

## ✨ Por que existe

Boa parte do tempo de QA não é executar teste — é **ler documentação, extrair o que importa e transformar em plano**. O Qa Assistent automatiza esse rascunho: ele lê a spec e devolve os artefatos estruturados; a revisão final e o julgamento continuam sendo seus.

E ele foi desenhado para **não inventar**: o que não está na documentação vira `[Não documentado]` ou pergunta ao PO; o que foi assumido sai marcado como `[INFERIDO]`; documento inválido é recusado com a explicação do que falta.

## 🧭 Os 12 modos

| Modo | Você cola | Você recebe |
|------|-----------|-------------|
| 📋 **Resumo & Critérios** | a documentação | critérios Dado/Quando/Então, perguntas ao PO, riscos |
| ▦ **Cenários de Teste** | a documentação | 3 tabelas prontas p/ Jira: Happy Path, Edge Cases, Negativos |
| ⌗ **Gerador de Dados de Teste** | a spec (campos e regras) | massa de teste: válidos, inválidos, limites e payloads JSON |
| ◷ **Estimativa de Execução** | cenários prontos | tempo por cenário + projeção de dias (calibrado p/ mocks) |
| ✎ **Redator de Bug Report** | anotações soltas do bug | bug report completo e padronizado, pronto p/ abrir no Jira |
| ⚠ **Estimativa de Bug** | a descrição do bug | story points Fibonacci com justificativa por fator |
| ⚡ **Análise de SLA** | cenários (+ SLA se souber) | risco de violação por cenário e bloqueantes de deploy |
| ↑ **Prioridade de Execução** | cenários | Risk-Based Testing: ordem de execução por risco × impacto |
| ☑ **Checklist de Sign-off** | critérios/cenários | checklist verificável do go/no-go, com bloqueadores |
| ◉ **Mapa de Cobertura** | doc + cenários | o que está coberto, o que não está e cenários p/ fechar lacunas |
| ◈ **Análise de Espec** | a spec (1 ou 2 versões) | funcionalidades, endpoints, erros — e breaking changes no diff |
| ☀ **Resumo para a Daily** | resultados da execução | status report curto: concluído, bloqueios, riscos, próximos passos |

## 🚀 Recursos

- **Streaming** — a resposta aparece conforme é gerada
- **Auto-correção** — se o modelo pular uma seção obrigatória do formato, o backend detecta e completa sozinho
- **Encadeamento** — o resultado de um modo vira entrada do próximo com um clique
- **Exemplos embutidos** — cada modo tem um exemplo de um clique para experimentar sem precisar de documentação em mãos
- **Chat de refinamento** — "gere mais casos", "detalhe o EC-02"
- **Auto-revisão opcional** — uma segunda passada da IA audita a análise: itens sem base no documento, cobertura faltante, critérios vagos
- **Export para Jira** — wiki markup na área de transferência ou tabelas em CSV
- **Histórico** — as últimas 20 análises salvas no navegador
- **Configurações** — capacidade diária, overhead e SLA padrão da sua equipe
- **Privacidade por arquitetura** — servidor local (`127.0.0.1`), sem persistência no backend; as únicas saídas de rede são a chamada ao modelo (API da Groq) e as fontes da página (Google Fonts)

## ⚡ Começar em 4 comandos

> Pré-requisitos: [Node.js 20+](https://nodejs.org) e uma chave gratuita da [Groq](https://console.groq.com).

```bash
cd backend
npm install
cp .env.example .env   # coloque sua GROQ_API_KEY
npm run dev
```

O navegador abre sozinho. Também dá para gerar um **executável** (Node embutido, dois cliques e roda):

```bash
npm run package:win    # ou package:mac
```

## 📚 Documentação

| Documento | Conteúdo |
|-----------|----------|
| [docs/arquitetura.md](docs/arquitetura.md) | visão geral, fluxo de dados, protocolo de streaming, segurança |
| [docs/api.md](docs/api.md) | as rotas `/api/analyze` e `/api/chat` em detalhe |
| [docs/prompts.md](docs/prompts.md) | filosofia dos prompts, os 12 modos, como editar com segurança |
| [docs/frontend.md](docs/frontend.md) | pipeline de build, mapa do código, convenções de CSS |
| [docs/desenvolvimento.md](docs/desenvolvimento.md) | setup, scripts, fluxos de trabalho, troubleshooting |

## 🛠️ Stack

Node.js + Express · React 18 (arquivo único, sem bundler) · [Groq](https://groq.com) (`llama-3.3-70b-versatile` por padrão, configurável) · pdf.js + mammoth para extração · DOMPurify para renderizar o markdown com segurança · [@yao-pkg/pkg](https://github.com/yao-pkg/pkg) para o executável.

Os prompts têm **testes de regressão** (`npm run eval`): um golden set que verifica estrutura das saídas e as recusas corretas de entrada inválida.

## 📄 Licença

[MIT](LICENSE) — use, modifique e distribua à vontade.

---

<div align="center">

Feito com 💜 para uma QA muito especial.

</div>
