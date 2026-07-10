// Tukan-Logo (oben links). Bei richtiger Antwort nickt der Schnabel kurz.
// Reine CSS-Animation (siehe .toucan-nod in globals.css) – bewusst schlicht.

interface ToucanLogoProps {
  nodding?: boolean; // löst die Nick-Animation aus
  size?: number;
}

export default function ToucanLogo({ nodding = false, size = 44 }: ToucanLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Tukan-Logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Körper */}
      <circle cx="30" cy="38" r="18" fill="#23372b" />
      {/* Brust */}
      <path d="M18 40a12 12 0 0 0 24 0c0-6-5-9-12-9s-12 3-12 9Z" fill="#f6f5ee" />
      {/* Kopf */}
      <circle cx="34" cy="26" r="12" fill="#23372b" />
      {/* Auge */}
      <circle cx="38" cy="24" r="4.5" fill="#f6f5ee" />
      <circle cx="39" cy="24" r="2.2" fill="#23372b" />

      {/* Schnabel – nickt bei richtiger Antwort */}
      <g className={nodding ? "toucan-nod" : undefined}>
        <path d="M44 22c9-3 16-1 18 2 2 3-1 7-8 8-6 1-11-1-13-4Z" fill="#f4b942" />
        <path d="M44 22c9-3 16-1 18 2-6-1-12-1-18 1Z" fill="#ef6f5b" />
        <path d="M45 27c4 1 9 1 13-.4" fill="none" stroke="#c9852f" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
