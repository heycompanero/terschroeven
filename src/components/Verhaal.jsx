import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal, useWords, Words } from '../lib/useReveal.jsx'
import './verhaal.css'

gsap.registerPlugin(ScrollTrigger)

const TROEVEN = [
  'Chef aan het fornuis',
  'Menu creatief dat elke maand wisselt',
  'Kruiden en groenten uit eigen oogst',
  'Attente bediening door de vrouw des huizes',
  'Aangepaste kinderkaart',
  'Ruime parking en een tuin om in te ravotten',
  'Gerechtjes ook af te halen',
]

export default function Verhaal() {
  const root = useRef(null)
  useReveal(root)
  useWords(root)

  // Slow counter-parallax on the two photographs: they drift against the
  // text column so the block keeps moving even when the page is still.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.vh-shot-a img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.vh-shots', start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      })
      gsap.to('.vh-shot-b', {
        y: -70,
        ease: 'none',
        scrollTrigger: { trigger: '.vh-shots', start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="vh" id="verhaal" ref={root} data-bg="#f4eee2">
      <div className="wrap">
        <div className="vh-head" data-rv-group>
          <p className="eyebrow rv">Het huis</p>
          <h2 className="vh-statement serif" data-words>
            <Words text="Een oude schuur in Tielrode, een villa in Hamme, en dertig jaar lang dezelfde koppigheid: alles zelf maken." />
          </h2>
        </div>

        <div className="vh-grid">
          <div className="vh-shots">
            <figure className="vh-shot-a rv">
              <img src="img/gevel.jpg" alt="De rietgedekte villa van Ter Schroeven in Hamme" />
            </figure>
            <figure className="vh-shot-b rv" data-rv-delay="0.15">
              <img src="img/fiets.jpg" alt="Het houten naambord aan de oprit van het restaurant" />
            </figure>
          </div>

          <div className="vh-text" data-rv-group>
            <div className="vh-years rv">
              <span><b>1996</b>Een schuur in Tielrode</span>
              <span><b>2000</b>De villa in Hamme</span>
              <span><b>2026</b>Dertig jaar</span>
            </div>

            <p className="lead rv" data-rv-delay="0.05">
              In februari 1996 zagen wij een droom in vervulling gaan. In een
              oude schuur in Tielrode openden wij voor de eerste maal onze
              deuren. Enkele jaren later kregen we de kans om in Hamme een
              charmante villa te kopen &mdash; na maanden zwoegen verwelkomden
              we er in juli 2000 onze eerste gasten.
            </p>

            <p className="rv" data-rv-delay="0.1">
              Achter het fornuis staat <b>Pascal Schroeven</b>, die als geen
              ander verrassende smaken en geuren laat samensmelten tot een
              oogstrelend gerecht. Gastvrouw <b>Patty Van Raemdonck</b> en haar
              team ontvangen u met de glimlach &mdash; voor een zakelijke lunch,
              een intiem diner of een gezellig samenzijn met vrienden of familie.
            </p>

            <div className="vh-troeven rv" data-rv-delay="0.15">
              <p className="eyebrow">Onze troeven</p>
              <ul>
                {TROEVEN.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
