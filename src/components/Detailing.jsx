import React from 'react'
import Amg from '../assets/Amg.png'
import Precision from '../assets/Precision.png'
import Diamond from '../assets/Diamond.png'
import Security from '../assets/Security.png'
import Arrow from '../assets/Arrow.png'

function Detailing() {
    const arr = [
        {img:Precision,title:'Precise work',descr:'We uphold the highest standards of professionalism when servicing your vehicles.'},
        {img:Diamond,title:'Premium Products and Services',descr:"Ensure your car's longevity with a periodic exterior protection treatment."},
        {img:Security,title:'High-Level Security and Privacy',descr:'We understand the importance of privacy and security for their our clientele.'}
    ]
  return (
    <div className='flex items-start justify-around mt-30'>
      <div className='flex flex-col items-start justify-center'>
        <h1 className='text-4xl font-semibold w-84'>We will take good care of your car</h1>
        <img src={Amg} alt="" />
      </div>

      <div className='h-[500px] bg-white w-[0.5px]'></div>

      <div className='flex flex-col items-start gap-22'>
        <div className='flex flex-col gap-10'>
            {arr.map((x,idx)=>{
                return (
                    <div key={idx} className='w-[400px] flex flex-col gap-3'>
                        <div className='flex gap-5'>
                            <img src={x.img} alt="" className=''/>
                            <h1 className='text-xl font-semibold'>{x.title}</h1>
                        </div>
                        <p>{x.descr}</p>
                        <hr />
                    </div>
                )
            })}
        </div>
        <button className='flex items-center justify-start gap-3 text-center  mb-25'>
            Get a quote now
            <img src={Arrow} className='w-[10px] h-[10px]' alt="small-arrow" />
        </button>
      </div>
    </div>
  )
}

export default Detailing
