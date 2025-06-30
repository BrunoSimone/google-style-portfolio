"use client";
import { GoogleSearchInput } from '@/components/GoogleSearchInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="h-screen flex flex-col w-full justify-between">
      <header className="w-full flex justify-end items-center gap-4 p-3">
            <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Gmail</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">Images</a>
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
      </header>

      <main className="flex-grow flex flex-col items-center px-4 gap-8">
        <div className="text-center flex flex-col mt-44">
          <p className="text-6xl md:text-8xl font-bold tracking-tight flex gap-1">
            <span className="text-blue-500">B</span>
            <span className="text-red-500">r</span>
            <span className="text-yellow-500">u</span>
            <span className="text-blue-500">n</span>
            <span className="text-green-500">o</span>
          </p>
          <p className="text-gray-600 text-xl">Software Developer</p>
        </div>

        <GoogleSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="btn btn-text px-6 py-2 text-sm bg-gray-50 hover:shadow-sm" variant={'outline'} disabled={searchTerm === ''}>
           <Link href={`/search`}>Google Search</Link>
          </Button>
          <Button className="btn btn-text px-6 py-2 text-sm bg-gray-50 hover:shadow-sm" variant={'outline'} disabled={searchTerm === ''}>
            I’m Feeling Lucky
          </Button>
        </div>
      </main>

      <footer className="w-full bg-gray-100 text-sm text-gray-600 ">
        <div className="flex py-3 border-b border-gray-200 px-8" >
          <p>Argentina</p>
        </div>
        <div className="flex py-3  flex-col md:flex-row justify-between items-center px-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Business</a>
            <a href="#" className="hover:underline">How Search works</a>
          </div>
          <div className="flex flex-wrap gap-x-6">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
