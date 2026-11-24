(() => {
  const meter = document.querySelector('[data-reading-progress]');
  if (!meter) return;
  let frame = 0;
  let previous = -1;

  function update() {
    frame = 0;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 1;
    const percent = Math.round(ratio * 100);
    if (percent === previous) return;
    previous = percent;
    meter.style.setProperty('--remaining', (100 - percent) + '%');
    meter.setAttribute('aria-valuenow', String(percent));
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  meter.hidden = false;
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  document.fonts?.ready.then(schedule);
})();
