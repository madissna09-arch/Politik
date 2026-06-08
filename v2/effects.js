// ── SHARED EFFECTS v2 ──

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', `
    <div id="overlay">
      <div class="overlay-card" id="overlay-card">
        <div class="overlay-icon" id="overlay-icon"></div>
        <div class="overlay-title" id="overlay-title"></div>
        <div class="overlay-sub" id="overlay-sub"></div>
      </div>
    </div>
    <div id="glitch-wrap"></div>
  `);
});

function showOverlay(type, sub = '', duration = 1500) {
  const overlay = document.getElementById('overlay');
  const card    = document.getElementById('overlay-card');
  const icon    = document.getElementById('overlay-icon');
  const title   = document.getElementById('overlay-title');
  const subEl   = document.getElementById('overlay-sub');

  card.className = 'overlay-card ' + (type === 'granted' ? 'granted' : 'denied');
  icon.textContent  = type === 'granted' ? '✓' : '✕';
  title.textContent = type === 'granted' ? 'ZUGANG GEWÄHRT' : 'ZUGANG VERWEIGERT';
  subEl.textContent = sub;

  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), duration);
}

function glitchTransition(callback, delay = 320) {
  const g = document.getElementById('glitch-wrap');
  g.classList.add('fire');
  setTimeout(() => {
    callback();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => g.classList.remove('fire'), 300);
  }, delay);
}

function setProgress(pct) {
  const bar = document.getElementById('progress-bar');
  const lbl = document.getElementById('progress-pct');
  if (bar) bar.style.width = pct + '%';
  if (lbl) lbl.textContent = Math.round(pct) + '%';
}

function setCounter(n, total) {
  const el = document.getElementById('task-counter');
  if (el) el.textContent = `TASK ${String(n).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
}

function showTask(id, n, total) {
  glitchTransition(() => {
    document.querySelectorAll('.task-wrap').forEach(el => el.classList.add('hidden'));
    const t = document.getElementById(id);
    if (t) t.classList.remove('hidden');
    if (n && total) setCounter(n, total);
  });
}

function flashScreen(color) {
  document.body.style.transition = 'background 0.08s';
  document.body.style.background = color;
  setTimeout(() => { document.body.style.background = ''; }, 180);
}

function shake(el) {
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = 'shake 0.3s ease'; });
  setTimeout(() => el.style.animation = '', 350);
}
