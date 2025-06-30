"use client";
import React, { useState } from 'react'
import Image from 'next/image';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';

const mockSearchHistory = [
    "Bruno Simone",
  ];

interface GoogleSearchInputTypes {
    searchTerm: string,
    setSearchTerm: (a: string) => void
}

export const GoogleSearchInput = ({searchTerm, setSearchTerm} : GoogleSearchInputTypes) => {

    const [open, setOpen] = useState(false);

  return (
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild className='max-w-2xl'>
              <div className="flex items-center relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src="https://api.iconify.design/material-symbols:search.svg"
                    width={24}
                    height={24}
                    alt="Search"
                  />
                </div>
                <Input
                  disabled
                  type="text"
                  className="rounded-4xl px-10 w-full h-13 "
                  placeholder="Search in portfolio"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setOpen(true)}
                  onBlur={() => {
                    setTimeout(() => setOpen(false), 150);
                  }}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="focus:outline-none">
                    <Image
                      width={24}
                      height={24}
                      src="https://api.iconify.design/material-symbols:mic.svg"
                      alt="Voice Search"
                    />
                  </button>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-2xl'>
              {mockSearchHistory.map((term, index) => (
                  <DropdownMenuItem
                  className=''
                    key={index}
                    onClick={() => {
                      setSearchTerm(term);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="https://api.iconify.design/material-symbols:history.svg"
                        width={18}
                        height={18}
                        alt="history"
                      />
                      <span>{term}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
        
            </DropdownMenuContent>
          </DropdownMenu>
  )
}
