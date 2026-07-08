// Compila o fonte JSX do frontend (frontend/app.jsx) para public/app.js.
// Build não-destrutivo: nunca sobrescreve arquivos fonte.
// Uso: npm run build:front (roda automaticamente antes de package:win/mac)
const fs = require("fs");
const path = require("path");
const Babel = require("./public/vendor/babel.min.js");

const src = path.join(__dirname, "frontend", "app.jsx");
const out = path.join(__dirname, "public", "app.js");

const jsx = fs.readFileSync(src, "utf8");
const compiled = Babel.transform(jsx, {
  presets: ["react"],
  sourceType: "script"
}).code;

const banner = "/* ARQUIVO GERADO — não edite. Fonte: frontend/app.jsx (npm run build:front) */\n";
fs.writeFileSync(out, banner + compiled + "\n", "utf8");
console.log(`frontend compilado: frontend/app.jsx -> public/app.js (${(banner + compiled).length} bytes)`);
