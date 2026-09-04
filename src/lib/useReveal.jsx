import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Eases in every .rv inside `ref` when its group scrolls into view.
// Elements may carry data-rv-delay for a manual stagger.
export function useReveal(ref, deps = []) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = gsap.utils.toArray('.rv', root)
    if (!items.length) return

    const ctx = gsap.context(() => {
      items.forEach((el) => {
        const group = el.closest('[data-rv-group]')
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: parseFloat(el.dataset.rvDelay || 0),
          scrollTrigger: { trigger: group || el, start: 'top 88%', once: true },
        })
      })
    }, root)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Lifts the words of every [data-words] block inside `ref` line by line.
export function useWords(ref, deps = []) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const blocks = gsap.utils.toArray('[data-words]', root)
    if (!blocks.length) return

    const ctx = gsap.context(() => {
      blocks.forEach((block) => {
        gsap.to(block.querySelectorAll('.w > span'), {
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.045,
          scrollTrigger: { trigger: block, start: 'top 85%', once: true },
        })
      })
    }, root)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Splits a string into word spans for useWords. Keeps spacing intact.
export function Words({ text, className = '' }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="w">
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
