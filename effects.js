// ── SHARED ESCAPE ROOM EFFECTS ──

// Inject overlay and glitch elements
document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="overlay">
      <div class="overlay-box" id="overlay-box">
        <div class="overlay-title" id="overlay-title"></div>
        <div class="overlay-sub" id="overlay-sub"></div>
      </div>
    </div>
    <div id="glitch-overlay"></div>
  `);
});

// Show "ZUGANG GEWÄHRT" or "ZUGANG VERWEIGERT"
function showOverlay(type, sub = '', duration = 1400) {
  const overlay = document.getElementById('overlay');
  const box = document.getElementById('overlay-box');
  const title = document.getElementById('overlay-title');
  const subEl = document.getElementById('overlay-sub');

  box.className = 'overlay-box ' + (type === 'granted' ? 'granted' : 'denied');
  title.textContent = type === 'granted' ? 'ZUGANG GEWÄHRT' : 'ZUGANG VERWEIGERT';
  subEl.textContent = sub;

  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), duration);
}

// Glitch transition between minigames
function glitchTransition(callback, duration = 500) {
  const g = document.getElementById('glitch-overlay');
  g.classList.add('active');
  setTimeout(() => {
    callback();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => g.classList.remove('active'), 200);
  }, duration * 0.5);
}

// Typewriter effect for a single element
function typewriter(el, text, speed = 30) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

// Shake element (wrong answer)
function shake(el) {
  el.style.animation = 'shake 0.3s ease';
  setTimeout(() => el.style.animation = '', 350);
}

// Flash screen red
function flashRed() {
  document.body.style.transition = 'background 0.1s';
  document.body.style.background = '#1a0000';
  setTimeout(() => { document.body.style.background = '#000'; }, 200);
}

// Flash screen green
function flashGreen() {
  document.body.style.transition = 'background 0.1s';
  document.body.style.background = '#001a00';
  setTimeout(() => { document.body.style.background = '#000'; }, 200);
}

// Set progress bar
function setProgress(pct) {
  const fill = document.getElementById('progress-fill');
  const pctEl = document.getElementById('progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

// Set task counter
function setCounter(n, total) {
  const el = document.getElementById('mini-counter');
  if (el) el.textContent = `TASK ${n.toString().padStart(2,'0')} / ${total.toString().padStart(2,'0')}`;
}

// Show next minigame with glitch
function showMG(id, counterN, counterTotal) {
  glitchTransition(() => {
    document.querySelectorAll('.minigame-wrap').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.remove('hidden');
      // Typewriter effect on description
      const desc = target.querySelector('.minigame-desc');
      if (desc) {
        const text = desc.textContent;
        desc.textContent = '';
        setTimeout(() => typewriter(desc, text, 18), 200);
      }
    }
    if (counterN && counterTotal) setCounter(counterN, counterTotal);
  });
}
