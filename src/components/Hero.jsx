import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft royal gradient for readability and vibe */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/60 via-fuchsia-700/30 to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-center text-center p-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)] tracking-tight">
            Happy Birthday, Princess Megha! 👑
          </h1>
          <p className="mt-4 text-white/95 text-lg sm:text-xl">
            May your kingdom be filled with sparkle, giggles, and magical moments today and always.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-4 py-2 text-white text-sm border border-white/30">
            <span>Theme</span>
            <span className="inline-block w-3 h-3 rounded-full bg-pink-400" />
            <span className="inline-block w-3 h-3 rounded-full bg-fuchsia-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-violet-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
