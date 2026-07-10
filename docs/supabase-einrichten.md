# Supabase einrichten – Schritt für Schritt

Ziel: Deine Website liest die Arten (Vögel & Pflanzen) aus einer echten Datenbank
statt aus Testdaten. Danach kannst du Arten und Fotos bequem im Browser pflegen.

> Alles Nötige ist im Projekt schon vorbereitet. Du musst nur ein Supabase-Projekt
> anlegen, zwei SQL-Dateien ausführen und zwei Zugangswerte eintragen.

---

## 1. Konto & Projekt anlegen

1. Auf [supabase.com](https://supabase.com) → **„Start your project"** → mit GitHub anmelden (gratis).
2. **„New project"** klicken.
   - **Name**: z. B. `vogel-pflanze`
   - **Database Password**: ein sicheres Passwort setzen und **notieren** (brauchst du selten, aber gut aufbewahren).
   - **Region**: eine in der Nähe wählen (z. B. „Central EU (Frankfurt)").
3. Auf **„Create new project"** klicken und ~1–2 Minuten warten, bis es bereit ist.

## 2. Tabelle anlegen

1. Links im Menü **„SQL Editor"** öffnen → **„New query"**.
2. Den kompletten Inhalt der Datei [`web/supabase/schema.sql`](../web/supabase/schema.sql) hineinkopieren.
3. Unten rechts auf **„Run"** klicken. → Es entsteht die Tabelle `species`.

## 3. Startdaten einfügen

1. Wieder **„New query"**.
2. Den Inhalt von [`web/supabase/seed.sql`](../web/supabase/seed.sql) einfügen und **„Run"**.
3. Prüfen: links **„Table Editor" → `species`** → du siehst die 12 Arten.

## 4. Zugangswerte holen

1. Links unten **„Project Settings"** (Zahnrad) → **„API"**.
2. Du brauchst zwei Werte:
   - **Project URL** (z. B. `https://abcd1234.supabase.co`)
   - **anon public** Key (ein langer Text unter „Project API keys")

> Der `anon`-Key ist für den öffentlichen Lesezugriff gedacht und darf im Browser
> stehen. Den `service_role`-Key **niemals** in die Website/ins Git legen.

## 5. Werte in die App eintragen

1. Im Projektordner in `web/` eine Datei **`.env.local`** anlegen
   (Vorlage: `web/.env.local.example` – einfach kopieren und umbenennen).
2. Deine Werte eintragen:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=DEIN-ANON-KEY
   ```

3. Den Entwicklungsserver neu starten:

   ```bash
   cd web
   npm run dev
   ```

Fertig – die Website liest jetzt aus Supabase. Ohne diese Datei nutzt sie
weiterhin die Testdaten, es geht also nichts kaputt.

## 6. Fotos prüfen und ändern

Die Startdaten verweisen auf offene Fotos von Wikimedia Commons. Falls ein Foto
mal nicht lädt, zeigt die App automatisch einen Platzhalter.

So tauschst du ein Bild aus:

1. **Table Editor → `species`** → Zeile der Art anklicken.
2. Feld **`image_url`** mit der neuen Bildadresse überschreiben, **`image_license`**
   mit Autor/Lizenz ausfüllen (Attribution nicht vergessen).
3. Speichern – die Website zeigt das neue Bild sofort.

> Tipp für eigene Fotos: In Supabase gibt es **„Storage"**. Dort kannst du Bilder
> hochladen, sie öffentlich machen und die erhaltene Adresse als `image_url` eintragen.

---

## Häufige Fragen

**Ich sehe weiterhin die Testdaten / Illustrationen.**
Dann ist `.env.local` nicht gesetzt oder der Server wurde nicht neu gestartet.
Werte prüfen und `npm run dev` neu starten.

**Fehlermeldung zu „RLS" oder leere Liste.**
Stelle sicher, dass `schema.sql` vollständig lief (es aktiviert den öffentlichen
Lesezugriff). Zur Not `schema.sql` erneut ausführen.

**Neue Art hinzufügen.**
Im **Table Editor → `species` → „Insert row"** alle Felder ausfüllen
(`type` = `bird` oder `plant`, `level` = 1–6). Sie erscheint automatisch.
