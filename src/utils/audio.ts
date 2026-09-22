/**
 * Web Audio API synthesizer for the Crime Prevention Fortune Wheel & Quiz
 * Guarantees zero latency and works on all devices without external network downloads.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playWheelTickSound(pitchMultiplier = 1) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const baseFreq = 520 * Math.max(0.6, Math.min(1.8, pitchMultiplier));
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    // Audio might be blocked until user interacts
  }
}

export function playWheelStartSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch {
    // Ignore error
  }
}

export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Pleasant two-tone chime (Major 3rd / 5th)
    const tones = [587.33, 880]; // D5, A5
    tones.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startT = now + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startT);

      gain.gain.setValueAtTime(0.25, startT);
      gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startT);
      osc.stop(startT + 0.36);
    });
  } catch {
    // Ignore
  }
}

export function playWrongSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.29);
  } catch {
    // Ignore
  }
}

export function playFanfareSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Triumphant brass-like sequence: C4, E4, G4, C5, with a final long chord!
    const notes = [
      { f: 523.25, start: 0.0, dur: 0.16 },  // C5
      { f: 523.25, start: 0.18, dur: 0.14 }, // C5
      { f: 523.25, start: 0.34, dur: 0.14 }, // C5
      { f: 659.25, start: 0.50, dur: 0.38 }, // E5
      { f: 783.99, start: 0.90, dur: 0.25 }, // G5
      { f: 1046.50, start: 1.18, dur: 0.75 }, // C6 (High triumph)
    ];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + note.start;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.dur + 0.02);
    });

    // Sub-harmony for majestic feel
    const harmony = [
      { f: 261.63, start: 1.18, dur: 0.8 }, // C4
      { f: 329.63, start: 1.18, dur: 0.8 }, // E4
      { f: 392.00, start: 1.18, dur: 0.8 }, // G4
    ];

    harmony.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + note.start;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.dur + 0.02);
    });
  } catch {
    // Ignore
  }
}
