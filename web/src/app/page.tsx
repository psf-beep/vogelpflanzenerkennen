"use client";

import { useCallback, useEffect, useState } from "react";
import CategorySlider, { type Category } from "@/components/CategorySlider";
import NativeToggle from "@/components/NativeToggle";
import Flashcard from "@/components/Flashcard";
import SiteHeader from "@/components/SiteHeader";
import { getSpecies } from "@/lib/species-repo";
import type { Species } from "@/data/species";

// Startseite = das Spiel. MVP: nur Level 1 pro Kategorie.
const MVP_LEVELS = [1];

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
  const [deck, setDeck] = useState<Species[]>([]);
  const [index, setIndex] = useState(0);
  const [nodding, setNodding] = useState(false);

  // Karten neu laden, wenn Kategorie oder Toggle sich ändern.
  useEffect(() => {
    let active = true;
    getSpecies({
      type: category === "both" ? undefined : category,
      levels: MVP_LEVELS,
      includeForeign,
    }).then((result) => {
      if (!active) return;
      setDeck(shuffle(result));
      setIndex(0);
    });
    return () => {
      active = false;
    };
  }, [category, includeForeign]);

  // Tukan nickt kurz bei richtiger Antwort.
  const handleCorrect = useCallback(() => {
    setNodding(true);
    setTimeout(() => setNodding(false), 750);
  }, []);

  // Nächste Karte; am Ende des Stapels neu mischen.
  const handleNext = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next < deck.length) return next;
      setDeck((d) => shuffle(d));
      return 0;
    });
  }, [deck.length]);

  const current = deck[index];

  return (
    <>
      <SiteHeader nodding={nodding} />

      <main className="flex flex-1 flex-col items-center gap-6 px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            Erkennst du diese Art?
          </h1>
          <p className="mt-1 text-muted">
            Wähle eine Kategorie und rate den Namen zum Bild.
          </p>
        </div>

        {/* Steuerung: Kategorie + Ausländisch-Toggle */}
        <div className="flex w-full max-w-md flex-col items-center gap-4">
          <CategorySlider value={category} onChange={setCategory} />
          <NativeToggle includeForeign={includeForeign} onChange={setIncludeForeign} />
        </div>

        {/* Lernkarte oder Hinweis, falls keine Arten passen */}
        {current ? (
          <Flashcard
            key={current.id + index}
            species={current}
            onCorrect={handleCorrect}
            onNext={handleNext}
          />
        ) : (
          <p className="rounded-2xl bg-surface px-6 py-8 text-center text-muted shadow">
            Für diese Auswahl gibt es aktuell keine Karten.
            <br />
            Schalte die ausländischen Arten ein oder wähle eine andere Kategorie.
          </p>
        )}
      </main>

      <footer className="px-4 py-4 text-center text-xs text-muted">
        Testdaten · Bilder von Wikimedia Commons – Lizenzen vor Produktivbetrieb prüfen
      </footer>
    </>
  );
}
