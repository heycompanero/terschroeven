import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './preloader.css'

export default function Preloader({ onDone }) {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onDone()
          gsap.set(root.current, { display: 'none' })
        },
      })
      tl.to('.pl-mark span', {
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.05,
      })
        .to('.pl-line', { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 0.25)
        .to('.pl-sub', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.7)
        .to(
          '.pl-inner',
          { y: -40, opacity: 0, duration: 0.9, ease: 'power3.inOut' },
          1.7
        )
        // The curtain doesn't slide off — it wipes upward, handing the frame
        // over to the hero image that has already been fading up underneath.
        .to(
          root.current,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.25,
            ease: 'power4.inOut',
          },
          1.85
        )
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div className="pl" ref={root}>
      <div className="pl-inner">
        <div className="pl-mark serif">
          {'Ter Schroeven'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? '\u00A0' : c}</span>
          ))}
        </div>
        <div className="pl-line" />
        <div className="pl-sub eyebrow">Hamme &middot; sinds 1996</div>
      </div>
    </div>
  )
}
