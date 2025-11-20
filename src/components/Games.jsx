import React, { useEffect, useRef, useState } from 'react'

function Balloon({ onPop }) {
  const [popped, setPopped] = useState(false)
  const [x] = useState(() => Math.random() * 90)
  const [delay] = useState(() => Math.random() * 2)
  const colorPool = ['#60a5fa', '#f472b6', '#f59e0b', '#34d399', '#a78bfa']
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
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-700 rounded-full" />
      )}
    </button>
  )
}

export default function Games() {
  const [poppedCount, setPoppedCount] = useState(0)
  const [goal] = useState(5)
  const [status, setStatus] = useState('ready') // ready | success
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
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-sky-900">Balloon Pop Mini‑Game</h2>
            <p className="text-sky-700/80">Pop {goal} balloons to reveal a special message.</p>
          </div>
          <button onClick={reset} className="px-4 py-2 rounded-xl bg-sky-600 text-white font-semibold shadow hover:bg-sky-700">
            Reset
          </button>
        </div>

        <div ref={containerRef} className="relative mt-8 h-64 overflow-hidden rounded-2xl bg-gradient-to-t from-sky-100 to-white border border-sky-200">
          {status === 'ready' && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <Balloon key={i} onPop={handlePop} />
              ))}
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur border border-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm shadow">
                Popped: {poppedCount}/{goal}
              </div>
            </>
          )}

          {status === 'success' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl">🎉</div>
                <p className="mt-3 text-2xl font-bold text-sky-900">You did it!</p>
                <p className="text-sky-700">Here’s your special surprise message 👇</p>
              </div>
            </div>
          )}
        </div>

        {status === 'success' && (
          <div className="mt-8 p-6 rounded-2xl bg-white/90 border border-sky-200 shadow-sm">
            <p className="text-sky-900 text-lg leading-relaxed">
              Dear little star, you light up our world more than you know. Keep shining, keep laughing,
              and never forget how loved you are — today and every day. Happy Birthday! 💙
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
