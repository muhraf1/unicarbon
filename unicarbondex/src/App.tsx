import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NavigationMenuDemo } from './components/navigation_menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationMenuDemo />
      <div>
        <h1>Unicarbon</h1>
        <img src="../src/assets/logo_unicarbon.png" alt="" width={200} height={200} />
      </div>
    </>
  )
}

export default App
