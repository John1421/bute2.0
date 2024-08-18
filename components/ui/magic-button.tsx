import { cn } from '@/lib/utils'
import React from 'react'

const MagicButton = ({text, bgColor}:{text:string, bgColor:string}) => {
  return (
    <button className="w-full md:w-[20rem] shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-surface-500 font-light transition duration-200 ease-linear">
        {text}
    </button>
  )
}

export default MagicButton