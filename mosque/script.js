// ── NAVBAR scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE NAV toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const bars = navToggle.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  bars[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  bars[1].style.opacity   = isOpen ? '0' : '1';
  bars[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const bars = navToggle.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity   = '1';
    bars[2].style.transform = '';
  });
});

// ── REVEAL on scroll ──
const revealEls = document.querySelectorAll('[data-reveal]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings in same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.1}s`;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth parallax for hero pattern ──
window.addEventListener('scroll', () => {
  const pattern = document.querySelector('.hero-pattern');
  if (pattern) {
    pattern.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
}, { passive: true });

// ── Image fallback: hide broken images, show placeholder ──
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    const wrap = this.closest('.about-img-wrap, .program-img-wrap, .room-card');
    if (wrap) {
      this.style.display = 'none';
      if (!wrap.querySelector('.img-fallback')) {
        const fb = document.createElement('div');
        fb.className = 'img-fallback';
        fb.innerHTML = '<span style="font-size:3rem">🕌</span>';
        fb.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1A1915,#242218)';
        wrap.appendChild(fb);
      }
    }
  });
});
