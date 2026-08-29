const CMS_API_URL = "https://southamerica-east1-gscandelari-cms.cloudfunctions.net/api";
const FETCH_TIMEOUT_MS = 8000;

module.exports = async function () {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${CMS_API_URL}/posts`, { signal: controller.signal });
    if (!res.ok) {
      console.error(`cmsPosts: CMS API returned ${res.status}, skipping CMS posts for this build.`);
      return [];
    }

    const posts = await res.json();
    // One entry per published post in its original language, plus one more
    // per locale it has an edited translation for (see translations.en on
    // the post) — each becomes its own page (/blog/<slug>/, /en/blog/<slug>/,
    // ...). `locale` distinguishes them for permalink/collection purposes;
    // it's not the same as `lang`, which describes the language of THIS
    // entry's own content and already existed before translations did.
    return posts
      .filter((post) => post.published)
      .flatMap((post) => {
        const entries = [
          {
            id: post.id,
            slug: post.slug,
            title: post.title,
            description: post.description || "",
            tags: post.tags || [],
            lang: post.lang || "pt",
            locale: "pt",
            date: post.createdAt,
            content: post.content,
          },
        ];

        const en = post.translations && post.translations.en;
        if (en && en.title && en.content) {
          entries.push({
            id: post.id,
            slug: post.slug,
            title: en.title,
            description: en.description || "",
            tags: post.tags || [],
            lang: "en",
            locale: "en",
            date: post.createdAt,
            content: en.content,
          });
        }

        return entries;
      });
  } catch (err) {
    console.error("cmsPosts: failed to fetch posts from CMS, skipping for this build:", err.message);
    return [];
  } finally {
    clearTimeout(timeout);
  }
};
