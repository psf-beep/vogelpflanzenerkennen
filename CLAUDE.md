# Projekt: Vogel & Pflanzen Lernplattform (Arbeitstitel)

## Kurzbeschreibung
Lern- und Wissensplattform über einheimische und ausländische Vögel und Pflanzen, für Lernwillige jeden Alters. Zwei Kernfunktionen:
1. **Spiel** (Startseite): Lernkarten-Ratespiel mit Levels
2. **Wissensplattform** (Unterseite): Nachschlagewerk für einzelne Arten + Umgebungssuche via PLZ

Web (Next.js) und iOS-App (Expo/React Native) teilen sich dieselbe Supabase-Datenbank – ein Datenmodell, zwei Oberflächen.

---

## Phase 1 – MVP (das bauen wir zuerst)

Ziel: Ein funktionierendes, kleines, aber vollständiges Erlebnis, keine Nice-to-haves.

- **Spiel**: Schieberegler Vögel / Pflanzen / kombiniert. Nur **Level 1** pro Kategorie (statt aller 6). Lernkarte: Bild oben, Eingabefeld darunter, nach Eingabe Auflösung mit Name + Kurzbeschreibung.
- **Ausländisch abwählen**: Toggle vorhanden, reduziert die Auswahl (auch in Level 1 schon berücksichtigen: Datenmodell braucht das Feld `is_native` von Anfang an).
- **Wissensplattform**: Regler Vögel/Pflanzen, Sucheingabe nach Name → zeigt Bild, Name, Kurzbeschreibung, Verbreitung, Fun Fact. Bei Vögeln: Stimme abspielbar.
- **Kein Login** in Phase 1 (laut Vorgabe nicht zwingend nötig).
- **Design**: natürliche Farben, minimalistisch aber verspielt/farbig, moderne runde gut lesbare Schrift. Tukan-Logo oben links (Nick-Animation bei richtiger Antwort kommt in Phase 1 als einfache CSS-Animation, muss nicht aufwendig sein).

## Phase 2 – nach dem MVP
- Alle 6 Level pro Kategorie (inkl. Vogelstimmen-Level)
- Punktesystem (Punktelogik: 1. Karte Level n = n Punkte, jede weitere Karte +1)
- PLZ-basierte Umgebungssuche (braucht Geodaten-Zuordnung Art ↔ Region – eigener Aufwand, siehe `docs/datenmodell.md`)

## Phase 3 – optional / später
- Login mit E-Mail (Fortschritt speichern)
- Level-Freischaltung wahlweise nach Punkten oder freie Wahl
- Score auf Social Media teilen

---

## Datenquellen (wichtig!)
**Keine ungefragte Übernahme von Inhalten der Vogelwarte Sempach** (Bilder, Texte, Stimmen sind urheberrechtlich geschützt).
Standardmässig verwenden wir offene Quellen:
- **Xeno-canto** für Vogelstimmen (Attribution gemäss jeweiliger Lizenz nicht vergessen)
- **GBIF / iNaturalist** für Artdaten, Verbreitung, teils Bilder (Lizenz pro Bild prüfen)
- Kurzbeschreibungen / Fun Facts: selbst verfasst oder aus gemeinfreien Quellen

Falls stattdessen eine Kooperation mit der Vogelwarte Sempach zustande kommt: diesen Abschnitt anpassen, bevor die Datenbank befüllt wird.

---

## Tech-Stack
- **Web**: Next.js (React), Hosting auf Vercel (Free Tier)
- **iOS-App**: Expo / React Native
- **Backend/DB/Auth**: Supabase (Free Tier) – eine gemeinsame Datenbank für Web + App
- **Styling**: Tailwind CSS
- Sprache: TypeScript bevorzugt (falls das für dich als Anfänger zu viel ist, sag Bescheid – dann bauen wir mit einfachem JavaScript und wechseln später)

## Datenmodell (Kurzfassung, Details in docs/datenmodell.md)
Tabelle `species`:
`id, type (bird/plant), name_common, name_scientific, is_native (bool), level (int, 1–6), description, fun_fact, distribution_text, image_url, sound_url (nur bird), created_at`

Phase 2 zusätzlich: Tabelle `regions` (PLZ ↔ Arten-Zuordnung), Tabelle `user_progress` (falls Login kommt), Punktelogik.

## Design-Vorgaben
- Farbpalette: natürlich (Grün-/Erdtöne), aber verspielt/bunt akzentuiert – nicht trist
- Stil: minimalistisch, modern, freundlich
- Schrift: rund, modern, gut leserlich (z. B. Fonts wie „Quicksand", „Nunito" oder „Poppins" als Ausgangspunkt)
- Logo: Tukan oben links, animiert bei richtiger Antwort (Schnabel-Nicken)

## Code-Konventionen
- Kleine, klar abgegrenzte Komponenten (eine Aufgabe pro Datei)
- Kommentare auf Deutsch sind ok, Variablennamen auf Englisch (Branchen-Standard)
- Nach jeder abgeschlossenen Funktion: kurzer Test im Browser + Git-Commit

## Arbeitsweise mit Claude Code
- Immer **eine Funktion nach der anderen** umsetzen (siehe Phasen oben), nicht alles auf einmal
- Bei Unsicherheit: „erklär mir kurz, was dieser Code macht" nachfragen
- Nach jedem funktionierenden Zwischenstand committen
