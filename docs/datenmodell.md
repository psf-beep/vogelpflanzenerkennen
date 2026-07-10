# Datenmodell (Supabase / Postgres)

## Tabelle: species
Gemeinsame Tabelle für Vögel UND Pflanzen (unterschieden über `type`).

| Feld | Typ | Beschreibung |
|---|---|---|
| id | uuid | Primärschlüssel |
| type | text | `bird` oder `plant` |
| name_common | text | Name (z. B. "Amsel") |
| name_scientific | text | wissenschaftlicher Name |
| is_native | boolean | einheimisch (true) oder ausländisch (false) |
| level | int | 1–6, Schwierigkeitsstufe gemäss Levelbeschreibung |
| level_variant | text | nur für Vögel relevant: normal / stimme (für die Stimmen-Level) |
| description | text | Kurzbeschreibung der Art |
| fun_fact | text | ein Fun Fact |
| distribution_text | text | Beschreibung, wie verbreitet / wo sichtbar |
| image_url | text | Link zum Bild (Storage oder externe offene Quelle) |
| sound_url | text (nullable) | Link zur Tonaufnahme, nur bei Vögeln |
| image_license | text | Lizenz-/Quellenangabe fürs Bild (Attribution) |
| sound_license | text (nullable) | Lizenz-/Quellenangabe für die Stimme (z. B. Xeno-canto Attribution) |
| created_at | timestamp | automatisch |

## Level-Übersicht (zur Befüllung der `level`/`level_variant`-Felder)

**Pflanzen** (`type = plant`)
1. Einheimisch, bekannt, Garten/Zimmer
2. Einheimisch, bekannt, wild wachsend
3. Ausländisch, bekannt (wild, Garten, Zimmer)
4. Einheimisch, weniger bekannt, Garten/Zimmer
5. Einheimisch, weniger bekannt bis selten, wild wachsend
6. Ausländisch, weniger bekannt bis selten

**Vögel** (`type = bird`)
1. Einheimisch, bekannt (Bild)
2. Ausländisch, bekannt (Bild)
3. Einheimisch, weniger bekannt (Bild)
4. Einheimisch, bekannt (Stimme) → `level_variant = stimme`
5. Ausländisch, bekannt (Stimme) → `level_variant = stimme`
6. Einheimisch, weniger bekannt (Stimme) → `level_variant = stimme`

*(In der ursprünglichen Notiz gab es zwei "Level 4" – oben so nummeriert, dass es 6 durchgehende Level ergibt. Bitte kurz gegenprüfen, ob diese Zuordnung so passt.)*

---

## Phase 2 – zusätzliche Tabellen

### Tabelle: regions
Für die PLZ-basierte Umgebungssuche. Das ist der aufwändigste Teil des ganzen Projekts, da es eine Zuordnung „welche Art kommt in welcher PLZ-Region vor" braucht – diese Daten existieren nicht einfach fertig, sondern müssen z. B. über GBIF-Verbreitungsdaten grob abgeleitet werden (Aufwand nicht unterschätzen).

| Feld | Typ | Beschreibung |
|---|---|---|
| id | uuid | Primärschlüssel |
| plz | text | Schweizer Postleitzahl |
| species_id | uuid | Fremdschlüssel zu `species` |

### Tabelle: user_progress
Nur falls Login kommt.

| Feld | Typ | Beschreibung |
|---|---|---|
| user_id | uuid | von Supabase Auth |
| species_id | uuid | Fremdschlüssel |
| correct_count | int | wie oft richtig geraten |
| points | int | Punktetotal |
