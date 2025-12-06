export interface HuntStep {
  id: number;
  letter?: string;
  nextHint: string;
  description?: string;
}

export const HUNT_STEPS: HuntStep[] = [
  { id: 1, nextHint: `
    Hier fonkelen lichtjes alsof sterren zijn neergedaald,
tussen glimmers, slingers en groen dat nooit verstaalt.
Elke naald draagt een beetje wintermagie,
en er hangen verrassingen—soms één, soms drie.
Zoek tussen het feestelijk groen vol decemberdroom—
daar schittert jouw volgende hint, verstopt in de boom` },
  {
    id: 2,
    letter: 'S',
    nextHint: `Ik woon in de hal waar voeten vaak beginnen,
tussen zolen, veters en stapavonturen binnen.
Ik ben van hout, niet van steen,
maar open mijn deksel… en jouw hint verschijnt meteen.
Waar rusten alle schoenen het liefst in de rij?
Daar vind je de volgende aanwijzing—zoek maar bij mij.`
  },
  {
    id: 3,
    letter: 'T',
    nextHint: `Hier draai ik rondjes, maar ik word nooit duizelig,
ik maak alles schoon, van sok tot sportshirt plakkerig.
Ik woon niet in de keuken, ook niet in de gang,
maar zoek mij buiten, wees niet bang`
  },
  {
    id: 4,
    letter: 'R',
    nextHint: `Hoog in het huis, waar het stil is als een muis,
staat een kuip die houdt van spetteren en schuimig gedruis.
Hier neem je geen duik in de zee of de plas,
maar toch kan er water in… als dat nodig was.
Klim naar boven, volg elke tree,
en kijk daar en zoek verder mee!`
  },
  {
    id: 5,
    letter: 'A',
    nextHint: `Dit is de plek waar plannen ontstaan
en waar pennen, gum en grapjes gaan.
Iemand met een knuffelige geest
die hier zo nu en dan een boekje leest.
Kijk waar ze tekent, denkt schrijft,
dit is waar jullie volgende qr code verblijft .`
  },
  {
    id: 6,
    letter: 'B',
    nextHint: `Hier wordt het lekker warm als er iets moet garen,
maar nu hoeft niemand erop te wachten of te staren.
Het is een plek waar koekjes ooit goudbruin verschijnen,
en waar je beter niet komt met koude handen of als je moet lijnen.
Kijk op de plek waar warmte werkt aan smulplezier—
dan vind je jouw volgende qr code hier.`
  },
  {
    id: 7,
    letter: 'Z',
    nextHint: `Niet in de keuken, niet naast jullie bed,
maar in het hok waar de stofzuiger vaak wordt weggezet.
Tussen toiletpapier, spullen en wat rommel in het donker verstopt,
daar waar je snel iets pakt en de deur weer dichtklapt daar is jouw volgende hint gedropt`
  },
  {
    id: 8,
    letter: 'T',
    nextHint: `
    Hier wonen jurken, truien, soms een stoere broek,
alles netjes op een hanger, als je goed kijkt bij elke hoek.
De deur gaat open, een muur vol stijl en stof,
dit jullie fashion plek, hoe tof.
Zoek tussen de kleding die rustig hangt te dromen,
daar zal jouw volgende geheime aanwijzing boven komen.`
  },
  {
    id: 9,
    letter: 'E',
    nextHint: `Een boek vol smaken, tips en lekkers bereid,
waar mama bladert tot ze weet wat je vandaag verscheidt.
Tussen recepten die roeren, bakken en braden,
schuilt een kleine verrassing tussen de pagina-laden.
Zoek in het roze OTK naslagwerk vol keukenpret—
daar ligt jouw volgende geheim netjes weggezet.`
  },
  {
    id: 10,
    letter: 'I',
    nextHint: `
    Hier is het altijd fris, nooit warm of heet,
en alles wat je bewaart blijft langer vers en netjes gereed.
Tussen snacks, drankjes en iets voor later,
staat de volgende hint te bibberen in het koude theater.
Zoek op de plek waar kou de baas is, dag en nacht—
daar is de nieuwe aanwijzing die zachtjes op jullie wacht.`
  },
  {
    id: 11,
    letter: 'N',
    nextHint: `
    Op twee wielen rijdt ze vrolijk door straat en plein,
en voorop gaat haar schooltas mee in een bak, zo fijn.
Daar liggen soms handschoenen, een slot of wat troep,
alles schudt mee als ze trap na trap haar rondje doet.
Kijk in het kratje waar haar ritjes altijd starten—
daar vind je wat jij nu zoekt met kloppend hartje.`
  },
  {
    id: 12,
    letter: 'K',
    nextHint: `
    Een kleine kamer waar iedereen wel eens moet zijn,
met tegels, stilte en soms een beetje gein.
Hier stroomt water, hier wordt gelachen en gezucht,
en soms zit iemand veel te lang in de poeplucht.
Zoek op deze plek die iedereen goed kent,
en daar wacht de laatste hint waarna je klaar bent.`
  }
];
