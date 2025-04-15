'use client'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  })

  return (
    <div className={`w-full p-2 sm:p-4  md:sticky md:z-40  ${isScrolled ? "-top-50" : "top-0"} transition-all duration-200`}>
      <div className='mx-auto bg-white border-black border-2 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 rounded-[4px]'>
        
          <Link href="/">
            <div className='flex items-center gap-2'>
              <div className='text-purple-700 w-auto text-xl sm:text-xl font-bold pl-2 sm:pl-3'>   carbonio     </div>
              {/* <div className='border-r-[1.5px] border-carbon h-6'></div>              
              <div className='text-carbon h-full'> 
                <Image
                  src="/images/solana_logo.png"
                  alt='solana blockchain logo'
                  width={24}
                  height={24}
                />
              </div> */}

            </div>
            
          </Link>
        <div className='w-full sm:w-fit text-white text-base sm:text-lg md:text-lg flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-end bg-purple-700 px-2 sm:px-3 py-1'>
          <Link className='hover:text-black transition-all duration-200' href="/company-dashboard">Company dashboard</Link>
          <Link className='hover:text-black transition-all duration-200' href="/about-us">About us</Link>
          <Link className='hover:text-black transition-all duration-200' href="/collaboration">Collaboration</Link>
        </div>
      </div>
    </div>
  )
}


export default Navbar