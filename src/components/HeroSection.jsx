import React from 'react'
import Arrow from '../assets/Arrow.png'
import HeroCar from '../assets/Subtract.png'
function HeroSection() {
  return (
    <div>
      <div className='flex-col items-center justify-evenly gap-10 h-screen'>
        <h1 className='text-[117px] text-center mb-4'>Luxury car detailing</h1>
        <p className=' text-center block mb-6'>Experience the prestige of a professionally detailed car, radiating elegance and refinement at every turn.</p>
        <button className='relative overflow-hidden flex items-center justify-center gap-3 text-center mx-auto mb-25 text-white hover:text-black hover:rounded-sm hover:p-2 transition-colors duration-300 before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full'>
            <span className='relative z-10'>Let's Connect</span>
            <img src={Arrow} className='w-[10px] h-[10px] relative z-10' alt="small-arrow" />
        </button>
        <img src={HeroCar} alt="Car" />
      </div>
    </div>
  )
}

export default HeroSection
