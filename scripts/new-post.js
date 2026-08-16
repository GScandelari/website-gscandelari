#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Uso: npm run new:post -- "Título do Artigo"');
  process.exit(1);
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePermalink(value) {
  return String(value || "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

function findPermalinkConflict(postsDir, slug) {
  if (!fs.existsSync(postsDir)) return null;

  const target = normalizePermalink(`/blog/${slug}`);
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const full = path.join(postsDir, file);
    const text = fs.readFileSync(full, "utf8");
    const match = text.match(/^permalink:\s*(.+)$/m);
    if (match && normalizePermalink(match[1]) === target) {
      return file;
    }

    // Também bloqueia arquivos cujo slug (após a data) já coincide
    const base = file.replace(/\.md$/, "");
    const withoutDate = base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
    if (withoutDate === slug) {
      return file;
    }
  }

  return null;
}

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");
const date = `${yyyy}-${mm}-${dd}`;
const slug = slugify(title);
const filename = `${date}-${slug}.md`;
const postsDir = path.join(__dirname, "..", "blog", "posts");
const filepath = path.join(postsDir, filename);

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

if (fs.existsSync(filepath)) {
  console.error(`Arquivo já existe: ${filepath}`);
  process.exit(1);
}

const conflict = findPermalinkConflict(postsDir, slug);
if (conflict) {
  console.error(
    `Permalink /blog/${slug}/ já está em uso por ${conflict}. Escolha outro título ou ajuste o permalink manualmente.`
  );
  process.exit(1);
}

const content = `---
layout: post.njk
title: "${title.replace(/"/g, '\\"')}"
description: ""
date: ${date}
tags:
  - 
lang: pt
permalink: /blog/${slug}/
---

Escreva o conteúdo do artigo em Markdown aqui.
`;

fs.writeFileSync(filepath, content, "utf8");
console.log(`Post criado: ${path.relative(process.cwd(), filepath)}`);
