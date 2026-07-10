# Setup-Anleitung: Erste Schritte

## 1. Ordnerstruktur
Lege lokal (oder lass dir von Claude Code anlegen) folgende Struktur an:

```
vogel-pflanzen-projekt/
├── CLAUDE.md              ← liegt im Projekt-Root
├── docs/
│   ├── datenmodell.md
│   └── setup-anleitung.md
├── web/                    ← Next.js Projekt kommt hier rein
└── app/                     ← Expo Projekt kommt hier rein (erst in Phase 2 relevant, siehe unten)
```

## 2. Reihenfolge (angepasst an dieses Projekt)

1. **Grundwerkzeuge installieren**: Node.js, Git, GitHub-Konto. Frag Claude Code direkt: *"Ich habe Node.js/Git noch nicht installiert, führ mich Schritt für Schritt durch die Einrichtung."*
2. **Supabase-Projekt anlegen** (supabase.com, gratis), Tabelle `species` gemäss `docs/datenmodell.md` anlegen.
3. **Ein paar Test-Datensätze** von Hand eintragen (z. B. 5 Vögel, 5 Pflanzen aus Level 1) – so kannst du das Spiel testen, bevor die ganze Datenbank befüllt ist.
4. **Next.js-Projekt** im Ordner `web/` aufsetzen, mit Supabase verbinden.
5. **MVP Schritt für Schritt bauen** (siehe Phase 1 in `CLAUDE.md`), in dieser Reihenfolge:
   - Startseite mit Schieberegler (Vögel/Pflanzen/kombiniert) + Toggle "ausländisch ein/ausblenden"
   - Lernkarten-Komponente (Bild + Eingabefeld + Auflösung)
   - Wissensplattform-Unterseite mit Suchfeld
6. Erst wenn das im Browser rund läuft: **Expo-Projekt** in `app/` aufsetzen, dieselbe Supabase-Anbindung nutzen.
7. Danach schrittweise **Phase 2** (alle Level, Punkte, PLZ-Suche) und **Phase 3** (Login, Social Share) angehen.

## 3. Woran du bei der Dateneingabe denken solltest
- Für jede Art: Bild-Quelle und Lizenz sofort mit eintragen (Feld `image_license`), sonst musst du das später mühsam nachrecherchieren.
- Bei Vogelstimmen von Xeno-canto: Aufnahme-Link + Autor/Lizenz notieren (Attribution-Pflicht je nach Lizenz).
