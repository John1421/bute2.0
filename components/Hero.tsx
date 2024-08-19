import React from 'react'
import { FlipWords } from './ui/flip-words'
import { AuroraBackground } from './ui/aurora-background';
import { oswald } from './ui/fonts';
import { cn } from '@/app/lib/utils';
import LinkButton from './ui/button-link';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Hero = () => {
	const words = ["CANTAR", "VIVER", "SABOREAR"];
  return (
    <div className='relative w-full'>
      <AuroraBackground className='hidden md:dark:block absolute inset-0' />

      <section className="relative flex flex-col justify-center gap-10 items-center h-[80vh] w-full p-12 select-none">
        <div className={cn("text-6xl md:text-7xl font-[100] text-center w-full text-surface-dark-300 dark:text-surface-300", oswald.className)}>
          Bute lá <br />
          <FlipWords words={words} className="font-extrabold text-7xl md:text-8xl text-surface-dark-100 dark:text-surface-500 " />{/*text-primary-100*/}
        </div>
        <LinkButton  href="/songs" text='Bute' icon={<PaperAirplaneIcon  className='w-5 ml-3' />} textOnMobile className="w-[20rem] h-10 flex justify-center items-center"/>
      </section>
    </div>


  )
}

export default Hero