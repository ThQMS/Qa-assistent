const MAX_CHARS = 50_000;

// Truncamento inteligente: preserva início (60%) e FIM (40%) do documento.
// Em specs reais, critérios de aceite e tratamento de erros costumam estar no
// final — cortar só o rabo jogava fora justamente a parte mais testável.
function smartTruncate(text, max = MAX_CHARS) {
  if (!text || text.length <= max) return text;
  const head = Math.floor(max * 0.6);
  const tail = max - head;
  return (
    text.slice(0, head) +
    "\n\n[... AVISO: trecho intermediário omitido — documento excede " +
    max.toLocaleString("pt-BR") +
    " caracteres. Início e fim foram preservados. ...]\n\n" +
    text.slice(-tail)
  );
}

module.exports = { smartTruncate, MAX_CHARS };
