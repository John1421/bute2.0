import { cn } from '@/lib/utils'
import React from 'react'

const MagicButton = ({text, icon}:{text:string, icon?:React.ReactNode}) => {
  return (
    <button className="flex items-center justify-center gap-2 w-full md:w-[20rem] shadow-[0_4px_14px_0_rgb(100,161,71,39%)] hover:shadow-[0_6px_20px_rgba(100,161,71,23%)] bg-primary-200 rounded-md px-8 py-2 text-surface-500 font-light transition duration-200 ease-linear z-50">
        {text}
        {icon}
    </button>
  )
}

export default MagicButton