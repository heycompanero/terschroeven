import { useRef } from 'react'
import { useReveal, useWords, Words } from '../lib/useReveal.jsx'
import './praktisch.css'

const DAGEN = [
  ['Maandag', null],
  ['Dinsdag', null],
  ['Woensdag', null],
  ['Donderdag', 'Enkel gezelschappen vanaf 8 personen'],
  ['Vrijdag', 'Middag & avond'],
  ['Zaterdag', 'Vanaf 19u'],
  ['Zondag', 'Middag'],
]

const WEETJES = [
  ['Met de bus', 'Lijn 91, halte Lange Maat, stopt aan onze poort — ook op zondagmiddag. Glaasje op? Laat je rijden.'],
  ['Betalen', 'VISA en Mastercard of contant. Geen Bancontact of Maestro.'],
  ['Cadeaubon', 'Op zoek naar een geschenk? Wij schrijven een waardebon volgens uw wensen en budget.'],
  ['Huisdieren', 'Niet toegelaten in het restaurant, assistentiehonden uitgezonderd.'],
  ['Blijven slapen', 'B&B La Corderie in het centrum van Hamme, of de Alffarhoeve in Moerzeke, midden in het groen.'],
  ['Op de hoogte blijven', 'Mail ons uw adres en u krijgt de nieuwsbrief met de menu van de maand in uw mailbox.'],
]

export default function Praktisch() {
  const root = useRef(null)
  useReveal(root)
  useWords(root)

  return (
    <section className="pr" id="praktisch" ref={root} data-bg="#e3d9c5">
      <div className="wrap">
        <div className="pr-head" data-rv-group>
          <p className="eyebrow rv">Praktisch</p>
          <h2 className="pr-title serif" data-words>
            <Words text="U bent van harte welkom op vrijdag, zaterdagavond en zondag." />
          </h2>
        </div>

        <div className="pr-grid">
          <div className="pr-uren rv" data-rv-group>
            <p className="eyebrow">Open</p>
            <ul>
              {DAGEN.map(([dag, note]) => (
                <li key={dag} className={note ? '' : 'is-dicht'}>
                  <span>{dag}</span>
                  <b>{note || 'Gesloten'}</b>
                </li>
              ))}
            </ul>
            <p className="pr-uren-note">
              Reserveren doet u om organisatorische redenen best op voorhand. U
              mag ons gerust contacteren op onze sluitingsdagen.
            </p>
          </div>

          <div className="pr-card rv" data-rv-delay="0.08">
            <p className="eyebrow">Reserveren</p>
            <a className="pr-tel serif" href="tel:+3252476131">
              052/47.61.31
            </a>
            <a className="pr-mail" href="mailto:terschroeven@gmail.com">
              terschroeven@gmail.com
            </a>
            <div className="rule" />
            <address className="pr-adres serif">
              Dendermondse Steenweg 15
              <br />
              9220 Hamme
            </address>
            <a
              className="btn"
              href="https://www.google.com/maps/search/?api=1&query=Dendermondse+Steenweg+15+9220+Hamme"
              target="_blank"
              rel="noreferrer"
            >
              <span>Route &amp; parking</span>
            </a>
          </div>
        </div>

        <div className="pr-weetjes" data-rv-group>
          {WEETJES.map(([t, d], i) => (
            <div className="pr-weet rv" key={t} data-rv-delay={0.04 * i}>
              <h4 className="serif">{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
