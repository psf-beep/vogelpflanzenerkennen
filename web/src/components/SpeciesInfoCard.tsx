import type { Species } from "@/data/species";
import SpeciesImage from "./SpeciesImage";

// Nachschlage-Karte für die Wissensplattform: zeigt alle Infos einer Art
// (Bild, Name, Kurzbeschreibung, Verbreitung, Fun Fact, ggf. Stimme).

export default function SpeciesInfoCard({ species }: { species: Species }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-surface shadow-lg ring-1 ring-black/5">
      <div className="aspect-[4/3] w-full bg-leaf-soft">
        <SpeciesImage
          src={species.image_url}
          scientificName={species.name_scientific}
          alt={species.name_common}
          type={species.type}
        />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-foreground">
              {species.name_common}
            </h2>
            {!species.is_native && (
              <span className="rounded-full bg-sky/15 px-2 py-0.5 text-xs font-bold text-sky">
                ausländisch
              </span>
            )}
          </div>
          <p className="italic text-muted">{species.name_scientific}</p>
        </div>

        <p className="text-foreground">{species.description}</p>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted">
            Verbreitung
          </h3>
          <p className="text-foreground">{species.distribution_text}</p>
        </div>

        <div className="rounded-2xl bg-leaf-soft p-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-leaf-dark">
            Fun Fact
          </h3>
          <p className="text-foreground">{species.fun_fact}</p>
        </div>

        {species.type === "bird" && species.sound_url && (
          <div>
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-muted">
              Stimme
            </h3>
            <audio controls src={species.sound_url} className="w-full">
              Dein Browser kann kein Audio abspielen.
            </audio>
          </div>
        )}
      </div>
    </article>
  );
}
