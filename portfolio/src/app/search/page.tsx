import { Input } from '@/components/ui/input'
import React from 'react'
import Image from 'next/image';
import { SearchCard } from '@/components/SearchCard';


export default function search() {
  return (
    <div className='p-5'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex gap-12 items-center w-full pl-10'>
              <p className="text-4xl font-bold tracking-tight flex">
               <span className="text-blue-500">B</span>
               <span className="text-red-500">r</span>
               <span className="text-yellow-500">u</span>
               <span className="text-blue-500">n</span>
               <span className="text-green-500">o</span>
              </p>

              <Input
               type="text"
               className="rounded-4xl px-6 w-3/5 h-13"
               placeholder="Search in portfolio"
               value={"Bruno Simone"}
            />
          </div>

          <div className="flex justify-end items-center gap-4 p-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Image
                src="https://api.iconify.design/material-symbols:apps.svg" 
                alt="Apps" 
                width="24" 
                height="24" 
              />
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors duration-200">
              <span className="text-lg font-medium">B</span>
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
            <SearchCard content='Contenido de la pagina' name='Nombre' title='Titulo de la page' icon={<></>} url='www.soyunaurl.com'/>
            <SearchCard content='Contenido de la pagina' name='Nombre' title='Titulo de la page' icon={<></>} url='www.soyunaurl.com'/>

            <SearchCard content='Contenido de la pagina' name='Nombre' title='Titulo de la page' icon={<></>} url='www.soyunaurl.com'/>

        </div>
    </div>
  )
}
