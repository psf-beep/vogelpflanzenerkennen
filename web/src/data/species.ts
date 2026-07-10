// Datenmodell für eine Art (Vogel oder Pflanze).
// Spiegelt 1:1 die Tabelle `species` aus docs/datenmodell.md wider,
// damit später nahtlos auf Supabase umgestellt werden kann.

export type SpeciesType = "bird" | "plant";

// Nur für Vögel relevant: "normal" (Bild-Level) oder "stimme" (Stimmen-Level).
export type LevelVariant = "normal" | "stimme";

export interface Species {
  id: string;
  type: SpeciesType;
  name_common: string;
  name_scientific: string;
  is_native: boolean; // einheimisch (true) oder ausländisch (false)
  level: number; // 1–6, Schwierigkeitsstufe
  level_variant: LevelVariant;
  description: string;
  fun_fact: string;
  distribution_text: string;
  image_url: string;
  sound_url: string | null; // nur bei Vögeln
  image_license: string; // Attribution / Quelle fürs Bild
  sound_license: string | null;
}

// Hilfsfunktion für Wikimedia-Commons-Bilder über den stabilen FilePath-Endpunkt.
const wiki = (fileName: string, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    fileName,
  )}?width=${width}`;

// ---------------------------------------------------------------------------
// SEED-DATEN (Testdatensätze für die MVP-Phase).
// Später ersetzt durch echte Daten aus Supabase – siehe lib/species-repo.ts.
// Bilder: Wikimedia Commons (offene Lizenzen). Vor dem Produktivbetrieb bitte
// jede Lizenz einzeln prüfen und korrekt attribuieren (siehe docs/setup-anleitung.md).
// ---------------------------------------------------------------------------
export const SEED_SPECIES: Species[] = [
  // ---------------- Vögel · Level 1 (einheimisch, bekannt) ----------------
  {
    id: "bird-amsel",
    type: "bird",
    name_common: "Amsel",
    name_scientific: "Turdus merula",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Häufigster Drosselvogel in Gärten und Parks. Männchen tiefschwarz mit gelbem Schnabel, Weibchen braun.",
    fun_fact:
      "Amseln waren ursprünglich scheue Waldvögel und sind erst in den letzten 200 Jahren zu Stadtvögeln geworden.",
    distribution_text: "In ganz Mitteleuropa verbreitet, das ganze Jahr über sichtbar.",
    image_url: wiki("Common_Blackbird.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "bird-rotkehlchen",
    type: "bird",
    name_common: "Rotkehlchen",
    name_scientific: "Erithacus rubecula",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Kleiner rundlicher Vogel mit auffällig oranger Brust und Kehle. Sehr zutraulich.",
    fun_fact:
      "Rotkehlchen folgen im Wald gerne Wildschweinen – und im Garten dem Spaten, um aufgescheuchte Würmer zu erwischen.",
    distribution_text: "In ganz Europa häufig, oft ganzjährig im Garten.",
    image_url: wiki("Erithacus rubecula with cocked head.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "bird-kohlmeise",
    type: "bird",
    name_common: "Kohlmeise",
    name_scientific: "Parus major",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Grösste einheimische Meise, gelbe Brust mit schwarzem Längsstreifen und schwarzem Kopf mit weissen Wangen.",
    fun_fact:
      "Der schwarze Bauchstreifen ist bei kräftigen Männchen breiter – ein Signal an Rivalen und Partnerinnen.",
    distribution_text: "Überall in Wäldern, Gärten und Parks, ganzjährig.",
    image_url: wiki("Parus major Luc Viatour.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "bird-haussperling",
    type: "bird",
    name_common: "Haussperling",
    name_scientific: "Passer domesticus",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Auch «Spatz» genannt. Lebt gesellig in der Nähe des Menschen, Männchen mit grauem Scheitel und schwarzem Kehlfleck.",
    fun_fact:
      "Spatzen baden gerne im Staub statt im Wasser – das hält das Gefieder von Parasiten frei.",
    distribution_text: "Weltweit einer der häufigsten Vögel, immer in Menschennähe.",
    image_url: wiki("Passer domesticus male (15).jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "bird-buchfink",
    type: "bird",
    name_common: "Buchfink",
    name_scientific: "Fringilla coelebs",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Häufiger Finkenvogel, Männchen mit blaugrauem Kopf, rostroter Brust und weissen Flügelbinden.",
    fun_fact:
      "Buchfinken haben regionale «Dialekte» – ihr Gesang klingt je nach Gegend leicht unterschiedlich.",
    distribution_text: "In ganz Europa einer der häufigsten Brutvögel.",
    image_url: wiki("Chaffinch (Fringilla coelebs).jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },

  // ---------------- Pflanzen · Level 1 (einheimisch, bekannt) --------------
  {
    id: "plant-gaensebluemchen",
    type: "plant",
    name_common: "Gänseblümchen",
    name_scientific: "Bellis perennis",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Kleine Wiesenblume mit weissen Zungenblüten und gelber Mitte, blüht fast das ganze Jahr.",
    fun_fact:
      "Die Blüten schliessen sich abends und bei Regen – daher der englische Name «day's eye» (daisy).",
    distribution_text: "Auf Wiesen und Rasen in ganz Europa, sehr häufig.",
    image_url: wiki("Bellis perennis white (aka).jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "plant-loewenzahn",
    type: "plant",
    name_common: "Löwenzahn",
    name_scientific: "Taraxacum officinale",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Leuchtend gelbe Korbblüte, später kugelige Pusteblume mit Fallschirm-Samen. Gezackte Blätter.",
    fun_fact:
      "Ein einziger Löwenzahn kann pro Jahr mehrere Tausend Samen bilden – jeder fliegt mit seinem eigenen Schirmchen.",
    distribution_text: "Überall auf Wiesen, Wegrändern und im Rasen.",
    image_url: wiki("TaraxacumOfficinaleSeed.JPG"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "plant-klatschmohn",
    type: "plant",
    name_common: "Klatschmohn",
    name_scientific: "Papaver rhoeas",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Leuchtend rote Blüte mit zarten, seidigen Blütenblättern und dunklem Grund. Wächst an Feldrändern.",
    fun_fact:
      "Die Blütenblätter sind so dünn, dass sie im Knospenstadium regelrecht zerknittert eingepackt sind.",
    distribution_text: "An Äckern, Wegrändern und auf Brachflächen, im Sommer.",
    image_url: wiki("Papaver rhoeas - harilik moon.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "plant-vergissmeinnicht",
    type: "plant",
    name_common: "Vergissmeinnicht",
    name_scientific: "Myosotis sylvatica",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Viele kleine himmelblaue Blüten mit gelbem Auge, beliebt im Garten und wild an feuchten Stellen.",
    fun_fact:
      "Der Name geht auf eine mittelalterliche Sage zurück – die Blume gilt bis heute als Zeichen der Treue.",
    distribution_text: "In Gärten, an Waldrändern und Bachufern, Frühling.",
    image_url: wiki("Myosotis sylvatica 240405.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "plant-schneegloeckchen",
    type: "plant",
    name_common: "Schneeglöckchen",
    name_scientific: "Galanthus nivalis",
    is_native: true,
    level: 1,
    level_variant: "normal",
    description:
      "Eine der ersten Frühblüher: nickende weisse Glockenblüte über schmalen grünen Blättern.",
    fun_fact:
      "Schneeglöckchen erzeugen mit ihrem Stoffwechsel etwas Wärme und können sich so durch die Schneedecke schmelzen.",
    distribution_text: "In Laubwäldern, Parks und Gärten, sehr früh im Jahr.",
    image_url: wiki("Snowdrop (Galanthus nivalis).jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },

  // -------- Ausländische Arten (bekannt) – für den «Ausländisch»-Toggle ----
  // Hinweis: Gemäss Level-Tabelle in docs/datenmodell.md wären ausländische
  // Arten eigentlich Level 3 (Pflanzen) bzw. Level 2 (Vögel). Für die MVP-Demo
  // sind sie hier auf Level 1 gesetzt, damit der «Ausländisch»-Toggle sichtbar
  // wirkt. Bei der echten Dateneingabe korrekt einsortieren.
  {
    id: "plant-sonnenblume",
    type: "plant",
    name_common: "Sonnenblume",
    name_scientific: "Helianthus annuus",
    is_native: false,
    level: 1,
    level_variant: "normal",
    description:
      "Grosse gelbe Korbblüte auf hohem Stängel, folgt als Jungpflanze dem Lauf der Sonne.",
    fun_fact:
      "Die «Blüte» besteht aus Hunderten Einzelblüten, deren Samen in einer perfekten Spirale angeordnet sind.",
    distribution_text: "Ursprünglich aus Nordamerika, bei uns als Gartenpflanze.",
    image_url: wiki("A sunflower.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
  {
    id: "bird-halsbandsittich",
    type: "bird",
    name_common: "Halsbandsittich",
    name_scientific: "Psittacula krameri",
    is_native: false,
    level: 1,
    level_variant: "normal",
    description:
      "Leuchtend grüner Papagei mit langem Schwanz und rotem Schnabel, lebt in Schwärmen in Städten.",
    fun_fact:
      "Ursprünglich aus Afrika und Asien – entflohene Käfigvögel haben in mehreren europäischen Städten Kolonien gegründet.",
    distribution_text: "In milden Städten Mittel- und Westeuropas eingebürgert.",
    image_url: wiki("Rose-ringed parakeet (Psittacula krameri) male.jpg"),
    sound_url: null,
    image_license: "Wikimedia Commons – Lizenz vor Produktivbetrieb prüfen",
    sound_license: null,
  },
];
