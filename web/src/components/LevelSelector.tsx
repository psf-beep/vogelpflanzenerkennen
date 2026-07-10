"use client";

import { MAX_LEVEL } from "@/lib/game-progress";

// Auswahl des Levels 1–6. Noch nicht freigeschaltete Level sind gesperrt (🔒)
// und werden erst durch genug Punkte im vorherigen Level wählbar.

interface LevelSelectorProps {
  level: number;
  unlockedLevel: number;
  onSelect: (level: number) => void;
}

export default function LevelSelector({ level, unlockedLevel, onSelect }: LevelSelectorProps) {
  const levels = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-bold text-muted">Level</span>
      <div className="flex flex-wrap justify-center gap-2">
        {levels.map((n) => {
          const locked = n > unlockedLevel;
          const active = n === level;
          return (
            <button
              key={n}
              type="button"
              disabled={locked}
              onClick={() => onSelect(n)}
              aria-pressed={active}
              title={locked ? "Sammle mehr Punkte, um dieses Level freizuschalten" : `Level ${n}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold transition ${
                active
                  ? "bg-leaf text-white shadow"
                  : locked
                    ? "cursor-not-allowed bg-leaf-soft/60 text-muted/50"
                    : "bg-leaf-soft text-leaf-dark hover:brightness-95"
              }`}
            >
              {locked ? "🔒" : n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
