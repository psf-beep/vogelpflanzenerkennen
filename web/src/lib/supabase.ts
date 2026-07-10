// Supabase-Client (für später vorbereitet).
//
// In Phase 1 arbeiten wir noch mit Seed-Daten (siehe species-repo.ts), daher
// wird dieser Client aktuell noch nicht genutzt. Sobald das Supabase-Projekt
// steht, die Werte in .env.local eintragen (Vorlage: .env.local.example) und
// in species-repo.ts auf die Supabase-Abfrage umstellen.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase ist nicht konfiguriert. Bitte NEXT_PUBLIC_SUPABASE_URL und " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in web/.env.local setzen (siehe .env.local.example).",
    );
  }

  // Client nur einmal erzeugen und wiederverwenden.
  if (!client) client = createClient(url, anonKey);
  return client;
}
