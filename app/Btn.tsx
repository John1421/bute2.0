'use client'
import React from 'react';
import { processSong } from './[id]/page';


const Btn = () => {
  const handleClick = () =>{
    const filePath = './caminho/do/seu/arquivo.txt';

      processSong(filePath).then((songStructure) => {
        console.log('Letras:');
        console.log(songStructure.lyrics.join('\n'));
        console.log('\nAcordes:');
        console.log(songStructure.chords.join('\n'));
        console.log('\nConteúdo Misturado:');
        console.log(songStructure.mixedContent.join('\n'));
      }).catch((error) => {
        console.error('Erro ao processar o arquivo:', error);
      });
  }
  return (
    <button onClick={handleClick} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
      Simple
    </button>
  )
}

export default Btn