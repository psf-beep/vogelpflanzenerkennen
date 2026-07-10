"use client";

import { useRef, useState } from "react";
import type { Species } from "@/data/species";
import { isAnswerCorrect } from "@/lib/answer-check";
import SpeciesImage from "./SpeciesImage";

// Eine Lernkarte: Bild oben, Eingabefeld darunter. Nach dem Raten erscheint
// die Auflösung mit Name und Kurzbeschreibung.

interface FlashcardProps {
  species: Species;
  onCorrect: () => void; // meldet richtige Antwort nach oben (Tukan-Nicken)
  onNext: () => void; // nächste Karte anfordern
}

export default function Flashcard({ species, onCorrect, onNext }: FlashcardProps) {
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (revealed) return;
    const correct = isAnswerCorrect(guess, species.name_common);
    setWasCorrect(correct);
    setRevealed(true);
    if (correct) onCorrect();
  }

  function handleGiveUp() {
    setWasCorrect(false);
    setRevealed(true);
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-surface shadow-lg ring-1 ring-black/5">
      {/* Bild */}
      <div className="aspect-[4/3] w-full bg-leaf-soft">
        <SpeciesImage
          src={species.image_url}
          alt={species.name_common}
          type={species.type}
          revealAlt={revealed}
        />
      </div>

      <div className="p-5">
        {!revealed ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="guess" className="text-sm font-semibold text-muted">
              Welche Art ist das?
            </label>
            <input
              id="guess"
              autoFocus
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Name eingeben …"
              className="w-full rounded-xl border-2 border-leaf-soft bg-background px-4 py-3 text-lg outline-none focus:border-leaf"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-leaf px-4 py-3 font-bold text-white transition hover:bg-leaf-dark"
              >
                Prüfen
              </button>
              <button
                type="button"
                onClick={handleGiveUp}
                className="rounded-xl px-4 py-3 font-semibold text-muted transition hover:text-foreground"
              >
                Auflösen
              </button>
            </div>
          </form>
        ) : (
          <div className="fade-up flex flex-col gap-3">
            <p
              className={`text-sm font-bold ${
                wasCorrect ? "text-leaf" : "text-coral"
              }`}
            >
              {wasCorrect ? "Richtig! 🎉" : "Nicht ganz – so sieht die Art aus:"}
            </p>

            <div>
              <h2 className="text-2xl font-extrabold text-foreground">
                {species.name_common}
              </h2>
              <p className="italic text-muted">{species.name_scientific}</p>
            </div>

            <p className="text-foreground">{species.description}</p>

            {/* Vogelstimme, falls vorhanden (Phase 1: nur wenn sound_url gesetzt). */}
            {species.type === "bird" && species.sound_url && (
              <div>
                <p className="mb-1 text-sm font-semibold text-muted">Stimme anhören:</p>
                <audio ref={audioRef} controls src={species.sound_url} className="w-full">
                  Dein Browser kann kein Audio abspielen.
                </audio>
              </div>
            )}

            <button
              type="button"
              onClick={onNext}
              className="mt-1 rounded-xl bg-sun px-4 py-3 font-bold text-[#4a3a10] transition hover:brightness-105"
            >
              Nächste Karte →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
