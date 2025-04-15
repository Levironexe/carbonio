'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import Image from 'next/image';
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track which dropdown is currently active
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Nav items with dropdown configuration
  const navItems = [
    {
      title: "Company dashboard",
      href: "/company-dashboard",
    },
    {
      title: "About us",
      icon:<ChevronDown className='h-4 w-4'/>,
      href: "/about-us",
      dropdown: [
        { title: "What we do", href: "/about-us#what-we-do" },
        { title: "Our team", href: "/about-us#our-team" },
      ]
    },
    {
      title: "Collaboration",
      href: "/collaboration",
    }
  ];

  return (
    <div className={`w-full p-2 sm:p-4 md:sticky md:z-40 ${isScrolled ? "-top-50" : "top-0"} transition-all duration-200`}>
      <div className='mx-auto bg-white border-carbon border-2 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 rounded-[4px]'>
        <Link href="/">
          <div className='flex items-center gap-2'>
            <div className='text-purple-700 w-auto text-xl sm:text-xl font-bold pl-2 sm:pl-3'>carbonio</div>
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
        <div className='w-full sm:w-fit text-white/80 text-base sm:text-lg md:text-lg flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-end bg-purple-700 px-2 sm:px-3 py-1'>
          {navItems.map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                className='hover:text-white transition-all duration-200 flex items-center gap-1' 
                href={item.href}
              >
                {item.title}
                {item.icon}

              </Link>
              
              {/* Dropdown menu */}
              {item.dropdown && (
                <div 
                  className={`absolute left-0 mt-2 w-48 bg-white border-2 border-carbon rounded shadow-lg z-50 transition-all duration-150 ${
                    activeDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <ul className="pb-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <li key={index}>
                        <Link 
                          href={dropdownItem.href}
                          className="block px-4 py-2 rounded text-black hover:bg-purple-50 text-sm border-2 border-carbon mt-2 ml-2 mr-4"
                        >
                          {dropdownItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar