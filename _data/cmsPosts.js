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
    return posts
      .filter((post) => post.published)
      .map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description || "",
        tags: post.tags || [],
        lang: post.lang || "pt",
        date: post.createdAt,
        content: post.content,
      }));
  } catch (err) {
    console.error("cmsPosts: failed to fetch posts from CMS, skipping for this build:", err.message);
    return [];
  } finally {
    clearTimeout(timeout);
  }
};
