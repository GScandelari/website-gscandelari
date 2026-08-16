# Plano de Implementação — Seção de Blog

> Documento de instrução para agentes de IA. Descreve o que deve ser feito, em que ordem, e quais decisões técnicas foram tomadas previamente, para que o agente possa executar a implementação sem ambiguidade.

---

## Contexto do Projeto

### Stack atual (antes da implementação do blog)

| Item | Detalhe |
|---|---|
| Tipo | Site estático puro (HTML + CSS + JS vanilla) |
| CSS | Tailwind CSS 4.x (build local com `npm run build:css`) |
| Hosting | Firebase Hosting — projeto `website-scandelari` |
| Deploy | GitHub Actions (`.github/workflows/firebase-deploy.yml`) — push em `main` dispara deploy automático |
| i18n | Sistema próprio via `js/i18n.js` + arquivos `translations/pt.json` e `translations/en.json` |
| Páginas existentes | `index.html`, `carreira.html`, `formacao.html`, `dev-sites.html`, `404.html` |
| Domínio | gscandelari.com.br |

### Constraint fundamental
Firebase Hosting serve **apenas arquivos estáticos**. Não há servidor, não há runtime. Toda solução de blog precisa gerar HTML estático em tempo de build.

---

## Decisão técnica: Eleventy (11ty) como SSG

O agente deve usar **[Eleventy (11ty)](https://github.com/11ty/eleventy)** como gerador de site estático para o blog. Motivos:

- Gera HTML puro, 100% compatível com Firebase Hosting estático
- Suporte nativo a Tailwind CSS
- Zero JavaScript obrigatório no client (apenas o que o projeto já usa)
- Menor footprint de dependências do ecossistema
- Template oficial de referência: [11ty/eleventy-base-blog](https://github.com/11ty/eleventy-base-blog)

### Estratégia de coexistência (sem migrar páginas existentes)

As páginas HTML existentes (`index.html`, `carreira.html`, etc.) **não devem ser migradas** para dentro do Eleventy. A estratégia é:

1. Eleventy constrói **apenas** a seção `/blog` em `_site/blog/`
2. O script de build copia as páginas existentes para `_site/` junto com o output do Eleventy
3. Firebase Hosting serve tudo a partir de `_site/`

Isso mantém o risco baixo, o escopo delimitado e a mudança é totalmente reversível.

---

## Estrutura de diretórios a criar

```
website-gscandelari/
├── blog/                          ← conteúdo dos posts (Markdown)
│   └── posts/
│       └── YYYY-MM-DD-slug.md     ← um arquivo por post
├── _includes/
│   └── layouts/
│       ├── base.njk               ← layout base (head, nav, footer)
│       ├── blog-index.njk         ← página /blog (listagem de posts)
│       └── post.njk               ← template de post individual
├── _data/
│   └── site.js                    ← metadata global (title, url, author)
├── _templates/
│   └── new-post.md                ← template de novo post com frontmatter
├── .eleventy.js                   ← configuração do Eleventy
└── _site/                         ← output do build (ignorado pelo git)
```

---

## Fase 1 — Configuração do Eleventy

### 1.1 Instalar dependências

```bash
npm install --save-dev @11ty/eleventy @11ty/eleventy-plugin-syntaxhighlight
```

O plugin `@11ty/eleventy-plugin-syntaxhighlight` adiciona syntax highlighting nos blocos de código dos posts via Prism.js. Repositório: [11ty/eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight).

### 1.2 Criar `.eleventy.js` na raiz

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Copiar arquivos estáticos existentes para _site/
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("imgs");
  eleventyConfig.addPassthroughCopy("favicon");
  eleventyConfig.addPassthroughCopy("translations");
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("carreira.html");
  eleventyConfig.addPassthroughCopy("formacao.html");
  eleventyConfig.addPassthroughCopy("dev-sites.html");
  eleventyConfig.addPassthroughCopy("404.html");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // Filtro de formatação de data (pt-BR)
  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  // Filtro de tempo de leitura estimado
  eleventyConfig.addFilter("readingTime", (content) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min de leitura`;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

### 1.3 Criar `_data/site.js`

```js
module.exports = {
  title: "Guilherme Scandelari",
  description: "Blog de estudos, artigos e materiais sobre TI, desenvolvimento e tecnologia.",
  url: "https://gscandelari.com.br",
  author: {
    name: "Guilherme Scandelari",
    email: "contato@gscandelari.com.br"
  },
  lang: "pt-BR"
};
```

### 1.4 Atualizar `package.json` — scripts

Substituir/adicionar os seguintes scripts:

```json
"scripts": {
  "build:css": "tailwindcss -i ./css/input.css -o ./css/tailwind.css --minify",
  "watch:css": "tailwindcss -i ./css/input.css -o ./css/tailwind.css --watch",
  "build:site": "eleventy",
  "build": "npm run build:css && npm run build:site",
  "serve": "eleventy --serve",
  "new:post": "node scripts/new-post.js"
}
```

### 1.5 Atualizar `firebase.json`

Mudar o `public` de `"."` para `"_site"`:

```json
{
  "hosting": {
    "site": "website-scandelari",
    "public": "_site",
    ...
  }
}
```

### 1.6 Atualizar `.gitignore`

Adicionar:
```
_site/
```

### 1.7 Atualizar GitHub Actions (`.github/workflows/firebase-deploy.yml`)

Adicionar etapa de build antes do deploy:

```yaml
- name: Install dependencies
  run: npm ci

- name: Build CSS and site
  run: npm run build

- name: Deploy to Firebase Hosting
  ...
```

---

## Fase 2 — Templates Nunjucks

### 2.1 `_includes/layouts/base.njk` — Layout base

Deve replicar o `<head>` padrão das páginas existentes (favicons, Tailwind, Font Awesome, Google Fonts Inter, gtag). A navbar deve incluir o novo link "Blog". O bloco `{% block content %}` é onde cada página injeta seu conteúdo.

Elementos obrigatórios no `<head>`:
- `<meta charset="UTF-8">`
- `<meta name="viewport">`
- `<title>{{ title }} | Guilherme Scandelari</title>`
- Meta description e keywords do frontmatter
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- Favicon (mesmos links das páginas existentes)
- `<link rel="stylesheet" href="/css/tailwind.css">`
- Font Awesome CDN
- Google Fonts Inter
- Google Analytics (mesmo ID: `G-1G1Q9SPLJQ`)
- `<link rel="alternate" type="application/rss+xml" href="/blog/feed.xml">`

A navbar deve ser idêntica à navbar das páginas existentes, com a adição de um link "Blog" apontando para `/blog`.

**Atenção:** O agente deve copiar o HTML exato da navbar e do footer de `index.html` para manter consistência visual total.

### 2.2 `_includes/layouts/blog-index.njk` — Listagem de posts

Layout da página `/blog`. Deve herdar `base.njk` e exibir:

- Hero da seção com título "Blog" e subtítulo descritivo
- Grade de cards de posts (estilo visual dos cards de projetos em `index.html`)
- Cada card contém: título, data formatada (pt-BR), tags como badges, excerpt (primeiros 160 caracteres da descrição do frontmatter), link "Ler artigo"
- Posts ordenados do mais recente para o mais antigo
- Suporte a filtro por tag (JS vanilla, sem framework)
- Paginação se houver mais de 10 posts

### 2.3 `_includes/layouts/post.njk` — Post individual

Layout de cada post. Deve herdar `base.njk` e exibir:

- Breadcrumb: Home > Blog > [Título do post]
- Header: título, data, tempo de leitura (filtro `readingTime`), tags como badges
- Corpo: `{{ content | safe }}` (HTML renderizado do Markdown)
- Syntax highlighting via plugin instalado na Fase 1
- Navegação anterior/próximo (usando `collections.posts`)
- Botões de compartilhar: LinkedIn, X/Twitter, "Copiar link" (JS vanilla)
- Separador visual e CTA de contato no rodapé do post

---

## Fase 3 — Conteúdo: Posts em Markdown

### 3.1 Frontmatter padrão de cada post

Todo arquivo `.md` em `blog/posts/` deve ter o seguinte frontmatter:

```yaml
---
layout: post.njk
title: "Título do artigo"
description: "Descrição curta para SEO e preview nos cards (máx. 160 caracteres)"
date: 2026-08-16
tags:
  - firebase
  - javascript
lang: pt
permalink: /blog/slug-do-artigo/
---
```

### 3.2 Template de novo post (`_templates/new-post.md`)

Criar este arquivo como referência para novos posts. Deve conter o frontmatter acima com campos em branco para preenchimento.

### 3.3 Script de criação de post (`scripts/new-post.js`)

Script Node.js que:
1. Recebe o título via argumento (`node scripts/new-post.js "Meu Artigo"`)
2. Gera o slug a partir do título (lowercase, hífens, sem acentos)
3. Cria o arquivo `blog/posts/YYYY-MM-DD-slug.md` com o frontmatter pré-preenchido
4. Exibe o caminho do arquivo criado

### 3.4 Post de inauguração

Criar 1 post real de inauguração do blog. Sugestão de título: **"Por que criei este blog"**. Conteúdo: motivação para criação do blog, o que será publicado, contexto profissional.

---

## Fase 4 — SEO e Feeds

### 4.1 RSS Feed (`blog/feed.njk`)

Criar arquivo `blog/feed.njk` com permalink `/blog/feed.xml` que gera um feed RSS/Atom válido com os últimos 20 posts. Estrutura padrão Atom 1.0.

### 4.2 Atualizar `sitemap.xml`

O sitemap existente é estático. Após a implementação, criar `sitemap.njk` gerado pelo Eleventy que inclua:
- Todas as páginas existentes
- A página `/blog`
- Todos os posts do blog com `<lastmod>` da data do post

Substituir o `sitemap.xml` estático por este gerado dinamicamente.

### 4.3 Atualizar `robots.txt`

Adicionar linha apontando para o feed RSS:
```
# RSS Feed
# https://gscandelari.com.br/blog/feed.xml
```

---

## Fase 5 — Integração com páginas existentes

### 5.1 Adicionar link "Blog" na navbar

As páginas `index.html`, `carreira.html`, `formacao.html` e `dev-sites.html` têm navbar estática. O agente deve adicionar o link "Blog" → `/blog` na navbar de cada uma dessas páginas.

Também adicionar a chave de i18n correspondente:
- `translations/pt.json`: `"nav.blog": "Blog"`
- `translations/en.json`: `"nav.blog": "Blog"`

### 5.2 Teaser de blog na `index.html`

Na seção de projetos da `index.html`, adicionar um card de destaque para os últimos posts do blog. Como o `index.html` é estático (não processado pelo Eleventy), a solução é:

**Opção A (recomendada para MVP):** Adicionar uma seção estática simples com link para `/blog` e texto descritivo, sem listar posts automaticamente.

**Opção B (mais elaborada):** Migrar `index.html` para `index.njk` dentro do Eleventy, permitindo listar os últimos posts dinamicamente. Isso amplia o escopo mas melhora a automação.

O agente deve implementar a **Opção A** no MVP e registrar a **Opção B** como melhoria futura no `to-do.md`.

---

## Fase 6 — i18n do Blog

### 6.1 Estratégia de idioma para posts

Cada post tem um `lang` no frontmatter (`pt` ou `en`). Não há tradução obrigatória — um post em português não precisa de versão em inglês e vice-versa.

A página `/blog` lista todos os posts. O idioma da UI (labels, botões) segue o idioma selecionado pelo usuário via o sistema i18n existente (`js/i18n.js`).

### 6.2 Chaves i18n a adicionar

Em `translations/pt.json`:
```json
"nav.blog": "Blog",
"blog.hero.eyebrow": "Publicações",
"blog.hero.heading.before": "Meu ",
"blog.hero.heading.gradient": "Blog",
"blog.hero.desc": "Artigos, estudos e materiais sobre desenvolvimento, TI e tecnologia.",
"blog.read.more": "Ler artigo",
"blog.reading.time.label": "min de leitura",
"blog.share": "Compartilhar",
"blog.share.copy": "Copiar link",
"blog.share.copied": "Link copiado!",
"blog.nav.previous": "Artigo anterior",
"blog.nav.next": "Próximo artigo",
"blog.tags.filter": "Filtrar por tag",
"blog.tags.all": "Todos"
```

Em `translations/en.json` — equivalentes em inglês.

---

## Checklist de validação pós-implementação

O agente deve verificar cada item antes de considerar a implementação concluída:

- [ ] `npm run build` executa sem erros
- [ ] `_site/` contém todas as páginas existentes (index.html, carreira.html, etc.) + `/blog/`
- [ ] Acessar `_site/index.html` no browser mostra o site existente sem regressão visual
- [ ] Acessar `_site/blog/index.html` mostra a listagem de posts
- [ ] Acessar o post de inauguração renderiza o Markdown corretamente com syntax highlighting
- [ ] Navbar de todas as páginas tem o link "Blog"
- [ ] `_site/blog/feed.xml` é um XML RSS/Atom válido
- [ ] `_site/sitemap.xml` inclui a URL `/blog` e os posts
- [ ] GitHub Actions faz build e deploy com sucesso após o push
- [ ] Firebase Hosting serve `/blog` corretamente em produção
- [ ] Meta tags Open Graph estão corretas em cada post (verificar com [opengraph.xyz](https://www.opengraph.xyz))
- [ ] `npm run new:post "Título Teste"` cria o arquivo corretamente

---

## Referências técnicas

| Recurso | URL |
|---|---|
| Eleventy — repositório oficial | https://github.com/11ty/eleventy |
| Eleventy — template base de blog | https://github.com/11ty/eleventy-base-blog |
| Plugin syntax highlighting 11ty | https://github.com/11ty/eleventy-plugin-syntaxhighlight |
| Prism.js (syntax highlighting) | https://github.com/PrismJS/prism |
| Markdown-it (parser usado pelo 11ty) | https://github.com/markdown-it/markdown-it |
| Nunjucks (template engine) | https://mozilla.github.io/nunjucks/ |
| Firebase Hosting — documentação | https://firebase.google.com/docs/hosting |
| Eleventy — documentação oficial | https://www.11ty.dev/docs/ |

---

## Notas finais para o agente

1. **Nunca alterar `firebase.json` sem antes verificar** que o diretório `_site/` está sendo gerado corretamente pelo build, para não quebrar o deploy em produção.
2. **Manter o visual exato** do site atual nas páginas do blog — mesmo dark theme (#0f172a), mesmas fontes (Inter), mesmo gradiente azul-roxo (#3B82F6 → #8B5CF6), mesmos cards com `card-hover`.
3. **O Google Analytics ID `G-1G1Q9SPLJQ`** deve estar presente no `base.njk` para rastrear visitas às páginas do blog.
4. **Não remover** o sistema i18n existente. O blog usa o mesmo `js/i18n.js` já presente.
5. **Registrar** no `to-do.md` as melhorias futuras identificadas durante a implementação (ex.: migrar index.html para njk, adicionar busca de posts, sistema de comentários via GitHub Issues, etc.).
