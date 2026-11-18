class ArcadeAudioEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private volume = 0.32;
  private lastBounceTime = 0;

  private musicMasterGain: GainNode | null = null;
  private musicTimer: number | null = null;
  private musicEnabled = false;
  private musicStep = 0;
  private musicDucked = false;

  constructor() {
    try {
      const savedMuted = localStorage.getItem('flag_battle_muted');
      const savedVol = localStorage.getItem('flag_battle_volume');
      if (savedMuted === 'true') this.muted = true;
      if (savedVol !== null) {
        const parsed = Number(savedVol);
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          this.volume = parsed;
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }

  private ensureContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private ensureMusicBus(ctx: AudioContext): GainNode {
    if (!this.musicMasterGain) {
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 950;
      filter.Q.value = 0.7;

      gain.gain.value = this.getTargetMusicGain();
      filter.connect(gain);
      gain.connect(ctx.destination);
      this.musicMasterGain = gain;
      // Store filter reference on gain node for scheduling
      (gain as unknown as { _filter: BiquadFilterNode })._filter = filter;
    }
    return this.musicMasterGain;
  }

  private getTargetMusicGain(): number {
    if (this.muted || !this.musicEnabled) return 0.0001;
    const base = this.volume * 0.42;
    return this.musicDucked ? base * 0.48 : base;
  }

  private updateMusicGain(): void {
    if (!this.ctx || !this.musicMasterGain) return;
    const now = this.ctx.currentTime;
    const target = this.getTargetMusicGain();
    this.musicMasterGain.gain.cancelScheduledValues(now);
    this.musicMasterGain.gain.setTargetAtTime(target, now, 0.18);
  }

  public unlock(): void {
    this.ensureContext();
  }

  public startBackgroundMusic(): void {
    this.musicEnabled = true;
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.ensureMusicBus(ctx);
    this.updateMusicGain();

    if (this.musicTimer !== null) return;

    // Soft ambient chill progression: Fmaj7 -> G6 -> Em7 -> Am7
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 329.63], // G6
      [164.81, 196.0, 246.94, 293.66], // Em7
      [220.0, 261.63, 329.63, 392.0], // Am7
    ];
    const melody = [
      523.25, 0, 659.25, 587.33, 523.25, 0, 440.0, 493.88,
      587.33, 0, 659.25, 783.99, 659.25, 0, 523.25, 440.0,
    ];

    const tick = () => {
      if (this.muted || !this.musicEnabled) return;
      const activeCtx = this.ensureContext();
      if (!activeCtx) return;

      const bus = this.ensureMusicBus(activeCtx);
      const filter = (bus as unknown as { _filter: BiquadFilterNode })._filter;
      const now = activeCtx.currentTime;
      const step = this.musicStep % 16;

      // Soft warm pad chord every 4 steps (~2.6s)
      if (step % 4 === 0) {
        const chordIdx = Math.floor(step / 4) % chords.length;
        const notes = chords[chordIdx];
        for (let i = 0; i < notes.length; i++) {
          const osc = activeCtx.createOscillator();
          const g = activeCtx.createGain();
          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(notes[i], now);

          g.gain.setValueAtTime(0.0001, now);
          g.gain.linearRampToValueAtTime(0.055, now + 0.55);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 2.55);

          osc.connect(g);
          g.connect(filter);
          osc.start(now);
          osc.stop(now + 2.6);
        }
      }

      // Soft gentle bell/pluck note
      const melFreq = melody[step];
      if (melFreq > 0) {
        const osc = activeCtx.createOscillator();
        const g = activeCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(melFreq, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.042, now + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

        osc.connect(g);
        g.connect(filter);
        osc.start(now);
        osc.stop(now + 0.65);
      }

      this.musicStep = (this.musicStep + 1) % 16;
    };

    tick();
    this.musicTimer = window.setInterval(tick, 650);
  }

  public setMusicDucked(ducked: boolean): void {
    this.musicDucked = ducked;
    this.updateMusicGain();
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(next: boolean): void {
    this.muted = next;
    try {
      localStorage.setItem('flag_battle_muted', String(next));
    } catch {
      // Ignore
    }
    this.updateMusicGain();
    if (!next && this.musicEnabled) {
      this.startBackgroundMusic();
    }
  }

  public setVolume(next: number): void {
    this.volume = Math.max(0, Math.min(1, next));
    try {
      localStorage.setItem('flag_battle_volume', String(this.volume));
    } catch {
      // Ignore
    }
    this.updateMusicGain();
  }

  private tone(
    freqStart: number,
    freqEnd: number,
    durationSec: number,
    wave: OscillatorType,
    gainScale = 0.2
  ): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freqStart, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + durationSec);

    const peak = Math.max(0.001, this.volume * gainScale);
    gain.gain.setValueAtTime(peak, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec);
  }

  public playBounce(intensity = 0.6): void {
    const now = performance.now();
    if (now - this.lastBounceTime < 70) return;
    this.lastBounceTime = now;
    const base = 290 + Math.min(1, intensity) * 210;
    this.tone(base, base * 1.18, 0.055, 'sine', 0.095);
  }

  public playBladeHit(): void {
    this.tone(840, 310, 0.09, 'sawtooth', 0.16);
  }

  public playShieldBlock(): void {
    this.tone(520, 980, 0.14, 'sine', 0.2);
  }

  public playElimination(): void {
    this.tone(360, 85, 0.28, 'sawtooth', 0.22);
  }

  public playBoost(): void {
    this.tone(440, 880, 0.14, 'triangle', 0.18);
  }

  public playShockwave(): void {
    this.tone(180, 720, 0.24, 'sawtooth', 0.22);
  }

  public playChampion(): void {
    this.tone(523.25, 523.25, 0.14, 'triangle', 0.24);
    setTimeout(() => this.tone(659.25, 659.25, 0.14, 'triangle', 0.24), 110);
    setTimeout(() => this.tone(783.99, 1046.5, 0.32, 'triangle', 0.28), 220);
  }

  public playTournamentStart(): void {
    this.tone(330, 440, 0.14, 'triangle', 0.22);
    setTimeout(() => this.tone(440, 660, 0.2, 'triangle', 0.24), 120);
  }

  public playTop3Fanfare(): void {
    this.tone(440, 554.37, 0.14, 'triangle', 0.22);
    setTimeout(() => this.tone(554.37, 659.25, 0.18, 'triangle', 0.24), 130);
  }
}

export const arcadeAudio = new ArcadeAudioEngine();
