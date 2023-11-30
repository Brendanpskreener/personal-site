import { useState } from 'react'
import MainNavigation from './components/UI/MainNavigation'
import Home from './components/Home/Home'
import BarFinder from './components/BarFinder/BarFinder'
import Pomodoro from './components/Pomodoro/Pomodoro'

export default function App() {
  const [page, setPage] = useState('home')

  function handleNavigation(target) {
    setPage(target)
  }

  return (
    <>
      <MainNavigation onClick={handleNavigation} />
      {page === 'home' && <Home />}
      {page === 'barFinder' && <BarFinder />}
      {page === 'pomodoro' && <Pomodoro />}
    </>
  )
}
