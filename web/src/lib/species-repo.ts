// Zentrale Zugriffsschicht auf die Arten-Daten.
//
// Aktuell liefert diese Datei die Seed-Daten aus src/data/species.ts.
// Sobald Supabase befüllt ist, wird NUR diese Datei umgestellt – die
// Komponenten bleiben unverändert. Ein Beispiel für die Supabase-Abfrage
// steht als Kommentar bei getSpecies().

import { SEED_SPECIES, type Species, type SpeciesType } from "@/data/species";

export interface SpeciesQuery {
  type?: SpeciesType; // undefined = Vögel UND Pflanzen (kombiniert)
  levels?: number[]; // z. B. [1] für die MVP-Phase
  includeForeign?: boolean; // false = nur einheimische Arten anzeigen
  search?: string; // Freitextsuche über den Namen (Wissensplattform)
}

// Liefert die passenden Arten. async, damit der spätere Supabase-Aufruf
// keine Signaturänderung erfordert.
export async function getSpecies(query: SpeciesQuery = {}): Promise<Species[]> {
  const { type, levels, includeForeign = true, search } = query;

  // --- Später mit Supabase (Beispiel) -------------------------------------
  // const supabase = getSupabaseClient();
  // let q = supabase.from("species").select("*");
  // if (type) q = q.eq("type", type);
  // if (levels?.length) q = q.in("level", levels);
  // if (!includeForeign) q = q.eq("is_native", true);
  // if (search) q = q.ilike("name_common", `%${search}%`);
  // const { data, error } = await q;
  // if (error) throw error;
  // return data ?? [];
  // ------------------------------------------------------------------------

  const needle = search?.trim().toLowerCase();

  return SEED_SPECIES.filter((s) => {
    if (type && s.type !== type) return false;
    if (levels && !levels.includes(s.level)) return false;
    if (!includeForeign && !s.is_native) return false;
    if (needle && !s.name_common.toLowerCase().includes(needle)) return false;
    return true;
  });
}
