/*
 * Testes unitários OFFLINE — sem chamadas à Groq, sem custo de API.
 * Rode com: npm test
 * (Para os testes de prompt com chamadas reais, use: npm run eval)
 */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// groqService instancia o client da Groq no require — em CI não há chave real
process.env.GROQ_API_KEY = process.env.GROQ_API_KEY || "gsk_test_offline";

const { smartTruncate, MAX_CHARS } = require("../src/services/truncate.js");
const { normalizeCoberturaInput } = require("../src/services/textUtils.js");
const { missingSections, REQUIRED_SECTIONS, VALID_MODES } = require("../src/services/groqService.js");

/* ---------------- smartTruncate ---------------- */

test("smartTruncate: texto curto passa intacto", () => {
  assert.equal(smartTruncate("abc", 100), "abc");
  assert.equal(smartTruncate("", 100), "");
  assert.equal(smartTruncate(null, 100), null);
});

test("smartTruncate: texto longo preserva início e fim com marcador", () => {
  const text = "INICIO" + "x".repeat(200) + "FIM";
  const out = smartTruncate(text, 100);
  assert.ok(out.startsWith("INICIO"), "deve preservar o início");
  assert.ok(out.endsWith("FIM"), "deve preservar o fim");
  assert.ok(out.includes("trecho intermediário omitido"), "deve ter o marcador");
});

test("smartTruncate: usa MAX_CHARS=50000 como padrão", () => {
  assert.equal(MAX_CHARS, 50_000);
  const big = "a".repeat(60_000);
  assert.ok(smartTruncate(big).length < 60_000);
  assert.equal(smartTruncate("a".repeat(50_000)).length, 50_000);
});

/* ---------------- normalizeCoberturaInput ---------------- */

test("cobertura: linha '---' vira '=== CENÁRIOS ==='", () => {
  const out = normalizeCoberturaInput("doc\n---\ncenários");
  assert.ok(out.includes("=== CENÁRIOS ==="));
  assert.ok(!out.includes("---"));
});

test("cobertura: '---' com espaços em volta também é convertido", () => {
  const out = normalizeCoberturaInput("doc\n  ---  \ncenários");
  assert.ok(out.includes("=== CENÁRIOS ==="));
});

test("cobertura: separador oficial existente não é alterado", () => {
  const input = "doc\n=== CENÁRIOS ===\ncen\n---\nlinha";
  assert.equal(normalizeCoberturaInput(input), input);
});

test("cobertura: hifens de tabela markdown não são capturados", () => {
  const out = normalizeCoberturaInput("| ID | X |\n|----|---|\n---\ncen");
  assert.ok(out.indexOf("=== CENÁRIOS ===") > out.indexOf("|----|"));
});

test("cobertura: texto sem separador passa intacto", () => {
  assert.equal(normalizeCoberturaInput("doc sem separador"), "doc sem separador");
});

/* ---------------- missingSections (auto-correção) ---------------- */

test("todos os modos têm seções obrigatórias mapeadas", () => {
  for (const mode of VALID_MODES) {
    assert.ok(Array.isArray(REQUIRED_SECTIONS[mode]) && REQUIRED_SECTIONS[mode].length > 0,
      `modo "${mode}" sem REQUIRED_SECTIONS`);
  }
});

test("missingSections: resposta completa não acusa faltas", () => {
  const output = REQUIRED_SECTIONS.bug.map(s => `## ${s}\nconteúdo`).join("\n");
  assert.deepEqual(missingSections("bug", output), []);
});

test("missingSections: seção ausente é detectada", () => {
  const missing = missingSections("bug", "## Análise do Defeito\nSeveridade: Alta");
  assert.deepEqual(missing, ["Story Points"]);
});

test("missingSections: recusa legítima (⚠) não dispara checagem", () => {
  assert.deepEqual(missingSections("casos", "⚠️ Documento inválido: não é software."), []);
});

test("missingSections: recusa embrulhada em markdown (**⚠️...**) também é reconhecida", () => {
  assert.deepEqual(missingSections("casos", "**⚠️ Documento inválido:** não é software."), []);
  assert.deepEqual(missingSections("casos", "  > ⚠️ Documentação insuficiente."), []);
});

test("missingSections: seções extras (espec com duas versões exige Seção 4)", () => {
  const base = REQUIRED_SECTIONS.espec.map(s => `## ${s}\nconteúdo`).join("\n");
  assert.deepEqual(missingSections("espec", base, ["Seção 4"]), ["Seção 4"]);
  assert.deepEqual(missingSections("espec", base + "\n## Seção 4\ndiff", ["Seção 4"]), []);
  assert.deepEqual(missingSections("espec", base), []); // sem duas versões, Seção 4 não é exigida
});

/* ---------------- conversores de export (frontend) ---------------- */

function loadFrontendConverters() {
  const src = fs.readFileSync(path.join(__dirname, "..", "frontend", "app.jsx"), "utf8");
  const start = src.indexOf("/* ---------------- export Jira");
  const end = src.indexOf("/* ---------------- streaming");
  assert.ok(start !== -1 && end !== -1, "bloco de export não encontrado no app.jsx");
  return new Function(src.slice(start, end) + "\nreturn { mdToJira, tablesToCsv };")();
}

const MD = [
  "## ✅ Happy Path",
  "| ID | Cenário | Resultado |",
  "|----|---------|-----------|",
  "| HP-01 | Login **ok** | HTTP `200` |",
  "",
  "- item",
  "1. numerado"
].join("\n");

test("mdToJira: headings, tabelas, negrito e código convertidos", () => {
  const { mdToJira } = loadFrontendConverters();
  const jira = mdToJira(MD);
  assert.ok(jira.includes("h2. ✅ Happy Path"));
  assert.ok(jira.includes("||ID||Cenário||Resultado||"));
  assert.ok(jira.includes("|HP-01|Login *ok*|HTTP {{200}}|"));
  assert.ok(jira.includes("* item"));
  assert.ok(jira.includes("# numerado"));
  assert.ok(!jira.includes("|----"));
});

test("tablesToCsv: BOM, seção e aspas escapadas", () => {
  const { tablesToCsv } = loadFrontendConverters();
  const csv = tablesToCsv('## Sec\n| A | B |\n|---|---|\n| x, "y" | z |');
  assert.ok(csv.startsWith("﻿"));
  assert.ok(csv.includes('"Seção","A","B"'));
  assert.ok(csv.includes('"x, ""y""","z"'));
});

test("tablesToCsv: resultado sem tabela retorna vazio", () => {
  const { tablesToCsv } = loadFrontendConverters();
  assert.equal(tablesToCsv("texto sem tabela nenhuma"), "");
});
