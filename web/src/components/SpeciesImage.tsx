"use client";

import { useState } from "react";
import type { SpeciesType } from "@/data/species";

// Zeigt das Bild einer Art. Falls das Bild nicht lädt (z. B. defekter Link),
// wird ein freundlicher Platzhalter mit passendem Emoji angezeigt, damit die
// Oberfläche nie «kaputt» aussieht.

interface SpeciesImageProps {
  src: string;
  alt: string;
  type: SpeciesType;
  // hideAlt: im Ratemodus darf der Name nicht im alt-Text stehen (sonst spoilert er).
  revealAlt?: boolean;
}

export default function SpeciesImage({
  src,
  alt,
  type,
  revealAlt = true,
}: SpeciesImageProps) {
  const [failed, setFailed] = useState(false);
  const emoji = type === "bird" ? "🐦" : "🌿";

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-leaf-soft text-muted">
        <span className="text-6xl" aria-hidden>
          {emoji}
        </span>
        <span className="text-sm">Bild nicht verfügbar</span>
      </div>
    );
  }

  return (
    // Bewusst natives <img>: die Bilder liegen (noch) auf externen offenen
    // Quellen. Bei Umstieg auf Supabase Storage kann hier next/image genutzt werden.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={revealAlt ? alt : "Zu erratende Art"}
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
