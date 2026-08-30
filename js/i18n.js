const cache = {};

async function loadTranslations(lang) {
  if (cache[lang]) return cache[lang];
  try {
    const res = await fetch(`/translations/${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cache[lang] = await res.json();
  } catch {
    cache[lang] = {};
  }
  return cache[lang];
}

async function t(key, lang) {
  const resolved = lang || localStorage.getItem('lang') || 'pt';
  const translations = await loadTranslations(resolved);
  return translations[key];
}

function formatDate(iso, lang) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const locale = lang === 'en' ? 'en-US' : 'pt-BR';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function applyDates(lang) {
  document.querySelectorAll('[data-i18n-date]').forEach((el) => {
    const iso = el.getAttribute('datetime');
    if (!iso) return;
    el.textContent = formatDate(iso, lang);
  });
}

// Blog post cards carry both URLs (data-pt-href always; data-en-href only
// when that post has an edited translation) so they follow the current
// language instead of always linking to the Portuguese page. A post with no
// translation has no data-en-href, so it just stays on the Portuguese URL
// even in English mode — no dead link to a page that doesn't exist.
function applyLocaleLinks(lang) {
  document.querySelectorAll('[data-pt-href]').forEach((el) => {
    const enHref = el.dataset.enHref;
    const ptHref = el.dataset.ptHref;
    el.setAttribute('href', lang === 'en' && enHref ? enHref : ptHref);
  });
}

async function applyLang(lang) {
  const translations = await loadTranslations(lang);
  if (!Object.keys(translations).length) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[key] !== undefined) el.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (translations[key] !== undefined) el.innerHTML = translations[key];
  });

  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    const key = el.dataset.i18nContent;
    if (translations[key] !== undefined) el.setAttribute('content', translations[key]);
  });

  applyDates(lang);
  applyLocaleLinks(lang);

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  localStorage.setItem('lang', lang);
  updateToggleButton(lang);
}

function updateToggleButton(lang) {
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'pt' ? 'EN' : 'PT';
}

window.i18n = { t, applyLang, loadTranslations };

document.addEventListener('DOMContentLoaded', async () => {
  const lang = localStorage.getItem('lang') || 'pt';
  await applyLang(lang);

  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'pt';
    applyLang(current === 'pt' ? 'en' : 'pt');
  });
});
