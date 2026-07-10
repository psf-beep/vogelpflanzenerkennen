# Vogel & Pflanzen – Lernplattform

Lern- und Wissensplattform über einheimische und ausländische Vögel und Pflanzen.
Zwei Kernfunktionen: ein **Lernkarten-Ratespiel** (Startseite) und eine
**Wissensplattform** zum Nachschlagen.

> Projektbeschreibung, Phasen und Design-Vorgaben stehen in [`CLAUDE.md`](./CLAUDE.md).
> Datenmodell und Setup-Details unter [`docs/`](./docs).

## Projektstruktur

```
vogelpflanzenerkennen/
├── CLAUDE.md              ← Projektbeschreibung & Vorgaben
├── docs/                  ← Datenmodell + Setup-Anleitung
└── web/                   ← die Web-App (Next.js)
```

Der App-Ordner `app/` (iOS mit Expo) kommt gemäss Plan erst später dazu.

## Web-App starten

```bash
cd web
npm install      # einmalig: installiert alle Bausteine
npm run dev      # startet den Entwicklungsserver
```

Dann im Browser öffnen: <http://localhost:3000>

- **Startseite** (`/`): das Spiel – Kategorie wählen (Vögel / kombiniert /
  Pflanzen), ausländische Arten ein-/ausblenden, Namen zum Bild raten.
- **Wissen** (`/wissen`): Arten nachschlagen und durchsuchen.

## Aktueller Stand (MVP, Phase 1)

- ✅ Spiel mit Level-1-Testdaten, Kategorie-Regler und Ausländisch-Toggle
- ✅ Wissensplattform mit Suche
- ✅ Tukan-Logo mit Nick-Animation bei richtiger Antwort
- ⏳ Echte Daten in Supabase (aktuell noch Testdaten in `web/src/data/species.ts`)

Die Daten kommen aktuell aus einer lokalen Testdatei. Die Umstellung auf
Supabase ist vorbereitet: nur `web/src/lib/species-repo.ts` muss dafür
angepasst werden (Zugangsdaten via `web/.env.local`, Vorlage liegt bei).

## Bilder & Lizenzen

Die Testbilder stammen von Wikimedia Commons (offene Lizenzen). **Vor dem
Produktivbetrieb** muss jede Lizenz einzeln geprüft und korrekt angegeben
werden – siehe Hinweise in `CLAUDE.md` und `docs/setup-anleitung.md`.
