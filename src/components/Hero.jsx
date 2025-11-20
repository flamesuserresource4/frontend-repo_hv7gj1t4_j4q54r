import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center p-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.35)] tracking-tight">
            Happy Birthday, little sis! 🎈
          </h1>
          <p className="mt-4 text-white/90 text-lg sm:text-xl">
            Wishing you a day filled with giggles, balloons, and all your favorite treats.
          </p>
        </div>
      </div>

      {/* Gradient edges for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1f3b]/60 via-transparent to-transparent" />
    </section>
  )
}
