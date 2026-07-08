/*
 * Qa Assistent — frontend (fonte JSX)
 *
 * Este é o ARQUIVO FONTE da interface. Edite aqui e rode `npm run build:front`
 * para gerar public/app.js (o artefato que o navegador carrega).
 * Não edite public/app.js diretamente.
 */
(function () {
  const IcCheck = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );

  /* ---------------- modes + prompts ---------------- */
  const IcList   = () => <span>≡</span>;
  const IcGrid   = () => <span>▦</span>;
  const IcClock  = () => <span>◷</span>;
  const IcDoc    = () => <span>□</span>;
  const IcCopy   = () => <span>⧉</span>;
  const IcDownload = () => <span>↓</span>;
  const IcBug    = () => <span>⚠</span>;
  const IcBolt   = () => <span>⚡</span>;
  const IcRank   = () => <span>↑</span>;
  const IcCheck2 = () => <span>☑</span>;
  const IcMap    = () => <span>◉</span>;
  const IcSpec   = () => <span>◈</span>;
  const IcPen    = () => <span>✎</span>;
  const IcData   = () => <span>⌗</span>;
  const IcSun    = () => <span>☀</span>;

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
  const MODE_GROUPS = [
    { label: 'entender a doc',        ids: ['resumo', 'espec'] },
    { label: 'planejar os testes',    ids: ['casos', 'dados', 'cobertura'] },
    { label: 'organizar a execução',  ids: ['estimativa', 'prioridade', 'sla'] },
    { label: 'bugs',                  ids: ['redator', 'bug'] },
    { label: 'entregar & comunicar',  ids: ['checklist', 'daily'] }
  ];
  const ORDERED_MODES = MODE_GROUPS
    .flatMap(g => g.ids)
    .map(id => MODES.find(m => m.id === id))
    .filter(Boolean)
    .concat(MODES.filter(m => !MODE_GROUPS.some(g => g.ids.includes(m.id))));

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
    espec: EX_SPEC.replace('expira em 15 minutos', 'expira em 5 minutos') +
      '\n\n=== VERSÃO ANTERIOR ===\n\n' + EX_SPEC,
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

  marked.setOptions({ gfm: true, breaks: false });

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
    return text.slice(0, head) +
      '\n\n[... AVISO: trecho intermediário omitido — documento excede ' + max.toLocaleString('pt-BR') +
      ' caracteres. Início e fim foram preservados. ...]\n\n' +
      text.slice(-tail);
  }

  /* ---------------- pdf ---------------- */
  async function extractPdf(file) {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
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
    const jiraInline = s => s
      .replace(/\*\*(.+?)\*\*/g, '*$1*')
      .replace(/`([^`]+)`/g, '{{$1}}');
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
      out.push(jiraInline(
        line
          .replace(/^\s*[-*]\s+\[[ xX]\]\s+/, '* ')
          .replace(/^\s*[-*]\s+/, '* ')
          .replace(/^\s*\d+\.\s+/, '# ')
      ));
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
        if (!groups.has(key)) groups.set(key, { header: cells, rows: [] });
        continue;
      }
      if (!header) continue;
      groups.get(header.join('')).rows.push({ section, cells });
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
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
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
  const { useState, useRef, useEffect, useCallback } = React;

  // Modal acessível: role=dialog, foco inicial no container e Tab preso dentro
  // (focus trap). Esc é tratado globalmente no App.
  function Modal({ title, titleExtra, onClose, className, bodyClassName, children }) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) ref.current.focus();
    }, []);
    const trapTab = e => {
      if (e.key !== 'Tab' || !ref.current) return;
      const focusables = ref.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
      );
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
    return (
      <div className="help-overlay" onClick={onClose}>
        <div
          className={'help-modal' + (className ? ' ' + className : '')}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          ref={ref}
          tabIndex={-1}
          onClick={e => e.stopPropagation()}
          onKeyDown={trapTab}
        >
          <div className="help-top">
            <div className="help-title-wrap">{titleExtra}<h2>{title}</h2></div>
            <button className="help-close" onClick={onClose} aria-label="Fechar janela">×</button>
          </div>
          <div className={'help-body' + (bodyClassName ? ' ' + bodyClassName : '')}>{children}</div>
        </div>
      </div>
    );
  }

  // Campo numérico com stepper próprio (substitui as setinhas padrão do navegador)
  function NumberStepper({ value, min, max, step, suffix, onChange }) {
    const num = Number(value) || 0;
    const clamp = v => Math.min(max, Math.max(min, Math.round(v * 100) / 100));
    return (
      <div className="stepper">
        <button type="button" className="stepper-btn" onClick={() => onChange(clamp(num - step))} title="Diminuir">−</button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(e.target.value)}
        />
        <button type="button" className="stepper-btn" onClick={() => onChange(clamp(num + step))} title="Aumentar">+</button>
        {suffix && <span className="stepper-suffix">{suffix}</span>}
      </div>
    );
  }

  // Explicação de SLA exibida na tela do modo Análise de SLA
  function SlaExplainer() {
    const [open, setOpen] = useState(false);
    return (
      <div className={'sla-info' + (open ? ' open' : '')}>
        <button className="sla-toggle" onClick={() => setOpen(!open)}>
          <span>💡 O que é SLA (Acordo de Nível de Serviço)? — entenda antes de usar</span>
          <span className="sla-arrow">{open ? '▴' : '▾'}</span>
        </button>
        {open && (
          <div className="sla-body">
            <p>
              <strong>SLA (Service Level Agreement)</strong> é o <em>contrato de desempenho</em> do sistema:
              os limites que ele promete cumprir — ex.: responder em até 500ms, ficar no ar 99,9% do tempo,
              ter menos de 1% de requisições com erro. Um endpoint pode passar em <strong>todos</strong> os
              testes funcionais e mesmo assim violar o SLA em produção (lento demais ou instável sob carga) —
              este modo levanta essa bandeira <strong>antes do deploy</strong>.
            </p>
            <ul>
              <li><strong>SLI</strong> (Indicator) — a métrica <em>medida</em>: a latência real, o error rate real. É o termômetro.</li>
              <li><strong>SLO</strong> (Objective) — a <em>meta interna</em> do time: "queremos p95 &lt; 200ms".</li>
              <li><strong>SLA</strong> (Agreement) — o <em>compromisso formal</em>, com cliente ou entre times.</li>
            </ul>
            <p>
              <strong>p95 / p99</strong> = percentil: "p95 &lt; 500ms" significa que 95% das requisições
              respondem em menos de 500ms. É mais honesto que a média, porque a média esconde os casos lentos.
            </p>
            <p>
              <strong>Como usar:</strong> cole os cenários e informe os limites acordados. Se não souber o SLA,
              descreva o tipo de sistema — o Qa Assistent infere pelos valores de referência abaixo e marca tudo
              como <em>[INFERIDO — confirmar com PO/SRE antes de usar]</em>.
            </p>
            <table className="sla-table">
              <thead>
                <tr><th>Tipo de sistema</th><th>Latência p95</th><th>Error rate</th><th>Disponibilidade</th></tr>
              </thead>
              <tbody>
                <tr><td>API REST pública / usuário final</td><td>&lt; 500ms</td><td>&lt; 1%</td><td>&gt; 99,5%</td></tr>
                <tr><td>API interna síncrona</td><td>&lt; 200ms</td><td>&lt; 0,5%</td><td>&gt; 99,9%</td></tr>
                <tr><td>API de background / batch</td><td>—</td><td>&lt; 2%</td><td>&gt; 99%</td></tr>
                <tr><td>Protocolo de rede em tempo real</td><td>&lt; 50ms</td><td>&lt; 0,1%</td><td>&gt; 99,99%</td></tr>
              </tbody>
            </table>
            <p className="sla-note">
              O resultado classifica cada cenário — ✅ dentro do SLA · ⚠️ risco de violação · ❌ viola ·
              ❓ não verificável sem carga real — e lista os bloqueantes de deploy.
            </p>
          </div>
        )}
      </div>
    );
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
      const defaults = { dailyHours: 5, overheadPct: 15, slaDefaults: '' };
      try {
        return { ...defaults, ...(JSON.parse(localStorage.getItem('qa_assistent_settings')) || {}) };
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
    const Mascot = ({ size, state }) => (
      <div className="robot-wrap" data-state={state} style={{ '--rs': size + 'px' }}>
        <div className="robot-antenna" />
        <div className="robot-head">
          <div className="robot-face">
            <span className="robot-eye left" />
            <span className="robot-eye right" />
            <span className="robot-mouth" />
          </div>
        </div>
        <div className="robot-arm left" />
        <div className="robot-arm right" />
        <div className="robot-body" />
        <div className="robot-core" />
      </div>
    );

    useEffect(() => {
      localStorage.setItem('qa_assistent_mode', mode);
    }, [mode]);
    useEffect(() => {
      localStorage.setItem('qa_assistent_doc', doc);
    }, [doc]);
    useEffect(() => {
      if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, [chatTurns.length, chatBusy]);

    const activeMode = MODES.find(m => m.id === mode);
    // rótulos/arquivos do resultado seguem o modo que o gerou (fallback: o atual)
    const resultModeObj = (result && MODES.find(m => m.id === resultMode)) || activeMode;

    const handleFile = useCallback(async file => {
      if (!file) return;
      setError('');
      const isPdf  = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      const isDocx = /\.docx$/i.test(file.name) ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
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
      const isPdf  = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
      const isDocx = /\.docx$/i.test(file.name) ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      if (isPdf) {
        setFileNameOld(file.name);
        setRawFileOld(null);
        try {
          const text = await extractPdf(file);
          if (!text) throw new Error('vazio');
          setRawFileOld({ _pdfText: text, name: file.name });
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
        setRawFileOld({ _pdfText: text, name: file.name });
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
      if ((!doc.trim() && !rawFile) || busy) return;
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
      const messages = [
        { role: 'user', content: 'CONTEXTO:\n' + (docContext || 'Análise já realizada — responda com base no histórico.') },
        { role: 'assistant', content: result },
        ...chatTurns.flatMap(t => [
          { role: 'user', content: t.question },
          { role: 'assistant', content: t.answer }
        ]),
        { role: 'user', content: question }
      ];
      let started = false;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: resultMode || mode, messages })
        });
        const ctype = res.headers.get('content-type') || '';
        if (!ctype.includes('ndjson')) {
          const data = await res.json();
          throw new Error(data.error || 'Erro desconhecido');
        }
        // adiciona o turno vazio e vai preenchendo a resposta conforme chega
        setChatTurns(prev => [...prev, { question, answer: '' }]);
        started = true;
        let acc = '';
        let streamError = '';
        await readNdjson(res, ev => {
          if (ev.type === 'delta') {
            acc += ev.text;
            const answer = acc;
            setChatTurns(prev => {
              const copy = prev.slice();
              copy[copy.length - 1] = { question, answer };
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
          setChatTurns(prev => [...prev.slice(0, -1), { question, answer }]);
        }
      } catch (e) {
        const errTurn = { question, answer: '⚠ Erro: ' + e.message };
        setChatTurns(prev => started
          ? [...prev.slice(0, -1), errTurn]
          : [...prev, errTurn]);
      }
      setChatBusy(false);
    }

    // Segunda passada: revisora crítica audita a análise contra o documento.
    // Consome uma chamada extra de API — por isso é opcional, sob demanda.
    async function runReview() {
      if (!result || reviewBusy || chatBusy) return;
      setReviewBusy(true);
      const question = '🔍 Revisão crítica da análise (segunda passada)';
      setChatTurns(prev => [...prev, { question, answer: '' }]);
      try {
        const res = await fetch('/api/review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: resultMode || mode, document: docContext, result })
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
              copy[copy.length - 1] = { question, answer };
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
          setChatTurns(prev => [...prev.slice(0, -1), { question, answer }]);
        }
      } catch (e) {
        setChatTurns(prev => [...prev.slice(0, -1), { question, answer: '⚠ Erro: ' + e.message }]);
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
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
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
      const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
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

    const histFiltered = histQuery.trim()
      ? history.filter(h => {
          const q = histQuery.toLowerCase();
          const m = MODES.find(mm => mm.id === h.mode);
          return (h.title || '').toLowerCase().includes(q) ||
            (m ? (m.title + ' ' + m.chip) : h.mode).toLowerCase().includes(q);
        })
      : history;

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
          docRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    return (
      <div className="app">
        {showIntro && (
          <div className="intro-overlay" aria-hidden="true">
            <div className="intro-stage">
              <svg className="intro-word" viewBox="0 0 620 260">
                <text x="50%" y="55%" textAnchor="middle">Olá</text>
              </svg>
              <span className="intro-spark one" />
              <span className="intro-spark two" />
              <span className="intro-spark three" />
              <span className="drone a"><i /></span>
              <span className="drone b"><i /></span>
              <span className="drone c"><i /></span>
            </div>
          </div>
        )}

        <header className="topbar">
          <div className="nav-robot" aria-hidden="true">
            <div className="robot-antenna" />
            <div className="robot-head">
              <div className="robot-face">
                <span className="robot-eye left" />
                <span className="robot-eye right" />
                <span className="robot-mouth" />
              </div>
            </div>
            <div className="robot-body" />
            <div className="robot-core" />
          </div>
          <div className="brand-text">
            <div className="brand-name">Qa Assistent<span className="dot">.</span></div>
            <div className="brand-tag">Assistente de QA · Leitura & Planejamento</div>
          </div>
          <div className="topbar-spacer" />
          <button className="hist-btn" onClick={() => setShowSettings(true)} title="Configurações (capacidade, overhead, SLA padrão)" aria-label="Configurações">⚙</button>
          <button className="hist-btn" onClick={() => { setHistQuery(''); setShowHistory(true); }} title="Análises anteriores">
            🕘 Histórico{history.length > 0 && <span className="hist-count">{history.length}</span>}
          </button>
          <button className="help-btn" onClick={() => setShowHelp(true)} title="Como usar o Qa Assistent">
            <span className="nav-robot help-btn-robot" aria-hidden="true">
              <span className="robot-antenna" />
              <span className="robot-head">
                <span className="robot-face">
                  <span className="robot-eye left" />
                  <span className="robot-eye right" />
                  <span className="robot-mouth" />
                </span>
              </span>
              <span className="robot-body" />
              <span className="robot-core" />
            </span>
            Ajuda
          </button>
          <div className={'status-pill' + (busy || reading ? ' busy' : '')}>
            <span className="led" />
            {reading ? 'Lendo documento…' : busy ? 'Pensando…' : 'Pronta'}
          </div>
        </header>

        <div className="main">
          <section className="panel input">
            <div className="panel-scroll">
              <div>
                <div className="section-label">01 · o que você precisa</div>
                <div className="modes">
                  {MODE_GROUPS.map(g => (
                    <React.Fragment key={g.label}>
                      <div className="mode-group">{g.label}</div>
                      {g.ids.map(id => MODES.find(mm => mm.id === id)).filter(Boolean).map(m => {
                        const Ic = m.icon;
                        return (
                          <button
                            key={m.id}
                            className={'mode' + (mode === m.id ? ' active' : '')}
                            onClick={() => setMode(m.id)}
                            aria-pressed={mode === m.id}
                          >
                            <span className="mode-ic"><Ic /></span>
                            <span className="mode-body">
                              <span className="mode-title">{m.title}</span>
                              <span className="mode-desc">{m.desc}</span>
                            </span>
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                  {MODES.filter(m => !MODE_GROUPS.some(g => g.ids.includes(m.id))).map(m => {
                    const Ic = m.icon;
                    return (
                      <button
                        key={m.id}
                        className={'mode' + (mode === m.id ? ' active' : '')}
                        onClick={() => setMode(m.id)}
                        aria-pressed={mode === m.id}
                      >
                        <span className="mode-ic"><Ic /></span>
                        <span className="mode-body">
                          <span className="mode-title">{m.title}</span>
                          <span className="mode-desc">{m.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="input-head">
                  <div className="section-label" style={{ marginBottom: 0 }}>{'02 · ' + (activeMode.inputLabel || 'a documentação')}</div>
                  {!doc.trim() && !rawFile ? (
                    <button
                      className="example-btn"
                      onClick={() => {
                        setDoc(EXAMPLES[mode] || '');
                        setTimeout(() => docRef.current && docRef.current.focus(), 30);
                      }}
                      title="Preenche o campo com um exemplo pronto deste modo — bom para conhecer o que ele faz antes de usar com sua doc"
                    >✨ Testar com um exemplo</button>
                  ) : (
                    <span className="charcount">
                      {doc.length.toLocaleString('pt-BR') + ' ch · ~' + Math.ceil(doc.length / 4).toLocaleString('pt-BR') + ' tk'}
                      {doc.length > 50000
                        ? <span className="token-warn"> ✂ acima de 50 mil — envia início+fim</span>
                        : doc.length > 28000 ? <span className="token-warn"> ⚠ doc grande</span> : null}
                    </span>
                  )}
                </div>
                {mode === 'sla' && <SlaExplainer />}
                <div className="textwrap">
                  <textarea
                    ref={docRef}
                    className="doc"
                    aria-label={'Entrada da análise: ' + (activeMode.inputLabel || 'a documentação')}
                    placeholder={activeMode.placeholder}
                    value={doc}
                    onChange={e => setDoc(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        generate();
                      }
                    }}
                  />
                </div>
                <div
                  className={'dropzone' + (over ? ' over' : '') + (fileName ? ' has' : '')}
                  onClick={() => fileInput.current && fileInput.current.click()}
                  onDragOver={e => {
                    e.preventDefault();
                    setOver(true);
                  }}
                  onDragLeave={() => setOver(false)}
                  onDrop={onDrop}
                >
                  <span className="dz-ic"><IcDoc /></span>
                  <span className="dz-text">
                    {reading ? (
                      <><b>Lendo PDF…</b> <span className="mono">Extraindo texto</span></>
                    ) : fileName ? (
                      <><b>{fileName}</b> <span className="mono">{rawFile ? '· Word carregado — Pronto para gerar' : '· Texto carregado no campo acima'}</span></>
                    ) : (
                      <><b>Soltar arquivo aqui</b> <span className="mono">Ou clique para escolher · PDF, DOCX, TXT, MD</span></>
                    )}
                  </span>
                  {fileName && !reading && (
                    <button
                      className="dz-clear"
                      onClick={e => {
                        e.stopPropagation();
                        clearFile();
                      }}
                    >Limpar</button>
                  )}
                  <input
                    ref={fileInput}
                    type="file"
                    accept=".pdf,.docx,.txt,.md,.markdown,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    style={{ display: 'none' }}
                    onChange={e => {
                      handleFile(e.target.files[0]);
                      e.target.value = '';
                    }}
                  />
                </div>
                {mode === 'espec' && (
                  <div style={{ marginTop: 12 }}>
                    <div className="section-label" style={{ marginBottom: 8 }}>Versão anterior · opcional (para comparação)</div>
                    <div
                      className={'dropzone' + (overOld ? ' over' : '') + (fileNameOld ? ' has' : '')}
                      onClick={() => fileInputOld.current && fileInputOld.current.click()}
                      onDragOver={e => { e.preventDefault(); setOverOld(true); }}
                      onDragLeave={() => setOverOld(false)}
                      onDrop={e => { e.preventDefault(); setOverOld(false); const f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) handleFileOld(f); }}
                    >
                      <span className="dz-ic"><IcDoc /></span>
                      <span className="dz-text">
                        {fileNameOld
                          ? <><b>{fileNameOld}</b> <span className="mono">· Versão anterior carregada</span></>
                          : <><b>Soltar versão anterior aqui</b> <span className="mono">PDF, DOCX, TXT · ou cole com separador no texto</span></>}
                      </span>
                      {fileNameOld && (
                        <button
                          className="dz-clear"
                          onClick={e => { e.stopPropagation(); setFileNameOld(''); setRawFileOld(null); }}
                        >Limpar</button>
                      )}
                      <input
                        ref={fileInputOld}
                        type="file"
                        accept=".pdf,.docx,.txt,.md,.markdown,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        style={{ display: 'none' }}
                        onChange={e => { handleFileOld(e.target.files[0]); e.target.value = ''; }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="gen" onClick={generate} disabled={!canGen} title="Atalho: Ctrl+Enter no campo de texto">
                  {busy
                    ? <><span className="spin" /> Qa Assistent está trabalhando…</>
                    : <>✦ Gerar {activeMode.chip}</>}
                </button>
                {(doc.trim() || fileName || result) && !busy && (
                  <button className="clear-all" onClick={resetAll}>↺ Nova análise — limpar tudo</button>
                )}
                <div className="hint">o Qa Assistent lê e planeja — ele não executa testes nem acessa sistemas. Dica: Ctrl+Enter também gera.</div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="out-head">
              <div className="out-title">Resultado <span className="chip">{resultModeObj.chip}</span></div>
              <div className="out-actions">
                <button className={'act' + (copied ? ' ok' : '')} onClick={copyOut} disabled={!result}>
                  {copied ? <><IcCheck /> Copiado</> : <><IcCopy /> Copiar</>}
                </button>
                <button
                  className={'act' + (copiedJira ? ' ok' : '')}
                  onClick={copyJira}
                  disabled={!result}
                  title="Copiar convertido para Jira (wiki markup)"
                >
                  {copiedJira ? <><IcCheck /> Copiado</> : <>⎘ Copiar p/ Jira</>}
                </button>
                {hasTable && (
                  <button className="act" onClick={downloadCsv} title="Baixar as tabelas do resultado em CSV">
                    <IcDownload /> CSV
                  </button>
                )}
                <button className="act" onClick={downloadOut} disabled={!result}>
                  <IcDownload /> Baixar .md
                </button>
              </div>
            </div>
            <div className="out-scroll">
              {busy && !result ? (
                <div className="state">
                  <Mascot size={92} state="thinking" />
                  <div className="thinking-dots"><i /><i /><i /></div>
                  <p className="mono">O Qa Assistent está analisando…</p>
                </div>
              ) : error ? (
                <div className="state">
                  <Mascot size={80} state="idle" />
                  <div className="errbox" role="alert">{error}</div>
                </div>
              ) : result ? (
                <div>
                  <div className="md" dangerouslySetInnerHTML={{ __html: mdToHtml(result) }} />
                  {chatTurns.map((turn, i) => (
                    <div className="chat-turn" key={i}>
                      <div className="chat-label">Sua pergunta</div>
                      <div className="chat-question">{turn.question}</div>
                      <div className="chat-label" style={{ marginTop: 10 }}>Resposta</div>
                      {turn.answer.startsWith('⚠')
                        ? <div className="errbox" role="alert">{turn.answer}</div>
                        : <div className="md" dangerouslySetInnerHTML={{ __html: mdToHtml(turn.answer) }} />}
                    </div>
                  ))}
                  {chatBusy && (
                    <div className="chat-thinking">
                      <div className="thinking-dots"><i /><i /><i /></div>
                      Qa Assistent está pensando...
                    </div>
                  )}
                  {!busy && !reviewBusy && !chatBusy && (
                    <div className="review-bar">
                      <button
                        className="review-btn"
                        onClick={runReview}
                        title="Uma segunda passada da IA audita a análise: itens sem base no documento, cobertura faltante e critérios vagos. Atenção: consome uma chamada extra da sua cota de API."
                      >
                        🔍 Revisar análise
                      </button>
                      <span className="review-note">2ª opinião da IA · consome +1 chamada da API</span>
                    </div>
                  )}
                  {!busy && CHAINS[mode] && CHAINS[mode].length > 0 && (
                    <div className="chain-bar">
                      <span className="chain-label">Continuar com este resultado ➜</span>
                      {CHAINS[mode].map(id => {
                        const target = MODES.find(mm => mm.id === id);
                        return (
                          <button key={id} className="chain-btn" onClick={() => chainTo(id)} title={target.desc}>
                            {target.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              ) : (
                <div className="state">
                  <Mascot size={84} state="happy" />
                  <div>
                    <h3>Oi! Eu sou o Qa Assistent</h3>
                    <p>Escolha um modo à esquerda, cole sua documentação (ou solte um PDF) e clique em gerar. Eu te entrego o rascunho — você revisa e ajusta.</p>
                  </div>
                </div>
              )}
            </div>
            {!busy && !error && result && (
              <div className="chat-bar">
                <div className="chat-bar-row">
                  <textarea
                    className="chat-input"
                    aria-label="Pergunta de acompanhamento sobre a análise"
                    placeholder="Continue aqui... ex: 'Gere mais cenários', 'Detalhe o EC-02' ou 'Quais os riscos?'"
                    rows={1}
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                    disabled={chatBusy}
                  />
                  <button className="chat-send" onClick={sendChat} title="Enviar (Enter)" disabled={!chatInput.trim() || chatBusy}>
                    {chatBusy ? <span className="spin" style={{ borderTopColor: '#0a0710' }} /> : '↑'}
                  </button>
                </div>
                <div className="chat-bar-footer">
                  <span className="chat-hint">Enter envia · Shift+Enter quebra linha</span>
                  {chatTurns.length > 0 && (
                    <button className="chat-reset-btn" onClick={() => { setChatTurns([]); }}>↺ Limpar conversa</button>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {showHelp && (
          <Modal
            title="Como usar o Qa Assistent"
            onClose={() => setShowHelp(false)}
            titleExtra={
              <div className="robot-wrap help-modal-robot" data-state="happy" aria-hidden="true">
                <div className="robot-antenna" />
                <div className="robot-head">
                  <div className="robot-face">
                    <span className="robot-eye left" />
                    <span className="robot-eye right" />
                    <span className="robot-mouth" />
                  </div>
                </div>
                <div className="robot-arm left" />
                <div className="robot-arm right" />
                <div className="robot-body" />
                <div className="robot-core" />
              </div>
            }
          >
                <div className="help-intro">
                  <div className="help-steps">
                    <div className="help-step"><span className="help-step-n">1</span> Escolha o modo conforme o que você precisa agora</div>
                    <div className="help-step"><span className="help-step-n">2</span> Cole o texto ou solte um PDF/Word</div>
                    <div className="help-step"><span className="help-step-n">3</span> Clique em Gerar e revise — você é sempre a revisora final</div>
                  </div>
                  <p className="help-intro-extra">
                    Depois de gerar: refine pelo <b>chat</b> ("gere mais casos", "detalhe o EC-02"),
                    peça uma <b>🔍 Revisão crítica</b> — uma segunda passada da IA que confere se a análise
                    inventou algo sem base no documento ou deixou lacunas (atenção: consome +1 chamada da
                    sua cota de API) — e use <b>Continuar com este resultado ➜</b> para levar a saída
                    direto ao próximo modo, sem copiar e colar.
                  </p>
                  <p className="help-intro-extra">
                    Exporte com <b>⎘ Copiar p/ Jira</b> (já formatado para colar na tarefa) ou <b>CSV</b> (tabelas
                    para planilha). No <b>🕘 Histórico</b> você reabre as últimas 20 análises, busca por título
                    ou modo e pode exportar/importar tudo como arquivo (backup ou troca de máquina).
                    No <b>⚙</b> ajusta capacidade diária, overhead e o SLA padrão da equipe.
                    Documentos muito grandes (50 mil+ caracteres) são enviados preservando início e fim —
                    um aviso marca o trecho omitido.
                    Atalhos: <b>Ctrl+Enter</b> gera · <b>Esc</b> fecha janelas · <b>↺ Nova análise</b> limpa tudo.
                  </p>
                  <p className="help-intro-extra">
                    Não sabe por onde começar? Com o campo vazio, o botão <b>✨ Testar com um exemplo</b> preenche
                    a entrada com um exemplo pronto do modo selecionado — gere e veja o que ele faz na prática.
                  </p>
                </div>
                {ORDERED_MODES.map(m => (
                  <div className="help-mode" key={m.id}>
                    <div className="help-mode-title">
                      <span className="mode-ic"><m.icon /></span>
                      <strong>{m.title}</strong>
                      <span className="help-badge">{m.chip}</span>
                    </div>
                    <p className="help-what">{m.helpWhat}</p>
                    <div className="help-row">
                      <span className="help-row-label">📥 O que colar</span>
                      <p>{m.helpPaste}</p>
                    </div>
                    <div className="help-row">
                      <span className="help-row-label">📤 O que você recebe</span>
                      <p>{m.helpGet}</p>
                    </div>
                    <div className="help-tip">💡 {m.helpTip}</div>
                  </div>
                ))}
          </Modal>
        )}

        {showHistory && (
          <Modal title="🕘 Histórico de análises" onClose={() => setShowHistory(false)} bodyClassName="hist-body">
                {history.length > 0 && (
                  <div className="hist-tools">
                    <input
                      className="hist-search"
                      type="search"
                      placeholder="Buscar por título ou modo…"
                      value={histQuery}
                      onChange={e => setHistQuery(e.target.value)}
                      aria-label="Buscar no histórico"
                    />
                    <button className="hist-tool-btn" onClick={exportHistory} title="Baixar o histórico como arquivo JSON (backup ou levar para outra máquina)">↧ Exportar</button>
                    <button className="hist-tool-btn" onClick={() => histImportRef.current && histImportRef.current.click()} title="Importar um histórico exportado — as análises são mescladas com as atuais">↥ Importar</button>
                    <input
                      ref={histImportRef}
                      type="file"
                      accept=".json,application/json"
                      style={{ display: 'none' }}
                      onChange={e => { importHistory(e.target.files[0]); e.target.value = ''; }}
                    />
                  </div>
                )}
                {history.length === 0 && (
                  <p className="hist-empty">Nenhuma análise salva ainda. Gere uma análise e ela aparece aqui — as {HISTORY_MAX} mais recentes ficam guardadas neste navegador.</p>
                )}
                {history.length > 0 && histFiltered.length === 0 && (
                  <p className="hist-empty">Nenhuma análise corresponde à busca "{histQuery}".</p>
                )}
                {histFiltered.map(h => {
                  const m = MODES.find(mm => mm.id === h.mode);
                  return (
                    <div className="hist-item" key={h.id}>
                      <button className="hist-main" onClick={() => restoreHistory(h)} title="Reabrir esta análise">
                        <span className="help-badge">{m ? m.chip : h.mode}</span>
                        <span className="hist-title">{h.title}</span>
                        <span className="hist-date">{new Date(h.ts).toLocaleString('pt-BR')}</span>
                      </button>
                      <button className="hist-del" title="Excluir do histórico" onClick={() => deleteHistory(h.id)}>×</button>
                    </div>
                  );
                })}
                {history.length > 0 && (
                  <button className="hist-clear" onClick={clearHistory}>Limpar todo o histórico</button>
                )}
          </Modal>
        )}

        {showSettings && (
          <Modal title="⚙ Configurações" onClose={() => setShowSettings(false)} className="settings-modal" bodyClassName="hist-body">
                <div className="set-field">
                  <span className="set-label">Capacidade diária de execução (horas efetivas)</span>
                  <span className="set-hint">Usada na Estimativa de Execução para projetar quantos cenários cabem no dia. Padrão: 5h.</span>
                  <NumberStepper
                    value={settings.dailyHours} min={1} max={12} step={0.5} suffix="h/dia"
                    onChange={v => saveSettings({ ...settings, dailyHours: v })}
                  />
                </div>
                <div className="set-field">
                  <span className="set-label">Overhead operacional (%)</span>
                  <span className="set-hint">Reuniões, registro no Jira, troca de contexto. Padrão: 15%.</span>
                  <NumberStepper
                    value={settings.overheadPct} min={0} max={100} step={5} suffix="%"
                    onChange={v => saveSettings({ ...settings, overheadPct: v })}
                  />
                </div>
                <label className="set-field">
                  <span className="set-label">SLA padrão da sua equipe</span>
                  <span className="set-hint">Usado na Análise de SLA quando você não informar outro no texto. Deixe vazio para o Qa Assistent inferir pela tabela de referência. Ex.: latência p95 &lt; 200ms, error rate &lt; 0,5%, disponibilidade &gt; 99,9%.</span>
                  <textarea
                    rows={3}
                    value={settings.slaDefaults}
                    onChange={e => saveSettings({ ...settings, slaDefaults: e.target.value })}
                    placeholder="Ex.: latência p95 < 200ms, error rate < 0,5%, disponibilidade > 99,9%"
                  />
                </label>
                <p className="set-note">As configurações ficam salvas neste navegador e são enviadas junto com o texto quando o modo as utiliza (Estimativa de Execução e Análise de SLA).</p>
          </Modal>
        )}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
