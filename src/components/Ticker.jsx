import './ticker.css'

const ITEMS = [
  'Menu creatief',
  'Chef aan het fornuis',
  'Kruiden uit eigen oogst',
  'Sinds 1996',
  'Ruime tuin',
  'Seizoensgebonden',
  'Hamme',
]

export default function Ticker() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="tk" data-bg="#0d1210">
      <div className="tk-track">
        {[0, 1].map((k) => (
          <div className="tk-set" key={k} aria-hidden={k === 1}>
            {row.map((t, i) => (
              <span className="tk-item serif" key={i}>
                {t}
                <i>&#9670;</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
