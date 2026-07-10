"use client";

import { MAX_LEVEL, pointsToAdvance } from "@/lib/game-progress";

// Punktestand-Anzeige (im Spiel rechts). Zeigt Gesamtpunkte, aktuelles Level
// und den Fortschritt bis zum nächsten Level.

interface ScorePanelProps {
  level: number;
  total: number;
  levelPoints: number;
  unlockedLevel: number;
  onReset: () => void;
}

export default function ScorePanel({
  level,
  total,
  levelPoints,
  unlockedLevel,
  onReset,
}: ScorePanelProps) {
  const isTopLevel = level >= MAX_LEVEL;
  const needed = pointsToAdvance(level);
  const ratio = isTopLevel ? 1 : Math.min(1, levelPoints / needed);

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-surface p-5 shadow-lg ring-1 ring-black/5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">Punktestand</h2>
        <span className="text-xs font-semibold text-muted">Level {level}</span>
      </div>

      {/* Gesamtpunkte */}
      <div>
        <div className="text-4xl font-extrabold tabular-nums text-leaf">{total}</div>
        <div className="text-sm text-muted">Punkte gesamt</div>
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

      {/* freigeschaltete Level */}
      <p className="text-xs text-muted">
        {unlockedLevel <= 1
          ? "Freigeschaltet: Level 1"
          : `Freigeschaltet: Level 1–${unlockedLevel}`}
        {unlockedLevel >= MAX_LEVEL ? " (alle!)" : ""}
      </p>

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
