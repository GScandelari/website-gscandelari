#!/usr/bin/env python3
"""
pack.py — Empacota o version-a-v2 para deploy no Firebase Hosting.

Uso:
    python3 pack.py

O que faz:
  1. Limpa/cria a pasta dist/
  2. Copia index.html e reescreve os caminhos relativos
  3. Remove o bloco do banner template
  4. Copia foto_perfil.png → dist/
  5. Copia os logos de marcas → dist/assets/
  6. Gera dist/firebase.json e dist/.firebaserc
"""

import os
import re
import shutil

# ── Caminhos base ─────────────────────────────────────────────────────────────

BASE      = os.path.dirname(os.path.abspath(__file__))
SRC_HTML  = os.path.join(BASE, "version-a-v2", "index.html")
DIST      = os.path.join(BASE, "dist")
ASSETS    = os.path.join(DIST, "assets")

FOTO_SRC  = os.path.join(BASE, "foto_perfil.png")
LOGOS_SRC = os.path.join(BASE, "..", "..", "Templates", "templates-site-dentista-estetica", "marcas-logo")

LOGOS = [
    "Allergan.png",
    "Rennova.png",
]

# ── 1. Limpar / criar dist/ ───────────────────────────────────────────────────

if os.path.exists(DIST):
    shutil.rmtree(DIST)
    print("  🗑  dist/ existente removida")

os.makedirs(ASSETS)
print("  📁  dist/ e dist/assets/ criadas")

# ── 2. Ler e processar o HTML ─────────────────────────────────────────────────

with open(SRC_HTML, "r", encoding="utf-8") as f:
    html = f.read()

# 2a. Remover o bloco BANNER TEMPLATE
banner_pattern = re.compile(
    r'\s*<!-- BANNER TEMPLATE -->\s*'
    r'<div[^>]*>.*?GSCANDELARI.*?</div>\s*',
    re.DOTALL
)
html, n = banner_pattern.subn("", html)
print(f"  🚫  Banner template removido ({n} ocorrência{'s' if n != 1 else ''})")

# 2b. Substituir caminho da foto do dentista
html = html.replace("/dev-sites/Clientes/dr-douglas-de-siqueira/foto_perfil.png", "foto_perfil.png")
print("  🔗  Caminho de foto_perfil.png corrigido")

# 2c. Substituir caminhos dos logos de marcas
# De: /dev-sites/Templates/templates-site-dentista-estetica/marcas-logo/NOME.png
# Para: assets/NOME.png
html = re.sub(
    r'/dev-sites/Templates/templates-site-dentista-estetica/marcas-logo/([^"]+)',
    r'assets/\1',
    html
)
print("  🔗  Caminhos dos logos de marcas corrigidos")

# ── 3. Salvar index.html em dist/ ────────────────────────────────────────────

out_html = os.path.join(DIST, "index.html")
with open(out_html, "w", encoding="utf-8") as f:
    f.write(html)
print("  ✅  dist/index.html gerado")

# ── 4. Copiar foto_perfil.png ────────────────────────────────────────────────

if os.path.exists(FOTO_SRC):
    shutil.copy2(FOTO_SRC, os.path.join(DIST, "foto_perfil.png"))
    print("  ✅  foto_perfil.png copiada")
else:
    print("  ⚠️   foto_perfil.png NÃO encontrada em:", FOTO_SRC)

# ── 5. Copiar logos de marcas → dist/assets/ ─────────────────────────────────

for logo in LOGOS:
    src = os.path.join(LOGOS_SRC, logo)
    dst = os.path.join(ASSETS, logo)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"  ✅  assets/{logo}")
    else:
        print(f"  ⚠️   Logo NÃO encontrado: {src}")

# ── 6. Gerar firebase.json ───────────────────────────────────────────────────

firebase_json = """{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      ".firebaserc",
      "**/.*"
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "**/*.@(css|js)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=604800" }]
      }
    ],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
"""

with open(os.path.join(DIST, "firebase.json"), "w", encoding="utf-8") as f:
    f.write(firebase_json)
print("  ✅  firebase.json gerado")

# ── 7. Gerar .firebaserc ─────────────────────────────────────────────────────

firebaserc = """{
  "projects": {
    "default": "website-scandelari"
  }
}
"""

with open(os.path.join(DIST, ".firebaserc"), "w", encoding="utf-8") as f:
    f.write(firebaserc)
print("  ✅  .firebaserc gerado (projeto: website-scandelari)")

# ── Resumo ───────────────────────────────────────────────────────────────────

print()
print("═" * 55)
print("  PACKING CONCLUÍDO")
print("═" * 55)
print()

for root, dirs, files in os.walk(DIST):
    level = root.replace(DIST, "").count(os.sep)
    indent = "  " + "  " * level
    if level == 0:
        print(f"  dist/")
    else:
        print(f"{indent}{os.path.basename(root)}/")
    sub = "  " + "  " * (level + 1)
    for fname in files:
        fpath = os.path.join(root, fname)
        size  = os.path.getsize(fpath)
        print(f"{sub}{fname}  ({size:,} bytes)")

print()
print("  PRÓXIMO PASSO:")
print("  1. Abra dist/index.html no navegador e valide visualmente")
print("  2. cd dist && firebase deploy --only hosting")
print()
