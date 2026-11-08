/**
 * Motor de música lofi generativa con Web Audio. No usa archivos de audio:
 * todo (acordes, bajo, batería y el "crujido" del vinilo) se sintetiza en
 * el navegador, así que no hay derechos de autor ni descargas pesadas.
 *
 * Solo puede arrancar tras un gesto del usuario (clic): los navegadores
 * bloquean el audio automático.
 */

/** Notas MIDI (60 = do central). */
type Chord = readonly number[];

export type Song = {
  bpm: number;
  /** Un acorde por compás; se repiten en bucle. */
  chords: readonly Chord[];
};

const MASTER_VOLUME = 0.55;
const LOOKAHEAD_S = 0.12;
const TICK_MS = 25;

const midiToHz = (note: number) => 440 * 2 ** ((note - 69) / 12);

class LofiEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private crackle: AudioBufferSourceNode | null = null;
  private timer: number | null = null;
  private song: Song | null = null;
  private pendingSong: Song | null = null;
  private step = 0;
  private bar = 0;
  private nextTime = 0;

  get playing(): boolean {
    return this.timer !== null;
  }

  /** Empieza a sonar, o cambia de canción en el siguiente compás si ya suena. */
  play(song: Song) {
    const ctx = this.ensureContext();
    void ctx.resume();

    if (this.playing) {
      if (song !== this.song) this.pendingSong = song;
      return;
    }

    this.song = song;
    this.pendingSong = null;
    this.step = 0;
    this.bar = 0;
    this.nextTime = ctx.currentTime + 0.08;

    const gain = this.master!.gain;
    gain.cancelScheduledValues(ctx.currentTime);
    gain.setTargetAtTime(MASTER_VOLUME, ctx.currentTime, 0.6); // entra con fundido

    this.startCrackle();
    this.timer = window.setInterval(() => this.schedule(), TICK_MS);
  }

  /** Se desvanece y deja de programar notas. */
  stop() {
    if (!this.ctx || !this.master || this.timer === null) return;
    window.clearInterval(this.timer);
    this.timer = null;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(0, now, 0.25);
    this.crackle?.stop(now + 1.5);
    this.crackle = null;
  }

  /* ---------- infraestructura ---------- */

  private ensureContext(): AudioContext {
    if (this.ctx) return this.ctx;
    const ctx = new AudioContext();

    // cadena final: master → filtro paso bajo (sonido "cálido" de lofi) → altavoces
    const master = ctx.createGain();
    master.gain.value = 0;
    const warmth = ctx.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 3200;
    master.connect(warmth).connect(ctx.destination);

    // 2 s de ruido blanco reutilizable para batería y vinilo
    const noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    this.ctx = ctx;
    this.master = master;
    this.noise = noise;
    return ctx;
  }

  /** Programa las notas que caen dentro de la ventana de anticipación. */
  private schedule() {
    const ctx = this.ctx!;
    while (this.song && this.nextTime < ctx.currentTime + LOOKAHEAD_S) {
      this.playStep(this.step, this.nextTime);
      this.nextTime += 60 / this.song.bpm / 4; // semicorchea
      this.step = (this.step + 1) % 16;
      if (this.step === 0) {
        this.bar++;
        if (this.pendingSong) {
          this.song = this.pendingSong;
          this.pendingSong = null;
          this.bar = 0;
        }
      }
    }
  }

  /** Un compás = 16 semicorcheas. Patrón de batería "boom bap" con swing. */
  private playStep(step: number, time: number) {
    const song = this.song!;
    const chord = song.chords[this.bar % song.chords.length];
    const sixteenth = 60 / song.bpm / 4;
    const barLength = sixteenth * 16;
    const t = time + (step % 2 === 1 ? sixteenth * 0.18 : 0); // swing

    if (step === 0) {
      chord.forEach((note) => this.pad(note, t, barLength));
      this.bass(chord[0] - 12, t, barLength * 0.45);
    }
    if (step === 8) this.bass(chord[0] - 12, t, barLength * 0.4);
    if (step === 0 || step === 7 || step === 10) this.kick(t);
    if (step === 4 || step === 12) this.snare(t);
    if (step % 2 === 0) this.hat(t, step % 4 === 2 ? 0.05 : 0.025);
    if (step % 4 === 2 && Math.random() < 0.45) {
      const note = chord[Math.floor(Math.random() * chord.length)] + 12;
      this.pluck(note, t);
    }
  }

  /* ---------- instrumentos ---------- */

  private envelope(gain: GainNode, t: number, peak: number, attack: number, release: number) {
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(peak, t + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  }

  /** Acorde suave: dos osciladores triangulares desafinados por un filtro paso bajo. */
  private pad(note: number, t: number, length: number) {
    const ctx = this.ctx!;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    const gain = ctx.createGain();
    this.envelope(gain, t, 0.045, 0.35, length);
    filter.connect(gain).connect(this.master!);

    for (const detune of [-7, 7]) {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = midiToHz(note);
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start(t);
      osc.stop(t + length + 0.5);
    }
  }

  private bass(note: number, t: number, length: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = midiToHz(note);
    const gain = ctx.createGain();
    this.envelope(gain, t, 0.22, 0.02, length);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + length + 0.1);
  }

  private pluck(note: number, t: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = midiToHz(note);
    const gain = ctx.createGain();
    this.envelope(gain, t, 0.05, 0.01, 0.7);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.8);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const gain = ctx.createGain();
    this.envelope(gain, t, 0.5, 0.005, 0.25);
    osc.connect(gain).connect(this.master!);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  private noiseHit(t: number, type: BiquadFilterType, frequency: number, peak: number, release: number) {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    const gain = ctx.createGain();
    this.envelope(gain, t, peak, 0.003, release);
    source.connect(filter).connect(gain).connect(this.master!);
    source.start(t, Math.random()); // desde un punto distinto del buffer cada vez
    source.stop(t + release + 0.05);
  }

  private snare(t: number) {
    this.noiseHit(t, "bandpass", 1800, 0.12, 0.16);
  }

  private hat(t: number, peak: number) {
    this.noiseHit(t, "highpass", 7000, peak, 0.04);
  }

  /** Ruido de fondo muy suave, como un disco de vinilo. */
  private startCrackle() {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = this.noise;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2500;
    const gain = ctx.createGain();
    gain.gain.value = 0.012;
    source.connect(filter).connect(gain).connect(this.master!);
    source.start();
    this.crackle = source;
  }
}

/** Una sola instancia para toda la página. */
export const lofi = new LofiEngine();
