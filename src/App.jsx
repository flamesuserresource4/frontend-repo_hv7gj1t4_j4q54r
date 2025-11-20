import React from 'react'
import Hero from './components/Hero'
import Wishes from './components/Wishes'
import Games from './components/Games'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <Wishes />
      <Games />
      <Footer />
    </div>
  )
}

export default App
