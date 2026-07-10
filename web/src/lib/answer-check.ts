// Prüft die geratene Antwort gegen die gültigen Namen einer Art.
// Grosszügig: Gross-/Kleinschreibung, führende Artikel und kleine Tippfehler
// werden verziehen. Mehrere gültige Namen (z. B. Stieglitz / Distelfink) möglich.

function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/^(der|die|das|ein|eine)\s+/, "") // führende Artikel weg
    .replace(/[^a-zäöüß\s]/g, "") // Satzzeichen weg
    .replace(/\s+/g, " ");
}

// Levenshtein-Distanz (Anzahl Einzeländerungen zwischen zwei Wörtern).
function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function matchesOne(guess: string, name: string): boolean {
  const c = normalize(name);
  if (!c) return false;
  if (guess === c) return true;
  // Kleine Tippfehler erlauben: längere Namen dürfen etwas mehr abweichen.
  const tolerance = c.length > 8 ? 2 : 1;
  return levenshtein(guess, c) <= tolerance;
}

// Richtig, wenn der Tipp zu irgendeinem der gültigen Namen passt.
export function isAnswerCorrect(guess: string, acceptedNames: string[]): boolean {
  const g = normalize(guess);
  if (!g) return false;
  return acceptedNames.some((name) => matchesOne(g, name));
}
