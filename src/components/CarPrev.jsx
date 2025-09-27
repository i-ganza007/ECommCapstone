import React from 'react'
import Entry from '../assets/entry.png'
import Full from '../assets/full.png'
import Maint from '../assets/maint.png'
import Straight from '../assets/straight.png'
function CarPrev() {
    const images_arr = [
        {img:Entry,name:'Entry Level Detail',descr:'Treat your luxury car to a thorough hand wash and wax application.'},
        {img:Maint,name:'Maintenance Detail',descr:"Ensure your car's longevity with a periodic exterior protection treatment."},
        {img:Full,name:'Full Detail',descr:'Pamper your vehicle with a complete treatment, leaving no detail overlooked.'}
    ]
  return (
    <div>
        <div className='flex justify-center gap-7 mt-10'>
            {images_arr.map((arr,idx)=>{
        return (
            <div key={idx} className='flex flex-col  gap-3'>
                <img src={arr.img} alt="" />
                <h2 className='text-white font-semibold text-xl'>{arr.name}</h2>
                <p className='w-78'>{arr.descr}</p>
                <button className='flex items-center self-start justify-end gap-3 mb-25'>
                            Let's Connect
                            <img src={Straight} className='w-[10px] h-[10px]' alt="small-arrow" />
                </button>
            </div>
        )
      })}
        </div>
    </div>
  )
}

export default CarPrev
