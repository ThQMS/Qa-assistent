// Aplica o ícone do robozinho ao BINÁRIO BASE do Node no cache do pkg, ANTES
// do empacotamento (roda no prepackage:win). Editar o exe final corromperia o
// payload que o pkg anexa ao binário — por isso o ícone entra na base.
// O .ico vem de build/icon.ico (gerado de public/assets/favicon.svg).
const path = require("path");
const fs = require("fs");
const os = require("os");
const rceditMod = require("rcedit");
const rcedit = rceditMod.default || rceditMod.rcedit || rceditMod;

const ico = path.join(__dirname, "build", "icon.ico");
const cacheRoot = process.env.PKG_CACHE_PATH || path.join(os.homedir(), ".pkg-cache");

if (!fs.existsSync(ico)) {
  console.warn("set-icon: build/icon.ico não encontrado — exe fica com o ícone padrão do Node.");
  process.exit(0);
}
if (!fs.existsSync(cacheRoot)) {
  console.warn("set-icon: cache do pkg ainda não existe (primeira execução) — rode npm run package:win duas vezes.");
  process.exit(0);
}

// Encontra os binários base win-x64 no cache (ex.: v3.6/fetched-v22.23.1-win-x64)
const bases = [];
for (const version of fs.readdirSync(cacheRoot)) {
  const dir = path.join(cacheRoot, version);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir)) {
    if (/win-x64$/.test(file) && !file.endsWith(".branded")) bases.push(path.join(dir, file));
  }
}

if (bases.length === 0) {
  console.warn("set-icon: nenhum binário base win-x64 no cache — rode npm run package:win duas vezes.");
  process.exit(0);
}

(async () => {
  for (const base of bases) {
    const marker = base + ".branded";
    if (fs.existsSync(marker)) {
      console.log("set-icon: já aplicado em", path.basename(base));
      continue;
    }
    await rcedit(base, {
      icon: ico,
      "version-string": {
        ProductName: "Qa Assistent",
        FileDescription: "Assistente local de QA — análise de documentação e planejamento de testes"
      }
    });
    fs.writeFileSync(marker, new Date().toISOString());
    console.log("set-icon: ícone aplicado ao binário base", path.basename(base));
  }
})().catch(err => {
  console.error("set-icon: falha:", err.message);
  process.exit(1);
});
