import React from 'react'
import { FlipWords } from './ui/flip-words'
import { oswald } from './ui/fonts';
import LinkButton from './ui/button-link';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { revalidatePath } from 'next/cache';

const Hero = () => {
	const words = ["CANTAR", "VIVER", "AMAR", "REZAR"];
  revalidatePath("/songs")
  return (
    <div className='w-full'>
      <section className="flex-col-center h-[80vh] w-full select-none text-center gap-6 p-8">

        <div className={`text-extra text-light ${oswald.className}`}>
          Bute lá <br />
          <FlipWords words={words} className="text-huge text-xbold" />
        </div>

        <LinkButton  
          href="/songs" 
          text='Bute' 
          icon={
            <PaperAirplaneIcon  
              className='btnIcon' 
            />
          } 
          textOnMobile 
          className="flex-row-center w-full md:w-[30rem] h-10"/>
      </section>
    </div>


  )
}

export default Hero