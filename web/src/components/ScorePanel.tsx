"use client";

import { MAX_LEVEL, pointsToAdvance } from "@/lib/game-progress";

// Punktestand-Anzeige (im Spiel rechts). Zeigt die Punkte im aktuellen Level,
// das Ziel bis zum nächsten Level und – nach einem Aufstieg – eine kurze
// Erfolgsmeldung. Bei Levelwechsel beginnt der Zähler wieder bei 0.

interface ScorePanelProps {
  level: number;
  levelPoints: number; // Punkte im aktuellen Level (Hauptzahl)
  total: number; // insgesamt gesammelte Punkte (über alle Level)
  unlockedLevel: number;
  leveledUpTo: number; // >0: gerade dieses Level erreicht (Erfolgsmeldung)
  onReset: () => void;
}

export default function ScorePanel({
  level,
  levelPoints,
  total,
  unlockedLevel,
  leveledUpTo,
  onReset,
}: ScorePanelProps) {
  const isTopLevel = level >= MAX_LEVEL;
  const needed = pointsToAdvance(level);
  const ratio = isTopLevel ? 1 : Math.min(1, levelPoints / needed);

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-surface p-5 shadow-lg ring-1 ring-black/5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Punktestand</h2>
        <span className="rounded-full bg-leaf-soft px-2 py-0.5 text-xs font-bold text-leaf-dark">
          Level {level}
        </span>
      </div>

      {/* Erfolgsmeldung nach Aufstieg */}
      {leveledUpTo > 0 && (
        <div className="fade-up rounded-2xl bg-leaf px-3 py-2 text-center text-sm font-bold text-white">
          🎉 Level {leveledUpTo} erreicht!
        </div>
      )}

      {/* Punkte im aktuellen Level (beginnt bei jedem Level wieder bei 0) */}
      <div>
        <div className="text-4xl font-extrabold tabular-nums text-leaf">{levelPoints}</div>
        <div className="text-sm text-muted">Punkte in Level {level}</div>
      </div>

      {/* Fortschritt bis zum nächsten Level */}
      <div>
        <div className="mb-1 flex justify-between text-xs font-semibold text-muted">
          <span>{isTopLevel ? "Höchstes Level" : `Bis Level ${level + 1}`}</span>
          <span className="tabular-nums">
            {isTopLevel ? "🎉" : `${levelPoints} / ${needed}`}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-leaf-soft">
          <div
            className="h-full rounded-full bg-leaf transition-[width] duration-500"
            style={{ width: `${ratio * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {unlockedLevel <= 1
            ? "Freigeschaltet: Level 1"
            : `Freigeschaltet: Level 1–${unlockedLevel}`}
        </span>
        <span className="tabular-nums">Insgesamt: {total}</span>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="self-start text-xs font-semibold text-muted underline decoration-dotted hover:text-coral"
      >
        Fortschritt zurücksetzen
      </button>
    </div>
  );
}
