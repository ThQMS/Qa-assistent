# Prompts e modos

Os prompts em `backend/src/services/groqService.js` são o coração do projeto. Esta página explica a filosofia por trás deles e o que cada modo faz — leia antes de editar qualquer um.

## Filosofia

1. **Anti-alucinação em primeiro lugar.** O modelo é proibido de inventar endpoints, regras, códigos HTTP ou comportamentos. O que não está na documentação vira `[Não documentado]`; o que é padrão de mercado mas não explícito vira `[INFERIDO]` — nunca apresentado como fato.
2. **Validação de entrada antes da análise.** Todo modo classifica o conteúdo em categorias (documento válido / arquitetura sem requisitos / não é software / insuficiente) e **recusa educadamente** o que não consegue analisar, explicando o que falta. Isso evita saída bonita e inútil.
3. **Saída utilizável no Jira.** Formatos fixos por modo (seções exatas, tabelas com colunas definidas, IDs HP-01/EC-01/CN-01), pensados para virar tarefa sem retrabalho.
4. **Calibrado para o contexto real**: QA de APIs e sistemas de redes, testes majoritariamente mockados, fluxo no Jira. As estimativas de tempo, os tipos de risco e os exemplos falam essa língua.
5. **Parâmetros do usuário vencem os padrões.** Os prompts aceitam valores injetados (capacidade diária, overhead, SLA da equipe) — a UI envia isso pelas Configurações (⚙).

## Os 12 modos

| Modo (`id`) | Entrada | Saída principal |
|---|---|---|
| Resumo & Critérios (`resumo`) | documentação | resumo executivo, critérios Dado/Quando/Então, perguntas ao PO, riscos, fluxo principal |
| Cenários de Teste (`casos`) | documentação | 3 tabelas (Happy Path, Edge Cases, Negativos) com BVA/EP/transição de estados + premissas adotadas |
| Gerador de Dados de Teste (`dados`) | spec com campos e regras | massa por campo (válidos/inválidos/limites), payloads JSON prontos, valores universalmente problemáticos |
| Estimativa de Execução (`estimativa`) | cenários prontos | tempo por cenário (mock-aware), projeção de dias, otimizações |
| Redator de Bug Report (`redator`) | anotações soltas de bug | report padronizado: título, passos, esperado vs. observado, severidade, evidências, faltantes |
| Estimativa de Bug (`bug`) | descrição de bug | severidade, story points Fibonacci com tabela de fatores |
| Análise de SLA (`sla`) | cenários (+ SLA, se houver) | risco de violação por cenário, bloqueantes de deploy, recomendações; infere SLA por tipo de sistema com tag [INFERIDO] |
| Prioridade de Execução (`prioridade`) | cenários | Risk-Based Testing: score P×I, faixas alta/média/baixa, dependências, ordem recomendada |
| Checklist de Sign-off (`checklist`) | critérios e/ou cenários | checklist verificável com tags [BLOQUEANTE], validação de mocks vs. contrato real |
| Mapa de Cobertura (`cobertura`) | doc + cenários | status por requisito, lacunas críticas, cenários sugeridos, % de cobertura |
| Análise de Espec (`espec`) | spec (1 ou 2 versões) | funcionalidades, endpoints, erros; diff de versões com breaking changes |
| Resumo para a Daily (`daily`) | resultados de execução | status geral, concluído, bloqueios com responsável, riscos de prazo, próximos passos |

## Separadores especiais

- **`cobertura`** — a UI pede `---` numa linha isolada entre documentação e cenários; o backend converte a primeira ocorrência para `=== CENÁRIOS ===` (o que o prompt espera). Se o texto já contém `=== CENÁRIOS ===`, nada é alterado. O **encadeamento** da UI insere o separador oficial diretamente (sem passar pelo `---`), imune a linhas `---` no meio do documento.
- **`espec`** — duas versões são unidas com `=== VERSÃO ANTERIOR ===`. O prompt detecta o separador e ativa a Seção 4 (comparação/breaking changes).
- **`=== DOCUMENTAÇÃO DE REFERÊNCIA ===`** — anexado pelo encadeamento da UI ao levar cenários para `estimativa`, `prioridade`, `sla` ou `checklist`: carrega a documentação original como contexto. Os prompts desses modos instruem o modelo a usá-la só como referência.

## Mecanismos de qualidade em volta dos prompts

- **Prompt próprio do chat** (`chatSystem`): o chat de refinamento NÃO reusa o prompt do relatório — usa um prompt conversacional que mantém as regras anti-alucinação mas responde direto, sem reaplicar o formato de seções.
- **Auto-correção estrutural** (`REQUIRED_SECTIONS` + `missingSections`): após cada análise, o backend confere se as seções obrigatórias do modo estão presentes. Se faltar alguma, faz uma chamada extra pedindo apenas as faltantes e anexa ao resultado (transparente para a usuária — o streaming continua). Recusas legítimas da Etapa 1 não disparam a checagem (a detecção tolera markdown antes do ⚠, ex.: `**⚠️ ...**`). No `espec` com duas versões, a **Seção 4** (comparação) também entra nas obrigatórias.
- **Retry com backoff** (`createWithRetry`): falhas transitórias da Groq (429, 5xx, rede) são retentadas 2x (1s, 4s) antes de virar erro.
- **Auto-revisão sob demanda** (`REVIEW_SYSTEM` + `/api/review`): papel de revisora crítica que audita a análise contra o documento — itens sem base (alucinação), cobertura documentada sem item correspondente e critérios vagos. Opcional porque dobra o custo da análise.
- **Truncamento inteligente** (`truncate.js`): documentos acima de 50k chars preservam início (60%) **e fim** (40%) — em spec real, critérios e erros costumam estar no final.

## Como editar prompts com segurança

1. Edite o texto do modo em `SYSTEM` (`groqService.js`). Mantenha: a etapa de validação de entrada, as regras absolutas numeradas e os formatos de seção — os evals e a auto-correção verificam essa estrutura. Se renomear uma seção, atualize também `REQUIRED_SECTIONS`.
2. Rode o golden set: `npm run eval` (14 chamadas reais, sequenciais). Todos os casos precisam passar.
3. Se criar um **modo novo**: adicione a chave em `SYSTEM`, `USER_TEXT` e `REQUIRED_SECTIONS` (backend) e um item em `MODES` no `frontend/app.jsx` (com os campos de ajuda `helpWhat/helpPaste/helpGet/helpTip`); inclua um caso no eval e avalie um encadeamento em `CHAINS`.
4. Parâmetros que a usuária deve poder ajustar? Não os fixe no prompt — deixe o padrão no prompt e documente que a UI pode injetar valor (padrão atual: linha `PARÂMETROS DO USUÁRIO:` ou `SLA PADRÃO DA EQUIPE:` no início do texto).

## Modelo

Definido por `GROQ_MODEL` no `.env` (padrão `llama-3.3-70b-versatile`, temperatura 0.2). Ao trocar de modelo, rode `npm run eval` — modelos diferentes obedecem formato com rigor diferente.
