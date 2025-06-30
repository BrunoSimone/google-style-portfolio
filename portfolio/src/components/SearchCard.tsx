import Image from 'next/image'
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
    <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center'>
            <div className='w-7 h-7 bg-black'>
                {icon}
            </div>
            <div className='flex flex-col'>
                <p className='text-sm'>
                    {name}
                </p>
                <div>
                    <p className='text-xs'>{url}</p>
                    <Image src={''} alt={''}/>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <p className='text-xl'>{title}</p>
            <p className='text-sm'>{content}</p>
        </div>
    </div>
  )
}
