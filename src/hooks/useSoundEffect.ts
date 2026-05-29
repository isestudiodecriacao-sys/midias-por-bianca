import { useCallback, useEffect, useRef } from 'react';

let ctx: AudioContext | null = null;

function getCtx() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

type SoundType = 'shutter' | 'focus' | 'filmAdvance' | 'tick' | 'toggle' | 'nav' | 'swoosh' | 'dial' | 'notification';

function play(type: SoundType, volume = 0.08) {
  const ac = getCtx();
  const now = ac.currentTime;

  if (type === 'shutter') {
    const gain = ac.createGain();
    gain.connect(ac.destination);
    const bufLen = ac.sampleRate * 0.08;
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      const env = i < bufLen * 0.1 ? i / (bufLen * 0.1) : Math.exp(-((i - bufLen * 0.1) / (bufLen * 0.15)) * 3);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const filter = ac.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(volume * 2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    noise.connect(filter);
    filter.connect(gain);
    noise.start(now);
    noise.stop(now + 0.1);

    const click = ac.createOscillator();
    const clickGain = ac.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(4000, now);
    click.frequency.exponentialRampToValueAtTime(800, now + 0.015);
    clickGain.gain.setValueAtTime(volume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    click.connect(clickGain);
    clickGain.connect(ac.destination);
    click.start(now);
    click.stop(now + 0.03);
  }

  if (type === 'focus') {
    // Warm prolonged low hum — gentle fade in, sustain, slow fade out
    const gain = ac.createGain();
    gain.connect(ac.destination);
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(165, now);
    osc.frequency.exponentialRampToValueAtTime(128, now + 0.8);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume * 0.4, now + 0.08);
    gain.gain.linearRampToValueAtTime(volume * 0.35, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  if (type === 'filmAdvance') {
    const gain = ac.createGain();
    gain.connect(ac.destination);
    const bufLen = ac.sampleRate * 0.15;
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      const pulse = Math.sin((i / ac.sampleRate) * 80 * Math.PI * 2) > 0 ? 1 : 0.3;
      data[i] = (Math.random() * 2 - 1) * pulse;
    }
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2500;
    bp.Q.value = 1.5;
    gain.gain.setValueAtTime(volume * 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    noise.connect(bp);
    bp.connect(gain);
    noise.start(now);
    noise.stop(now + 0.15);
  }

  if (type === 'tick') {
    const gain = ac.createGain();
    gain.connect(ac.destination);
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(3000, now);
    osc.frequency.exponentialRampToValueAtTime(1500, now + 0.02);
    gain.gain.setValueAtTime(volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.025);
  }

  if (type === 'toggle') {
    const gain = ac.createGain();
    gain.connect(ac.destination);
    const osc1 = ac.createOscillator();
    const osc2 = ac.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    osc2.frequency.setValueAtTime(1320, now);
    gain.gain.setValueAtTime(volume * 0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain);
    osc2.connect(gain);
    osc1.start(now);
    osc2.start(now + 0.04);
    osc1.stop(now + 0.08);
    osc2.stop(now + 0.14);
  }

  if (type === 'nav') {
    const gain = ac.createGain();
    gain.connect(ac.destination);
    const bufLen = ac.sampleRate * 0.08;
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const bp = ac.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3000, now);
    bp.frequency.exponentialRampToValueAtTime(6000, now + 0.06);
    bp.Q.value = 0.6;
    gain.gain.setValueAtTime(volume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    noise.connect(bp);
    bp.connect(gain);
    noise.start(now);
    noise.stop(now + 0.08);
  }

  if (type === 'swoosh') {
    // Deep, cinematic breath — slow filtered noise with warm sub tone
    const duration = 0.6;

    // Low rumble layer
    const subOsc = ac.createOscillator();
    const subGain = ac.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(60, now + duration);
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(volume * 0.35, now + duration * 0.4);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    subOsc.connect(subGain);
    subGain.connect(ac.destination);
    subOsc.start(now);
    subOsc.stop(now + duration);

    // Soft air sweep
    const bufLen = ac.sampleRate * duration;
    const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      const t = i / bufLen;
      const env = Math.pow(Math.sin(t * Math.PI), 2);
      data[i] = (Math.random() * 2 - 1) * env * 0.3;
    }
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(200, now);
    lp.frequency.exponentialRampToValueAtTime(800, now + duration * 0.5);
    lp.frequency.exponentialRampToValueAtTime(300, now + duration);
    lp.Q.value = 0.4;
    const noiseGain = ac.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(volume * 0.3, now + duration * 0.35);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    noise.connect(lp);
    lp.connect(noiseGain);
    noiseGain.connect(ac.destination);
    noise.start(now);
    noise.stop(now + duration);
  }

  if (type === 'notification') {
    // Phone-like notification chime — two ascending tones
    const g1 = ac.createGain();
    g1.connect(ac.destination);
    const o1 = ac.createOscillator();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(830, now);
    g1.gain.setValueAtTime(volume * 1.2, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    o1.connect(g1);
    o1.start(now);
    o1.stop(now + 0.18);

    const g2 = ac.createGain();
    g2.connect(ac.destination);
    const o2 = ac.createOscillator();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(1050, now + 0.12);
    g2.gain.setValueAtTime(0.001, now);
    g2.gain.linearRampToValueAtTime(volume * 1.4, now + 0.13);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    o2.connect(g2);
    o2.start(now + 0.12);
    o2.stop(now + 0.35);

    // Subtle harmonic shimmer
    const g3 = ac.createGain();
    g3.connect(ac.destination);
    const o3 = ac.createOscillator();
    o3.type = 'triangle';
    o3.frequency.setValueAtTime(1660, now + 0.12);
    g3.gain.setValueAtTime(0.001, now);
    g3.gain.linearRampToValueAtTime(volume * 0.3, now + 0.14);
    g3.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    o3.connect(g3);
    o3.start(now + 0.12);
    o3.stop(now + 0.4);
  }

  if (type === 'dial') {
    // Camera dial click — short mechanical detent
    const click = ac.createOscillator();
    const clickGain = ac.createGain();
    click.type = 'square';
    click.frequency.setValueAtTime(2200, now);
    click.frequency.exponentialRampToValueAtTime(600, now + 0.012);
    clickGain.gain.setValueAtTime(volume * 0.5, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    click.connect(clickGain);
    clickGain.connect(ac.destination);
    click.start(now);
    click.stop(now + 0.025);

    // Tiny resonant body thud
    const thud = ac.createOscillator();
    const thudGain = ac.createGain();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(350, now + 0.005);
    thud.frequency.exponentialRampToValueAtTime(150, now + 0.04);
    thudGain.gain.setValueAtTime(volume * 0.3, now + 0.005);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    thud.connect(thudGain);
    thudGain.connect(ac.destination);
    thud.start(now + 0.005);
    thud.stop(now + 0.05);
  }
}

const lastPlayedMap = new Map<SoundType, number>();

function throttledPlay(type: SoundType, volume = 0.08, cooldown = 80) {
  const now = Date.now();
  const last = lastPlayedMap.get(type) ?? 0;
  if (now - last < cooldown) return;
  lastPlayedMap.set(type, now);
  play(type, volume);
}

export function useSoundEffect(type: SoundType, volume = 0.08) {
  const trigger = useCallback(() => {
    throttledPlay(type, volume);
  }, [type, volume]);
  return trigger;
}

export function useCounterSound(start: boolean, duration = 5000) {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!start) return;
    startTimeRef.current = Date.now();

    function scheduleTick() {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      if (progress >= 1) return;

      const speed = 1 - Math.abs(progress - 0.3) * 1.2;
      const interval = Math.max(60, 300 - speed * 250);
      throttledPlay('tick', 0.04 + speed * 0.03, 40);
      intervalRef.current = setTimeout(scheduleTick, interval);
    }

    intervalRef.current = setTimeout(scheduleTick, 200);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [start, duration]);
}

export { play as playSound, throttledPlay as playSoundThrottled };
