import { useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal, useWords, Words } from '../lib/useReveal.jsx'
import './feest.css'

const MENUS = [
  {
    key: 'drie',
    naam: 'Drie gangen',
    prijs: '48',
    allin: '78',
    kop: 'Voor wie het graag overzichtelijk houdt.',
    gangen: [
      {
        titel: 'Voorgerechten',
        items: [
          'Velouté van prei, verheerlijkt door in olijfolie gekleurde scampikrullen',
          "Tartaar van met Peruaans incazout gemarineerde zalm, licht-zure toets van crème d'Isigny",
          'Dialoog van vis en scampi, gegaard in een papillot, met fijne groentjes en droge vermouth',
          'Ovengebakken bladerdeegje met gerookte forel en snippers van prei, witte wijnsaus met bieslook',
          'Flinterdun gesneden rund, bestrooid met rasp van Grana Padano en groene pluksels',
        ],
      },
      {
        titel: 'Hoofdschotels',
        items: [
          'Victoriabaars, gesmolten sla en een sausje op smaak gebracht met passievruchten',
          'In hoeveboter gebruinde filet van pladijs, stoemp van veldsla en aardappelen',
          'In onze roner gegaarde Mechelse koekoek, met komijn bestrooide worteltjes',
          'Uw gasten kiezen, vis of vlees volgens de maandmenu (+5 €)',
          'Runderhaas, roomsausje met cognac en Parijse champignons (+5 €)',
        ],
      },
      {
        titel: 'Desserten',
        items: [
          'Als klassieker, vanille-ijs met gesmolten Callebaut',
          'Cheesecake, crumble van speculoos',
          'Hartig of zoet, volgens de keuze in ons menu creatief (suppl. 3 €)',
          'Een toast uit de oven, belegd met gesmolten brie en snippers prei',
        ],
      },
    ],
  },
  {
    key: 'vier',
    naam: 'Culinaire verwennerij',
    prijs: '60',
    allin: '93',
    kop: 'Vier gangen, met een tussengerecht dat de avond doet duren.',
    gangen: [
      {
        titel: 'Voorgerechten',
        items: [
          'Spiesje van in olijfolie gebakken scampistaartjes, huisgemaakte vinaigrette',
          'Zalm in twee bereidingen: gemarineerd met citruskaviaar, en kruidige tataki',
          'Carpaccio van rauw gemarineerde Sint-Jakobsvruchten, roze peperkorrels en limoenolie',
          'Salade van gerookte eendenborst met frambozenazijn, krokante broodkorstjes',
          'Koud voorgerecht volgens onze menu creatief',
        ],
      },
      {
        titel: 'Tussengerechten',
        items: [
          'Stoofpotje van scampi en rijst, kokosmelk met sereh en Thai red curry',
          'Rolletjes van tongscharfilet, licht getomateerd sausje met fijne groentjes',
          'Vluchtig gebakken Sint-Jakobsvruchten en gekarameliseerd witlof, met Karmeliet (+6 €)',
          'Krokant gebakken kalfszwezeriken, een toets van graantjesmosterd (+8 €)',
          'Asperges met gehakte peterselie en mimosa van scharrelei (half april tot en met juni)',
        ],
      },
      {
        titel: 'Hoofdschotels',
        items: [
          'Op de huid gebakken eendenborst, met porto gebluste jus, daggroenten',
          'Rosé gebraden biefstukjes van lam, rozemarijnpatatjes, saus met zwarte look',
          'Filet pur "wit-blauw", handgeklopte béarnaise, aardappelen in hun veldjasje',
          'Filet van hert en zijn herfstgarnituren (half oktober tot half januari, +5 €)',
          'Groenlandse heilbot, gesmolten spinazie, beurre blanc met vanille uit Tahiti (+5 €)',
        ],
      },
      {
        titel: 'Desserten',
        items: [
          'Tumbler, gevuld met panna cotta en fruitcoulis',
          'Een wandeling door dessertenland volgens de meug van de chef (+5 €)',
          'Vanille-ijs en advocaat, krokante koekjescrunch',
          'Als klassieker, sabayon verrast door een bolletje gestolde hoevemelk',
        ],
      },
    ],
  },
]

const EXTRAS = [
  ['Soep erbij', 'Cappuccino van kreeft 15 € · preisoepje met beignets van escargots 9 € · heldere rundsbouillon 8 € · seizoenssoep 7 €'],
  ['Receptie vanaf 30 personen', 'Prosecco of fruitsap met een ruimer assortiment warme en koude hapjes: 22 €. Met champagne: 32 €.'],
  ['Voor kleine bengels', 'Tot 12 jaar à la carte, of de menu voor kleine bengels aan 18 €: kaaskroketje of fishsticks, hamburger of kippenfilet met appelmoes, en een ijsje.'],
  ['All-in dranken', 'Bij drie gangen +30 € · bij vier gangen +33 € · bij vijf gangen +38 €.'],
]

export default function Feest() {
  const root = useRef(null)
  const [open, setOpen] = useState('drie')
  useReveal(root)
  useWords(root)

  // Opening a menu changes the page height, so the pinned sections below need
  // their measurements back — once the height transition has finished.
  const toggle = (key) => {
    setOpen((cur) => (cur === key ? '' : key))
    setTimeout(() => ScrollTrigger.refresh(), 900)
  }

  return (
    <section className="fe" id="feest" ref={root} data-bg="#f4eee2">
      <div className="wrap">
        <div className="fe-top">
          <div className="fe-head" data-rv-group>
            <p className="eyebrow rv">Vanaf 8 personen</p>
            <h2 className="fe-title serif" data-words>
              <Words text="Feestsuggesties" />
            </h2>
            <p className="lead rv" data-rv-delay="0.08">
              Eén menu voor het hele gezelschap, maar binnen de gekozen
              prijsklasse kiest u zelf. Elke menu wordt voorafgegaan door een
              amuse-bouche bij het aperitief, met een sorbetje in afwachting van
              de hoofdschotel.
            </p>
          </div>
          <figure className="fe-shot rv" data-rv-delay="0.12">
            <img src="img/tafel.jpg" alt="Lange feesttafel gedekt met wit linnen en gevouwen servetten" />
          </figure>
        </div>

        <div className="fe-menus" data-rv-group>
          {MENUS.map((m) => {
            const isOpen = open === m.key
            return (
              <article className={`fe-menu rv${isOpen ? ' is-open' : ''}`} key={m.key}>
                <button className="fe-menu-bar" onClick={() => toggle(m.key)}>
                  <span className="fe-menu-naam serif">{m.naam}</span>
                  <span className="fe-menu-kop">{m.kop}</span>
                  <span className="fe-menu-prijs serif">
                    {m.prijs} <i>&euro;</i>
                    <em>all-in {m.allin} &euro;</em>
                  </span>
                  <span className="fe-menu-plus" aria-hidden="true" />
                </button>

                <div className="fe-menu-body">
                  <div className="fe-menu-inner">
                    {m.gangen.map((g) => (
                      <div className="fe-gang" key={g.titel}>
                        <p className="eyebrow">{g.titel}</p>
                        <ul>
                          {g.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="fe-extras" data-rv-group>
          {EXTRAS.map(([t, d], i) => (
            <div className="fe-extra rv" key={t} data-rv-delay={0.05 * i}>
              <h4 className="serif">{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>

        <p className="fe-fine rv">
          Gelieve uw menukeuze en het aantal personen een week op voorhand door
          te bellen, en ons te verwittigen bij elke wijziging van het aantal
          personen.
        </p>
      </div>
    </section>
  )
}
