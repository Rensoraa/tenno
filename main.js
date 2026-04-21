/* ============================================
   TENNO — main.js
   Loader + Scroll Reveal + Footer Year
   ============================================ */

// ── Loader ──────────────────────────────────
(function initLoader() {
  const loader   = document.getElementById('loader');
  const bar      = document.querySelector('.loader-bar');
  const pct      = document.querySelector('.loader-pct');
  const main     = document.getElementById('main');

  let progress   = 0;
  const DURATION = 4200; // ms — well under 5 s
  const INTERVAL = 40;   // tick every 40 ms
  const STEPS    = DURATION / INTERVAL;
  const INCREMENT = 100 / STEPS;

  const tick = setInterval(() => {
    // Ease-in: slow start, faster toward end
    const ease = progress < 60
      ? INCREMENT * 0.7
      : progress < 85
        ? INCREMENT * 1.1
        : INCREMENT * 1.5;

    progress = Math.min(progress + ease, 100);

    bar.style.width  = progress + '%';
    pct.textContent  = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(tick);
      finishLoad();
    }
  }, INTERVAL);

  function finishLoad() {
    setTimeout(() => {
      loader.classList.add('fade-out');
      main.classList.remove('hidden');

      // Wait for fade-out, then reveal main
      setTimeout(() => {
        loader.style.display = 'none';
        main.classList.add('visible');
      }, 620);
    }, 200);
  }
})();


// ── Scroll Reveal ────────────────────────────
(function initScrollReveal() {
  // Add .reveal class to all section children
  const targets = document.querySelectorAll(
    'section > *, footer'
  );

  targets.forEach(el => {
    if (!el.classList.contains('section-label')) {
      el.classList.add('reveal');
    }
  });

  // Also reveal section-labels and hero elements
  document.querySelectorAll(
    '.section-label, .hero-text > *, .hero-pfp-wrap, ' +
    '.game-card, .hobby-item, .stat'
  ).forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger children if the parent has multiple .reveal children
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Slight stagger per element within its parent
    el.style.transitionDelay = (i % 6) * 0.07 + 's';
    observer.observe(el);
  });
})();


// ── Footer Year ──────────────────────────────
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


// ── Nav: active link on scroll ───────────────
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.style.color = '';
        });
        const active = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (active) active.style.color = 'var(--white)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


// ── Smooth cursor subtle effect ──────────────
(function initSubtleParallax() {
  const pfpDeco = document.querySelector('.pfp-deco');
  if (!pfpDeco) return;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    pfpDeco.style.transform =
      `translate(${18 + dx * 6}px, ${18 + dy * 6}px)`;
  });
})();
