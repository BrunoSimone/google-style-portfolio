import { More } from 'iconsax-reactjs'
import React, { ReactNode } from 'react'

interface SearchCardTypes {
    icon: ReactNode
    name: string
    title: string 
    url: string
    content: string
}

export const SearchCard = ({icon, name, title, url, content}: SearchCardTypes) => {
  return (
    <div className='flex flex-col w-11/12'>
        <div className='flex gap-2 items-center h-10'>
            <div className='w-7 h-7 bg-black rounded-full'>
                {icon}
            </div>
            <div className='flex flex-col'>
                <p className='text-sm text-[#202124]'>
                    {name}
                </p>
                <div className='flex items-center gap-1'>
                    <p className='text-xs text-[#4d5156]'>{url}</p>
                    <More size="16" color="#555555" className='flex flex-row-reverse'/>
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
            <p className='text-xl text-[#1a0dab] mb-1'>{title}</p>
            <p className='text-sm text-[#474747]'>{content}</p>
        </div>
    </div>
  )
}
