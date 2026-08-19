// Content-hashes css/tailwind.css and js/i18n.js in the built _site/ output,
// then rewrites every reference to them across all built HTML files.
//
// Why: these files were served with a 7-day Cache-Control but a filename that
// never changes, so once a browser/CDN cached one version it kept serving it
// for up to a week regardless of new deploys — a real bug that shipped a
// stale stylesheet for days. Hashing the filename makes that structurally
// impossible: any content change produces a new URL, so long/immutable
// caching is safe and updates are visible on the very next deploy.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SITE_DIR = path.join(__dirname, "..", "_site");

const ASSETS = [
  { file: path.join(SITE_DIR, "css", "tailwind.css"), pattern: /\/css\/tailwind\.css/g, dir: "css", base: "tailwind", ext: "css" },
  { file: path.join(SITE_DIR, "js", "i18n.js"), pattern: /\/js\/i18n\.js/g, dir: "js", base: "i18n", ext: "js" },
];

function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 10);
}

function walkHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkHtmlFiles(full));
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".xml")) results.push(full);
  }
  return results;
}

function run() {
  const replacements = [];

  for (const asset of ASSETS) {
    if (!fs.existsSync(asset.file)) {
      console.warn(`hash-assets: ${asset.file} not found, skipping.`);
      continue;
    }
    const hash = hashFile(asset.file);
    const hashedName = `${asset.base}.${hash}.${asset.ext}`;
    const hashedPath = path.join(SITE_DIR, asset.dir, hashedName);
    fs.renameSync(asset.file, hashedPath);
    replacements.push({ pattern: asset.pattern, replacement: `/${asset.dir}/${hashedName}` });
    console.log(`hash-assets: /${asset.dir}/${path.basename(asset.file)} -> /${asset.dir}/${hashedName}`);
  }

  if (!replacements.length) return;

  const htmlFiles = walkHtmlFiles(SITE_DIR);
  let filesTouched = 0;
  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, "utf-8");
    let changed = false;
    for (const { pattern, replacement } of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, replacement);
        changed = true;
      }
      pattern.lastIndex = 0;
    }
    if (changed) {
      fs.writeFileSync(file, content, "utf-8");
      filesTouched++;
    }
  }
  console.log(`hash-assets: updated references in ${filesTouched} file(s).`);
}

run();
