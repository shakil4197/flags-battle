class ArcadeAudioEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private volume = 0.32;
  private lastBounceTime = 0;

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

  public unlock(): void {
    this.ensureContext();
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
  }

  public setVolume(next: number): void {
    this.volume = Math.max(0, Math.min(1, next));
    try {
      localStorage.setItem('flag_battle_volume', String(this.volume));
    } catch {
      // Ignore
    }
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
    if (now - this.lastBounceTime < 55) return;
    this.lastBounceTime = now;
    const base = 260 + Math.min(1, intensity) * 220;
    this.tone(base, base * 0.72, 0.045, 'triangle', 0.11);
  }

  public playBladeHit(): void {
    this.tone(840, 310, 0.09, 'sawtooth', 0.18);
  }

  public playShieldBlock(): void {
    this.tone(520, 980, 0.14, 'sine', 0.22);
  }

  public playElimination(): void {
    this.tone(360, 85, 0.28, 'sawtooth', 0.26);
  }

  public playBoost(): void {
    this.tone(440, 880, 0.14, 'triangle', 0.2);
  }

  public playShockwave(): void {
    this.tone(180, 720, 0.24, 'sawtooth', 0.24);
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
