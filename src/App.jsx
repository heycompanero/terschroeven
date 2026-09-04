import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Verhaal from './components/Verhaal.jsx'
import Menu from './components/Menu.jsx'
import Oogst from './components/Oogst.jsx'
import Feest from './components/Feest.jsx'
import Galerij from './components/Galerij.jsx'
import Praktisch from './components/Praktisch.jsx'
import Footer from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

// Every section declares the colour it wants. The colours themselves are
// painted by CSS (a soft-edged layer per section); all this hook does is hand
// the sections their colour and tell the nav which backdrop it is sitting on,
// switching only once the incoming colour has reached the top of the screen.
function useColourFlow() {
  useEffect(() => {
    const zones = gsap.utils.toArray('[data-bg]')
    if (!zones.length) return

    const isLight = (c) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
      return (r * 0.299 + g * 0.587 + b * 0.114) / 255 > 0.5
    }
    const setNav = (c) => {
      document.documentElement.dataset.on = isLight(c) ? 'light' : 'dark'
    }

    zones.forEach((el) => el.style.setProperty('--sec-bg', el.dataset.bg))
    setNav(zones[0].dataset.bg)

    const ctx = gsap.context(() => {
      zones.forEach((el, i) => {
        if (i === 0) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top -140px',
          onEnter: () => setNav(el.dataset.bg),
          onLeaveBack: () => setNav(zones[i - 1].dataset.bg),
        })
      })
    })

    return () => ctx.revert()
  }, [])
}

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    // dev-only screenshot mode: no smooth scroll, no preloader, jump to ?y=
    const still = import.meta.env.DEV && params.has('still')
    if (still) {
      document.documentElement.classList.add('still')
      setReady(true)
      gsap.set('.rv', { opacity: 1, y: 0 })
      gsap.set('.w > span', { y: 0 })
    }

    const reduced =
      still || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 })
      // Lenis moves the page without firing a native 'scroll' event, so
      // anything that reacts to scroll listens for this plain window event
      // rather than reaching for the instance.
      lenis.on('scroll', () => {
        ScrollTrigger.update()
        window.dispatchEvent(new Event('app:scroll'))
      })
      gsap.ticker.add((t) => lenis.raf(t * 1000))
      gsap.ticker.lagSmoothing(0)
      window.__lenis = lenis
    }

    if (import.meta.env.DEV) {
      const y = Number(params.get('y'))
      if (y > 0) {
        setTimeout(() => {
          ScrollTrigger.refresh()
          if (lenis) lenis.scrollTo(y, { immediate: true })
          else window.scrollTo(0, y)
          setTimeout(() => ScrollTrigger.update(), 80)
        }, 600)
      }
    }

    return () => {
      if (lenis) lenis.destroy()
      window.__lenis = null
    }
  }, [])

  useColourFlow()

  return (
    <>
      <div className="bg-rig" />
      <div className="bg-grain" />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Nav />
      <main>
        <Hero ready={ready} />
        <Ticker />
        <Verhaal />
        <Menu />
        <Oogst />
        <Feest />
        <Galerij />
        <Praktisch />
      </main>
      <Footer />
    </>
  )
}
