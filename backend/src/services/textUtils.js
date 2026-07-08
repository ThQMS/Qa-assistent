// A UI do modo Cobertura instrui separar documentação e cenários com uma linha
// "---", mas o prompt espera "=== CENÁRIOS ===". Esta normalização converte a
// primeira linha "---" isolada, a menos que o separador oficial já exista.
function normalizeCoberturaInput(text) {
  if (text.includes("=== CENÁRIOS ===")) return text;
  return text.replace(/^[ \t]*-{3,}[ \t]*$/m, "=== CENÁRIOS ===");
}

module.exports = { normalizeCoberturaInput };
