// Erzeugt web/supabase/seed.sql aus web/src/data/species.json.
// So bleiben Datenbank-Startdaten und App-Testdaten aus einer einzigen Quelle.
//
// Ausführen:  node web/supabase/generate-seed.mjs

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dataPath = join(here, "..", "src", "data", "species.json");
const outPath = join(here, "seed.sql");

const species = JSON.parse(await readFile(dataPath, "utf8"));

// Text SQL-sicher machen: einfache Anführungszeichen verdoppeln.
const q = (value) => `'${String(value).replace(/'/g, "''")}'`;

const LICENSE = "Foto: Wikimedia/Wikipedia (automatisch) – Attribution vor Produktivbetrieb prüfen";

const rows = species
  .map((s) => {
    const variant = s.level_variant ?? "normal";
    return (
      "  (" +
      [
        q(s.type),
        q(s.name_common),
        q(s.name_scientific),
        s.is_native ? "true" : "false",
        s.level,
        q(variant),
        q(s.description),
        q(s.fun_fact),
        q(s.distribution_text),
        q(LICENSE),
      ].join(", ") +
      ")"
    );
  })
  .join(",\n");

const sql = `-- AUTOMATISCH ERZEUGT aus src/data/species.json – nicht von Hand bearbeiten.
-- Neu erzeugen mit:  node web/supabase/generate-seed.mjs
--
-- Anwendung: nach schema.sql im Supabase "SQL Editor" einfügen und ausführen.
-- Fotos werden von der App automatisch von Wikipedia geladen (leeres image_url),
-- lassen sich aber jederzeit im Tabelleneditor mit einer eigenen Adresse überschreiben.

-- Vorhandene Daten entfernen, damit es keine Dubletten gibt.
delete from public.species;

insert into public.species
  (type, name_common, name_scientific, is_native, level, level_variant,
   description, fun_fact, distribution_text, image_license)
values
${rows};
`;

await writeFile(outPath, sql, "utf8");
console.log(`seed.sql geschrieben: ${species.length} Arten.`);
