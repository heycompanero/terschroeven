import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ ready }) {
  const root = useRef(null)

  // Entrance: the image is already easing up while the preloader wipes away,
  // so the two motions read as one movement rather than a hand-off.
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.05 })
      tl.fromTo(
        '.hero-media img',
        { scale: 1.28, filter: 'brightness(0.45) saturate(1.04)' },
        {
          scale: 1.08,
          filter: 'brightness(1.14) saturate(1.04)',
          duration: 2.2,
          ease: 'power3.out',
        }
      )
        .to(
          '.hero-line > span',
          { y: 0, duration: 1.5, ease: 'power4.out', stagger: 0.08 },
          0.15
        )
        .to(
          '.hero-fade',
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.09 },
          0.6
        )
    }, root)
    return () => ctx.revert()
  }, [ready])

  // Departure: the full-bleed photo eases into a rounded window and drifts
  // back, so the next section slides in over a picture that is still moving.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-media', {
        clipPath: 'inset(9% 8% 16% 8% round 260px)',
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      gsap.to('.hero-media img', {
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      gsap.to(['.hero-body', '.hero-foot'], {
        y: -110,
        opacity: 0,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '55% top',
          scrub: 0.6,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root} data-bg="#0d1210">
      <div className="hero-media">
        <img src="img/bord-hert.jpg" alt="Bord met eendenborst, gepocheerde peer en herfstgarnituur" />
        <div className="hero-veil" />
      </div>

      <div className="hero-body">
        <div className="wrap">
          <p className="hero-fade eyebrow">Restaurant &middot; Hamme &middot; sinds 1996</p>

          <h1 className="hero-title serif">
            <span className="hero-line"><span>Ter</span></span>
            <span className="hero-line"><span>Schroeven</span></span>
          </h1>

          <p className="hero-fade hero-sub lead">
            Dertig jaar lang hetzelfde paradepaardje: een menu creatief dat elke
            maand verandert, gekookt door de chef zelf, geserveerd in een
            rietgedekte villa aan de Dendermondse Steenweg.
          </p>

          <div className="hero-fade hero-cta">
            <a className="btn solid" href="tel:+3252476131">
              <span>Reserveer &middot; 052/47.61.31</span>
            </a>
            <a className="btn" href="#menu">
              <span>Menu creatief</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <div className="wrap hero-foot-in">
          <span className="hero-fade">Vrijdag &middot; zaterdagavond &middot; zondag</span>
          <span className="hero-fade">1996 &mdash; 2026 &middot; dertig jaar</span>
          <span className="hero-fade hero-scroll">
            Scroll <i />
          </span>
        </div>
      </div>
    </section>
  )
}
