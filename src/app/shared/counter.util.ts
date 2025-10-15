export function animateCount(el: HTMLElement, to: number, dur = 1200) {
  const start = performance.now(); const from = 0;
  const step = (t: number) => {
    const p = Math.min(1, (t - start) / dur);
    el.textContent = Math.floor(from + (to - from) * (1 - Math.pow(1 - p, 3))).toString();
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
