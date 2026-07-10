-- Startdaten für die Tabelle `species` (Level 1, Vögel & Pflanzen).
-- Bilder: Wikimedia Commons über den stabilen FilePath-Endpunkt (offene Lizenzen).
-- HINWEIS: Vor dem echten Produktivbetrieb jede Lizenz/Autor prüfen und im Feld
-- image_license korrekt eintragen (siehe docs/setup-anleitung.md). Adressen lassen
-- sich jederzeit im Supabase-Tabelleneditor ändern.
--
-- Anwendung: nach schema.sql im "SQL Editor" einfügen und ausführen.

insert into public.species
  (type, name_common, name_scientific, is_native, level, description, fun_fact, distribution_text, image_url, image_license)
values
  ('bird', 'Amsel', 'Turdus merula', true, 1,
   'Häufigster Drosselvogel in Gärten und Parks. Männchen tiefschwarz mit gelbem Schnabel, Weibchen braun.',
   'Amseln waren ursprünglich scheue Waldvögel und sind erst in den letzten 200 Jahren zu Stadtvögeln geworden.',
   'In ganz Mitteleuropa verbreitet, das ganze Jahr über sichtbar.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Common%20Blackbird.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('bird', 'Rotkehlchen', 'Erithacus rubecula', true, 1,
   'Kleiner rundlicher Vogel mit auffällig oranger Brust und Kehle. Sehr zutraulich.',
   'Rotkehlchen folgen im Wald gerne Wildschweinen – und im Garten dem Spaten, um aufgescheuchte Würmer zu erwischen.',
   'In ganz Europa häufig, oft ganzjährig im Garten.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Erithacus%20rubecula%20with%20cocked%20head.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('bird', 'Kohlmeise', 'Parus major', true, 1,
   'Grösste einheimische Meise, gelbe Brust mit schwarzem Längsstreifen und schwarzem Kopf mit weissen Wangen.',
   'Der schwarze Bauchstreifen ist bei kräftigen Männchen breiter – ein Signal an Rivalen und Partnerinnen.',
   'Überall in Wäldern, Gärten und Parks, ganzjährig.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Parus%20major%20Luc%20Viatour.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('bird', 'Haussperling', 'Passer domesticus', true, 1,
   'Auch «Spatz» genannt. Lebt gesellig in der Nähe des Menschen, Männchen mit grauem Scheitel und schwarzem Kehlfleck.',
   'Spatzen baden gerne im Staub statt im Wasser – das hält das Gefieder von Parasiten frei.',
   'Weltweit einer der häufigsten Vögel, immer in Menschennähe.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Passer%20domesticus%20male%20%2815%29.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('bird', 'Buchfink', 'Fringilla coelebs', true, 1,
   'Häufiger Finkenvogel, Männchen mit blaugrauem Kopf, rostroter Brust und weissen Flügelbinden.',
   'Buchfinken haben regionale «Dialekte» – ihr Gesang klingt je nach Gegend leicht unterschiedlich.',
   'In ganz Europa einer der häufigsten Brutvögel.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Chaffinch%20%28Fringilla%20coelebs%29.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('plant', 'Gänseblümchen', 'Bellis perennis', true, 1,
   'Kleine Wiesenblume mit weissen Zungenblüten und gelber Mitte, blüht fast das ganze Jahr.',
   'Die Blüten schliessen sich abends und bei Regen – daher der englische Name «day''s eye» (daisy).',
   'Auf Wiesen und Rasen in ganz Europa, sehr häufig.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Bellis%20perennis%20white%20%28aka%29.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('plant', 'Löwenzahn', 'Taraxacum officinale', true, 1,
   'Leuchtend gelbe Korbblüte, später kugelige Pusteblume mit Fallschirm-Samen. Gezackte Blätter.',
   'Ein einziger Löwenzahn kann pro Jahr mehrere Tausend Samen bilden – jeder fliegt mit seinem eigenen Schirmchen.',
   'Überall auf Wiesen, Wegrändern und im Rasen.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/TaraxacumOfficinaleSeed.JPG?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('plant', 'Klatschmohn', 'Papaver rhoeas', true, 1,
   'Leuchtend rote Blüte mit zarten, seidigen Blütenblättern und dunklem Grund. Wächst an Feldrändern.',
   'Die Blütenblätter sind so dünn, dass sie im Knospenstadium regelrecht zerknittert eingepackt sind.',
   'An Äckern, Wegrändern und auf Brachflächen, im Sommer.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Papaver%20rhoeas%20-%20harilik%20moon.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('plant', 'Vergissmeinnicht', 'Myosotis sylvatica', true, 1,
   'Viele kleine himmelblaue Blüten mit gelbem Auge, beliebt im Garten und wild an feuchten Stellen.',
   'Der Name geht auf eine mittelalterliche Sage zurück – die Blume gilt bis heute als Zeichen der Treue.',
   'In Gärten, an Waldrändern und Bachufern, Frühling.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Myosotis%20sylvatica%20240405.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('plant', 'Schneeglöckchen', 'Galanthus nivalis', true, 1,
   'Eine der ersten Frühblüher: nickende weisse Glockenblüte über schmalen grünen Blättern.',
   'Schneeglöckchen erzeugen mit ihrem Stoffwechsel etwas Wärme und können sich so durch die Schneedecke schmelzen.',
   'In Laubwäldern, Parks und Gärten, sehr früh im Jahr.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Snowdrop%20%28Galanthus%20nivalis%29.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('plant', 'Sonnenblume', 'Helianthus annuus', false, 1,
   'Grosse gelbe Korbblüte auf hohem Stängel, folgt als Jungpflanze dem Lauf der Sonne.',
   'Die «Blüte» besteht aus Hunderten Einzelblüten, deren Samen in einer perfekten Spirale angeordnet sind.',
   'Ursprünglich aus Nordamerika, bei uns als Gartenpflanze.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/A%20sunflower.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen'),

  ('bird', 'Halsbandsittich', 'Psittacula krameri', false, 1,
   'Leuchtend grüner Papagei mit langem Schwanz und rotem Schnabel, lebt in Schwärmen in Städten.',
   'Ursprünglich aus Afrika und Asien – entflohene Käfigvögel haben in mehreren europäischen Städten Kolonien gegründet.',
   'In milden Städten Mittel- und Westeuropas eingebürgert.',
   'https://commons.wikimedia.org/wiki/Special:FilePath/Rose-ringed%20parakeet%20%28Psittacula%20krameri%29%20male.jpg?width=900',
   'Wikimedia Commons – Autor/Lizenz vor Produktivbetrieb prüfen');
