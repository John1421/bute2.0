import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const LinkButton = ({href, text, icon, className, textOnMobile}:{href: string, text:string, icon?:React.ReactNode, className?:string, textOnMobile?:boolean}) => {
  return (
    <Link href={href} className={cn('w-full', className)}>
        <button className="flex items-center justify-center w-full h-full shadow-[0_4px_14px_0_rgb(100,161,71,39%)] hover:shadow-[0_6px_20px_rgba(100,161,71,23%)] bg-primary-200 rounded-md text-surface-500 font-light transition duration-200 ease-linear z-50">
            <span className={textOnMobile?"":"hidden md:block"}>{text}</span>
            {icon}
        </button>
    </Link>
  )
}

export default LinkButton