/* ============================================================
   THEME TOGGLE (1.2.3)
   Reads/writes localStorage('theme'). Dark = no attribute on <html>.
   Light = data-theme="light" on <html>.
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // Respect OS preference changes when no manual override is stored
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  });
}

// Remove no-transition class after first paint to enable smooth theme switching
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transition');
  });
});

/* ============================================================
   SMOOTH SCROLL (Lenis) — the motion spine.
   Uses native scroll under the hood, so the scroll listeners below
   (navbar .scrolled, scroll-progress, active-nav) keep firing.
   Disabled under reduced motion; touch stays native (Lenis default).
   ============================================================ */
let lenis = null;
(function initSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || typeof Lenis === 'undefined') return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  window.__lenis = lenis;

  // Smooth in-page anchor navigation, accounting for the fixed navbar.
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.1 });
    });
  });
})();

/* ============================================================
   NAVBAR: add .scrolled class on scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================================
   MOBILE MENU TOGGLE
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   ACTIVE NAV LINK on scroll
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   SCROLL-TRIGGERED ANIMATIONS
   The entrance fade is an enhancement on top of an already-laid-out
   page, never a gate on whether content shows. The observer plays the
   fade for elements scrolled into view from below; a safety sweep
   reveals anything already at/above the fold immediately so anchor
   jumps, programmatic scrolls, and missed callbacks can't strand a
   section dimmed.
   ============================================================ */
const animTargets = Array.from(document.querySelectorAll('.animate-on-scroll'));

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

// Reveal everything currently in or above the viewport right away;
// only genuinely below-fold elements wait for their scroll-in entrance.
const revealInView = () => {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  animTargets.forEach((el) => {
    if (el.classList.contains('visible')) return;
    if (el.getBoundingClientRect().top < vh * 0.92) {
      el.classList.add('visible');
      animObserver.unobserve(el);
    }
  });
};

animTargets.forEach(el => animObserver.observe(el));
revealInView();
window.addEventListener('load', revealInView);
// Anchor navigation lands on a section instantly; sweep once it settles
// so the destination is never left mid-fade.
window.addEventListener('hashchange', () => requestAnimationFrame(revealInView));
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', () => setTimeout(revealInView, 80));
});

/* ============================================================
   TYPING ANIMATION for hero role
   ============================================================ */
const roles = [
  'Cloud Solution Architect',
  'Head of DevOps',
  'Kubestronaut',
  'Multi-Cloud Platform Leader',
];

const roleEl = document.getElementById('roleText');
if (roleEl) {
  let roleIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;
  const TYPING_SPEED   = 65;
  const DELETING_SPEED = 35;
  const PAUSE_DURATION = 2200;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      roleEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      roleEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      delay = PAUSE_DURATION;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  // Respect reduced motion: keep the static role text, skip the typing loop.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // small delay before starting so hero animation finishes first
    setTimeout(type, 900);
  }
}

/* ============================================================
   STAT COUNT-UP — animate numbers when the stats bar enters view
   ============================================================ */
const statValues = document.querySelectorAll('.stat-value[data-count]');
if (statValues.length) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const runCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (reduceMotion) { el.textContent = String(target); return; }
    const DURATION = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => statObserver.observe(el));
}

/* ============================================================
   Shared motion / input flags
   ============================================================ */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER   = window.matchMedia('(pointer: fine)').matches;

/* ============================================================
   HERO NETWORK CANVAS — a drifting node topology ("the control plane").
   Nodes wander, link to nearby nodes, and reach toward the cursor.
   Paused off-screen / on hidden tabs; disabled for reduced motion.
   ============================================================ */
function initHeroNetwork(canvas) {
  const host = canvas.closest('.hero, .page-hero');
  if (!host) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let nodes = [];
  let raf = null;
  let running = false;
  const pointer = { x: -9999, y: -9999 };

  function build() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    if (!w || !h) return;
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(22, Math.min(Math.round((w * h) / 22000), 70));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const LINK = 130;
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x <= 0 || n.x >= w) n.vx *= -1;
      if (n.y <= 0 || n.y >= h) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(120,134,248,${(1 - d / LINK) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
      if (d < 190) {
        ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 190) * 0.55})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(129,140,248,0.7)';
      ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  function start() { if (!running && nodes.length) { running = true; frame(); } }
  function stop()  { running = false; if (raf) cancelAnimationFrame(raf); raf = null; }

  build();
  start();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      build();
    }, 200);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : start(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => (e.isIntersecting ? start() : stop()));
    }, { threshold: 0 }).observe(host);
  }

  if (FINE_POINTER) {
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      host.style.setProperty('--mx', pointer.x + 'px');
      host.style.setProperty('--my', pointer.y + 'px');
      host.classList.add('is-pointing');
    }, { passive: true });
    host.addEventListener('pointerleave', () => {
      pointer.x = -9999; pointer.y = -9999;
      host.classList.remove('is-pointing');
    });
  }
}

if (!REDUCED_MOTION) {
  document.querySelectorAll('canvas.hero-net').forEach(initHeroNetwork);
}

/* ============================================================
   HERO STAGE TILT — the floating panel stack reacts to the pointer.
   Differential depth per panel (data-depth) sells the 3D parallax.
   Fine pointers only; disabled for reduced motion.
   ============================================================ */
(function initHeroTilt() {
  if (REDUCED_MOTION || !FINE_POINTER) return;
  const stage = document.querySelector('.hero-stage[data-tilt]');
  if (!stage) return;
  const inner = stage.querySelector('.hero-stage-inner');
  const panels = stage.querySelectorAll('[data-depth]');
  const host = stage.closest('.hero');
  const BASE_RY = -15, BASE_RX = 8, SWING = 9;
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

  const render = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    inner.style.setProperty('--ry', (BASE_RY + cx * SWING) + 'deg');
    inner.style.setProperty('--rx', (BASE_RX - cy * SWING) + 'deg');
    panels.forEach((p) => {
      const d = parseFloat(p.dataset.depth) || 0.5;
      p.style.setProperty('--ph', (cx * d * 22) + 'px');
      p.style.setProperty('--pv', (cy * d * 22) + 'px');
    });
    raf = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(render) : null;
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(render); };

  host.addEventListener('pointermove', (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
    queue();
  }, { passive: true });
  host.addEventListener('pointerleave', () => { tx = 0; ty = 0; queue(); });
})();

/* ============================================================
   SCROLL PROGRESS — a thin gradient telemetry bar across the top
   ============================================================ */
(function scrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    bar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

/* ============================================================
   HORIZONTAL RAILS — certs filmstrip + projects gallery.
   Prev/next step by ~80% of the visible width; buttons disable
   at the ends. Smooth scroll honors reduced-motion via CSS.
   ============================================================ */
(function initRails() {
  document.querySelectorAll('.rail-track').forEach((track) => {
    const rail = track.closest('.h-rail');
    if (!rail) return;
    const prev = rail.querySelector('.rail-prev');
    const next = rail.querySelector('.rail-next');
    const step = () => Math.max(track.clientWidth * 0.8, 260);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    };
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  });
})();

/* ============================================================
   CARD CURSOR SPOTLIGHT — a glow tracks the pointer inside grids
   ============================================================ */
if (FINE_POINTER && !REDUCED_MOTION) {
  document.querySelectorAll('.cert-grid, .projects-grid, .rail-track').forEach((grid) => {
    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.cert-card, .project-card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });
}

/* ============================================================
   ABOUT — pinned scroll-telling. As each chapter crosses the
   viewport center, activate it and swap the sticky instrument panel.
   Works with native scroll, so it runs with or without Lenis.
   ============================================================ */
(function aboutStory() {
  const story = document.getElementById('aboutStory');
  if (!story) return;
  const chapters = Array.from(story.querySelectorAll('.story-chapter'));
  const layers = Array.from(story.querySelectorAll('.stage-layer'));
  if (!chapters.length) return;

  const setActive = (i) => {
    chapters.forEach((c, n) => c.classList.toggle('is-current', n === i));
    layers.forEach((l, n) => l.classList.toggle('is-active', n === i));
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setActive(Number(e.target.dataset.chapter) || 0);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  chapters.forEach((c) => io.observe(c));
  setActive(0);
})();

/* ============================================================
   CONSOLE BOOT — reveal the hero console's lines in sequence.
   Defaults to fully visible; only animates when motion is allowed.
   ============================================================ */
(function consoleBoot() {
  const panel = document.querySelector('.fp-console');
  if (!panel || REDUCED_MOTION) return;
  const lines = Array.from(panel.querySelectorAll('.console-body > *'));
  if (!lines.length) return;
  panel.classList.add('booting');
  let i = 0;
  const reveal = () => {
    if (i >= lines.length) return;
    lines[i].classList.add('lit');
    i += 1;
    setTimeout(reveal, 170);
  };
  setTimeout(reveal, 450);
})();
