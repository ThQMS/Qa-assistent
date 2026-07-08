const { Router } = require("express");
const { chat, review, VALID_MODES } = require("../services/groqService.js");

const router = Router();

// POST /api/review — auto-revisão (segunda passada crítica) de uma análise
router.post("/review", async (req, res) => {
  try {
    const { mode, document, result } = req.body;

    if (!mode || !VALID_MODES.includes(mode)) {
      return res.status(400).json({ error: "Campo 'mode' inválido." });
    }
    if (!result || typeof result !== "string" || !result.trim()) {
      return res.status(400).json({ error: "Campo 'result' (análise a revisar) é obrigatório." });
    }

    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    const send = obj => res.write(JSON.stringify(obj) + "\n");

    try {
      await review(mode, document || "", result, delta => send({ type: "delta", text: delta }));
      send({ type: "done" });
    } catch (modelErr) {
      console.error("[review:stream]", modelErr.message);
      send({ type: "error", message: modelErr.message });
    }
    res.end();
  } catch (err) {
    console.error("[review]", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { mode, messages } = req.body;

    if (!mode || !VALID_MODES.includes(mode)) {
      return res.status(400).json({ error: "Campo 'mode' inválido." });
    }
    if (!Array.isArray(messages) || messages.length < 2) {
      return res.status(400).json({ error: "Histórico de mensagens inválido." });
    }

    // Resposta em streaming NDJSON (mesmo protocolo do /api/analyze)
    res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    const send = obj => res.write(JSON.stringify(obj) + "\n");

    try {
      await chat(mode, messages, delta => send({ type: "delta", text: delta }));
      send({ type: "done" });
    } catch (modelErr) {
      console.error("[chat:stream]", modelErr.message);
      send({ type: "error", message: modelErr.message });
    }
    res.end();
  } catch (err) {
    console.error("[chat]", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

module.exports = router;
