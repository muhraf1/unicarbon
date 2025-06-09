import { Routes, Route } from 'react-router-dom'
import './App.css'
import { NavigationMenuDemo } from './components/navigation_menu'
import { MainContext } from './components/main_context'


// Import your page components
import Swap from './pages/swap'
import Pool from './pages/pool'
import Limit from './pages/limit'
import Twap from './pages/twap'
import Explore from './pages/explore'
import Positions from './pages/positions'


function App() {

  return (
    <>
      <NavigationMenuDemo  />
      
      <Routes>
        <Route path="/" element={<MainContext />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/pool/:poolId" element={<Pool />} />
        <Route path="/Explore" element={< Explore />} />
        <Route path="/Positions" element={< Positions />} />
        <Route path="/limit" element={<Limit />} />
        <Route path="/twap" element={<Twap />} />
      </Routes>
    </>
  )
}

export default App
