const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const { exec } = require("child_process");
const { join } = require("path");

dotenv.config();

if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
  console.error("\n[ERRO] GROQ_API_KEY não configurada.");
  console.error("Abra o arquivo .env e adicione sua chave do Groq.");
  console.error("Acesse https://console.groq.com para criar uma chave gratuita.\n");
  process.exit(1);
}

const analyzeRouter = require("./routes/analyze.js");
const chatRouter   = require("./routes/chat.js");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({ contentSecurityPolicy: false }));

// CORS restrito a localhost - nunca exposto na rede da empresa
app.use(cors({
  origin: (origin, callback) => {
    const allowed = !origin || origin.startsWith("http://localhost");
    if (allowed) callback(null, true);
    else callback(new Error("CORS: origem não permitida"));
  }
}));

// Rate limit: 100 req / 15 min por IP — folga para sessões com chat de refinamento,
// mantendo proteção contra loop acidental
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições. Aguarde alguns minutos e tente novamente." }
});

app.use(express.json({ limit: "1mb" }));
app.use("/api", apiLimiter, analyzeRouter);
app.use("/api", apiLimiter, chatRouter);

// Rota de API desconhecida responde 404 em JSON (e não o index.html do catch-all)
app.use("/api", (_req, res) => res.status(404).json({ error: "Rota de API não encontrada." }));

// Serve o frontend estático.
const publicDir = join(__dirname, "..", "public");
app.use(express.static(publicDir));
app.get("*", (_req, res) => res.sendFile(join(publicDir, "index.html")));

app.use((err, _req, res, _next) => {
  if (err.message && err.message.startsWith("CORS")) {
    return res.status(403).json({ error: "Origem não permitida." });
  }
  console.error("[server error]", err.message);
  res.status(500).json({ error: "Erro interno do servidor." });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`\nQa Assistent rodando em http://localhost:${PORT}\n`);
  const url = `http://localhost:${PORT}`;
  const cmd = process.platform === "win32" ? `cmd /c start "" "${url}"`
    : process.platform === "darwin" ? `open ${url}`
    : `xdg-open ${url}`;
  exec(cmd);
});
