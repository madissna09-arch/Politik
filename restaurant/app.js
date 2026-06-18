/* ======================================================
   STEAK DÖNER OSNABRÜCK – App Logic
   ====================================================== */

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile nav toggle ─────────────────────────────────
const navToggle  = document.getElementById('nav-toggle');
const navLinks   = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Menu tabs ─────────────────────────────────────────
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-grid').forEach(g => g.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ── Opening hours status ──────────────────────────────
function updateHoursStatus() {
  const now   = new Date();
  const day   = now.getDay();       // 0=Sun … 6=Sat
  const mins  = now.getHours() * 60 + now.getMinutes();

  const schedule = {
    0: { open: 12 * 60, close: 21 * 60 },   // Sunday
    1: { open: 11 * 60, close: 22 * 60 },
    2: { open: 11 * 60, close: 22 * 60 },
    3: { open: 11 * 60, close: 22 * 60 },
    4: { open: 11 * 60, close: 22 * 60 },
    5: { open: 11 * 60, close: 23 * 60 },   // Friday
    6: { open: 11 * 60, close: 23 * 60 },   // Saturday
  };

  const today    = schedule[day];
  const isOpen   = mins >= today.open && mins < today.close;
  const closeStr = `${Math.floor(today.close / 60)}:${String(today.close % 60).padStart(2, '0')}`;
  const nextDay  = (day + 1) % 7;
  const nextOpenStr = `${Math.floor(schedule[nextDay].open / 60)}:00`;

  const el = document.getElementById('hours-status');
  if (!el) return;

  el.innerHTML = `<span class="dot"></span>${isOpen
    ? `Jetzt geöffnet &nbsp;·&nbsp; Schließt um ${closeStr} Uhr`
    : `Aktuell geschlossen &nbsp;·&nbsp; Öffnet morgen um ${nextOpenStr} Uhr`}`;
  el.className = 'hours-status ' + (isOpen ? 'open' : 'closed');
}

updateHoursStatus();

// ── Highlight today's row ─────────────────────────────
const today = new Date().getDay();
document.querySelectorAll('.hours-row[data-day]').forEach(row => {
  if (parseInt(row.dataset.day, 10) === today) {
    row.classList.add('today');
  }
});

// ── Smooth scroll for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ── Fade-in sections on scroll (IntersectionObserver) ──
const fadeEls = document.querySelectorAll('.section, .review-card, .menu-item, .feature, .stat-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity    = '1';
      e.target.style.transform  = 'translateY(0)';
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
