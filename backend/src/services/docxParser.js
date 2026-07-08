const mammoth = require("mammoth");
const { smartTruncate } = require("./truncate.js");

async function extractTextFromDocx(buffer) {
  let result;
  try {
    result = await mammoth.extractRawText({ buffer });
  } catch (err) {
    throw new Error(`Falha ao processar o arquivo Word: ${err.message}`);
  }

  const cleaned = result.value.replace(/\n{3,}/g, "\n\n").trim();

  if (!cleaned) {
    throw new Error("Não foi possível extrair texto do arquivo Word. O documento pode estar vazio ou protegido.");
  }

  return smartTruncate(cleaned);
}

module.exports = { extractTextFromDocx };
