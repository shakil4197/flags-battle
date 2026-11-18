class VoiceAnnouncer {
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private muted = false;

  private pickVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    if (this.selectedVoice) return this.selectedVoice;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const preferred =
      voices.find((v) => v.lang.startsWith('en') && /natural|google|daniel|samantha|aria|guy/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith('en-US')) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];
    this.selectedVoice = preferred || null;
    return this.selectedVoice;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public speak(text: string): void {
    if (this.muted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voice = this.pickVoice();
      if (voice) utter.voice = voice;
      utter.rate = 1.03;
      utter.pitch = 1.0;
      utter.volume = 0.92;
      window.speechSynthesis.speak(utter);
    } catch {
      // Ignore synthesis errors in restricted environments
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
  }
}

export const voiceAnnouncer = new VoiceAnnouncer();
