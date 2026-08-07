Absolut. Här är en renare `README.md` som fokuserar på:

* vad projektet är
* teknik
* hur man installerar
* hur man kör lokalt
* hur man bygger
* hur projektet är strukturerat

Ingen Git-del.

````md
# Resespelen / Bilrese-spelet

Ett mobilanpassat bilrese-spel byggt med Angular.

Spelet går ut på att hitta saker utanför bilen under en bilresa. När spelaren ser något från spelplanen trycker man på bilden för att markera den som hittad.

Projektet är byggt som en PWA och kan fungera offline efter första laddningen.

Live-version:

```txt
https://resespelen.se
````

---

## Funktioner

* Starta spel med 16 eller 32 bilder
* Slumpad spelplan med unika bilder
* Markera hittade bilder
* Ta bort markering genom att trycka på markeringssymbolen
* Långtryck på en bild för att öppna storbildsläge
* Bläddra mellan omarkerade bilder i storbildsläge
* Swipe-stöd i storbildsläge
* Grattis-dialog vid fyra i rad vågrätt eller lodrätt
* Grattis-dialog när alla bilder är hittade
* Ljust/mörkt tema baserat på användarens systeminställning
* Mobilanpassad layout
* Lokala bilder
* PWA/offline-stöd

---

## Teknik

Projektet använder:

* Angular
* Angular Material
* TypeScript
* SCSS
* Angular PWA / Service Worker
* Lokala assets i `public/assets/images`

Projektet har ingen backend, databas eller inloggning.

Spelets state hålls i Angular services/signals och sparas inte vid refresh.

---

## Kom igång

### 1. Installera beroenden

Kör detta i projektets rotmapp:

```bash
npm install
```

Det installerar alla paket som projektet behöver.

---

### 2. Starta utvecklingsservern

Kör:

```bash
ng serve --open
```

Alternativt:

```bash
npm start
```

Appen öppnas då på:

```txt
http://localhost:4200/
```

När utvecklingsservern körs laddas appen om automatiskt när filer ändras.

---

## Bygga projektet

För att skapa en production build:

```bash
ng build
```

Build-resultatet hamnar i:

```txt
dist/
```

I detta projekt används browser-builden för publicering:

```txt
dist/bilrese-spel/browser
```

Det är den mappen som innehåller den statiska webbappen.

---

## Testa projektet

För att köra tester:

```bash
ng test
```

---

## PWA och offline-stöd

PWA/offline-stöd fungerar bäst att testa från en production build via HTTPS.

`ng serve` används för utveckling och är inte rätt miljö för att testa service worker fullt ut.

När appen är deployad kan service workern cacha app shell och lokala assets så spelet kan fungera offline efter första laddningen.

---

## Vanliga kommandon

Installera beroenden:

```bash
npm install
```

Starta lokalt:

```bash
ng serve --open
```

Bygg projektet:

```bash
ng build
```

Kör tester:

```bash
ng test
```

Skapa ny komponent:

```bash
ng generate component features/component-name --standalone --skip-tests
```

Exempel:

```bash
ng generate component features/game-card --standalone --skip-tests
```

---

## Projektstruktur

Översiktlig struktur:

```txt
src/
  app/
    core/
      logic/
      models/
      services/

    data/
      image-bank.ts

    features/
      completed-line-dialog/
      game-board/
      game-card/
      game-status/
      image-viewer-dialog/

    app.component.html
    app.component.scss
    app.component.ts

public/
  assets/
    images/
```

---

## Viktiga delar

### `src/app/data/image-bank.ts`

Innehåller bildbanken som spelet använder.

Varje bild har:

```ts
{
  id: string;
  title: string;
  imageUrl: string;
}
```

---

### `src/app/core/services/game-store.service.ts`

Håller spelets state.

Här finns bland annat:

* aktuell spelstatus
* spelplanen
* antal markerade bilder
* antal kvarvarande bilder
* logik för att starta nytt spel
* logik för att markera och avmarkera bilder
* hantering av fyra i rad
* hantering av färdigt spel

---

### `src/app/core/logic/`

Innehåller ren spellogik.

Exempel:

* slumpa unika bilder
* skapa spelplan
* hitta fyra i rad vågrätt eller lodrätt

---

### `src/app/features/`

Innehåller UI-komponenter.

Exempel:

* spelplan
* spelkort
* spelstatus
* storbildsläge
* grattis-dialog

---

## Lägga till en ny bild

1. Lägg bildfilen i:

```txt
public/assets/images/
```

2. Lägg till bilden i:

```txt
src/app/data/image-bank.ts
```

Exempel:

```ts
{
  id: 'horse-trailer',
  title: 'Hästtransport',
  imageUrl: 'assets/images/horse-trailer.svg',
}
```

Tänk på att `id` ska vara unikt.

---

## Deployment

Projektet kan deployas som en statisk webbapp.

För Cloudflare Pages används:

```txt
Build command:
npm run build

Build output directory:
dist/bilrese-spel/browser
```

---

## Mål med projektet

Målet är att skapa ett enkelt, tydligt och mobilvänligt resespel som fungerar bra under bilresor och som går att bygga vidare på med fler spel i framtiden.

```

