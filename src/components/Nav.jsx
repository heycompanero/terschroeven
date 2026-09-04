import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './nav.css'

const LINKS = [
  ['Het huis', '#verhaal'],
  ['Menu creatief', '#menu'],
  ['Feesten', '#feest'],
  ['Galerij', '#galerij'],
  ['Praktisch', '#praktisch'],
]

export default function Nav() {
  const [tucked, setTucked] = useState(false)
  const [open, setOpen] = useState(false)
  const panel = useRef(null)

  useEffect(() => {
    const onScroll = () => setTucked(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('app:scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('app:scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const el = panel.current
    if (!el) return
    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { display: 'block' })
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'power4.inOut' }
        )
        gsap.fromTo(
          el.querySelectorAll('.mn-item > span'),
          { y: '110%' },
          { y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06, delay: 0.2 }
        )
      } else {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.7,
          ease: 'power4.inOut',
          onComplete: () => gsap.set(el, { display: 'none' }),
        })
      }
    }, el)
    return () => ctx.revert()
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (!target) return
    const y = target.getBoundingClientRect().top + window.scrollY
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.5 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      <header className={`nav${tucked ? ' is-tucked' : ''}`}>
        <div className="nav-in">
          <a className="nav-mark serif" href="#top" onClick={(e) => go(e, 'body')}>
            Ter Schroeven
          </a>

          <nav className="nav-links">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => go(e, href)}>
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a className="nav-tel" href="tel:+3252476131">
              052/47.61.31
            </a>
            <button
              className={`nav-burger${open ? ' is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div className="mn" ref={panel}>
        <div className="mn-in">
          <nav>
            {LINKS.map(([label, href], i) => (
              <a
                className="mn-item serif"
                key={href}
                href={href}
                onClick={(e) => go(e, href)}
              >
                <span>
                  <em>0{i + 1}</em>
                  {label}
                </span>
              </a>
            ))}
          </nav>
          <div className="mn-foot">
            <a href="tel:+3252476131">052/47.61.31</a>
            <a href="mailto:terschroeven@gmail.com">terschroeven@gmail.com</a>
            <p>Dendermondse Steenweg 15, 9220 Hamme</p>
          </div>
        </div>
      </div>
    </>
  )
}
