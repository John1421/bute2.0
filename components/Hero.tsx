import React from 'react'
import { FlipWords } from './ui/flip-words'
import MagicButton from './ui/magic-button';

const Hero = () => {
	const words = ["CANTAR", "Viver", "Saborear"];
  return (
    <section className="flex flex-col md:flex-row justify-center md:justify-between gap-10 items-center h-[60vh] w-full p-12 select-none">
        <div className="text-6xl md:text-7xl font-[100] text-left w-full text-surface-dark-300 dark:text-surface-300">
					Bute lá <br />
					<FlipWords words={words} className="font-extrabold text-7xl md:text-8xl text-primary-100"/>
        </div>
				<MagicButton text='Bute' bgColor='bg-primary-300' />
    </section>
  )
}

export default Hero