// Punkte- und Level-Logik des Spiels.
//
// Punkte pro Karte: 1. Karte in Level n = n Punkte, jede weitere Karte +1
// (2. Karte n+1, 3. Karte n+2 …). Falsche Antwort = 0 Punkte für die Karte.
//
// Aufstieg: Level 1 → 2 bei 20 Punkten, dann +10 pro Level
// (Level 2 → 3 bei 30, … Level 5 → 6 bei 60). Level 6 ist das höchste.
//
// Der Fortschritt wird lokal im Browser gespeichert (localStorage), damit er
// einen Seitenneustart übersteht – ganz ohne Login.

export const MAX_LEVEL = 6;

// Punkte, die in Level n gesammelt werden müssen, um Level n+1 freizuschalten.
export function pointsToAdvance(level: number): number {
  return 20 + (level - 1) * 10;
}

export interface LevelProgress {
  points: number; // gesammelte Punkte in diesem Level
  cards: number; // Anzahl bereits gespielter Karten in diesem Level
}

export interface Progress {
  unlockedLevel: number; // höchstes freigeschaltetes Level
  levels: Record<number, LevelProgress>;
}

const STORAGE_KEY = "vp-progress";

export function emptyProgress(): Progress {
  return { unlockedLevel: 1, levels: {} };
}

export function loadProgress(): Progress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.unlockedLevel === "number" && parsed.levels) {
      return parsed as Progress;
    }
  } catch {
    // defekte Daten ignorieren und frisch starten
  }
  return emptyProgress();
}

export function saveProgress(progress: Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Speicher voll/blockiert: dann bleibt der Fortschritt eben nur zur Laufzeit
  }
}

export function levelPoints(progress: Progress, level: number): number {
  return progress.levels[level]?.points ?? 0;
}

export function totalPoints(progress: Progress): number {
  return Object.values(progress.levels).reduce((sum, l) => sum + l.points, 0);
}

// Verbucht das Ergebnis einer Karte und liefert den neuen Fortschritt sowie die
// vergebenen Punkte (für die "+N"-Rückmeldung).
export function recordAnswer(
  progress: Progress,
  level: number,
  correct: boolean,
): { progress: Progress; awarded: number } {
  const current = progress.levels[level] ?? { points: 0, cards: 0 };
  const awarded = correct ? level + current.cards : 0; // 1. Karte = level, dann +1 je Karte
  const updated: LevelProgress = {
    points: current.points + awarded,
    cards: current.cards + 1,
  };

  let unlockedLevel = progress.unlockedLevel;
  if (level < MAX_LEVEL && updated.points >= pointsToAdvance(level)) {
    unlockedLevel = Math.max(unlockedLevel, level + 1);
  }

  return {
    progress: { unlockedLevel, levels: { ...progress.levels, [level]: updated } },
    awarded,
  };
}
