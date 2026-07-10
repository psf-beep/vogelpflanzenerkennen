"use client";

// Toggle: ausländische Arten ein-/ausblenden.
// «An» = auch ausländische Arten zeigen. «Aus» = nur einheimische.

interface NativeToggleProps {
  includeForeign: boolean;
  onChange: (includeForeign: boolean) => void;
}

export default function NativeToggle({ includeForeign, onChange }: NativeToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={includeForeign}
      onClick={() => onChange(!includeForeign)}
      className="flex items-center gap-3 text-sm font-semibold text-foreground"
    >
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          includeForeign ? "bg-sky" : "bg-muted/40"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            includeForeign ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </span>
      <span>
        Ausländische Arten{" "}
        <span className={includeForeign ? "text-sky" : "text-muted"}>
          {includeForeign ? "an" : "aus"}
        </span>
      </span>
    </button>
  );
}
