import Link from "next/link";
import ToucanLogo from "./ToucanLogo";

// Gemeinsamer Kopfbereich mit Tukan-Logo (oben links) und Navigation.

interface SiteHeaderProps {
  nodding?: boolean; // reicht die Nick-Animation ans Logo durch
}

export default function SiteHeader({ nodding = false }: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-8">
      <Link href="/" className="flex items-center gap-2">
        <ToucanLogo nodding={nodding} />
        <span className="text-lg font-extrabold tracking-tight text-foreground">
          Vogel&nbsp;&amp;&nbsp;Pflanze
        </span>
      </Link>
      <nav className="flex items-center gap-1 text-sm font-bold">
        <Link
          href="/"
          className="rounded-full px-3 py-2 text-leaf-dark hover:bg-leaf-soft"
        >
          Spiel
        </Link>
        <Link
          href="/wissen"
          className="rounded-full px-3 py-2 text-leaf-dark hover:bg-leaf-soft"
        >
          Wissen
        </Link>
      </nav>
    </header>
  );
}
