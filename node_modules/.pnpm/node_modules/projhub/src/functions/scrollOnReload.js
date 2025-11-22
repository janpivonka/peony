(function () {
  try {
    const nav = performance.getEntriesByType && performance.getEntriesByType("navigation");
    const isReload = nav && nav[0] && nav[0].type === "reload";

    if (isReload) {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      window.scrollTo(0, 0);

      window.addEventListener('load', function () {
        try {
          setTimeout(function () {
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'auto';
            }
          }, 50);
        } catch (e) {}
      }, { once: true });
    }
  } catch (e) {
    console.error('scrollOnReload error:', e);
  }
})();
