// Datenmodell für eine Art (Vogel oder Pflanze).
// Spiegelt 1:1 die Tabelle `species` aus docs/datenmodell.md wider.
//
// Die eigentlichen Testdaten stehen in species.json (eine Zeile pro Art) und
// dienen als Rückfallebene, falls Supabase nicht konfiguriert ist
// (siehe lib/species-repo.ts). Fehlt bei einer Art die image_url, holt die App
// das Foto automatisch von Wikipedia (siehe lib/image-lookup.ts).

import rawSpecies from "./species.json";

export type SpeciesType = "bird" | "plant";

// Nur für Vögel relevant: "normal" (Bild-Level) oder "stimme" (Stimmen-Level).
export type LevelVariant = "normal" | "stimme";

export interface Species {
  id: string;
  type: SpeciesType;
  name_common: string;
  name_scientific: string;
  is_native: boolean; // einheimisch (true) oder ausländisch (false)
  level: number; // 1–6, Schwierigkeitsstufe
  level_variant: LevelVariant;
  description: string;
  fun_fact: string;
  distribution_text: string;
  image_url: string; // leer = Foto wird automatisch von Wikipedia geladen
  sound_url: string | null; // nur bei Vögeln
  image_license: string;
  sound_license: string | null;
}

// Rohdaten aus der JSON (nur die inhaltlich gepflegten Felder).
interface RawSpecies {
  type: SpeciesType;
  name_common: string;
  name_scientific: string;
  is_native: boolean;
  level: number;
  level_variant?: LevelVariant;
  description: string;
  fun_fact: string;
  distribution_text: string;
}

// Erzeugt aus dem wissenschaftlichen Namen eine stabile, einfache ID.
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Rohdaten mit Standardwerten zu vollständigen Species-Objekten ergänzen.
export const SEED_SPECIES: Species[] = (rawSpecies as RawSpecies[]).map((s) => ({
  id: slugify(s.name_scientific),
  type: s.type,
  name_common: s.name_common,
  name_scientific: s.name_scientific,
  is_native: s.is_native,
  level: s.level,
  level_variant: s.level_variant ?? "normal",
  description: s.description,
  fun_fact: s.fun_fact,
  distribution_text: s.distribution_text,
  image_url: "", // wird automatisch geladen
  sound_url: null,
  image_license: "Foto: Wikimedia/Wikipedia (automatisch) – Attribution vor Produktivbetrieb prüfen",
  sound_license: null,
}));
