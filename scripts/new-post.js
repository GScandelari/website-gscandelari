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
