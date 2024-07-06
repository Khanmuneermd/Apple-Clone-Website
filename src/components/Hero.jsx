import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {heroVideo, smallHeroVideo} from '../utils'
export default function Hero() {
  useGSAP(()=>{
    gsap.to('.hero-title', {duration: 1, opacity: 1, y:0, delay:2}),
    gsap.to('#cta',{
      duration: 1,
      opacity: 1,
      y:-50,
      delay:2
    })
  })
  const [videoSrc, setvideoSrc] = useState(window.innerWidth < 760 ?  smallHeroVideo : heroVideo)

  const handleVideoSrcSet = ()=>{
    if(window.innerWidth < 760){
      setvideoSrc(smallHeroVideo)
    }
    else{
      setvideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    }
  },[])

  return (
    <section className='w-full nav-height bg-black relative'>
        <div className="h-5/6 w-full flex-col flex-center">
            <p className='hero-title'>Iphone 15 Pro</p>
            <div className='md:w-10/12 w-9/12'>
                <video className='pointer-events-none' src={videoSrc} autoPlay muted playsInline={true}></video>
            </div>
        </div>
        <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
          <a href="#highlights" className='btn'>Buy</a>
          <p className='font-normal text-xl'>From $199/month or $999</p>
        </div>
    </section>
)
}
