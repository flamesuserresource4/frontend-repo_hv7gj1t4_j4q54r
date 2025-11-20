import React from 'react'

const wishes = [
  "May your day sparkle brighter than the candles on your cake, and your smile outshine every star in the sky!",
  "To the sweetest sister: may your adventures be big, your worries be tiny, and your heart always feel this loved.",
  "Another year more awesome! Keep dancing, keep dreaming, and keep being the magical you we adore."
]

export default function Wishes() {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 via-fuchsia-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-fuchsia-800 text-center">Royal Wishes for Megha</h2>
        <p className="mt-2 text-fuchsia-700/80 text-center">Three scrolls from the royal court, wrapped in hugs and confetti</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((w, i) => (
            <div key={i} className="rounded-2xl bg-white/90 border border-fuchsia-200 p-6 shadow-sm hover:shadow-md transition">
              <p className="text-fuchsia-900/90 leading-relaxed">{w}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-fuchsia-700/70">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
