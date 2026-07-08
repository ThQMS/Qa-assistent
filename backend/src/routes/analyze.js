const { Router } = require("express");
const multer = require("multer");
const { extractText } = require("../services/pdfParser.js");
const { extractTextFromDocx } = require("../services/docxParser.js");
const { analyzeDocument, VALID_MODES } = require("../services/groqService.js");
const { smartTruncate } = require("../services/truncate.js");
const { normalizeCoberturaInput } = require("../services/textUtils.js");

const router = Router();

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isPdf  = file.mimetype === "application/pdf";
    const isDocx = file.mimetype === DOCX_MIME || /\.docx$/i.test(file.originalname);
    if (isPdf || isDocx) cb(null, true);
    else cb(new Error("Formato não suportado. Envie um arquivo PDF ou Word (.docx)."));
  }
});

const uploadFields = upload.fields([
  { name: "file",    maxCount: 1 },
  { name: "fileOld", maxCount: 1 }
]);

function handleMulterError(err, _req, res, next) {
  if (err?.code === "LIMIT_FILE_SIZE") return res.status(400).json({ error: "O arquivo excede o limite de 10 MB." });
  if (err?.message) return res.status(400).json({ error: err.message });
  next(err);
}

async function extractFileText(file) {
  const isDocx = file.mimetype === DOCX_MIME || /\.docx$/i.test(file.originalname);
  return isDocx ? await extractTextFromDocx(file.buffer) : await extractText(file.buffer);
}

// POST /api/analyze
router.post("/analyze", uploadFields, handleMulterError, async (req, res) => {
  try {
    const { mode, text: rawText } = req.body;

    if (!mode || !VALID_MODES.includes(mode)) {
      return res.status(400).json({ error: `Campo "mode" obrigatório. Valores aceitos: ${VALID_MODES.join(", ")}` });
    }

    const mainFile = req.files?.file?.[0];
    const oldFile  = req.files?.fileOld?.[0];

    let documentText = "";
    if (mainFile) {
      documentText = await extractFileText(mainFile);
    } else if (rawText) {
      documentText = smartTruncate(rawText.replace(/\0/g, "").trim());
    } else {
      return res.status(400).json({ error: "Envie um arquivo PDF ou Word (.docx), ou cole o texto." });
    }

    if (!documentText) return res.status(400).json({ error: "O documento está vazio após processamento." });

    if (mode === "cobertura") {
      documentText = normalizeCoberturaInput(documentText);
    }

    if (mode === "espec") {
      let oldText = "";
      if (oldFile) {
        oldText = await extractFileText(oldFile);
      } else if (req.body.textOld) {
        oldText = smartTruncate(req.body.textOld.replace(/\0/g, "").trim());
      }
      if (oldText) documentText = documentText + "\n\n=== VERSÃO ANTERIOR ===\n\n" + oldText;
    }

    // Resposta em streaming NDJSON: uma linha JSON por evento.
    // context = doc processado (para o chat), delta = trecho da resposta.
    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    const send = obj => res.write(JSON.stringify(obj) + "\n");

    // 30k chars ≈ 8k tokens: cabe folgado no contexto do modelo. smartTruncate
    // (e não slice) para preservar também o FIM do texto — onde ficam a
    // "VERSÃO ANTERIOR" (modo espec) e os critérios/erros de specs longas
    send({ type: "context", text: smartTruncate(documentText, 30000) });
    try {
      await analyzeDocument(documentText, mode, delta => send({ type: "delta", text: delta }));
      send({ type: "done" });
    } catch (modelErr) {
      console.error("[analyze:stream]", modelErr.message);
      send({ type: "error", message: modelErr.message });
    }
    res.end();
  } catch (err) {
    // Erros antes do streaming começar (validação, extração de arquivo)
    console.error("[analyze]", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

module.exports = router;
