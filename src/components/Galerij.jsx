import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './galerij.css'

gsap.registerPlugin(ScrollTrigger)

const SHOTS = [
  ['img/gevel.jpg', 'Het huis', 'Rietgedekt, met groene ramen'],
  ['img/aperitiefterras.jpg', 'Het terras', 'Aperitief in de zon'],
  ['img/interieur.jpg', 'Binnen', 'Hout, haard en kaarslicht'],
  ['img/bord-kreeft.jpg', 'Kreeft', 'Uit de menu creatief'],
  ['img/tafel.jpg', 'Gedekt', 'Voor een gezelschap'],
  ['img/moestuin.jpg', 'De moestuin', 'Kruiden naast de keuken'],
  ['img/bord-dessert.jpg', 'Dessert', 'Huisbereid, tot de laatste lepel'],
  ['img/fiets.jpg', 'Aan de poort', 'Halte Lange Maat, lijn 91'],
]

export default function Galerij() {
  const root = useRef(null)

  // Vertical scroll is translated into a horizontal run. Inside each frame the
  // photograph drifts the other way, so nothing moves at a single flat speed.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 861px)', () => {
      const ctx = gsap.context(() => {
        const track = root.current.querySelector('.ga-track')
        const distance = () => track.scrollWidth - window.innerWidth + 80

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        gsap.utils.toArray('.ga-card img').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('.ga-card'),
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          )
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="ga" id="galerij" ref={root} data-bg="#0d1210">
      <div className="ga-track">
        <div className="ga-intro">
          <p className="eyebrow">Fotogalerij</p>
          <h2 className="serif">
            Het huis,
            <br />
            in beeld
          </h2>
          <p>
            Van de rietgedekte gevel tot de moestuin achteraan.
            <span className="ga-hint"> Scroll verder om door te bladeren.</span>
          </p>
          <span className="ga-arrow">
            <i />
          </span>
        </div>

        {SHOTS.map(([src, titel, bij], i) => (
          <figure className={`ga-card ga-card-${(i % 3) + 1}`} key={src + i}>
            <div className="ga-card-media">
              <img src={src} alt={`${titel} — ${bij}`} />
            </div>
            <figcaption>
              <b className="serif">{titel}</b>
              <span>{bij}</span>
            </figcaption>
          </figure>
        ))}

        <div className="ga-end">
          <p className="serif">Liever zelf komen kijken?</p>
          <a className="btn" href="tel:+3252476131">
            <span>052/47.61.31</span>
          </a>
        </div>
      </div>
    </section>
  )
}
