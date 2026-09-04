# Ter Schroeven

Concept-herontwerp van de homepage van [terschroeven.be](https://terschroeven.be) —
restaurant in Hamme, sinds 1996. Eén doorlopende pagina met vloeiende
overgangen tussen de secties.

Vite + React + GSAP (ScrollTrigger) + Lenis.

Live: **https://heycompanero.github.io/terschroeven/** — elke push naar `main`
bouwt en publiceert opnieuw via GitHub Actions.

## Draaien

```bash
npm install
npm run dev      # http://localhost:5193
npm run build
```

`?still` in de URL zet in dev de smooth scroll en alle reveals uit, zodat je op
een vaste scrollpositie kunt screenshotten:

```bash
W=1440 H=900 node tools/shot.mjs "http://localhost:5193/?still" ./shots 0 1600 3100
```

## Structuur

- `src/components/` — één sectie per component, met de bijbehorende CSS ernaast
- `src/styles/base.css` — tokens, en de kleurlaag per sectie (`[data-bg]::before`)
  die de overgang tussen twee secties in hun padding laat oplossen
- `public/img/` — beeldmateriaal van de bestaande site
