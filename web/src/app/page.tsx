"use client";

import { useCallback, useEffect, useState } from "react";
import CategorySlider, { type Category } from "@/components/CategorySlider";
import NativeToggle from "@/components/NativeToggle";
import LevelSelector from "@/components/LevelSelector";
import ScorePanel from "@/components/ScorePanel";
import Flashcard from "@/components/Flashcard";
import SiteHeader from "@/components/SiteHeader";
import { getSpecies } from "@/lib/species-repo";
import type { Species } from "@/data/species";
import {
  emptyProgress,
  levelPoints,
  loadProgress,
  MAX_LEVEL,
  pointsToAdvance,
  recordAnswer,
  saveProgress,
  totalPoints,
  type Progress,
} from "@/lib/game-progress";

// Mischt ein Array zufällig (Fisher-Yates).
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function GamePage() {
  const [category, setCategory] = useState<Category>("bird");
  const [includeForeign, setIncludeForeign] = useState(true);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState<Progress>(emptyProgress());
  const [deck, setDeck] = useState<Species[]>([]);
  const [index, setIndex] = useState(0);
  const [nodding, setNodding] = useState(false);
  const [award, setAward] = useState(0); // Punkte der zuletzt beantworteten Karte
  const [pendingLevelUp, setPendingLevelUp] = useState(0); // Aufstieg beim nächsten Kartenwechsel
  const [leveledUpTo, setLeveledUpTo] = useState(0); // Erfolgsmeldung im Panel

  // Gespeicherten Fortschritt nach dem Laden übernehmen (async, um Hydration-
  // Konflikte zu vermeiden – setState nur im Callback).
  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) setProgress(loadProgress());
    });
    return () => {
      active = false;
    };
  }, []);

  // Karten neu laden, wenn Kategorie, Toggle oder Level sich ändern.
  useEffect(() => {
    let active = true;
    getSpecies({
      type: category === "both" ? undefined : category,
      levels: [level],
      includeForeign,
    }).then((result) => {
      if (!active) return;
      setDeck(shuffle(result));
      setIndex(0);
    });
    return () => {
      active = false;
    };
  }, [category, includeForeign, level]);

  // Ergebnis einer Karte verbuchen: Punkte, Freischaltung, Aufstieg, Tukan-Nicken.
  const handleResult = useCallback(
    (correct: boolean) => {
      const needed = pointsToAdvance(level);
      const before = levelPoints(progress, level);
      const { progress: next, awarded } = recordAnswer(progress, level, correct);
      const after = levelPoints(next, level);

      saveProgress(next);
      setProgress(next);
      setAward(awarded);
      setLeveledUpTo(0);

      // Zielpunktzahl gerade überschritten → beim nächsten Kartenwechsel aufsteigen.
      if (level < MAX_LEVEL && before < needed && after >= needed) {
        setPendingLevelUp(level + 1);
      }

      if (correct) {
        setNodding(true);
        setTimeout(() => setNodding(false), 750);
      }
    },
    [level, progress],
  );

  // Nächste Karte – oder Aufstieg ins nächste Level (Punktezähler startet dort bei 0).
  const handleNext = useCallback(() => {
    setAward(0);
    if (pendingLevelUp > 0) {
      const target = pendingLevelUp;
      setPendingLevelUp(0);
      setLeveledUpTo(target);
      setTimeout(() => setLeveledUpTo(0), 4000);
      setLevel(target); // löst Kartenneuladen + Zähler-Reset (neues Level) aus
      return;
    }
    setIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex < deck.length) return nextIndex;
      setDeck((d) => shuffle(d));
      return 0;
    });
  }, [pendingLevelUp, deck.length]);

  // Manuelle Levelauswahl bricht einen anstehenden Aufstieg ab.
  const handleSelectLevel = useCallback((n: number) => {
    setPendingLevelUp(0);
    setLeveledUpTo(0);
    setLevel(n);
  }, []);

  const handleReset = useCallback(() => {
    const fresh = emptyProgress();
    saveProgress(fresh);
    setProgress(fresh);
    setPendingLevelUp(0);
    setLeveledUpTo(0);
    setLevel(1);
  }, []);

  const current = deck[index];

  return (
    <>
      <SiteHeader nodding={nodding} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            Erkennst du diese Art?
          </h1>
          <p className="mt-1 text-muted">
            Wähle Kategorie und Level und rate den Namen zum Bild.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,28rem)_1fr] lg:items-start">
          {/* Platzhalter links, damit die Karte exakt mittig bleibt */}
          <div className="hidden lg:block" aria-hidden />

          {/* Spielbereich – mittig */}
          <div className="flex w-full flex-col items-center gap-5">
            <CategorySlider value={category} onChange={setCategory} />
            <LevelSelector
              level={level}
              unlockedLevel={progress.unlockedLevel}
              onSelect={handleSelectLevel}
            />
            <NativeToggle includeForeign={includeForeign} onChange={setIncludeForeign} />

            {current ? (
              <Flashcard
                key={current.id + index + "-" + level}
                species={current}
                onResult={handleResult}
                onNext={handleNext}
                awardedPoints={award}
              />
            ) : (
              <p className="rounded-2xl bg-surface px-6 py-8 text-center text-muted shadow">
                Für diese Auswahl gibt es aktuell keine Karten.
                <br />
                Schalte die ausländischen Arten ein oder wähle eine andere
                Kategorie bzw. ein anderes Level.
              </p>
            )}
          </div>

          {/* Punktestand rechts neben der Karte (auf kleinen Bildschirmen darunter) */}
          <aside className="mx-auto w-full max-w-xs lg:mx-0 lg:w-[240px] lg:sticky lg:top-4">
            <ScorePanel
              level={level}
              levelPoints={levelPoints(progress, level)}
              total={totalPoints(progress)}
              unlockedLevel={progress.unlockedLevel}
              leveledUpTo={leveledUpTo}
              onReset={handleReset}
            />
          </aside>
        </div>
      </main>

      <footer className="px-4 py-4 text-center text-xs text-muted">
        Fotos automatisch von Wikipedia – Lizenzen vor Produktivbetrieb prüfen
      </footer>
    </>
  );
}
