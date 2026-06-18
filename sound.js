let _ctx = null;
let _muted = false;

function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window['webkitAudioContext'])();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function tone(freq, type, startDelay, duration, volume = 0.45) {
  if (_muted) return;
  const ctx = getCtx();
  const t = ctx.currentTime + startDelay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.001, t);
  gain.gain.linearRampToValueAtTime(volume, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}


const sounds = {
  best() {
    tone(523, 'sine', 0,   0.12);
    tone(659, 'sine', 0.1, 0.2);
  },
  mid() {
    tone(440, 'sine', 0, 0.18, 0.35);
  },
  worst() {
    tone(330, 'triangle', 0,    0.12);
    tone(220, 'triangle', 0.12, 0.25);
  },
  streak() {
    [523, 659, 784].forEach((f, i) => tone(f, 'sine', i * 0.07, 0.1));
  },
  streakBreak() {
    [440, 349, 262].forEach((f, i) => tone(f, 'triangle', i * 0.1, 0.18, 0.38));
  },
  oppBest() {
    tone(659, 'sine', 0,    0.08);
    tone(784, 'sine', 0.08, 0.08);
    tone(988, 'sine', 0.16, 0.25);
  },
  oppMid() {
    tone(523, 'sine', 0,   0.1);
    tone(659, 'sine', 0.1, 0.18);
  },
  oppNone() {
    tone(392, 'triangle', 0, 0.22, 0.2);
  },
  gameOver() {
    [330, 277, 220, 165].forEach((f, i) => tone(f, 'sawtooth', i * 0.2, 0.28, 0.35));
  },
  gold() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 'sine', i * 0.1, 0.2));
    tone(1047, 'sine', 0.45, 0.5, 0.45);
  },
  silver() {
    [523, 659, 784].forEach((f, i) => tone(f, 'sine', i * 0.1, 0.22));
  },
  bronze() {
    tone(392, 'sine', 0,    0.18);
    tone(440, 'sine', 0.18, 0.25);
  },

};

function toggleMute() {
  _muted = !_muted;
  const btn = document.getElementById('btn-mute');
  if (!btn) return;
  btn.textContent = _muted ? '🔇' : '🔊';
  parseEmojis(btn);
}

document.getElementById('btn-mute').addEventListener('click', toggleMute);
