"use client";

// Schieberegler zur Kategorie-Auswahl: Vögel / kombiniert / Pflanzen.
// Umgesetzt als «segmented control» mit gleitendem Hintergrund.

export type Category = "bird" | "both" | "plant";

const OPTIONS: { value: Category; label: string; emoji: string }[] = [
  { value: "bird", label: "Vögel", emoji: "🐦" },
  { value: "both", label: "Kombiniert", emoji: "🐦🌿" },
  { value: "plant", label: "Pflanzen", emoji: "🌿" },
];

interface CategorySliderProps {
  value: Category;
  onChange: (value: Category) => void;
}

export default function CategorySlider({ value, onChange }: CategorySliderProps) {
  const activeIndex = OPTIONS.findIndex((o) => o.value === value);

  return (
    <div
      role="radiogroup"
      aria-label="Kategorie wählen"
      className="relative flex w-full max-w-md rounded-full bg-leaf-soft p-1"
    >
      {/* Gleitender Hintergrund für die aktive Option. */}
      <span
        className="absolute inset-y-1 rounded-full bg-leaf shadow-sm transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 0.5rem) / ${OPTIONS.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
        aria-hidden
      />
      {OPTIONS.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`relative z-10 flex-1 rounded-full px-3 py-2 text-sm font-bold transition-colors ${
              active ? "text-white" : "text-leaf-dark hover:text-leaf"
            }`}
          >
            <span className="mr-1" aria-hidden>
              {o.emoji}
            </span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
