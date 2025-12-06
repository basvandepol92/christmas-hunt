export interface HuntStep {
  id: number;
  letter?: string;
  nextHint: string;
  description?: string;
}

export const HUNT_STEPS: HuntStep[] = [
  { id: 1, nextHint: 'Het avontuur begint bij de kerstboom die het hardst glinstert.' },
  { id: 2, letter: 'S', nextHint: 'Zoek bij de open haard waar een kerstkous zachtjes hangt.' },
  { id: 3, letter: 'T', nextHint: 'Volg de geur van warme chocomelk naar de keuken, dichtbij de marshmallows.' },
  { id: 4, letter: 'R', nextHint: 'Er is een briefje verstopt in een dekenfort. Kruip erin en zoek goed.' },
  { id: 5, letter: 'A', nextHint: 'Bij het raam met het mooiste sneeuwzicht twinkelt iets verstopt.' },
  { id: 6, letter: 'B', nextHint: 'Een sprookjesboek in de kast heeft een lintje dat iets verraadt.' },
  { id: 7, letter: 'Z', nextHint: 'Dicht bij de koektrommel klingelt een klein belletje als je dichtbij bent.' },
  { id: 8, letter: 'T', nextHint: 'Kijk achter de kerstkrans op de deur; daar wacht een mini-rolletje.' },
  { id: 9, letter: 'E', nextHint: 'Onder het kussen waar sneeuwpop-dromen wonen.' },
  { id: 10, letter: 'I', nextHint: 'In de spiegel in de hal weerspiegelt een rood lint jouw volgende aanwijzing.' },
  { id: 11, letter: 'N', nextHint: 'Tussen de spelletjes ligt een kaart met sterren verstopt.' },
  { id: 12, letter: 'K', nextHint: 'Alle letters gevonden! Nu het kerstwoord kraken.' }
];
