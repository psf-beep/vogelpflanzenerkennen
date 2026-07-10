// Supabase-Client.
//
// Sobald die Werte in web/.env.local gesetzt sind (Vorlage: .env.local.example),
// liest die App automatisch aus Supabase (siehe species-repo.ts). Ohne diese
// Werte fällt die App auf die Testdaten zurück – nichts geht kaputt.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Ist Supabase überhaupt konfiguriert?
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

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
