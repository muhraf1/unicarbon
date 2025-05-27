import { Routes, Route } from 'react-router-dom'
import './App.css'
import { NavigationMenuDemo } from './components/navigation_menu'
import { MainContext } from './components/main_context'
import * as React from "react"
// Import your page components
import Swap from './pages/swap'
import Pool from './pages/pool'
import Limit from './pages/limit'
import Twap from './pages/twap'
function App() {
  return (
    <>
      <NavigationMenuDemo  />
      <Routes>
        <Route path="/" element={<MainContext />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/Pool" element={< Pool />} />
        <Route path="/limit" element={<Limit />} />
        <Route path="/twap" element={<Twap />} />
      </Routes>
    </>
  )
}

export default App
