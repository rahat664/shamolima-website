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
  // Wait for DOMContentLoaded to let the app render, then apply laziness in idle time
  const onReady = () => {
    (window.requestIdleCallback || setTimeout)(applyAll, 50);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }

  // Observe new images and src changes
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.target instanceof HTMLImageElement) {
        setLazy(m.target);
        continue;
      }
      for (const n of m.addedNodes) {
        if (n instanceof HTMLImageElement) setLazy(n);
        if (n.nodeType === 1) {
          const imgs = n.querySelectorAll && n.querySelectorAll('img');
          if (imgs && imgs.length) imgs.forEach(setLazy);
        }
      }
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
})();
