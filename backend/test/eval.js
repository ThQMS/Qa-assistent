/*
 * Evals dos prompts — golden set.
 *
 * Roda cada caso contra a API da Groq de verdade e verifica se a resposta tem
 * a estrutura esperada. Use depois de qualquer ajuste nos prompts:
 *
 *   npm run eval
 *
 * Cada caso custa 1 chamada à API (são 14 chamadas no total, sequenciais).
 * As verificações são estruturais de propósito (seções presentes, mensagens de
 * recusa corretas) — o conteúdo exato varia entre execuções do modelo.
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { analyzeDocument } = require("../src/services/groqService.js");

const SPEC_VALIDA = `Feature: autenticação de usuários via POST /auth/login.
O cliente envia email e senha no body (JSON). Com credenciais válidas o sistema
retorna HTTP 200 com um token JWT no campo "token" (expira em 15 minutos).
Com senha incorreta retorna HTTP 401 com body {"error":"invalid_credentials"}.
Após 5 tentativas falhas consecutivas a conta é bloqueada por 15 minutos e o
sistema passa a retornar HTTP 423. O campo email é obrigatório e deve ter
formato válido; senha é obrigatória com mínimo de 8 caracteres. O serviço de
notificação é chamado (POST /notifications) a cada bloqueio de conta.`;

const CENARIOS = `HP-01 | Login com credenciais válidas | Mock: /auth/login 200 + token | enviar POST com email e senha válidos → validar status 200 → validar campo token | HTTP 200 com token JWT
EC-01 | Senha com exatamente 8 caracteres | Mock: /auth/login 200 | enviar POST com senha de 8 chars → validar status | HTTP 200
CN-01 | Senha incorreta | Mock: /auth/login 401 | enviar POST com senha errada → validar status e body | HTTP 401 com error invalid_credentials
CN-02 | Sexta tentativa após bloqueio | Mock: /auth/login 423 | realizar 5 tentativas falhas → tentar a sexta → validar status | HTTP 423`;

const CASES = [
  {
    name: "resumo: spec válida gera as 5 seções",
    mode: "resumo",
    input: SPEC_VALIDA,
    expect: [
      "Resumo Executivo",
      "Critérios de Aceite",
      "Perguntas para o PO",
      "Riscos de Qualidade",
      "Fluxo Principal"
    ]
  },
  {
    name: "resumo: receita de bolo é recusada (categoria C)",
    mode: "resumo",
    input: "Receita de bolo de cenoura: 3 cenouras médias, 2 xícaras de farinha, 3 ovos, 1 xícara de óleo. Bata tudo no liquidificador, asse por 40 minutos a 180 graus e cubra com brigadeiro.",
    expect: ["⚠️", "inválido"]
  },
  {
    name: "casos: spec válida gera as 3 tabelas + premissas",
    mode: "casos",
    input: SPEC_VALIDA,
    expect: [
      "Happy Path",
      "Edge Cases",
      "Casos Negativos",
      "Premissas",
      "| HP-01",
      "| CN-01"
    ]
  },
  {
    name: "bug: descrição completa gera story points Fibonacci",
    mode: "bug",
    input: "Bug: o endpoint GET /users/{id} retorna HTTP 500 quando o id contém letras. Esperado: HTTP 400 com mensagem de validação. Passos: chamar GET /users/abc com token válido. Reproduz sempre. Impacto: o app mobile quebra na tela de perfil para qualquer deep link malformado.",
    expect: ["Story Points", "Severidade", "Reprodutibilidade"]
  },
  {
    name: "bug: só título é recusado (categoria C)",
    mode: "bug",
    input: "Bug no login",
    expect: ["⚠️", "inválida"]
  },
  {
    name: "estimativa: cenários geram tabela + projeção",
    mode: "estimativa",
    input: CENARIOS,
    expect: ["Estimativa por Cenário", "Projeção", "| HP-01"]
  },
  {
    name: "cobertura: doc + cenários com separador normalizado",
    mode: "cobertura",
    // simula o que o backend envia após normalizar o "---" da UI
    input: SPEC_VALIDA + "\n\n=== CENÁRIOS ===\n\n" + CENARIOS,
    expect: ["Mapa de Cobertura", "Relatório de Cobertura", "HP-01"]
  },
  {
    name: "redator: anotações soltas viram bug report completo",
    mode: "redator",
    input: "deu 500 no POST /orders qnd mandei quantidade negativa, era pra ser 400 com msg de validacao. testei no staging v2.3. quebra o fluxo do carrinho",
    expect: ["Bug Report", "Passos para Reproduzir", "Resultado Esperado", "Resultado Observado", "Evidências"]
  },
  {
    name: "dados: spec com regras gera massa de teste e payloads",
    mode: "dados",
    input: SPEC_VALIDA,
    expect: ["Massa de Teste por Campo", "Payloads Prontos", "Premissas"]
  },
  {
    name: "sla: cenários com SLA informado geram análise por dimensão",
    mode: "sla",
    input: "SLA: latência p95 < 300ms, error rate < 1%, disponibilidade > 99,5%.\n\n" + CENARIOS,
    expect: ["Análise de SLA por Cenário", "Recomendações por Dimensão", "HP-01"]
  },
  {
    name: "prioridade: cenários são priorizados com ordem de execução",
    mode: "prioridade",
    input: CENARIOS,
    expect: ["Prioridade", "Ordem de Execução", "HP-01"]
  },
  {
    name: "checklist: cenários geram checklist com bloqueadores",
    mode: "checklist",
    input: CENARIOS,
    expect: ["Checklist de Sign-off", "Bloqueadores para Deploy", "HP-01"]
  },
  {
    name: "espec: duas versões ativam a Seção 4 (comparação)",
    mode: "espec",
    // simula o que o backend monta quando há versão anterior
    input: SPEC_VALIDA.replace("expira em 15 minutos", "expira em 5 minutos")
      + "\n\n=== VERSÃO ANTERIOR ===\n\n" + SPEC_VALIDA,
    expect: ["Seção 1", "Seção 2", "Seção 3", "Seção 4", "Breaking"]
  },
  {
    name: "daily: resultados de execução viram status report",
    mode: "daily",
    input: "Executei HP-01 a HP-04, todos passaram. CN-02 falhou com 500 (abri o bug QA-123). EC-01 bloqueado esperando massa de teste do time de dados. Faltam 6 dos 15 cenários planejados para a sprint.",
    expect: ["Resumo para a Daily", "Bloqueios", "Próximos Passos"]
  }
];

async function main() {
  let failed = 0;
  console.log(`Rodando ${CASES.length} evals (chamadas reais à Groq)...\n`);

  for (const c of CASES) {
    process.stdout.write(`- ${c.name} ... `);
    let output;
    try {
      output = await analyzeDocument(c.input, c.mode);
    } catch (err) {
      console.log(`ERRO DE API: ${err.message}`);
      failed++;
      continue;
    }
    const missing = c.expect.filter(s => !output.includes(s));
    if (missing.length === 0) {
      console.log("PASSOU");
    } else {
      failed++;
      console.log("FALHOU");
      console.log(`    esperava conter: ${missing.map(m => JSON.stringify(m)).join(", ")}`);
      console.log(`    início da resposta: ${JSON.stringify(output.slice(0, 200))}`);
    }
  }

  console.log(`\n${CASES.length - failed}/${CASES.length} evals passaram.`);
  if (failed > 0) process.exitCode = 1;
}

main();
