'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

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
  
  interface DropdownItem {
    title: string;
    href: string;
    target?: string;
  }
  
  interface NavItem {
    title: string;
    href: string;
    icon?: React.ReactNode;
    dropdown?: DropdownItem[];
  }
  
  // Nav items with dropdown configuration
  const navItems: NavItem[] = [
    {
      title: "Features",
      href: "/features",
      icon:<ChevronDown className='h-4 w-4'/>,
      dropdown: [
        {title: "Company dashboard", href: "/company-dashboard",},
        {title: "Upload data", href: "https://www.web-cua-Trung.com", target: "_blank"},
      ]
    },
    {
      title: "Our globe",
      href: "/our-globe",
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
    <main className={`w-full p-2 sm:p-4 md:sticky md:z-40 ${isScrolled ? "-top-50" : "top-0"} transition-all duration-200`}>
      <div className='mx-auto bg-transparent border-carbon border-2 max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-2 rounded-[4px]'>
        <Link href="/">
          <div className='flex items-center gap-2'>
            <div className='text-purple-700 w-auto text-xl sm:text-xl font-bold pl-2 sm:pl-3'>carbonio</div>
          </div>
        </Link>
        <div className='w-full sm:w-fit text-white/80 text-base sm:text-lg md:text-lg flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-end bg-purple-700 px-2 sm:px-3 py-1 items-center'>
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
                  className={`absolute left-0 mt-2 w-48 bg-carbon border-2 border-carbon rounded shadow-lg z-50 transition-all duration-150 ${
                    activeDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <ul className="pb-2">
                    {item.dropdown.map((dropdownItem, index) => (
                      <li key={index}>
                        <Link 
                          href={dropdownItem.href}
                          target={dropdownItem.target}
                          className="block px-4 py-2 rounded text-white text-sm text-center mt-2 mx-2 hover:bg-black"
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
          
          {/* Wallet button - moved outside the nav items loop */}
          <div className="flex items-center">
          <WalletMultiButton
            style={{
              fontFamily: "oxanium",
              color: "white",
              fontWeight: "normal",
              fontSize: "1.125rem",
              height: "1.75rem",
              borderRadius: "0",
              padding: "0",
            }}
          />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Navbar