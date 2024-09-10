'use client'

import { courierPrime } from '@/components/ui/fonts';
import React, { useState } from 'react'
import { SongStructure } from '../../app/songs/[id]/page';

const SongDisplay = ({songStructure}:{songStructure:SongStructure}) => {
	const [showChords, setShowChords] = useState(true);
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowChords(event.target.checked);
	};
  return (
		<>
		<div className='flex-row-center gap-2 text-light text-small'>
          <input
              type="checkbox"
              checked={showChords}
							onChange={handleCheckboxChange}
          />
          <label>Acordes</label>
      </div>
      <div className={`flex-col text-light text-medium tracking-tighter ${courierPrime.className}`}>
        {songStructure.mixedContent.map((line, index) => (
          <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
            {line.isChord && !showChords ? null : (
              line.isChord ? (
                <strong>{line.text}</strong>
              ) : (
                <span>{line.text + '\n'}</span>
              )
            )}
          </div>
        ))}
      </div>
		</>
  )
}

export default SongDisplay