/* ───────────────────────────────────────────────────────────
   Portfolio Slider — mobile-first, accessible, performant
   Controls: arrow buttons · keyboard ← → · swipe/drag
─────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── DOM refs ─────────────────────────────────────────── */
  const track     = document.getElementById('slider-track');
  const wrapper   = document.getElementById('slider-wrapper');
  const btnPrev   = document.getElementById('prev-btn');
  const btnNext   = document.getElementById('next-btn');
  const cntCur    = document.getElementById('counter-current');
  const cntTot    = document.getElementById('counter-total');
  const fillBar   = document.getElementById('progress-fill');
  const cards     = Array.from(document.querySelectorAll('.project-card'));

  const TOTAL      = cards.length;
  const AUTO_MS    = 5200;
  const SWIPE_THR  = 48; // px threshold to register a swipe

  let current   = 0;
  let timer     = null;

  /* ── Initialise ───────────────────────────────────────── */
  // Write total count
  cntTot.textContent = pad(TOTAL);

  // Attach per-card accent colour to bg element
  cards.forEach((card) => {
    const color = card.dataset.color || '#7c3aed';
    const bg = card.querySelector('.project-card-bg');
    if (bg) bg.style.background = color;
  });

  /* ── Pad helper ───────────────────────────────────────── */
  function pad(n) {
    return String(n).padStart(2, '0');
  }

  /* ── Navigate to slide ────────────────────────────────── */
  function goTo(index) {
    current = ((index % TOTAL) + TOTAL) % TOTAL;

    // Slide the track
    track.style.transform = `translateX(-${current * 100}%)`;

    // Update counter
    cntCur.textContent = pad(current + 1);

    // Update progress bar width (percentage of total)
    fillBar.style.width = `${((current + 1) / TOTAL) * 100}%`;

    // Announce to screen readers via aria-live on #counter-wrap
    // (the live region is on the parent #counter-wrap already)
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* ── Auto-advance ─────────────────────────────────────── */
  function startAuto() {
    stopAuto();
    timer = setInterval(next, AUTO_MS);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  startAuto();

  /* ── Pause on hover/focus (desktop) ──────────────────── */
  wrapper.addEventListener('mouseenter', stopAuto);
  wrapper.addEventListener('mouseleave', startAuto);
  wrapper.addEventListener('focusin',   stopAuto);
  wrapper.addEventListener('focusout',  startAuto);

  /* ── Button clicks ────────────────────────────────────── */
  btnNext.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  btnPrev.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  /* ── Keyboard navigation ──────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); startAuto(); }
  });

  /* ── Touch / pointer swipe ────────────────────────────── */
  let pointerStartX = null;
  let isDragging    = false;

  wrapper.addEventListener('pointerdown', (e) => {
    // Only handle primary button / touch
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStartX = e.clientX;
    isDragging    = false;
    stopAuto();
    wrapper.setPointerCapture(e.pointerId);
  }, { passive: true });

  wrapper.addEventListener('pointermove', (e) => {
    if (pointerStartX === null) return;
    if (Math.abs(e.clientX - pointerStartX) > 8) isDragging = true;
  }, { passive: true });

  wrapper.addEventListener('pointerup', (e) => {
    if (pointerStartX === null) return;
    const dx = e.clientX - pointerStartX;
    if (Math.abs(dx) >= SWIPE_THR && isDragging) {
      dx < 0 ? next() : prev();
    }
    pointerStartX = null;
    isDragging    = false;
    startAuto();
  }, { passive: true });

  wrapper.addEventListener('pointercancel', () => {
    pointerStartX = null;
    isDragging    = false;
    startAuto();
  }, { passive: true });

  /* ── Initialise display ───────────────────────────────── */
  goTo(0);

})();
