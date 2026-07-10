"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SpeciesInfoCard from "@/components/SpeciesInfoCard";
import { getSpecies } from "@/lib/species-repo";
import type { Species, SpeciesType } from "@/data/species";

// Wissensplattform: Regler Vögel/Pflanzen + Suche nach Name.
// Zeigt Bild, Name, Kurzbeschreibung, Verbreitung, Fun Fact (bei Vögeln: Stimme).

type Filter = SpeciesType | "all";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "bird", label: "Vögel" },
  { value: "plant", label: "Pflanzen" },
];

export default function WissenPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [all, setAll] = useState<Species[]>([]);

  // Alle Arten einmal laden (über alle Level – hier geht es ums Nachschlagen).
  useEffect(() => {
    let active = true;
    getSpecies({ levels: [1, 2, 3, 4, 5, 6] }).then((result) => {
      if (active) setAll(result);
    });
    return () => {
      active = false;
    };
  }, []);

  // Filtern nach Kategorie + Suchtext (im Browser, da alle Daten schon da sind).
  const results = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return all.filter((s) => {
      if (filter !== "all" && s.type !== filter) return false;
      if (needle && !s.name_common.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [all, filter, search]);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            Wissensplattform
          </h1>
          <p className="mt-1 text-muted">Arten nachschlagen und mehr erfahren.</p>
        </div>

        {/* Suchfeld */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nach Name suchen … (z. B. Amsel)"
          className="w-full rounded-xl border-2 border-leaf-soft bg-surface px-4 py-3 text-lg outline-none focus:border-leaf"
        />

        {/* Kategorie-Filter */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                filter === f.value
                  ? "bg-leaf text-white"
                  : "bg-leaf-soft text-leaf-dark hover:brightness-95"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Ergebnisse */}
        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <SpeciesInfoCard key={s.id} species={s} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-surface px-6 py-8 text-center text-muted shadow">
            Keine Art gefunden. Versuch einen anderen Suchbegriff.
          </p>
        )}
      </main>

      <footer className="px-4 py-4 text-center text-xs text-muted">
        Testdaten · Bilder von Wikimedia Commons – Lizenzen vor Produktivbetrieb prüfen
      </footer>
    </>
  );
}
