# Christmas QR Hunt

Een kleine Angular 17 standalone app voor een kerstspeurtocht via QR-codes.

## Installatie
```
npm install
```

## Ontwikkelen
```
npm start
```
open vervolgens http://localhost:4200/?step=1 (of een andere step).

## Build
```
npm run build
```

## Testen
Karma/Chrome headless:
```
npm test
```
Let op: in sommige sandboxen moet je een vrije poort toestaan.

## Lint
```
npm run lint
```

## Config aanpassen
- Hints/letters: `src/app/config/hunt-steps.config.ts`
- Teksten: `src/app/config/content.config.ts`
- Assets: `src/assets/` (logo, achtergrond, gift, bankzitters-afbeelding)

## Spelregels (korte samenvatting)
- Eén route met queryparam `step` bepaalt de huidige stap.
- Stap 1: alleen hint. Vanaf stap 2: cadeau als letter-opslag + hint.
- Volgorde afdwingen: overslaan toont waarschuwing en springt naar juiste stap.
- Voortgang in localStorage; cadeaus/letters blijven zichtbaar.
- Alle 11 letters vrijgespeeld? Dan puzzel-overlay met letterchips, hussel-knop, leegknop en “Bevestig”. De oplossing is `BANKZITTERS`; bij goed antwoord verschijnt de succes-pop-up met confetti.
