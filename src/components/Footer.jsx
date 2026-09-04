import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const root = useRef(null)

  // The wordmark rises out of the bottom edge as the page ends — the last
  // movement of the scroll, rather than a static block.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ft-mark span', {
        y: 0,
        ease: 'none',
        stagger: 0.02,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 92%',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer className="ft" ref={root} data-bg="#0d1210">
      <div className="wrap">
        <div className="ft-top">
          <div>
            <p className="eyebrow">Restaurant Ter Schroeven</p>
            <p className="ft-lead serif">
              Voor inlichtingen en reservaties mag u ons gerust bellen, ook op
              onze sluitingsdagen.
            </p>
          </div>
          <div className="ft-cols">
            <div>
              <p className="eyebrow">Contact</p>
              <a href="tel:+3252476131">052/47.61.31</a>
              <a href="mailto:terschroeven@gmail.com">terschroeven@gmail.com</a>
              <a
                href="https://www.facebook.com/Restaurant-Ter-Schroeven-279354732141456"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
            <div>
              <p className="eyebrow">Adres</p>
              <p>Dendermondse Steenweg 15</p>
              <p>9220 Hamme</p>
              <p className="ft-btw">BTW BE 0456 887 222</p>
            </div>
          </div>
        </div>

        <div className="ft-mark serif" aria-hidden="true">
          {'Ter Schroeven'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? '\u00A0' : c}</span>
          ))}
        </div>

        <div className="ft-base">
          <span>&copy; 1996&ndash;2026 Ter Schroeven &middot; Hamme</span>
          <span>Dertig jaar aan het fornuis</span>
        </div>
      </div>
    </footer>
  )
}
