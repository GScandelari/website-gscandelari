# Melhorias futuras — Blog

- Adicionar busca de posts na página `/blog`.
- Syntax highlighting (Prism) nos posts vindos do CMS — hoje só os posts em
  `blog/posts/*.md` têm highlighting; posts do CMS renderizam Markdown puro
  (blocos de código funcionam, mas sem cor). Decisão consciente da v1 da
  integração CMS ↔ Eleventy, ver `blog/cms-posts.md` e `_data/cmsPosts.js`.
- Posts do CMS não devem começar o conteúdo com um heading `#` (h1) — a
  página já renderiza o `title` como h1 via `post.njk`; comece com texto
  normal ou `##` (h2), igual à convenção já usada nos posts em arquivo.
- Sistema de comentários via GitHub Issues (ou similar).
- Imagens OG específicas por post.
- Paginação com URLs amigáveis e SEO adicional quando o volume de posts crescer.
