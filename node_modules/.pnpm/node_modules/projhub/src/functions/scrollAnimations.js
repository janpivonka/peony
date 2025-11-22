export const initUniversalScrollAnimations = () => {
  const elements = document.querySelectorAll('main section, main div, footer');
  const elementState = new WeakMap();

  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease';
    elementState.set(el, false);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const isActive = elementState.get(el);

        if (entry.intersectionRatio >= 0.1 && !isActive) {
          el.style.opacity = 1;
          el.style.transform = 'translateY(0)';
          elementState.set(el, true);
        } else if (entry.intersectionRatio < 0.01 && isActive) {
          el.style.opacity = 0;
          el.style.transform = 'translateY(20px)';
          elementState.set(el, false);
        }
      });
    },
    { threshold: Array.from({length: 101}, (_, i) => i / 100) }
  );

  elements.forEach(el => observer.observe(el));
};
