// Lightweight lazy enhancement for images without explicit loading/decoding
(function () {
  const setLazy = (img) => {
    if (!(img instanceof HTMLImageElement)) return;
    if (img.hasAttribute('loading')) return; // respect explicit settings
    // Skip logos/icons/tiny images
    const src = (img.currentSrc || img.src || '').toLowerCase();
    const cls = (img.className || '').toLowerCase();
    if (src.endsWith('.svg') || cls.includes('logo') || src.includes('favicon')) return;
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.setAttribute('fetchpriority', 'auto');
  };

  const applyAll = () => Array.from(document.images).forEach(setLazy);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAll, { once: true });
  } else {
    applyAll();
  }

  // Observe added images
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const n of m.addedNodes) {
        if (n instanceof HTMLImageElement) setLazy(n);
        if (n.nodeType === 1) {
          const imgs = n.querySelectorAll && n.querySelectorAll('img');
          if (imgs && imgs.length) imgs.forEach(setLazy);
        }
      }
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

