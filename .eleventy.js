const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Páginas HTML existentes e assets estáticos → _site/
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
  eleventyConfig.addPassthroughCopy("llms.txt");

  // Não processar HTML/MD de documentação como templates
  eleventyConfig.ignores.add("index.html");
  eleventyConfig.ignores.add("carreira.html");
  eleventyConfig.ignores.add("formacao.html");
  eleventyConfig.ignores.add("dev-sites.html");
  eleventyConfig.ignores.add("404.html");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("BLOG-PLANO.md");
  eleventyConfig.ignores.add("METODOLOGIA-IA.md");
  eleventyConfig.ignores.add("to-do.md");
  eleventyConfig.ignores.add("_templates/**");
  eleventyConfig.ignores.add("scripts/**");
  eleventyConfig.ignores.add("node_modules/**");

  eleventyConfig.addFilter("dateDisplay", (date, locale = "pt-BR") => {
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("readingMinutes", (content) => {
    const words = String(content || "").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  eleventyConfig.addFilter("filterByTag", (posts, tag) => {
    if (!tag) return posts || [];
    return (posts || []).filter((post) =>
      (post.data.tags || []).includes(tag)
    );
  });

  eleventyConfig.addFilter("excerpt", (description, limit = 160) => {
    const text = String(description || "");
    if (text.length <= limit) return text;
    return text.slice(0, limit).trimEnd() + "…";
  });

  eleventyConfig.addFilter("isoDate", (date) => {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    const root = String(base || "").replace(/\/$/, "");
    const p = String(path || "");
    if (p.startsWith("http")) return p;
    return root + (p.startsWith("/") ? p : "/" + p);
  });

  eleventyConfig.addFilter("urlencode", (value) => {
    return encodeURIComponent(String(value || ""));
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("blog/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("postTags", (collectionApi) => {
    const tags = new Set();
    collectionApi.getFilteredByGlob("blog/posts/*.md").forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (tag && tag !== "posts") tags.add(tag);
      });
    });
    return [...tags].sort((a, b) => a.localeCompare(b, "pt-BR"));
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes/layouts",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
