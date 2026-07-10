// Zentrale Zugriffsschicht auf die Arten-Daten.
//
// Ist Supabase konfiguriert (web/.env.local gesetzt), wird aus der Datenbank
// gelesen. Andernfalls – oder falls die Abfrage fehlschlägt – dienen die
// Seed-Daten aus src/data/species.ts als Rückfallebene. So läuft die App immer.

import { SEED_SPECIES, type Species, type SpeciesType } from "@/data/species";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export interface SpeciesQuery {
  type?: SpeciesType; // undefined = Vögel UND Pflanzen (kombiniert)
  levels?: number[]; // z. B. [1] für die MVP-Phase
  includeForeign?: boolean; // false = nur einheimische Arten anzeigen
  search?: string; // Freitextsuche über den Namen (Wissensplattform)
}

// Liefert die passenden Arten – aus Supabase, sonst aus den Seed-Daten.
export async function getSpecies(query: SpeciesQuery = {}): Promise<Species[]> {
  if (isSupabaseConfigured()) {
    try {
      return await getSpeciesFromSupabase(query);
    } catch (error) {
      // Bei Problemen nicht die ganze Seite lahmlegen, sondern Testdaten zeigen.
      console.warn("Supabase-Abfrage fehlgeschlagen, nutze Testdaten:", error);
    }
  }
  return filterSeed(query);
}

async function getSpeciesFromSupabase(query: SpeciesQuery): Promise<Species[]> {
  const { type, levels, includeForeign = true, search } = query;
  let q = getSupabaseClient().from("species").select("*").order("name_common");

  if (type) q = q.eq("type", type);
  if (levels?.length) q = q.in("level", levels);
  if (!includeForeign) q = q.eq("is_native", true);
  if (search?.trim()) q = q.ilike("name_common", `%${search.trim()}%`);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Species[];
}

// Dieselbe Filterlogik lokal auf den Testdaten.
function filterSeed(query: SpeciesQuery): Species[] {
  const { type, levels, includeForeign = true, search } = query;
  const needle = search?.trim().toLowerCase();

  return SEED_SPECIES.filter((s) => {
    if (type && s.type !== type) return false;
    if (levels && !levels.includes(s.level)) return false;
    if (!includeForeign && !s.is_native) return false;
    if (needle && !s.name_common.toLowerCase().includes(needle)) return false;
    return true;
  });
}
