module.exports = {
  eleventyComputed: {
    title: (data) => data.post.title,
    description: (data) => data.post.description,
    tags: (data) => data.post.tags,
    lang: (data) => data.post.lang,
    date: (data) => new Date(data.post.date),
  },
};
