import React, { useEffect, useRef, useState } from 'react'

function Confetti() {
  // lightweight confetti using CSS only
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes confettiFall { to { transform: translateY(110vh) rotate(360deg); opacity: 1 } }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 2
        const duration = 3 + Math.random() * 3
        const size = 6 + Math.random() * 8
        const colors = ['#f472b6', '#d946ef', '#a78bfa', '#f0abfc']
        const color = colors[Math.floor(Math.random() * colors.length)]
        return (
          <span
            key={i}
            style={{ left: `${left}%`, animation: `confettiFall ${duration}s ease-in ${delay}s forwards`, width: size, height: size, background: color }}
            className="absolute -top-5 rounded-sm opacity-90"
          />
        )
      })}
    </div>
  )
}

function Balloon({ onPop }) {
  const [popped, setPopped] = useState(false)
  const [x] = useState(() => Math.random() * 90)
  const [delay] = useState(() => Math.random() * 2)
  const colorPool = ['#f472b6', '#d946ef', '#a78bfa', '#f0abfc'] // pink, fuchsia, violet family
  const color = colorPool[Math.floor(Math.random() * colorPool.length)]

  return (
    <button
      aria-label="Balloon"
      onClick={() => { if (!popped) { setPopped(true); onPop() }}}
      className={`absolute bottom-0 translate-x-[-50%] left-[${x}%] w-10 h-14 rounded-t-full`}
      style={{
        left: `${x}%`,
        background: color,
        clipPath: 'ellipse(50% 60% at 50% 40%)',
        animation: `floatUp 6s linear ${delay}s forwards`,
        boxShadow: `inset 0 0 20px rgba(255,255,255,0.25), 0 8px 20px rgba(0,0,0,0.15)`
      }}
    >
      {!popped && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-fuchsia-700 rounded-full" />
      )}
    </button>
  )
}

function CrownCard({ onDone }) {
  const [pairs, setPairs] = useState(() => {
    // simple memory pair: 6 cards (3 pairs)
    const items = ['👑','🎀','🦄']
    const doubled = [...items, ...items]
    // shuffle
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[doubled[i], doubled[j]] = [doubled[j], doubled[i]]
    }
    return doubled.map((s, idx) => ({ id: idx, symbol: s, revealed: false, matched: false }))
  })
  const [open, setOpen] = useState([])

  useEffect(() => {
    if (open.length === 2) {
      const [a, b] = open
      if (pairs[a].symbol === pairs[b].symbol) {
        setPairs(prev => prev.map((c, i) => i===a || i===b ? { ...c, matched: true } : c))
        setOpen([])
      } else {
        setTimeout(() => {
          setPairs(prev => prev.map((c, i) => i===a || i===b ? { ...c, revealed: false } : c))
          setOpen([])
        }, 600)
      }
    }
  }, [open, pairs])

  useEffect(() => {
    const allMatched = pairs.every(c => c.matched)
    if (allMatched) onDone()
  }, [pairs, onDone])

  const flip = (i) => {
    setPairs(prev => prev.map((c, idx) => idx===i ? { ...c, revealed: true } : c))
    setOpen(prev => prev.length < 2 ? [...prev, i] : prev)
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {pairs.map((c, i) => (
        <button
          key={c.id}
          onClick={() => (!c.revealed && !c.matched && open.length < 2) && flip(i)}
          className={`aspect-square rounded-xl border text-3xl flex items-center justify-center transition transform hover:scale-[1.02] ${c.matched ? 'bg-violet-200 border-violet-300' : c.revealed ? 'bg-pink-100 border-pink-200' : 'bg-white border-fuchsia-200'}`}
        >
          <span>{(c.revealed || c.matched) ? c.symbol : '❔'}</span>
        </button>
      ))}
    </div>
  )
}

export default function Games() {
  const [poppedCount, setPoppedCount] = useState(0)
  const [goal] = useState(5)
  const [status, setStatus] = useState('ready') // ready | success
  const [stage, setStage] = useState('balloons') // balloons -> memory -> complete
  const containerRef = useRef(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `@keyframes floatUp { from { transform: translate(-50%, 0); opacity: 1 } to { transform: translate(-50%, -120%); opacity: 1 } }`
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  const handlePop = () => {
    setPoppedCount(c => {
      const next = c + 1
      if (next >= goal) setStatus('success')
      return next
    })
  }

  const reset = () => {
    setPoppedCount(0)
    setStatus('ready')
    setStage('balloons')
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-white via-pink-50 to-fuchsia-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">Royal Mini‑Games</h2>
            <p className="text-fuchsia-700/80">Pop balloons, match crowns, and celebrate like royalty!</p>
          </div>
          <button onClick={reset} className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white font-semibold shadow hover:bg-fuchsia-700">
            Reset
          </button>
        </div>

        <div ref={containerRef} className="relative mt-8 min-h-[20rem] overflow-hidden rounded-2xl bg-gradient-to-t from-pink-100 to-white border border-fuchsia-200 p-4">
          {stage === 'balloons' && (
            <div className="relative h-64">
              {status === 'ready' && (
                <>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <Balloon key={i} onPop={handlePop} />
                  ))}
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur border border-fuchsia-200 text-fuchsia-800 px-3 py-1 rounded-full text-sm shadow">
                    Popped: {poppedCount}/{goal}
                  </div>
                </>
              )}

              {status === 'success' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl">🎉</div>
                    <p className="mt-3 text-2xl font-bold text-fuchsia-900">Great job, Princess Megha!</p>
                    <p className="text-fuchsia-700">You unlocked the next royal challenge 👑</p>
                    <button onClick={() => { setStage('memory') }} className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold shadow hover:bg-violet-700">Continue</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {stage === 'memory' && (
            <div className="">
              <h3 className="text-xl font-bold text-fuchsia-900 mb-4">Memory Match: Find the royal pairs</h3>
              <CrownCard onDone={() => setStage('complete')} />
            </div>
          )}

          {stage === 'complete' && (
            <div className="relative">
              <Confetti />
              <div className="text-center py-10">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">All hail Princess Megha! 💖</p>
                <p className="mt-2 text-fuchsia-800">You’ve conquered the royal games. May your year be as magical as you are.</p>
              </div>
            </div>
          )}
        </div>

        {(stage === 'complete') && (
          <div className="mt-8 p-6 rounded-2xl bg-white/90 border border-fuchsia-200 shadow-sm">
            <p className="text-fuchsia-900 text-lg leading-relaxed">
              Dear Princess Megha, you light up our world more than you know. Keep shining, keep laughing,
              and never forget how loved you are — today and every day. Happy Birthday! 💖
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
