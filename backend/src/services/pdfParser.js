const pdfParse = require("pdf-parse");
const { smartTruncate } = require("./truncate.js");

async function extractText(buffer) {
  let data;
  try {
    data = await pdfParse(buffer);
  } catch (err) {
    throw new Error(`Falha ao processar o PDF: ${err.message}`);
  }

  const cleaned = data.text.replace(/\n{3,}/g, "\n\n").trim();

  if (!cleaned) {
    throw new Error("Não foi possível extrair texto do PDF. O arquivo pode ser escaneado (baseado em imagem).");
  }

  return smartTruncate(cleaned);
}

module.exports = { extractText };
