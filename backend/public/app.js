/* ARQUIVO GERADO — não edite. Fonte: frontend/app.jsx (npm run build:front) */
/*
 * Qa Assistent — frontend (fonte JSX)
 *
 * Este é o ARQUIVO FONTE da interface. Edite aqui e rode `npm run build:front`
 * para gerar public/app.js (o artefato que o navegador carrega).
 * Não edite public/app.js diretamente.
 */
(function () {
  const IcCheck = () => /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 13l4 4L19 7"
  }));

  /* ---------------- modes + prompts ---------------- */
  const IcList = () => /*#__PURE__*/React.createElement("span", null, "\u2261");
  const IcGrid = () => /*#__PURE__*/React.createElement("span", null, "\u25A6");
  const IcClock = () => /*#__PURE__*/React.createElement("span", null, "\u25F7");
  const IcDoc = () => /*#__PURE__*/React.createElement("span", null, "\u25A1");
  const IcCopy = () => /*#__PURE__*/React.createElement("span", null, "\u29C9");
  const IcDownload = () => /*#__PURE__*/React.createElement("span", null, "\u2193");
  const IcBug = () => /*#__PURE__*/React.createElement("span", null, "\u26A0");
  const IcBolt = () => /*#__PURE__*/React.createElement("span", null, "\u26A1");
  const IcRank = () => /*#__PURE__*/React.createElement("span", null, "\u2191");
  const IcCheck2 = () => /*#__PURE__*/React.createElement("span", null, "\u2611");
  const IcMap = () => /*#__PURE__*/React.createElement("span", null, "\u25C9");
  const IcSpec = () => /*#__PURE__*/React.createElement("span", null, "\u25C8");
  const IcPen = () => /*#__PURE__*/React.createElement("span", null, "\u270E");
  const IcData = () => /*#__PURE__*/React.createElement("span", null, "\u2317");
  const IcSun = () => /*#__PURE__*/React.createElement("span", null, "\u2600");
  const MODES = [{
    id: 'resumo',
    title: 'Resumo & Critérios',
    chip: 'resumo',
    desc: 'Lê a doc, extrai critérios no formato Dado/Quando/Então e aponta lacunas.',
    icon: IcList,
    file: 'resumo-criterios',
    inputLabel: 'a documentação',
    placeholder: 'Cole aqui a documentação da história/feature (Confluence, Notion, Jira, Word…). Ou solte um PDF abaixo.',
    helpWhat: 'Lê a documentação da feature e organiza o que importa para testar: o que a funcionalidade faz, os critérios de aceite no formato Dado/Quando/Então e o que ainda está mal definido.',
    helpPaste: 'A user story, o épico, a página do Confluence/Notion ou o contrato da API. Pode colar o texto ou soltar um PDF/Word.',
    helpGet: 'Resumo executivo em 3 frases · critérios de aceite mensuráveis · perguntas ao PO · riscos de qualidade · fluxo principal passo a passo.',
    helpTip: 'Se a doc estiver vaga, as "Perguntas para o PO" são o ouro: leve-as para a refinement e destrave os testes antes de começar.'
  }, {
    id: 'casos',
    title: 'Cenários de Teste',
    chip: 'cenários',
    desc: 'Gera 3 tabelas prontas para o Jira: Happy Path, Edge Cases e Casos Negativos.',
    icon: IcGrid,
    file: 'cenarios-de-teste',
    inputLabel: 'a documentação',
    placeholder: 'Cole aqui a documentação da história/feature. Ou solte um PDF abaixo.',
    helpWhat: 'Transforma a documentação em cenários de teste prontos para virar tarefa no Jira, aplicando técnicas formais de teste: valores-limite, particionamento por equivalência e transição de estados.',
    helpPaste: 'A documentação da feature — ou o resultado do modo Resumo & Critérios.',
    helpGet: '3 tabelas: ✅ Happy Path (o que deve funcionar), ⚠️ Edge Cases (limites e extremos) e ❌ Casos Negativos (entradas inválidas e erros), cada linha com pré-condição, passos e resultado esperado.',
    helpTip: 'Confira sempre a seção "Premissas Adotadas" no final: é onde ele avisa o que assumiu por não estar escrito na documentação.'
  }, {
    id: 'dados',
    title: 'Gerador de Dados de Teste',
    chip: 'massa de dados',
    desc: 'Gera massa de teste a partir da spec: valores válidos, inválidos e limites, com payloads prontos.',
    icon: IcData,
    file: 'dados-de-teste',
    inputLabel: 'a especificação (campos e regras)',
    placeholder: 'Cole a especificação com os campos e regras (tipos, obrigatoriedade, tamanhos, formatos, limites). O Qa Assistent gera a massa de teste: valores válidos, inválidos e de limite, com payloads prontos.',
    helpWhat: 'Transforma as regras da especificação em massa de teste pronta: para cada campo documentado, valores válidos, inválidos e de limite (análise de valor-limite aplicada aos dados), além de payloads JSON completos para usar nos testes.',
    helpPaste: 'A spec com os campos e regras — tipos, obrigatoriedade, tamanhos, formatos, limites. Quanto mais regras documentadas, mais rica a massa gerada.',
    helpGet: 'Tabela por campo (válidos · inválidos · limites) · payload válido + payloads inválidos com o erro esperado de cada um · lista de valores universalmente problemáticos (string vazia, unicode, texto gigante) · premissas adotadas.',
    helpTip: 'Funciona muito bem em sequência: Análise de Espec ou Resumo → "Continuar com este resultado ➜ Gerador de Dados" — os dados saem alinhados às regras extraídas.'
  }, {
    id: 'estimativa',
    title: 'Estimativa de Execução',
    chip: 'estimativa',
    desc: 'Cole os cenários já escritos. Recebe tempo por cenário e projeção do dia.',
    icon: IcClock,
    file: 'estimativa-execucao',
    inputLabel: 'os cenários de teste',
    placeholder: 'Cole aqui os cenários de teste já escritos (pode usar a saída do modo Cenários de Teste diretamente).',
    helpWhat: 'Estima quanto tempo cada cenário leva para executar — preparar o mock, executar, validar e registrar evidência no Jira — e projeta quantos dias o ciclo completo vai levar.',
    helpPaste: 'Os cenários já escritos. A saída do modo Cenários de Teste serve direto, sem retrabalho.',
    helpGet: 'Classificação por cenário (⚡ rápido · 🕐 médio · 🕑 demorado · 🕒 complexo) · tempo total realista com overhead · projeção de dias · cenários que compartilham mock e podem ser agrupados.',
    helpTip: 'Ajuste sua capacidade diária e o overhead nas Configurações (⚙) para a projeção sair na sua realidade, não na média genérica.'
  }, {
    id: 'redator',
    title: 'Redator de Bug Report',
    chip: 'bug report',
    desc: 'Cole anotações soltas do bug. Recebe o report completo, pronto para abrir no Jira.',
    icon: IcPen,
    file: 'bug-report',
    inputLabel: 'as anotações do bug',
    placeholder: 'Cole suas anotações soltas: o que você estava fazendo, o que aconteceu, onde, mensagens de erro... O Qa Assistent transforma em um bug report completo e bem estruturado.',
    helpWhat: 'Transforma anotações soltas ("deu 500 no /users quando mandei letra no id") em um bug report completo e padronizado: título claro, passos numerados, esperado vs. observado, severidade sugerida e checklist de evidências. Um bom report faz o dev reproduzir em minutos, sem ping-pong.',
    helpPaste: 'Suas anotações do jeito que estiverem — rascunho, mensagem de erro copiada, texto corrido. O mínimo: o que aconteceu e onde.',
    helpGet: 'Report pronto para o Jira: título no padrão [Componente] resumo · ambiente · passos numerados · resultado esperado vs. observado · severidade sugerida · evidências a anexar · lista do que ficou faltando você informar.',
    helpTip: 'Depois de gerar, use "Continuar com este resultado ➜ Estimativa de Bug" para pontuar os story points na sequência.'
  }, {
    id: 'bug',
    title: 'Estimativa de Bug',
    chip: 'story points',
    desc: 'Cole a descrição do bug. Recebe story points Fibonacci com justificativa técnica.',
    icon: IcBug,
    file: 'estimativa-bug',
    inputLabel: 'a descrição do bug',
    placeholder: 'Cole aqui a descrição do bug: título, passos para reproduzir, comportamento esperado vs. observado, impacto.',
    helpWhat: 'Analisa a descrição de um bug e sugere os story points na escala Fibonacci (1, 2, 3, 5, 8 ou 13), avaliando escopo da correção, risco de regressão, reprodutibilidade e complexidade de investigação.',
    helpPaste: 'Título + passos para reproduzir + o que acontece vs. o que deveria acontecer + impacto no usuário ou sistema.',
    helpGet: 'Severidade classificada (crítica/alta/média/baixa) · story points prontos para o Jira · tabela com os 5 fatores avaliados · lista do que falta na descrição para estimar com mais confiança.',
    helpTip: 'Quanto mais completa a descrição, melhor a pontuação. Se colar só o título, ele devolve pedindo os detalhes — de propósito.'
  }, {
    id: 'sla',
    title: 'Análise de SLA (Acordo de Nível de Serviço)',
    chip: 'análise SLA',
    desc: 'Identifica quais cenários arriscam violar o SLA e quais bloqueiam o deploy.',
    icon: IcBolt,
    file: 'analise-sla',
    inputLabel: 'cenários + requisitos de SLA',
    placeholder: 'Cole os cenários e informe o SLA (ex: latência máx 200ms, timeout 5s, disponibilidade 99.9%). Se não souber, descreva o tipo de sistema — o Qa Assistent vai inferir.',
    helpWhat: 'SLA (Service Level Agreement, o Acordo de Nível de Serviço) é o "contrato de desempenho" do sistema: os limites que ele promete cumprir — ex.: responder em até 500ms, ficar no ar 99,9% do tempo. Este modo avalia quais cenários correm risco de estourar esses limites, porque um endpoint pode passar em todos os testes funcionais e ainda assim ser lento ou instável demais para produção.',
    helpPaste: 'Os cenários de teste + os limites acordados, se você souber (latência, disponibilidade, taxa de erro). Não sabe? Descreva o tipo de sistema e ele usa valores de referência, marcando tudo como [INFERIDO — confirmar com PO/SRE].',
    helpGet: 'Cada cenário classificado (✅ dentro do limite · ⚠️ risco · ❌ viola · ❓ precisa de teste de carga) · bloqueantes de deploy · recomendações de resiliência (retry, fallback, circuit breaker).',
    helpTip: 'Na tela do modo tem o painel "O que é SLA?" com a explicação completa de SLA, SLI, SLO e p95. E dá para salvar o SLA padrão da sua equipe nas Configurações (⚙) para não digitar toda vez.'
  }, {
    id: 'prioridade',
    title: 'Prioridade de Execução',
    chip: 'prioridade',
    desc: 'Ordena os cenários por risco e criticidade em Alta, Média e Baixa prioridade.',
    icon: IcRank,
    file: 'prioridade-execucao',
    inputLabel: 'os cenários de teste',
    placeholder: 'Cole aqui os cenários de teste que precisam ser priorizados. O Qa Assistent vai ordená-los por risco e criticidade.',
    helpWhat: 'Ordena os cenários pela conta clássica de Risk-Based Testing: Probabilidade de Falha × Impacto ao Negócio. Você executa primeiro o que tem mais chance de dar problema e que machuca mais se der.',
    helpPaste: 'Os cenários de teste — a saída do modo Cenários serve direto.',
    helpGet: 'Cenários em 🔴 Alta, 🟡 Média e 🟢 Baixa prioridade com o score justificado · dependências de execução (o que roda antes de quê) · ordem de execução recomendada.',
    helpTip: 'Salva-vidas quando o prazo aperta: se só der tempo de rodar metade dos testes, você roda a metade certa.'
  }, {
    id: 'checklist',
    title: 'Checklist de Sign-off',
    chip: 'checklist',
    desc: 'Gera checklist de qualidade pronto para o go/no-go antes do deploy.',
    icon: IcCheck2,
    file: 'checklist-signoff',
    inputLabel: 'os critérios / cenários',
    placeholder: 'Cole aqui os critérios de aceite ou os cenários de teste. O Qa Assistent vai gerar o checklist de sign-off para o deploy.',
    helpWhat: 'Gera o checklist final de qualidade — o "go/no-go" antes do deploy. Cada item é verificável (dá para marcar ✅ ou ❌ sem discussão) e os obrigatórios levam a tag [BLOQUEANTE].',
    helpPaste: 'Os critérios de aceite, os cenários de teste, ou os dois juntos.',
    helpGet: 'Checklist com execução de testes, critérios verificados, contratos de API, validação dos mocks contra o contrato real, regressão e evidências · bloqueadores de deploy · comunicados para o time.',
    helpTip: 'O item "mock validado contra o contrato real" evita a armadilha clássica: o teste passou no mock e quebrou em produção.'
  }, {
    id: 'cobertura',
    title: 'Mapa de Cobertura',
    chip: 'cobertura',
    desc: 'Compara a documentação com os cenários e aponta o que não está coberto.',
    icon: IcMap,
    file: 'mapa-cobertura',
    inputLabel: 'doc + cenários (separe com ---)',
    placeholder: 'Cole a documentação, depois uma linha com apenas "---" e em seguida os cenários de teste. O Qa Assistent vai identificar lacunas e sugerir cenários para cobri-las.',
    helpWhat: 'Cruza a documentação com os cenários já escritos e mostra o que ficou sem teste. Cada requisito recebe um status de cobertura, e as lacunas viram sugestões de cenário prontas para usar.',
    helpPaste: 'A documentação, depois uma linha contendo apenas "---", depois os cenários de teste.',
    helpGet: 'Mapa requisito por requisito (✅ coberto · ⚠️ parcial · ❌ descoberto · 🔲 ambíguo) · lacunas críticas com o risco de ir para produção sem aquele teste · cenários sugeridos para fechar cada lacuna · % de cobertura.',
    helpTip: 'Rode antes do sign-off: é a resposta objetiva para a pergunta "testamos tudo?".'
  }, {
    id: 'espec',
    title: 'Análise de Espec',
    chip: 'espec',
    desc: 'Extrai funcionalidades, comandos da API, erros principais e compara com versão anterior.',
    icon: IcSpec,
    file: 'analise-espec',
    inputLabel: 'a especificação (ou duas versões para comparação)',
    placeholder: 'Cole a especificação da feature.\n\nPara comparar com versão anterior: cole a nova versão, depois uma linha com "=== VERSÃO ANTERIOR ===" e em seguida a versão antiga.',
    helpWhat: 'Disseca uma especificação técnica e extrai tudo que o QA precisa saber: funcionalidades, endpoints com parâmetros e respostas, erros documentados — e os que faltam. Se você fornecer duas versões, ele compara e aponta o que muda nos seus testes.',
    helpPaste: 'A spec da feature. Para comparar versões: a nova, depois uma linha com "=== VERSÃO ANTERIOR ===", depois a antiga — ou use o segundo campo de upload que aparece neste modo.',
    helpGet: 'Funcionalidades numeradas (F-01…) · tabela de endpoints com autenticação e erros · erros documentados, inferidos e lacunas críticas · na comparação: 🔴 breaking changes, 🟡 ajustes, 🟢 novidades e ⚫ remoções, com o impacto em cada teste.',
    helpTip: 'A comparação de versões é ótima em release nova de API: mostra na hora quais testes quebram e quais precisam ser criados.'
  }, {
    id: 'daily',
    title: 'Resumo para a Daily',
    chip: 'daily',
    desc: 'Cole os resultados da execução. Recebe o status pronto para falar na daily.',
    icon: IcSun,
    file: 'resumo-daily',
    inputLabel: 'os resultados da execução',
    placeholder: 'Cole os resultados do dia: quais cenários passaram, quais falharam, o que está bloqueado e por quê. O Qa Assistent monta o resumo pronto para a daily.',
    helpWhat: 'Organiza os resultados da sua execução em um status report curto e objetivo — o que foi concluído, o que está bloqueado (e quem precisa agir), riscos para o prazo e próximos passos. Pronto para falar na daily ou colar no Slack/Teams.',
    helpPaste: 'Suas anotações de execução, do seu jeito: "HP-01 a HP-04 ok, CN-02 falhou com 500 (abri o QA-123), EC-01 bloqueado esperando massa do time X"...',
    helpGet: 'Status geral em 1 frase · concluído · bloqueios com impacto e responsável · riscos para o prazo · próximos passos. Curto de propósito: daily é 2 minutos.',
    helpTip: 'Cole também o total planejado ("faltam 6 de 20") que ele calcula o progresso e sinaliza risco de prazo sozinho.'
  }];

  // Agrupamento da lista de modos por etapa do fluxo de QA — só apresentação.
  // Modos fora de qualquer grupo são renderizados ao final (defensivo: um modo
  // novo esquecido aqui continua aparecendo na tela).
  const MODE_GROUPS = [{
    label: 'entender a doc',
    ids: ['resumo', 'espec']
  }, {
    label: 'planejar os testes',
    ids: ['casos', 'dados', 'cobertura']
  }, {
    label: 'organizar a execução',
    ids: ['estimativa', 'prioridade', 'sla']
  }, {
    label: 'bugs',
    ids: ['redator', 'bug']
  }, {
    label: 'entregar & comunicar',
    ids: ['checklist', 'daily']
  }];
  const ORDERED_MODES = MODE_GROUPS.flatMap(g => g.ids).map(id => MODES.find(m => m.id === id)).filter(Boolean).concat(MODES.filter(m => !MODE_GROUPS.some(g => g.ids.includes(m.id))));

  // Exemplos de um clique (botão "✨ Testar com um exemplo"): mostram na
  // prática o que cada modo espera de entrada, sem precisar de doc em mãos.
  const EX_SPEC = `Feature: autenticação de usuários via POST /auth/login.
O cliente envia email e senha no body (JSON). Com credenciais válidas o sistema retorna HTTP 200 com um token JWT no campo "token" (expira em 15 minutos).
Com senha incorreta retorna HTTP 401 com body {"error":"invalid_credentials"}.
Após 5 tentativas falhas consecutivas a conta é bloqueada por 15 minutos e o sistema passa a retornar HTTP 423.
O campo email é obrigatório e deve ter formato válido; senha é obrigatória com mínimo de 8 caracteres.
O serviço de notificação é chamado (POST /notifications) a cada bloqueio de conta.`;
  const EX_CENARIOS = `HP-01 | Login com credenciais válidas | Mock: /auth/login 200 + token | enviar POST com email e senha válidos → validar status 200 → validar campo token | HTTP 200 com token JWT
EC-01 | Senha com exatamente 8 caracteres | Mock: /auth/login 200 | enviar POST com senha de 8 chars → validar status | HTTP 200
CN-01 | Senha incorreta | Mock: /auth/login 401 | enviar POST com senha errada → validar status e body | HTTP 401 com error invalid_credentials
CN-02 | Sexta tentativa após bloqueio | Mock: /auth/login 423 | realizar 5 tentativas falhas → tentar a sexta → validar status | HTTP 423`;
  const EXAMPLES = {
    resumo: EX_SPEC,
    casos: EX_SPEC,
    dados: EX_SPEC,
    espec: EX_SPEC.replace('expira em 15 minutos', 'expira em 5 minutos') + '\n\n=== VERSÃO ANTERIOR ===\n\n' + EX_SPEC,
    cobertura: EX_SPEC + '\n\n---\n\n' + EX_CENARIOS,
    estimativa: EX_CENARIOS,
    prioridade: EX_CENARIOS,
    checklist: EX_CENARIOS,
    sla: 'SLA: latência p95 < 300ms, error rate < 1%, disponibilidade > 99,5%.\n\n' + EX_CENARIOS,
    redator: 'deu 500 no POST /orders qnd mandei quantidade negativa, era pra ser 400 com msg de validacao. testei no staging v2.3 com o mock do estoque ligado. quebra o fluxo do carrinho',
    bug: `Bug: o endpoint GET /users/{id} retorna HTTP 500 quando o id contém letras.
Esperado: HTTP 400 com mensagem de validação.
Passos: chamar GET /users/abc com token válido. Reproduz sempre.
Impacto: o app mobile quebra na tela de perfil para qualquer deep link malformado.`,
    daily: 'Executei HP-01 a HP-04, todos passaram. CN-02 falhou com 500 (abri o bug QA-123). EC-01 bloqueado esperando massa de teste do time de dados. Faltam 6 dos 15 cenários planejados para a sprint.'
  };

  // Encadeamento: para cada modo, os próximos passos naturais do fluxo de QA.
  // O resultado atual vira a entrada do modo alvo com um clique.
  const CHAINS = {
    resumo: ['casos', 'dados'],
    casos: ['estimativa', 'prioridade', 'sla', 'cobertura', 'checklist'],
    dados: [],
    estimativa: ['prioridade'],
    redator: ['bug'],
    bug: [],
    sla: ['checklist'],
    prioridade: ['checklist'],
    checklist: [],
    cobertura: ['casos'],
    espec: ['resumo', 'casos', 'dados'],
    daily: []
  };
  marked.setOptions({
    gfm: true,
    breaks: false
  });

  // Markdown → HTML sanitizado (DOMPurify vendorado). A resposta do modelo
  // nunca vira HTML executável no DOM — proteção contra prompt injection que
  // induza o modelo a emitir <script>/<img onerror> na análise.
  const mdToHtml = md => DOMPurify.sanitize(marked.parse(md));

  // Truncamento inteligente (espelha o backend): preserva início e FIM do
  // documento — em spec real, critérios e erros costumam estar no final.
  function smartTruncate(text, max) {
    if (!text || text.length <= max) return text;
    const head = Math.floor(max * 0.6);
    const tail = max - head;
    return text.slice(0, head) + '\n\n[... AVISO: trecho intermediário omitido — documento excede ' + max.toLocaleString('pt-BR') + ' caracteres. Início e fim foram preservados. ...]\n\n' + text.slice(-tail);
  }

  /* ---------------- pdf ---------------- */
  async function extractPdf(file) {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
      data: buf
    }).promise;
    let out = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const tc = await page.getTextContent();
      let last = 0,
        line = '';
      tc.items.forEach(it => {
        const y = it.transform[5];
        if (last && Math.abs(y - last) > 4) {
          out += line.trim() + '\n';
          line = '';
        }
        line += it.str + ' ';
        last = y;
      });
      out += line.trim() + '\n\n';
    }
    return out.replace(/\n{3,}/g, '\n\n').trim();
  }

  /* ---------------- export Jira ---------------- */
  const TABLE_SEP = /^\s*\|(\s*:?-{2,}:?\s*\|)+\s*$/;
  function splitTableRow(line) {
    return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  }

  // Converte o markdown do resultado para Jira wiki markup (campos de descrição,
  // comentários e painéis do Jira Server/DC — e colável no editor do Cloud).
  function mdToJira(md) {
    const jiraInline = s => s.replace(/\*\*(.+?)\*\*/g, '*$1*').replace(/`([^`]+)`/g, '{{$1}}');
    const src = md.split('\n');
    const out = [];
    let inCode = false;
    for (let i = 0; i < src.length; i++) {
      const line = src[i];
      if (/^\s*```/.test(line)) {
        out.push('{code}');
        inCode = !inCode;
        continue;
      }
      if (inCode) {
        out.push(line);
        continue;
      }
      if (TABLE_SEP.test(line)) continue;
      if (/^\s*\|/.test(line)) {
        const cells = splitTableRow(line).map(jiraInline);
        const isHeader = i + 1 < src.length && TABLE_SEP.test(src[i + 1]);
        out.push(isHeader ? '||' + cells.join('||') + '||' : '|' + cells.join('|') + '|');
        continue;
      }
      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        out.push('h' + heading[1].length + '. ' + jiraInline(heading[2]));
        continue;
      }
      if (/^\s*-{3,}\s*$/.test(line)) {
        out.push('----');
        continue;
      }
      out.push(jiraInline(line.replace(/^\s*[-*]\s+\[[ xX]\]\s+/, '* ').replace(/^\s*[-*]\s+/, '* ').replace(/^\s*\d+\.\s+/, '# ')));
    }
    return out.join('\n');
  }

  // Extrai todas as tabelas markdown do resultado para CSV (importável no Jira
  // e abrível no Excel). Tabelas com o mesmo cabeçalho são agrupadas, com a
  // coluna "Seção" indicando de qual bloco (### título) cada linha veio.
  function tablesToCsv(md) {
    const esc = v => '"' + String(v).replace(/\*\*/g, '').replace(/"/g, '""') + '"';
    const lines = md.split('\n');
    let section = '';
    let header = null;
    const groups = new Map(); // header.join -> { header, rows }
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const h = line.match(/^#{2,4}\s+(.*)$/);
      if (h) {
        section = h[1].replace(/[*_`#]/g, '').trim();
        header = null;
        continue;
      }
      if (!/^\s*\|/.test(line)) {
        header = null;
        continue;
      }
      if (TABLE_SEP.test(line)) continue;
      const cells = splitTableRow(line);
      const isHeader = i + 1 < lines.length && TABLE_SEP.test(lines[i + 1]);
      if (isHeader) {
        header = cells;
        const key = cells.join('');
        if (!groups.has(key)) groups.set(key, {
          header: cells,
          rows: []
        });
        continue;
      }
      if (!header) continue;
      groups.get(header.join('')).rows.push({
        section,
        cells
      });
    }
    const blocks = [];
    for (const g of groups.values()) {
      if (g.rows.length === 0) continue;
      const block = [['Seção', ...g.header].map(esc).join(',')];
      for (const r of g.rows) block.push([r.section, ...r.cells].map(esc).join(','));
      blocks.push(block.join('\n'));
    }
    // \uFEFF = BOM para o Excel abrir o UTF-8 corretamente
    return blocks.length ? '\uFEFF' + blocks.join('\n\n') : '';
  }

  /* ---------------- streaming ---------------- */
  // Lê uma resposta NDJSON (uma linha JSON por evento) chamando onEvent para cada linha.
  async function readNdjson(res, onEvent) {
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    for (;;) {
      const {
        done,
        value
      } = await reader.read();
      if (done) break;
      buf += dec.decode(value, {
        stream: true
      });
      let nl;
      while ((nl = buf.indexOf('\n')) !== -1) {
        const line = buf.slice(0, nl);
        buf = buf.slice(nl + 1);
        if (line.trim()) onEvent(JSON.parse(line));
      }
    }
    if (buf.trim()) onEvent(JSON.parse(buf));
  }

  /* ---------------- app ---------------- */
  const {
    useState,
    useRef,
    useEffect,
    useCallback
  } = React;

  // Modal acessível: role=dialog, foco inicial no container e Tab preso dentro
  // (focus trap). Esc é tratado globalmente no App.
  function Modal({
    title,
    titleExtra,
    onClose,
    className,
    bodyClassName,
    children
  }) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) ref.current.focus();
    }, []);
    const trapTab = e => {
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = ref.current.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select, [tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "help-overlay",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: 'help-modal' + (className ? ' ' + className : ''),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title,
      ref: ref,
      tabIndex: -1,
      onClick: e => e.stopPropagation(),
      onKeyDown: trapTab
    }, /*#__PURE__*/React.createElement("div", {
      className: "help-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "help-title-wrap"
    }, titleExtra, /*#__PURE__*/React.createElement("h2", null, title)), /*#__PURE__*/React.createElement("button", {
      className: "help-close",
      onClick: onClose,
      "aria-label": "Fechar janela"
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: 'help-body' + (bodyClassName ? ' ' + bodyClassName : '')
    }, children)));
  }

  // Campo numérico com stepper próprio (substitui as setinhas padrão do navegador)
  function NumberStepper({
    value,
    min,
    max,
    step,
    suffix,
    onChange
  }) {
    const num = Number(value) || 0;
    const clamp = v => Math.min(max, Math.max(min, Math.round(v * 100) / 100));
    return /*#__PURE__*/React.createElement("div", {
      className: "stepper"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "stepper-btn",
      onClick: () => onChange(clamp(num - step)),
      title: "Diminuir"
    }, "\u2212"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: value,
      min: min,
      max: max,
      step: step,
      onChange: e => onChange(e.target.value)
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "stepper-btn",
      onClick: () => onChange(clamp(num + step)),
      title: "Aumentar"
    }, "+"), suffix && /*#__PURE__*/React.createElement("span", {
      className: "stepper-suffix"
    }, suffix));
  }

  // Explicação de SLA exibida na tela do modo Análise de SLA
  function SlaExplainer() {
    const [open, setOpen] = useState(false);
    return /*#__PURE__*/React.createElement("div", {
      className: 'sla-info' + (open ? ' open' : '')
    }, /*#__PURE__*/React.createElement("button", {
      className: "sla-toggle",
      onClick: () => setOpen(!open)
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1 O que \xE9 SLA (Acordo de N\xEDvel de Servi\xE7o)? \u2014 entenda antes de usar"), /*#__PURE__*/React.createElement("span", {
      className: "sla-arrow"
    }, open ? '▴' : '▾')), open && /*#__PURE__*/React.createElement("div", {
      className: "sla-body"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "SLA (Service Level Agreement)"), " \xE9 o ", /*#__PURE__*/React.createElement("em", null, "contrato de desempenho"), " do sistema: os limites que ele promete cumprir \u2014 ex.: responder em at\xE9 500ms, ficar no ar 99,9% do tempo, ter menos de 1% de requisi\xE7\xF5es com erro. Um endpoint pode passar em ", /*#__PURE__*/React.createElement("strong", null, "todos"), " os testes funcionais e mesmo assim violar o SLA em produ\xE7\xE3o (lento demais ou inst\xE1vel sob carga) \u2014 este modo levanta essa bandeira ", /*#__PURE__*/React.createElement("strong", null, "antes do deploy"), "."), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "SLI"), " (Indicator) \u2014 a m\xE9trica ", /*#__PURE__*/React.createElement("em", null, "medida"), ": a lat\xEAncia real, o error rate real. \xC9 o term\xF4metro."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "SLO"), " (Objective) \u2014 a ", /*#__PURE__*/React.createElement("em", null, "meta interna"), " do time: \"queremos p95 < 200ms\"."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "SLA"), " (Agreement) \u2014 o ", /*#__PURE__*/React.createElement("em", null, "compromisso formal"), ", com cliente ou entre times.")), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "p95 / p99"), " = percentil: \"p95 < 500ms\" significa que 95% das requisi\xE7\xF5es respondem em menos de 500ms. \xC9 mais honesto que a m\xE9dia, porque a m\xE9dia esconde os casos lentos."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Como usar:"), " cole os cen\xE1rios e informe os limites acordados. Se n\xE3o souber o SLA, descreva o tipo de sistema \u2014 o Qa Assistent infere pelos valores de refer\xEAncia abaixo e marca tudo como ", /*#__PURE__*/React.createElement("em", null, "[INFERIDO \u2014 confirmar com PO/SRE antes de usar]"), "."), /*#__PURE__*/React.createElement("table", {
      className: "sla-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Tipo de sistema"), /*#__PURE__*/React.createElement("th", null, "Lat\xEAncia p95"), /*#__PURE__*/React.createElement("th", null, "Error rate"), /*#__PURE__*/React.createElement("th", null, "Disponibilidade"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "API REST p\xFAblica / usu\xE1rio final"), /*#__PURE__*/React.createElement("td", null, "< 500ms"), /*#__PURE__*/React.createElement("td", null, "< 1%"), /*#__PURE__*/React.createElement("td", null, "> 99,5%")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "API interna s\xEDncrona"), /*#__PURE__*/React.createElement("td", null, "< 200ms"), /*#__PURE__*/React.createElement("td", null, "< 0,5%"), /*#__PURE__*/React.createElement("td", null, "> 99,9%")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "API de background / batch"), /*#__PURE__*/React.createElement("td", null, "\u2014"), /*#__PURE__*/React.createElement("td", null, "< 2%"), /*#__PURE__*/React.createElement("td", null, "> 99%")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Protocolo de rede em tempo real"), /*#__PURE__*/React.createElement("td", null, "< 50ms"), /*#__PURE__*/React.createElement("td", null, "< 0,1%"), /*#__PURE__*/React.createElement("td", null, "> 99,99%")))), /*#__PURE__*/React.createElement("p", {
      className: "sla-note"
    }, "O resultado classifica cada cen\xE1rio \u2014 \u2705 dentro do SLA \xB7 \u26A0\uFE0F risco de viola\xE7\xE3o \xB7 \u274C viola \xB7 \u2753 n\xE3o verific\xE1vel sem carga real \u2014 e lista os bloqueantes de deploy.")));
  }
  function App() {
    const [mode, setMode] = useState(() => localStorage.getItem('qa_assistent_mode') || 'resumo');
    const [doc, setDoc] = useState(() => localStorage.getItem('qa_assistent_doc') || '');
    const [fileName, setFileName] = useState('');
    const [reading, setReading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState('');
    // modo que GEROU o resultado atual: chat, revisão, chip e exports usam
    // este — trocar de modo depois de gerar não mistura os contextos
    const [resultMode, setResultMode] = useState('');
    const [error, setError] = useState('');
    const [over, setOver] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedJira, setCopiedJira] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState(() => {
      const defaults = {
        dailyHours: 5,
        overheadPct: 15,
        slaDefaults: ''
      };
      try {
        return {
          ...defaults,
          ...(JSON.parse(localStorage.getItem('qa_assistent_settings')) || {})
        };
      } catch (e) {
        return defaults;
      }
    });
    const [history, setHistory] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('qa_assistent_history')) || [];
      } catch (e) {
        return [];
      }
    });
    const [showIntro, setShowIntro] = useState(true);
    const [rawFile, setRawFile] = useState(null);
    const [rawFileOld, setRawFileOld] = useState(null);
    const [fileNameOld, setFileNameOld] = useState('');
    const [overOld, setOverOld] = useState(false);
    const [chatTurns, setChatTurns] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [chatBusy, setChatBusy] = useState(false);
    const [reviewBusy, setReviewBusy] = useState(false);
    const [docContext, setDocContext] = useState('');
    const [histQuery, setHistQuery] = useState('');
    const fileInput = useRef(null);
    const fileInputOld = useRef(null);
    const chatEndRef = useRef(null);
    const docRef = useRef(null);
    const histImportRef = useRef(null);
    useEffect(() => {
      const t = setTimeout(() => setShowIntro(false), 3600);
      return () => clearTimeout(t);
    }, []);

    // Esc fecha qualquer janela aberta (ajuda, histórico, configurações)
    useEffect(() => {
      const onKey = e => {
        if (e.key === 'Escape') {
          setShowHelp(false);
          setShowHistory(false);
          setShowSettings(false);
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Mascote: robô construído com formas simples + CSS.
    const Mascot = ({
      size,
      state
    }) => /*#__PURE__*/React.createElement("div", {
      className: "robot-wrap",
      "data-state": state,
      style: {
        '--rs': size + 'px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "robot-antenna"
    }), /*#__PURE__*/React.createElement("div", {
      className: "robot-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "robot-face"
    }, /*#__PURE__*/React.createElement("span", {
      className: "robot-eye left"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-eye right"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-mouth"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "robot-arm left"
    }), /*#__PURE__*/React.createElement("div", {
      className: "robot-arm right"
    }), /*#__PURE__*/React.createElement("div", {
      className: "robot-body"
    }), /*#__PURE__*/React.createElement("div", {
      className: "robot-core"
    }));
    useEffect(() => {
      localStorage.setItem('qa_assistent_mode', mode);
    }, [mode]);
    useEffect(() => {
      localStorage.setItem('qa_assistent_doc', doc);
    }, [doc]);
    useEffect(() => {
      if (chatEndRef.current) chatEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, [chatTurns.length, chatBusy]);
    const activeMode = MODES.find(m => m.id === mode);
    // rótulos/arquivos do resultado seguem o modo que o gerou (fallback: o atual)
    const resultModeObj = result && MODES.find(m => m.id === resultMode) || activeMode;
    const handleFile = useCallback(async file => {
      if (!file) return;
      setError('');
      const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      const isDocx = /\.docx$/i.test(file.name) || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (isPdf) {
        setReading(true);
        setFileName(file.name);
        setRawFile(null);
        try {
          const text = await extractPdf(file);
          if (!text) throw new Error('vazio');
          setDoc(text);
        } catch (e) {
          setError('Não consegui ler esse PDF (pode ser digitalizado/imagem). Tente colar o texto direto.');
          setFileName('');
        }
        setReading(false);
      } else if (isDocx) {
        setFileName(file.name);
        setRawFile(file);
        setDoc('');
      } else if (/\.(txt|md|markdown)$/i.test(file.name) || file.type.startsWith('text')) {
        setFileName(file.name);
        setRawFile(null);
        setDoc(await file.text());
      } else {
        setError('Formato não suportado. Use PDF, Word (.docx), TXT ou MD — ou cole o texto.');
      }
    }, []);
    const handleFileOld = useCallback(async file => {
      if (!file) return;
      setError('');
      const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      const isDocx = /\.docx$/i.test(file.name) || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (isPdf) {
        setFileNameOld(file.name);
        setRawFileOld(null);
        try {
          const text = await extractPdf(file);
          if (!text) throw new Error('vazio');
          setRawFileOld({
            _pdfText: text,
            name: file.name
          });
        } catch (e) {
          setError('Versão anterior: não consegui ler esse PDF. Tente colar o texto com o separador.');
          setFileNameOld('');
        }
      } else if (isDocx) {
        setFileNameOld(file.name);
        setRawFileOld(file);
      } else if (/\.(txt|md|markdown)$/i.test(file.name) || file.type.startsWith('text')) {
        setFileNameOld(file.name);
        const text = await file.text();
        setRawFileOld({
          _pdfText: text,
          name: file.name
        });
      } else {
        setError('Versão anterior: formato não suportado. Use PDF, Word (.docx) ou TXT.');
      }
    }, []);
    const onDrop = useCallback(e => {
      e.preventDefault();
      setOver(false);
      const f = e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) handleFile(f);
    }, [handleFile]);
    async function generate() {
      if (!doc.trim() && !rawFile || busy) return;
      setBusy(true);
      setError('');
      setResult('');
      setResultMode(mode);
      setChatTurns([]);
      setDocContext('');
      try {
        const form = new FormData();
        form.append('mode', mode);
        if (rawFile) {
          form.append('file', rawFile);
        } else {
          // o prefixo entra DENTRO do limite de 50k — somado depois, o backend
          // re-truncaria um texto já truncado (dois marcadores de omissão)
          const prefix = settingsPrefix();
          form.append('text', prefix + smartTruncate(doc, 50000 - prefix.length));
        }
        if (mode === 'espec' && rawFileOld) {
          if (rawFileOld._pdfText) {
            form.append('textOld', smartTruncate(rawFileOld._pdfText, 50000));
          } else {
            form.append('fileOld', rawFileOld);
          }
        }
        const res = await fetch('/api/analyze', {
          method: 'POST',
          body: form
        });
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('ndjson')) {
          // erro de validação (o backend responde JSON antes do streaming começar)
          const data = await res.json();
          throw new Error(data.error || 'Erro desconhecido');
        }
        let acc = '';
        let context = '';
        let streamError = '';
        await readNdjson(res, ev => {
          if (ev.type === 'context') {
            context = ev.text;
            setDocContext(ev.text);
          } else if (ev.type === 'delta') {
            acc += ev.text;
            setResult(acc);
          } else if (ev.type === 'error') {
            streamError = ev.message || 'Erro desconhecido';
          }
        });
        if (streamError) {
          // erro no meio do stream: preserva o que já foi gerado com um aviso
          // no final, em vez de descartar o parcial (não entra no histórico)
          if (!acc) throw new Error(streamError);
          acc += '\n\n---\n⚠️ **Geração interrompida:** ' + streamError + ' — o resultado acima está incompleto.';
          setResult(acc);
        } else {
          const savedDoc = context || (rawFile ? '' : doc.slice(0, 30000));
          setChatTurns([]);
          pushHistory({
            id: Date.now(),
            ts: Date.now(),
            mode,
            // primeira linha com conteúdo vira o título — pulando a linha de
            // parâmetros que settingsPrefix() injeta (estimativa/sla)
            title: (savedDoc.split('\n').find(l => l.trim() && !/^(PARÂMETROS DO USUÁRIO|SLA PADRÃO DA EQUIPE)/.test(l.trim())) || 'Sem título').trim().slice(0, 90),
            doc: savedDoc,
            result: acc,
            context
          });
        }
      } catch (e) {
        setResult('');
        setError('Algo deu errado: ' + e.message);
      }
      setBusy(false);
    }
    async function sendChat() {
      if (!chatInput.trim() || chatBusy) return;
      const question = chatInput.trim();
      setChatInput('');
      setChatBusy(true);
      const messages = [{
        role: 'user',
        content: 'CONTEXTO:\n' + (docContext || 'Análise já realizada — responda com base no histórico.')
      }, {
        role: 'assistant',
        content: result
      }, ...chatTurns.flatMap(t => [{
        role: 'user',
        content: t.question
      }, {
        role: 'assistant',
        content: t.answer
      }]), {
        role: 'user',
        content: question
      }];
      let started = false;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mode: resultMode || mode,
            messages
          })
        });
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('ndjson')) {
          const data = await res.json();
          throw new Error(data.error || 'Erro desconhecido');
        }
        // adiciona o turno vazio e vai preenchendo a resposta conforme chega
        setChatTurns(prev => [...prev, {
          question,
          answer: ''
        }]);
        started = true;
        let acc = '';
        let streamError = '';
        await readNdjson(res, ev => {
          if (ev.type === 'delta') {
            acc += ev.text;
            const answer = acc;
            setChatTurns(prev => {
              const copy = prev.slice();
              copy[copy.length - 1] = {
                question,
                answer
              };
              return copy;
            });
          } else if (ev.type === 'error') {
            streamError = ev.message || 'Erro desconhecido';
          }
        });
        if (streamError) {
          // erro no meio do stream: preserva a resposta parcial com aviso
          if (!acc) throw new Error(streamError);
          const answer = acc + '\n\n⚠️ **Resposta interrompida:** ' + streamError;
          setChatTurns(prev => [...prev.slice(0, -1), {
            question,
            answer
          }]);
        }
      } catch (e) {
        const errTurn = {
          question,
          answer: '⚠ Erro: ' + e.message
        };
        setChatTurns(prev => started ? [...prev.slice(0, -1), errTurn] : [...prev, errTurn]);
      }
      setChatBusy(false);
    }

    // Segunda passada: revisora crítica audita a análise contra o documento.
    // Consome uma chamada extra de API — por isso é opcional, sob demanda.
    async function runReview() {
      if (!result || reviewBusy || chatBusy) return;
      setReviewBusy(true);
      const question = '🔍 Revisão crítica da análise (segunda passada)';
      setChatTurns(prev => [...prev, {
        question,
        answer: ''
      }]);
      try {
        const res = await fetch('/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mode: resultMode || mode,
            document: docContext,
            result
          })
        });
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('ndjson')) {
          const data = await res.json();
          throw new Error(data.error || 'Erro desconhecido');
        }
        let acc = '';
        let streamError = '';
        await readNdjson(res, ev => {
          if (ev.type === 'delta') {
            acc += ev.text;
            const answer = acc;
            setChatTurns(prev => {
              const copy = prev.slice();
              copy[copy.length - 1] = {
                question,
                answer
              };
              return copy;
            });
          } else if (ev.type === 'error') {
            streamError = ev.message || 'Erro desconhecido';
          }
        });
        if (streamError) {
          // erro no meio do stream: preserva a revisão parcial com aviso
          if (!acc) throw new Error(streamError);
          const answer = acc + '\n\n⚠️ **Revisão interrompida:** ' + streamError;
          setChatTurns(prev => [...prev.slice(0, -1), {
            question,
            answer
          }]);
        }
      } catch (e) {
        setChatTurns(prev => [...prev.slice(0, -1), {
          question,
          answer: '⚠ Erro: ' + e.message
        }]);
      }
      setReviewBusy(false);
    }
    function copyOut() {
      navigator.clipboard.writeText(result).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
    }
    function downloadOut() {
      const blob = new Blob([result], {
        type: 'text/markdown;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `qa-assistent-${resultModeObj.file}-${stamp}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    function copyJira() {
      navigator.clipboard.writeText(mdToJira(result)).then(() => {
        setCopiedJira(true);
        setTimeout(() => setCopiedJira(false), 1600);
      });
    }
    function downloadCsv() {
      const csv = tablesToCsv(result);
      if (!csv) return;
      const blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `qa-assistent-${resultModeObj.file}-tabelas-${stamp}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    function clearFile() {
      setFileName('');
      setRawFile(null);
    }
    function saveSettings(next) {
      setSettings(next);
      try {
        localStorage.setItem('qa_assistent_settings', JSON.stringify(next));
      } catch (e) {}
    }

    // Linha de parâmetros injetada no texto enviado, quando o modo os utiliza.
    // Os prompts já instruem o modelo a usar valores fornecidos pelo usuário.
    function settingsPrefix() {
      const hours = Number(settings.dailyHours) > 0 ? Number(settings.dailyHours) : 5;
      const overhead = Number(settings.overheadPct) >= 0 ? Number(settings.overheadPct) : 15;
      if (mode === 'estimativa' && (hours !== 5 || overhead !== 15)) {
        return `PARÂMETROS DO USUÁRIO: capacidade diária = ${hours}h efetivas; overhead operacional = ${overhead}%.\n\n`;
      }
      if (mode === 'sla' && settings.slaDefaults.trim()) {
        return `SLA PADRÃO DA EQUIPE (fornecido pelo usuário — usar no lugar da tabela de referência): ${settings.slaDefaults.trim()}\n\n`;
      }
      return '';
    }

    /* ---------------- histórico ---------------- */
    const HISTORY_MAX = 20;
    function persistHistory(updater) {
      setHistory(prev => {
        const next = updater(prev);
        try {
          localStorage.setItem('qa_assistent_history', JSON.stringify(next));
        } catch (e) {
          // storage cheio: descarta as entradas mais antigas e tenta de novo
          try {
            localStorage.setItem('qa_assistent_history', JSON.stringify(next.slice(0, 5)));
          } catch (e2) {}
        }
        return next;
      });
    }
    function pushHistory(entry) {
      persistHistory(prev => [entry, ...prev].slice(0, HISTORY_MAX));
    }
    function deleteHistory(id) {
      persistHistory(prev => prev.filter(h => h.id !== id));
    }
    function clearHistory() {
      persistHistory(() => []);
    }
    function exportHistory() {
      const blob = new Blob([JSON.stringify(history, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qa-assistent-historico-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
    function importHistory(file) {
      if (!file) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const imported = JSON.parse(r.result);
          if (!Array.isArray(imported)) throw new Error('formato inválido');
          const valid = imported.filter(h => h && h.id && h.mode && typeof h.result === 'string');
          if (!valid.length) throw new Error('nenhuma análise válida no arquivo');
          persistHistory(prev => {
            const ids = new Set(prev.map(h => h.id));
            const merged = [...prev, ...valid.filter(h => !ids.has(h.id))];
            merged.sort((a, b) => (b.ts || 0) - (a.ts || 0));
            return merged.slice(0, HISTORY_MAX);
          });
        } catch (e) {
          setError('Não consegui importar o histórico: ' + e.message);
          setShowHistory(false);
        }
      };
      r.readAsText(file);
    }
    const histFiltered = histQuery.trim() ? history.filter(h => {
      const q = histQuery.toLowerCase();
      const m = MODES.find(mm => mm.id === h.mode);
      return (h.title || '').toLowerCase().includes(q) || (m ? m.title + ' ' + m.chip : h.mode).toLowerCase().includes(q);
    }) : history;
    function restoreHistory(h) {
      setMode(h.mode);
      setDoc(h.doc || '');
      setResult(h.result || '');
      setResultMode(h.mode);
      setDocContext(h.context || '');
      setChatTurns([]);
      setError('');
      setRawFile(null);
      setFileName('');
      setShowHistory(false);
    }

    // Leva o resultado atual como entrada do próximo modo.
    // - cobertura: compõe documentação original + separador + cenários gerados.
    //   Usa direto o separador oficial do prompt ("=== CENÁRIOS ==="), e não o
    //   "---" da convenção manual — imune a linhas "---" no meio do documento
    // - estimativa/prioridade/sla/checklist: anexa a doc original como contexto
    //   de referência, para o modelo calibrar complexidade sem perder a feature
    function chainTo(targetId) {
      let text;
      if (targetId === 'cobertura' && docContext) {
        text = docContext + '\n\n=== CENÁRIOS ===\n\n' + result;
      } else if (['estimativa', 'prioridade', 'sla', 'checklist'].includes(targetId) && docContext) {
        text = result + '\n\n=== DOCUMENTAÇÃO DE REFERÊNCIA (contexto da feature) ===\n\n' + docContext;
      } else {
        text = result;
      }
      setMode(targetId);
      setDoc(text);
      setRawFile(null);
      setFileName('');
      setRawFileOld(null);
      setFileNameOld('');
      setResult('');
      setChatTurns([]);
      setDocContext('');
      setError('');
      // leva a usuária de volta ao campo de entrada, já focado
      setTimeout(() => {
        if (docRef.current) {
          docRef.current.focus();
          docRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 60);
    }
    function resetAll() {
      setDoc('');
      clearFile();
      setRawFileOld(null);
      setFileNameOld('');
      setResult('');
      setChatTurns([]);
      setDocContext('');
      setError('');
      setTimeout(() => docRef.current && docRef.current.focus(), 60);
    }
    const canGen = (doc.trim().length > 0 || rawFile !== null) && !busy && !reading;
    const hasTable = result !== '' && result.split('\n').some(l => TABLE_SEP.test(l));
    return /*#__PURE__*/React.createElement("div", {
      className: "app"
    }, showIntro && /*#__PURE__*/React.createElement("div", {
      className: "intro-overlay",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "intro-stage"
    }, /*#__PURE__*/React.createElement("svg", {
      className: "intro-word",
      viewBox: "0 0 620 260"
    }, /*#__PURE__*/React.createElement("text", {
      x: "50%",
      y: "55%",
      textAnchor: "middle"
    }, "Ol\xE1")), /*#__PURE__*/React.createElement("span", {
      className: "intro-spark one"
    }), /*#__PURE__*/React.createElement("span", {
      className: "intro-spark two"
    }), /*#__PURE__*/React.createElement("span", {
      className: "intro-spark three"
    }), /*#__PURE__*/React.createElement("span", {
      className: "drone a"
    }, /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
      className: "drone b"
    }, /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
      className: "drone c"
    }, /*#__PURE__*/React.createElement("i", null)))), /*#__PURE__*/React.createElement("header", {
      className: "topbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-robot",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "robot-antenna"
    }), /*#__PURE__*/React.createElement("div", {
      className: "robot-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "robot-face"
    }, /*#__PURE__*/React.createElement("span", {
      className: "robot-eye left"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-eye right"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-mouth"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "robot-body"
    }), /*#__PURE__*/React.createElement("div", {
      className: "robot-core"
    })), /*#__PURE__*/React.createElement("div", {
      className: "brand-text"
    }, /*#__PURE__*/React.createElement("div", {
      className: "brand-name"
    }, "Qa Assistent", /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, ".")), /*#__PURE__*/React.createElement("div", {
      className: "brand-tag"
    }, "Assistente de QA \xB7 Leitura & Planejamento")), /*#__PURE__*/React.createElement("div", {
      className: "topbar-spacer"
    }), /*#__PURE__*/React.createElement("button", {
      className: "hist-btn",
      onClick: () => setShowSettings(true),
      title: "Configura\xE7\xF5es (capacidade, overhead, SLA padr\xE3o)",
      "aria-label": "Configura\xE7\xF5es"
    }, "\u2699"), /*#__PURE__*/React.createElement("button", {
      className: "hist-btn",
      onClick: () => {
        setHistQuery('');
        setShowHistory(true);
      },
      title: "An\xE1lises anteriores"
    }, "\uD83D\uDD58 Hist\xF3rico", history.length > 0 && /*#__PURE__*/React.createElement("span", {
      className: "hist-count"
    }, history.length)), /*#__PURE__*/React.createElement("button", {
      className: "help-btn",
      onClick: () => setShowHelp(true),
      title: "Como usar o Qa Assistent"
    }, /*#__PURE__*/React.createElement("span", {
      className: "nav-robot help-btn-robot",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("span", {
      className: "robot-antenna"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "robot-face"
    }, /*#__PURE__*/React.createElement("span", {
      className: "robot-eye left"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-eye right"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-mouth"
    }))), /*#__PURE__*/React.createElement("span", {
      className: "robot-body"
    }), /*#__PURE__*/React.createElement("span", {
      className: "robot-core"
    })), "Ajuda"), /*#__PURE__*/React.createElement("div", {
      className: 'status-pill' + (busy || reading ? ' busy' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: "led"
    }), reading ? 'Lendo documento…' : busy ? 'Pensando…' : 'Pronta')), /*#__PURE__*/React.createElement("div", {
      className: "main"
    }, /*#__PURE__*/React.createElement("section", {
      className: "panel input"
    }, /*#__PURE__*/React.createElement("div", {
      className: "panel-scroll"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "section-label"
    }, "01 \xB7 o que voc\xEA precisa"), /*#__PURE__*/React.createElement("div", {
      className: "modes"
    }, MODE_GROUPS.map(g => /*#__PURE__*/React.createElement(React.Fragment, {
      key: g.label
    }, /*#__PURE__*/React.createElement("div", {
      className: "mode-group"
    }, g.label), g.ids.map(id => MODES.find(mm => mm.id === id)).filter(Boolean).map(m => {
      const Ic = m.icon;
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'mode' + (mode === m.id ? ' active' : ''),
        onClick: () => setMode(m.id),
        "aria-pressed": mode === m.id
      }, /*#__PURE__*/React.createElement("span", {
        className: "mode-ic"
      }, /*#__PURE__*/React.createElement(Ic, null)), /*#__PURE__*/React.createElement("span", {
        className: "mode-body"
      }, /*#__PURE__*/React.createElement("span", {
        className: "mode-title"
      }, m.title), /*#__PURE__*/React.createElement("span", {
        className: "mode-desc"
      }, m.desc)));
    }))), MODES.filter(m => !MODE_GROUPS.some(g => g.ids.includes(m.id))).map(m => {
      const Ic = m.icon;
      return /*#__PURE__*/React.createElement("button", {
        key: m.id,
        className: 'mode' + (mode === m.id ? ' active' : ''),
        onClick: () => setMode(m.id),
        "aria-pressed": mode === m.id
      }, /*#__PURE__*/React.createElement("span", {
        className: "mode-ic"
      }, /*#__PURE__*/React.createElement(Ic, null)), /*#__PURE__*/React.createElement("span", {
        className: "mode-body"
      }, /*#__PURE__*/React.createElement("span", {
        className: "mode-title"
      }, m.title), /*#__PURE__*/React.createElement("span", {
        className: "mode-desc"
      }, m.desc)));
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "input-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-label",
      style: {
        marginBottom: 0
      }
    }, '02 · ' + (activeMode.inputLabel || 'a documentação')), !doc.trim() && !rawFile ? /*#__PURE__*/React.createElement("button", {
      className: "example-btn",
      onClick: () => {
        setDoc(EXAMPLES[mode] || '');
        setTimeout(() => docRef.current && docRef.current.focus(), 30);
      },
      title: "Preenche o campo com um exemplo pronto deste modo \u2014 bom para conhecer o que ele faz antes de usar com sua doc"
    }, "\u2728 Testar com um exemplo") : /*#__PURE__*/React.createElement("span", {
      className: "charcount"
    }, doc.length.toLocaleString('pt-BR') + ' ch · ~' + Math.ceil(doc.length / 4).toLocaleString('pt-BR') + ' tk', doc.length > 50000 ? /*#__PURE__*/React.createElement("span", {
      className: "token-warn"
    }, " \u2702 acima de 50 mil \u2014 envia in\xEDcio+fim") : doc.length > 28000 ? /*#__PURE__*/React.createElement("span", {
      className: "token-warn"
    }, " \u26A0 doc grande") : null)), mode === 'sla' && /*#__PURE__*/React.createElement(SlaExplainer, null), /*#__PURE__*/React.createElement("div", {
      className: "textwrap"
    }, /*#__PURE__*/React.createElement("textarea", {
      ref: docRef,
      className: "doc",
      "aria-label": 'Entrada da análise: ' + (activeMode.inputLabel || 'a documentação'),
      placeholder: activeMode.placeholder,
      value: doc,
      onChange: e => setDoc(e.target.value),
      onKeyDown: e => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          generate();
        }
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: 'dropzone' + (over ? ' over' : '') + (fileName ? ' has' : ''),
      onClick: () => fileInput.current && fileInput.current.click(),
      onDragOver: e => {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop: onDrop
    }, /*#__PURE__*/React.createElement("span", {
      className: "dz-ic"
    }, /*#__PURE__*/React.createElement(IcDoc, null)), /*#__PURE__*/React.createElement("span", {
      className: "dz-text"
    }, reading ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Lendo PDF\u2026"), " ", /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "Extraindo texto")) : fileName ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, fileName), " ", /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, rawFile ? '· Word carregado — Pronto para gerar' : '· Texto carregado no campo acima')) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Soltar arquivo aqui"), " ", /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "Ou clique para escolher \xB7 PDF, DOCX, TXT, MD"))), fileName && !reading && /*#__PURE__*/React.createElement("button", {
      className: "dz-clear",
      onClick: e => {
        e.stopPropagation();
        clearFile();
      }
    }, "Limpar"), /*#__PURE__*/React.createElement("input", {
      ref: fileInput,
      type: "file",
      accept: ".pdf,.docx,.txt,.md,.markdown,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      style: {
        display: 'none'
      },
      onChange: e => {
        handleFile(e.target.files[0]);
        e.target.value = '';
      }
    })), mode === 'espec' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-label",
      style: {
        marginBottom: 8
      }
    }, "Vers\xE3o anterior \xB7 opcional (para compara\xE7\xE3o)"), /*#__PURE__*/React.createElement("div", {
      className: 'dropzone' + (overOld ? ' over' : '') + (fileNameOld ? ' has' : ''),
      onClick: () => fileInputOld.current && fileInputOld.current.click(),
      onDragOver: e => {
        e.preventDefault();
        setOverOld(true);
      },
      onDragLeave: () => setOverOld(false),
      onDrop: e => {
        e.preventDefault();
        setOverOld(false);
        const f = e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) handleFileOld(f);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dz-ic"
    }, /*#__PURE__*/React.createElement(IcDoc, null)), /*#__PURE__*/React.createElement("span", {
      className: "dz-text"
    }, fileNameOld ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, fileNameOld), " ", /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "\xB7 Vers\xE3o anterior carregada")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, "Soltar vers\xE3o anterior aqui"), " ", /*#__PURE__*/React.createElement("span", {
      className: "mono"
    }, "PDF, DOCX, TXT \xB7 ou cole com separador no texto"))), fileNameOld && /*#__PURE__*/React.createElement("button", {
      className: "dz-clear",
      onClick: e => {
        e.stopPropagation();
        setFileNameOld('');
        setRawFileOld(null);
      }
    }, "Limpar"), /*#__PURE__*/React.createElement("input", {
      ref: fileInputOld,
      type: "file",
      accept: ".pdf,.docx,.txt,.md,.markdown,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      style: {
        display: 'none'
      },
      onChange: e => {
        handleFileOld(e.target.files[0]);
        e.target.value = '';
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "gen",
      onClick: generate,
      disabled: !canGen,
      title: "Atalho: Ctrl+Enter no campo de texto"
    }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "spin"
    }), " Qa Assistent est\xE1 trabalhando\u2026") : /*#__PURE__*/React.createElement(React.Fragment, null, "\u2726 Gerar ", activeMode.chip)), (doc.trim() || fileName || result) && !busy && /*#__PURE__*/React.createElement("button", {
      className: "clear-all",
      onClick: resetAll
    }, "\u21BA Nova an\xE1lise \u2014 limpar tudo"), /*#__PURE__*/React.createElement("div", {
      className: "hint"
    }, "o Qa Assistent l\xEA e planeja \u2014 ele n\xE3o executa testes nem acessa sistemas. Dica: Ctrl+Enter tamb\xE9m gera.")))), /*#__PURE__*/React.createElement("section", {
      className: "panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "out-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "out-title"
    }, "Resultado ", /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, resultModeObj.chip)), /*#__PURE__*/React.createElement("div", {
      className: "out-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'act' + (copied ? ' ok' : ''),
      onClick: copyOut,
      disabled: !result
    }, copied ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcCheck, null), " Copiado") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcCopy, null), " Copiar")), /*#__PURE__*/React.createElement("button", {
      className: 'act' + (copiedJira ? ' ok' : ''),
      onClick: copyJira,
      disabled: !result,
      title: "Copiar convertido para Jira (wiki markup)"
    }, copiedJira ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IcCheck, null), " Copiado") : /*#__PURE__*/React.createElement(React.Fragment, null, "\u2398 Copiar p/ Jira")), hasTable && /*#__PURE__*/React.createElement("button", {
      className: "act",
      onClick: downloadCsv,
      title: "Baixar as tabelas do resultado em CSV"
    }, /*#__PURE__*/React.createElement(IcDownload, null), " CSV"), /*#__PURE__*/React.createElement("button", {
      className: "act",
      onClick: downloadOut,
      disabled: !result
    }, /*#__PURE__*/React.createElement(IcDownload, null), " Baixar .md"))), /*#__PURE__*/React.createElement("div", {
      className: "out-scroll"
    }, busy && !result ? /*#__PURE__*/React.createElement("div", {
      className: "state"
    }, /*#__PURE__*/React.createElement(Mascot, {
      size: 92,
      state: "thinking"
    }), /*#__PURE__*/React.createElement("div", {
      className: "thinking-dots"
    }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("p", {
      className: "mono"
    }, "O Qa Assistent est\xE1 analisando\u2026")) : error ? /*#__PURE__*/React.createElement("div", {
      className: "state"
    }, /*#__PURE__*/React.createElement(Mascot, {
      size: 80,
      state: "idle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "errbox",
      role: "alert"
    }, error)) : result ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "md",
      dangerouslySetInnerHTML: {
        __html: mdToHtml(result)
      }
    }), chatTurns.map((turn, i) => /*#__PURE__*/React.createElement("div", {
      className: "chat-turn",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-label"
    }, "Sua pergunta"), /*#__PURE__*/React.createElement("div", {
      className: "chat-question"
    }, turn.question), /*#__PURE__*/React.createElement("div", {
      className: "chat-label",
      style: {
        marginTop: 10
      }
    }, "Resposta"), turn.answer.startsWith('⚠') ? /*#__PURE__*/React.createElement("div", {
      className: "errbox",
      role: "alert"
    }, turn.answer) : /*#__PURE__*/React.createElement("div", {
      className: "md",
      dangerouslySetInnerHTML: {
        __html: mdToHtml(turn.answer)
      }
    }))), chatBusy && /*#__PURE__*/React.createElement("div", {
      className: "chat-thinking"
    }, /*#__PURE__*/React.createElement("div", {
      className: "thinking-dots"
    }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), "Qa Assistent est\xE1 pensando..."), !busy && !reviewBusy && !chatBusy && /*#__PURE__*/React.createElement("div", {
      className: "review-bar"
    }, /*#__PURE__*/React.createElement("button", {
      className: "review-btn",
      onClick: runReview,
      title: "Uma segunda passada da IA audita a an\xE1lise: itens sem base no documento, cobertura faltante e crit\xE9rios vagos. Aten\xE7\xE3o: consome uma chamada extra da sua cota de API."
    }, "\uD83D\uDD0D Revisar an\xE1lise"), /*#__PURE__*/React.createElement("span", {
      className: "review-note"
    }, "2\xAA opini\xE3o da IA \xB7 consome +1 chamada da API")), !busy && CHAINS[mode] && CHAINS[mode].length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "chain-bar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chain-label"
    }, "Continuar com este resultado \u279C"), CHAINS[mode].map(id => {
      const target = MODES.find(mm => mm.id === id);
      return /*#__PURE__*/React.createElement("button", {
        key: id,
        className: "chain-btn",
        onClick: () => chainTo(id),
        title: target.desc
      }, target.title);
    })), /*#__PURE__*/React.createElement("div", {
      ref: chatEndRef
    })) : /*#__PURE__*/React.createElement("div", {
      className: "state"
    }, /*#__PURE__*/React.createElement(Mascot, {
      size: 84,
      state: "happy"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Oi! Eu sou o Qa Assistent"), /*#__PURE__*/React.createElement("p", null, "Escolha um modo \xE0 esquerda, cole sua documenta\xE7\xE3o (ou solte um PDF) e clique em gerar. Eu te entrego o rascunho \u2014 voc\xEA revisa e ajusta.")))), !busy && !error && result && /*#__PURE__*/React.createElement("div", {
      className: "chat-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-bar-row"
    }, /*#__PURE__*/React.createElement("textarea", {
      className: "chat-input",
      "aria-label": "Pergunta de acompanhamento sobre a an\xE1lise",
      placeholder: "Continue aqui... ex: 'Gere mais cen\xE1rios', 'Detalhe o EC-02' ou 'Quais os riscos?'",
      rows: 1,
      value: chatInput,
      onChange: e => setChatInput(e.target.value),
      onInput: e => {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
      },
      onKeyDown: e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendChat();
        }
      },
      disabled: chatBusy
    }), /*#__PURE__*/React.createElement("button", {
      className: "chat-send",
      onClick: sendChat,
      title: "Enviar (Enter)",
      disabled: !chatInput.trim() || chatBusy
    }, chatBusy ? /*#__PURE__*/React.createElement("span", {
      className: "spin",
      style: {
        borderTopColor: '#0a0710'
      }
    }) : '↑')), /*#__PURE__*/React.createElement("div", {
      className: "chat-bar-footer"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chat-hint"
    }, "Enter envia \xB7 Shift+Enter quebra linha"), chatTurns.length > 0 && /*#__PURE__*/React.createElement("button", {
      className: "chat-reset-btn",
      onClick: () => {
        setChatTurns([]);
      }
    }, "\u21BA Limpar conversa"))))), showHelp && /*#__PURE__*/React.createElement(Modal, {
      title: "Como usar o Qa Assistent",
      onClose: () => setShowHelp(false),
      titleExtra: /*#__PURE__*/React.createElement("div", {
        className: "robot-wrap help-modal-robot",
        "data-state": "happy",
        "aria-hidden": "true"
      }, /*#__PURE__*/React.createElement("div", {
        className: "robot-antenna"
      }), /*#__PURE__*/React.createElement("div", {
        className: "robot-head"
      }, /*#__PURE__*/React.createElement("div", {
        className: "robot-face"
      }, /*#__PURE__*/React.createElement("span", {
        className: "robot-eye left"
      }), /*#__PURE__*/React.createElement("span", {
        className: "robot-eye right"
      }), /*#__PURE__*/React.createElement("span", {
        className: "robot-mouth"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "robot-arm left"
      }), /*#__PURE__*/React.createElement("div", {
        className: "robot-arm right"
      }), /*#__PURE__*/React.createElement("div", {
        className: "robot-body"
      }), /*#__PURE__*/React.createElement("div", {
        className: "robot-core"
      }))
    }, /*#__PURE__*/React.createElement("div", {
      className: "help-intro"
    }, /*#__PURE__*/React.createElement("div", {
      className: "help-steps"
    }, /*#__PURE__*/React.createElement("div", {
      className: "help-step"
    }, /*#__PURE__*/React.createElement("span", {
      className: "help-step-n"
    }, "1"), " Escolha o modo conforme o que voc\xEA precisa agora"), /*#__PURE__*/React.createElement("div", {
      className: "help-step"
    }, /*#__PURE__*/React.createElement("span", {
      className: "help-step-n"
    }, "2"), " Cole o texto ou solte um PDF/Word"), /*#__PURE__*/React.createElement("div", {
      className: "help-step"
    }, /*#__PURE__*/React.createElement("span", {
      className: "help-step-n"
    }, "3"), " Clique em Gerar e revise \u2014 voc\xEA \xE9 sempre a revisora final")), /*#__PURE__*/React.createElement("p", {
      className: "help-intro-extra"
    }, "Depois de gerar: refine pelo ", /*#__PURE__*/React.createElement("b", null, "chat"), " (\"gere mais casos\", \"detalhe o EC-02\"), pe\xE7a uma ", /*#__PURE__*/React.createElement("b", null, "\uD83D\uDD0D Revis\xE3o cr\xEDtica"), " \u2014 uma segunda passada da IA que confere se a an\xE1lise inventou algo sem base no documento ou deixou lacunas (aten\xE7\xE3o: consome +1 chamada da sua cota de API) \u2014 e use ", /*#__PURE__*/React.createElement("b", null, "Continuar com este resultado \u279C"), " para levar a sa\xEDda direto ao pr\xF3ximo modo, sem copiar e colar."), /*#__PURE__*/React.createElement("p", {
      className: "help-intro-extra"
    }, "Exporte com ", /*#__PURE__*/React.createElement("b", null, "\u2398 Copiar p/ Jira"), " (j\xE1 formatado para colar na tarefa) ou ", /*#__PURE__*/React.createElement("b", null, "CSV"), " (tabelas para planilha). No ", /*#__PURE__*/React.createElement("b", null, "\uD83D\uDD58 Hist\xF3rico"), " voc\xEA reabre as \xFAltimas 20 an\xE1lises, busca por t\xEDtulo ou modo e pode exportar/importar tudo como arquivo (backup ou troca de m\xE1quina). No ", /*#__PURE__*/React.createElement("b", null, "\u2699"), " ajusta capacidade di\xE1ria, overhead e o SLA padr\xE3o da equipe. Documentos muito grandes (50 mil+ caracteres) s\xE3o enviados preservando in\xEDcio e fim \u2014 um aviso marca o trecho omitido. Atalhos: ", /*#__PURE__*/React.createElement("b", null, "Ctrl+Enter"), " gera \xB7 ", /*#__PURE__*/React.createElement("b", null, "Esc"), " fecha janelas \xB7 ", /*#__PURE__*/React.createElement("b", null, "\u21BA Nova an\xE1lise"), " limpa tudo."), /*#__PURE__*/React.createElement("p", {
      className: "help-intro-extra"
    }, "N\xE3o sabe por onde come\xE7ar? Com o campo vazio, o bot\xE3o ", /*#__PURE__*/React.createElement("b", null, "\u2728 Testar com um exemplo"), " preenche a entrada com um exemplo pronto do modo selecionado \u2014 gere e veja o que ele faz na pr\xE1tica.")), ORDERED_MODES.map(m => /*#__PURE__*/React.createElement("div", {
      className: "help-mode",
      key: m.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "help-mode-title"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mode-ic"
    }, /*#__PURE__*/React.createElement(m.icon, null)), /*#__PURE__*/React.createElement("strong", null, m.title), /*#__PURE__*/React.createElement("span", {
      className: "help-badge"
    }, m.chip)), /*#__PURE__*/React.createElement("p", {
      className: "help-what"
    }, m.helpWhat), /*#__PURE__*/React.createElement("div", {
      className: "help-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "help-row-label"
    }, "\uD83D\uDCE5 O que colar"), /*#__PURE__*/React.createElement("p", null, m.helpPaste)), /*#__PURE__*/React.createElement("div", {
      className: "help-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "help-row-label"
    }, "\uD83D\uDCE4 O que voc\xEA recebe"), /*#__PURE__*/React.createElement("p", null, m.helpGet)), /*#__PURE__*/React.createElement("div", {
      className: "help-tip"
    }, "\uD83D\uDCA1 ", m.helpTip)))), showHistory && /*#__PURE__*/React.createElement(Modal, {
      title: "\uD83D\uDD58 Hist\xF3rico de an\xE1lises",
      onClose: () => setShowHistory(false),
      bodyClassName: "hist-body"
    }, history.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "hist-tools"
    }, /*#__PURE__*/React.createElement("input", {
      className: "hist-search",
      type: "search",
      placeholder: "Buscar por t\xEDtulo ou modo\u2026",
      value: histQuery,
      onChange: e => setHistQuery(e.target.value),
      "aria-label": "Buscar no hist\xF3rico"
    }), /*#__PURE__*/React.createElement("button", {
      className: "hist-tool-btn",
      onClick: exportHistory,
      title: "Baixar o hist\xF3rico como arquivo JSON (backup ou levar para outra m\xE1quina)"
    }, "\u21A7 Exportar"), /*#__PURE__*/React.createElement("button", {
      className: "hist-tool-btn",
      onClick: () => histImportRef.current && histImportRef.current.click(),
      title: "Importar um hist\xF3rico exportado \u2014 as an\xE1lises s\xE3o mescladas com as atuais"
    }, "\u21A5 Importar"), /*#__PURE__*/React.createElement("input", {
      ref: histImportRef,
      type: "file",
      accept: ".json,application/json",
      style: {
        display: 'none'
      },
      onChange: e => {
        importHistory(e.target.files[0]);
        e.target.value = '';
      }
    })), history.length === 0 && /*#__PURE__*/React.createElement("p", {
      className: "hist-empty"
    }, "Nenhuma an\xE1lise salva ainda. Gere uma an\xE1lise e ela aparece aqui \u2014 as ", HISTORY_MAX, " mais recentes ficam guardadas neste navegador."), history.length > 0 && histFiltered.length === 0 && /*#__PURE__*/React.createElement("p", {
      className: "hist-empty"
    }, "Nenhuma an\xE1lise corresponde \xE0 busca \"", histQuery, "\"."), histFiltered.map(h => {
      const m = MODES.find(mm => mm.id === h.mode);
      return /*#__PURE__*/React.createElement("div", {
        className: "hist-item",
        key: h.id
      }, /*#__PURE__*/React.createElement("button", {
        className: "hist-main",
        onClick: () => restoreHistory(h),
        title: "Reabrir esta an\xE1lise"
      }, /*#__PURE__*/React.createElement("span", {
        className: "help-badge"
      }, m ? m.chip : h.mode), /*#__PURE__*/React.createElement("span", {
        className: "hist-title"
      }, h.title), /*#__PURE__*/React.createElement("span", {
        className: "hist-date"
      }, new Date(h.ts).toLocaleString('pt-BR'))), /*#__PURE__*/React.createElement("button", {
        className: "hist-del",
        title: "Excluir do hist\xF3rico",
        onClick: () => deleteHistory(h.id)
      }, "\xD7"));
    }), history.length > 0 && /*#__PURE__*/React.createElement("button", {
      className: "hist-clear",
      onClick: clearHistory
    }, "Limpar todo o hist\xF3rico")), showSettings && /*#__PURE__*/React.createElement(Modal, {
      title: "\u2699 Configura\xE7\xF5es",
      onClose: () => setShowSettings(false),
      className: "settings-modal",
      bodyClassName: "hist-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "set-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "set-label"
    }, "Capacidade di\xE1ria de execu\xE7\xE3o (horas efetivas)"), /*#__PURE__*/React.createElement("span", {
      className: "set-hint"
    }, "Usada na Estimativa de Execu\xE7\xE3o para projetar quantos cen\xE1rios cabem no dia. Padr\xE3o: 5h."), /*#__PURE__*/React.createElement(NumberStepper, {
      value: settings.dailyHours,
      min: 1,
      max: 12,
      step: 0.5,
      suffix: "h/dia",
      onChange: v => saveSettings({
        ...settings,
        dailyHours: v
      })
    })), /*#__PURE__*/React.createElement("div", {
      className: "set-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "set-label"
    }, "Overhead operacional (%)"), /*#__PURE__*/React.createElement("span", {
      className: "set-hint"
    }, "Reuni\xF5es, registro no Jira, troca de contexto. Padr\xE3o: 15%."), /*#__PURE__*/React.createElement(NumberStepper, {
      value: settings.overheadPct,
      min: 0,
      max: 100,
      step: 5,
      suffix: "%",
      onChange: v => saveSettings({
        ...settings,
        overheadPct: v
      })
    })), /*#__PURE__*/React.createElement("label", {
      className: "set-field"
    }, /*#__PURE__*/React.createElement("span", {
      className: "set-label"
    }, "SLA padr\xE3o da sua equipe"), /*#__PURE__*/React.createElement("span", {
      className: "set-hint"
    }, "Usado na An\xE1lise de SLA quando voc\xEA n\xE3o informar outro no texto. Deixe vazio para o Qa Assistent inferir pela tabela de refer\xEAncia. Ex.: lat\xEAncia p95 < 200ms, error rate < 0,5%, disponibilidade > 99,9%."), /*#__PURE__*/React.createElement("textarea", {
      rows: 3,
      value: settings.slaDefaults,
      onChange: e => saveSettings({
        ...settings,
        slaDefaults: e.target.value
      }),
      placeholder: "Ex.: lat\xEAncia p95 < 200ms, error rate < 0,5%, disponibilidade > 99,9%"
    })), /*#__PURE__*/React.createElement("p", {
      className: "set-note"
    }, "As configura\xE7\xF5es ficam salvas neste navegador e s\xE3o enviadas junto com o texto quando o modo as utiliza (Estimativa de Execu\xE7\xE3o e An\xE1lise de SLA).")));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
