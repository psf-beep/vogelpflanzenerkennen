// Holt automatisch ein Foto zu einer Art von Wikipedia – anhand des
// wissenschaftlichen Namens. So brauchen wir nicht für jede Art von Hand eine
// Bildadresse zu pflegen. Wird nur genutzt, wenn eine Art keine eigene
// image_url hat.
//
// Technik: die öffentliche MediaWiki-API (mit origin=* für CORS im Browser).
// Ergebnisse werden im Speicher und in localStorage zwischengespeichert, damit
// wir nicht bei jedem Anzeigen neu anfragen.

const memoryCache = new Map<string, string | null>();
const CACHE_PREFIX = "vp-img:";

function readCache(name: string): string | null | undefined {
  if (memoryCache.has(name)) return memoryCache.get(name);
  if (typeof window === "undefined") return undefined;
  const stored = window.localStorage.getItem(CACHE_PREFIX + name);
  if (stored === null) return undefined; // noch nie nachgeschlagen
  const value = stored === "" ? null : stored;
  memoryCache.set(name, value);
  return value;
}

function writeCache(name: string, url: string | null) {
  memoryCache.set(name, url);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(CACHE_PREFIX + name, url ?? "");
  }
}

// Sucht auf einer Wikipedia-Sprachversion das beste Vorschaubild.
async function queryWiki(lang: string, query: string): Promise<string | null> {
  const url =
    `https://${lang}.wikipedia.org/w/api.php` +
    `?action=query&format=json&origin=*` +
    `&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1` +
    `&prop=pageimages&piprop=thumbnail&pithumbsize=800`;

  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data?.query?.pages;
  if (!pages) return null;
  for (const key of Object.keys(pages)) {
    const thumb = pages[key]?.thumbnail?.source;
    if (typeof thumb === "string") return thumb;
  }
  return null;
}

// Liefert eine Bildadresse für die Art – oder null, wenn nichts gefunden wurde.
export async function fetchSpeciesImage(scientificName: string): Promise<string | null> {
  const cached = readCache(scientificName);
  if (cached !== undefined) return cached;

  try {
    // Zuerst deutsche, dann englische Wikipedia versuchen.
    const url =
      (await queryWiki("de", scientificName)) ??
      (await queryWiki("en", scientificName));
    writeCache(scientificName, url);
    return url;
  } catch {
    // Netzwerkfehler: nicht zwischenspeichern, damit später neu versucht wird.
    return null;
  }
}
