import React from 'react'

const wishes = [
  "May your day sparkle brighter than the candles on your cake, and your smile outshine every star in the sky!",
  "To the sweetest sister: may your adventures be big, your worries be tiny, and your heart always feel this loved.",
  "Another year more awesome! Keep dancing, keep dreaming, and keep being the magical you we adore."
]

export default function Wishes() {
  return (
    <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-900 text-center">Birthday Wishes</h2>
        <p className="mt-2 text-sky-700/80 text-center">A few words wrapped in hugs and confetti</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((w, i) => (
            <div key={i} className="rounded-2xl bg-white/80 border border-sky-200 p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sky-900/90 leading-relaxed">{w}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
