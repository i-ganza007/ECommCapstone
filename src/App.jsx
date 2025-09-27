import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import LuxCarDet from './components/LuxCarDet'
import VideoLink from './components/VideoLink'
import CarPrev from './components/CarPrev'
import Detailing from './components/Detailing'
function App() {
  return (
    <div className='bg-black text-white'>
      <NavBar/>
      <HeroSection/>
      <LuxCarDet/>
      <CarPrev/>
      <VideoLink/>
      <Detailing/>
    </div>
  )
}

export default App
