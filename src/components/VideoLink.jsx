import React from 'react'
import Video from '../assets/VideoPlayer.png'
import Play from '../assets/Play.png'
function VideoLink() {
  return (
    <div>
      <div className='relative w-[1120px] h-[600px] mx-auto'>
        <img src={Video} className='w-full h-full object-cover rounded-sm' />
        <div className='absolute inset-0 bg-black/70  flex items-center justify-center'>
            <div className='flex flex-col items-center gap-2 z-10'>
              <img src={Play} alt="" />
              <span className='text-white'>Play showreel</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default VideoLink
