import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal, useWords, Words } from '../lib/useReveal.jsx'
import './menu.css'

gsap.registerPlugin(ScrollTrigger)

const GANGEN = [
  {
    n: '01',
    img: 'img/bord-kreeft.jpg',
    alt: 'Kreeft met tagliatelle van courgette en gebrande kerstomaat',
    title: 'Twee of drie voorgerechtjes',
    body: 'De maand bepaalt wat er op tafel komt. Wat er is, is er kort — asperges in het voorjaar, wild vanaf half oktober, en daartussen wat de markt die week te bieden heeft.',
  },
  {
    n: '02',
    img: 'img/bord-vis.jpg',
    alt: 'Op de huid gebakken visfilet in een romige velouté',
    title: 'Vis of vlees, u kiest',
    body: 'Elke gast aan tafel kiest zelf de hoofdschotel. Zowel de creatieve, innovatieve gerechten als de klassieke bereidingen — de keuken maakt beide met evenveel plezier.',
  },
  {
    n: '03',
    img: 'img/bord-dessert.jpg',
    alt: 'Dessertbord met panna cotta, aardbei en ijs',
    title: 'Huisbereid dessert of kaas',
    body: 'Afronden doet u zoet of hartig: een dessert van eigen hand, of een originele kaasbereiding. Bij de koffie komen er nog wat zoete verleidingen bij.',
  },
]

export default function Menu() {
  const root = useRef(null)
  useReveal(root)
  useWords(root)

  // The photo column stays put while the three courses scroll past it; each
  // plate cross-dissolves into the next, so the images never cut.
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const ctx = gsap.context(() => {
        const shots = gsap.utils.toArray('.mu-shot')
        const steps = gsap.utils.toArray('.mu-step')

        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 62%',
            end: 'bottom 42%',
            onToggle: (self) => {
              if (!self.isActive) return
              shots.forEach((shot, k) => {
                gsap.to(shot, {
                  opacity: k === i ? 1 : 0,
                  scale: k === i ? 1 : 1.06,
                  duration: 1.1,
                  ease: 'power2.out',
                  overwrite: 'auto',
                })
              })
              gsap.to('.mu-count b', {
                y: `${-i * 100}%`,
                duration: 0.9,
                ease: 'power3.inOut',
                overwrite: 'auto',
              })
            },
          })
        })
      }, root)
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  return (
    <section className="mu" id="menu" ref={root} data-bg="#16241b">
      <div className="wrap">
        <div className="mu-head" data-rv-group>
          <p className="eyebrow rv">Het paradepaardje</p>
          <h2 className="mu-title serif" data-words>
            <Words text="Menu creatief" />
          </h2>
          <p className="lead rv mu-intro" data-rv-delay="0.1">
            Al jaren hetzelfde principe en toch elke maand anders. Op
            zaterdagavond en zondagmiddag serveren wij uitsluitend deze menu, er
            wordt dan niet à la carte gekozen.
          </p>
        </div>

        <div className="mu-grid">
          <div className="mu-media">
            <div className="mu-frame">
              {GANGEN.map((g, i) => (
                <div className={`mu-shot${i === 0 ? ' is-on' : ''}`} key={g.n}>
                  <img src={g.img} alt={g.alt} />
                </div>
              ))}
              <div className="mu-count serif">
                <div className="mu-count-roll">
                  {GANGEN.map((g) => (
                    <b key={g.n}>{g.n}</b>
                  ))}
                </div>
                <span>/ 03</span>
              </div>
            </div>
          </div>

          <div className="mu-steps">
            {GANGEN.map((g) => (
              <article className="mu-step" key={g.n} data-rv-group>
                <figure className="mu-step-shot rv">
                  <img src={g.img} alt={g.alt} />
                </figure>
                <p className="mu-step-n rv">{g.n}</p>
                <h3 className="serif rv" data-rv-delay="0.05">{g.title}</h3>
                <p className="rv" data-rv-delay="0.1">{g.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mu-prices" data-rv-group>
          <div className="mu-price rv">
            <p className="eyebrow">De menu</p>
            <b className="serif">65 <i>&euro;</i></b>
            <p>Twee of drie voorgerechtjes, hoofdschotel, dessert of kaas.</p>
          </div>
          <div className="mu-price rv" data-rv-delay="0.07">
            <p className="eyebrow">Met extra gerechtje</p>
            <b className="serif">80,50 <i>&euro;</i></b>
            <p>Een gang erbij, voor wie de tijd heeft om te blijven zitten.</p>
          </div>
          <div className="mu-price is-hl rv" data-rv-delay="0.14">
            <p className="eyebrow">All-in</p>
            <b className="serif">98 <i>&euro;</i></b>
            <p>
              Aperitief met hapjes, aangepaste witte en rode wijn tot en met de
              hoofdschotel, koffie of thee met zoete verleidingen.
              <br />
              Met het extra gerechtje: 118,50 &euro;.
            </p>
          </div>
        </div>

        <div className="mu-notes" data-rv-group>
          <p className="rv">
            <b>Vrijdagmiddag</b> serveren wij een lunchmenu van drie gangen
            volgens marktaanbod: 45 &euro;.
          </p>
          <p className="rv" data-rv-delay="0.06">
            <b>Champagne</b> bij de start? All-in met een suppl. van 6 &euro;.
          </p>
          <p className="rv" data-rv-delay="0.12">
            <b>Reserveren</b> is om organisatorische redenen altijd nodig.
            Frisdranken, bieren en water worden apart gerekend.
          </p>
        </div>
      </div>
    </section>
  )
}
