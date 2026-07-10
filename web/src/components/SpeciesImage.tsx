"use client";

import { useEffect, useState } from "react";
import type { SpeciesType } from "@/data/species";
import { fetchSpeciesImage } from "@/lib/image-lookup";

// Zeigt das Bild einer Art. Ist keine feste image_url vorhanden, wird das Foto
// automatisch von Wikipedia geholt (über den wissenschaftlichen Namen).
// Lädt/fehlt ein Bild, erscheint ein freundlicher Platzhalter mit Emoji.
//
// Hinweis: Die Komponente wird pro Art frisch eingehängt (im Spiel über den
// key-Prop, in der Wissensliste durch stabile, unveränderliche Props), daher
// braucht es kein manuelles Zurücksetzen der Zustände bei Prop-Wechsel.

interface SpeciesImageProps {
  src: string; // feste Bildadresse (leer = automatisch laden)
  scientificName: string; // für die automatische Bildsuche
  alt: string;
  type: SpeciesType;
  // Im Ratemodus darf der Name nicht im alt-Text stehen (sonst spoilert er).
  revealAlt?: boolean;
}

export default function SpeciesImage({
  src,
  scientificName,
  alt,
  type,
  revealAlt = true,
}: SpeciesImageProps) {
  // undefined = noch nicht nachgeschlagen, null = nichts gefunden.
  const [fetched, setFetched] = useState<string | null | undefined>(undefined);
  const [imgError, setImgError] = useState(false);
  const emoji = type === "bird" ? "🐦" : "🌿";

  // Nur laden, wenn keine feste Adresse vorliegt. setState nur im async-Callback.
  useEffect(() => {
    if (src) return;
    let active = true;
    fetchSpeciesImage(scientificName).then((url) => {
      if (active) setFetched(url);
    });
    return () => {
      active = false;
    };
  }, [src, scientificName]);

  const resolvedSrc = src || (fetched ?? "");
  const loading = !src && fetched === undefined && !imgError;
  const failed = imgError || (!resolvedSrc && fetched === null);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-leaf-soft text-4xl">
        <span className="animate-pulse" aria-hidden>
          {emoji}
        </span>
      </div>
    );
  }

  if (failed || !resolvedSrc) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-leaf-soft text-muted">
        <span className="text-6xl" aria-hidden>
          {emoji}
        </span>
        <span className="text-sm">Kein Bild gefunden</span>
      </div>
    );
  }

  return (
    // Bewusst natives <img>: die Bilder liegen auf externen offenen Quellen.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolvedSrc}
      alt={revealAlt ? alt : "Zu erratende Art"}
      // object-contain: ganzes Tier immer sichtbar (Kopf wird nicht abgeschnitten).
      className="h-full w-full bg-leaf-soft object-contain"
      onError={() => setImgError(true)}
    />
  );
}
