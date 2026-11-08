import type { Song } from "@/lib/lofi";
import type { ProjectId } from "./portfolio";

/**
 * "Canción" de cada proyecto en el reproductor: tempo y progresión de
 * acordes (notas MIDI, 60 = do central). Al cambiar de proyecto cambia
 * la música en el siguiente compás.
 */
export const PROJECT_SONGS = {
  // la menor, épica y nostálgica: Am7 – Fmaj7 – C – G6
  aura: {
    bpm: 76,
    chords: [
      [57, 60, 64, 67],
      [53, 57, 60, 64],
      [48, 55, 60, 64],
      [55, 59, 62, 64],
    ],
  },
  // viaje tranquilo: Fmaj7 – Em7 – Dm7 – Cmaj7
  wanderai: {
    bpm: 82,
    chords: [
      [53, 57, 60, 64],
      [52, 55, 59, 62],
      [50, 53, 57, 60],
      [48, 52, 55, 59],
    ],
  },
  // jazz suave (ii–V–I): Dm9 – G13 – Cmaj9 – A7
  vibra: {
    bpm: 74,
    chords: [
      [50, 53, 57, 60, 64],
      [55, 59, 64, 65],
      [48, 52, 55, 59, 62],
      [57, 61, 64, 67],
    ],
  },
  // nocturno en mi bemol: Ebmaj7 – Cm7 – Fm7 – Bb7
  nexora: {
    bpm: 80,
    chords: [
      [51, 55, 58, 62],
      [48, 51, 55, 58],
      [53, 56, 60, 63],
      [46, 50, 53, 56],
    ],
  },
} as const satisfies Record<ProjectId, Song>;
