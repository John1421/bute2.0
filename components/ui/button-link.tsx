import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const LinkButton = ({href, text, icon, className, textOnMobile}:{href: string, text:string, icon?:React.ReactNode, className?:string, textOnMobile?:boolean}) => {
  return (
    <Link href={href} className={className}>
        <button className="flex-row-center w-full h-full btnGlow rounded-md">
            <span className={textOnMobile?"":"hidden md:block"}>{text}</span>
            {icon}
        </button>
    </Link>
  )
}

export default LinkButton