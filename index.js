/* ───────────────────────────────────────────────────────────
   Portfolio landing page — vanilla JS
   Progress · nav · scroll-spy · reveals · spotlight · tilt ·
   typewriter · ticker · image loading
─────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress bar ─────────────────────────────── */
  const progress = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Nav: scrolled state + mobile toggle ─────────────── */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Scroll-spy ──────────────────────────────────────── */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const spyLinks = Array.from(document.querySelectorAll('.nav-link'));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        spyLinks.forEach((l) =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((s) => spy.observe(s));

  /* ── Reveal on scroll + stagger ──────────────────────── */
  const revealEls = Array.from(document.querySelectorAll('.reveal'));

  revealEls.forEach((el) => {
    const group = el.closest('.container, #hero') || el.parentElement;
    const siblings = group ? Array.from(group.querySelectorAll(':scope > .reveal, :scope .project-row.reveal')) : [el];
    const idx = siblings.indexOf(el);
    if (idx >= 0) el.style.transitionDelay = Math.min(idx * 70, 420) + 'ms';
  });

  if (REDUCED || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObs.observe(el));
  }

  /* ── Cursor spotlight (fine pointer only) ────────────── */
  const canSpotlight = window.matchMedia('(pointer: fine)').matches && !REDUCED;
  const body = document.body;

  if (canSpotlight) {
    body.classList.add('spotlight-on');
    window.addEventListener('pointermove', (e) => {
      body.style.setProperty('--mx', e.clientX + 'px');
      body.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  }

  /* ── 3D tilt on project mockups ──────────────────────── */
  const tiltEls = Array.from(document.querySelectorAll('.tilt'));

  if (canSpotlight) {
    tiltEls.forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * 10;
        const ry = (px - 0.5) * 12;
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ── Typewriter ──────────────────────────────────────── */
  const typeTarget = document.getElementById('typewriter');
  const ROLES = ['Java Backend', 'Game Developer', 'AI Engineer', 'Spring Boot'];

  if (typeTarget && !REDUCED) {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const type = () => {
      const word = ROLES[roleIdx];
      charIdx = deleting ? charIdx - 1 : charIdx + 1;
      typeTarget.textContent = word.slice(0, charIdx);

      let delay = deleting ? 34 : 74;
      if (!deleting && charIdx === word.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
        delay = 420;
      }
      setTimeout(type, delay);
    };
    type();
  } else if (typeTarget) {
    typeTarget.textContent = ROLES[0];
  }

  /* ── Ticker: duplicate for seamless loop ─────────────── */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) tickerTrack.innerHTML += tickerTrack.innerHTML;

  /* ── Mockup images: fade in when loaded, hide the placeholder art ── */
  const revealImage = (img) => {
    img.classList.add('is-loaded');
    img.closest('.mockup-screen')?.classList.add('art-loaded');
  };
  document.querySelectorAll('.mockup-img').forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      revealImage(img);
    } else {
      img.addEventListener('load', () => revealImage(img));
    }
  });

  /* ── Project screenshot galleries ─────────────────────── */
  document.querySelectorAll('.mockup-gallery').forEach((gallery) => {
    const track = gallery.querySelector('.gallery-track');
    const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
    const dotsWrap = gallery.querySelector('.gallery-dots');
    const btnPrev = gallery.querySelector('.gallery-prev');
    const btnNext = gallery.querySelector('.gallery-next');
    if (!track || slides.length < 2) return;

    const AUTOPLAY_MS = 4000;
    let current = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to screenshot ' + (i + 1));
      dot.addEventListener('click', () => { stop(); goTo(i); start(); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(index) {
      current = ((index % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + current * 100 + '%)';

      const img = slides[current].querySelector('.mockup-img');
      if (img && img.complete && img.naturalWidth > 0) revealImage(img);

      dots.forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function start() {
      stop();
      if (!REDUCED) timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }

    btnNext.addEventListener('click', () => { stop(); next(); start(); });
    btnPrev.addEventListener('click', () => { stop(); prev(); start(); });

    gallery.addEventListener('pointerenter', stop);
    gallery.addEventListener('pointerleave', start);
    gallery.addEventListener('focusin', stop);
    gallery.addEventListener('focusout', start);

    /* Touch / pen swipe only — desktop uses buttons (avoids clashing with tilt) */
    let startX = null;
    gallery.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        startX = e.clientX;
        stop();
      }
    }, { passive: true });
    gallery.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? next() : prev());
      startX = null;
      start();
    }, { passive: true });

    goTo(0);
    start();
  });

  /* ── Footer year ─────────────────────────────────────── */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
