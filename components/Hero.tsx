import React from 'react'
import { FlipWords } from './ui/flip-words'
import MagicButton from './ui/magic-button';
import { AuroraBackground } from './ui/aurora-background';
import { FaLocationArrow } from 'react-icons/fa';
import Link from 'next/link';
import { oswald } from './ui/fonts';
import { cn } from '@/lib/utils';

const Hero = () => {
	const words = ["CANTAR", "Viver", "Saborear"];
  return (
    <div className='relative w-full'>
      <AuroraBackground className='hidden md:dark:block absolute inset-0' />

      <section className="relative flex flex-col md:flex-row justify-center md:justify-between gap-10 items-center h-[80vh] w-full p-12 select-none">
        <div className={cn("text-6xl md:text-7xl font-[100] text-left w-full text-surface-dark-300 dark:text-surface-300", oswald.className)}>
          Bute lá <br />
          <FlipWords words={words} className="font-extrabold text-7xl md:text-8xl text-primary-100" />
        </div>
        <Link href="/songs" className='w-full'>
          <MagicButton text='Bute' icon={<FaLocationArrow />} />
        </Link>
      </section>
    </div>


  )
}

export default Hero