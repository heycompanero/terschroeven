import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWords, Words } from '../lib/useReveal.jsx'
import './oogst.css'

gsap.registerPlugin(ScrollTrigger)

export default function Oogst() {
  const root = useRef(null)
  useWords(root)

  // The band opens like a shutter as it enters and keeps drifting while it
  // crosses the viewport, so the section never sits still on screen.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.og-band',
        { clipPath: 'inset(22% 14% round 3px)' },
        {
          clipPath: 'inset(0% 0% round 3px)',
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 82%',
            end: 'top 22%',
            scrub: 0.7,
          },
        }
      )
      gsap.to('.og-band img', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
      })
      gsap.utils.toArray('.og-chip').forEach((el, i) => {
        gsap.to(el, {
          y: -60 - i * 30,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="og" ref={root} data-bg="#24382b">
      <div className="og-band">
        <img src="img/tuin.jpg" alt="De moestuin met verhoogde bakken achter het restaurant" />
        <div className="og-veil" />
        <div className="og-copy wrap">
          <p className="eyebrow">Uit eigen oogst</p>
          <h2 className="serif" data-words>
            <Words text="Wat achter het huis groeit, staat een uur later op uw bord." />
          </h2>
        </div>
      </div>

      <div className="wrap og-chips">
        <figure className="og-chip">
          <img src="img/oogst.jpg" alt="Coeur-de-boeuf tomaten aan de plant" />
          <figcaption>Tomaten van eigen plant</figcaption>
        </figure>
        <figure className="og-chip">
          <img src="img/moestuin.jpg" alt="Kruidenbedden en verhoogde bakken in de tuin" />
          <figcaption>Kruidenbedden naast de keuken</figcaption>
        </figure>
        <div className="og-note">
          <p>
            Seizoensgebonden produkten, kruiden en groenten uit eigen oogst. De
            kleinste gasten strekken ondertussen de beentjes in de ruime tuin,
            of schommelen tussen de bomen.
          </p>
          <p className="og-note-sm">
            Vegetarisch of een allergie? Meld het bij de reservatie, dan zorgen
            we voor een aangepast alternatief. Veganistische gerechten serveren
            wij niet.
          </p>
        </div>
      </div>
    </section>
  )
}
