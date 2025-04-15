import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='w-full text-black my-10 sm:mb-12 md:mb-14 lg:mb-16 sm:p-4 md:p-6 px-4 sm:px-6 md:px-10 mt-36'>
        <div className='relative flex max-w-6xl mx-auto rounded-[4px] shadow-carbon shadow-xl border-carbon border-2 pr-4 sm:pr-6 md:pr-8 lg:pr-12 '>
            <div className='relative flex-[1]'>
                <div className="absolute bottom-0 -left-10" >
                    <Image
                        src="/images/coal.png"
                        alt="coal"
                        width={400}
                        height={400}
                        
                    />
                </div>
            </div>
           
            <div className='flex-[1] flex flex-col justify-between gap-12  py-4 sm:py-6 md:py-8 lg:py-12'>
                    <div >
                        <h2 className='text-4xl sm:text-4xl md:text-6xl text-purple-700 font-bold '>carbonio</h2>
                        <p className='text-base sm:text-lg md:text-xl lg:text-[18px] w-full md:w-4/5'>Transforming Carbon Footprint Auditing with the Power of Solana Blockchain Technology.</p>    
                    </div>
                    <p className='text-sm sm:text-base md:text-lg lg:text-[18px]'>© 2025 carbonio. All rights reserved.</p>

                </div>
            <div className='flex-[1] flex flex-col items-end justify-end gap-8  py-4 sm:py-6 md:py-8 lg:py-12'>
                    <div className='flex gap-8'>
                        <a 
                          href="https://www.instagram.com/levironhere/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:scale-125 transition-all duration-200 text-purple-800">
                          <Instagram size={36} />
                        </a>
                        <a 
                          href="https://twitter.com/your_mom" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:scale-125 transition-all duration-200 text-purple-800">
                          <Twitter size={36} />
                        </a>
                        <a 
                          href="https://www.facebook.com/bao.nam.703289" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:scale-125 transition-all duration-200 text-purple-800">
                          <Facebook size={36} />
                        </a>
                    </div>
                    <div className='flex gap-6 text-[18px]'>
                        <div className='group relative transition-all duration-300'>
                            <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
                            <Link className='relative' href='/cookies-policy'>                      
                            <p className='px-4 py-2 shadow z-10 bg-white border-carbon border-2 rounded'>Cookies Policy</p>
                            </Link>
                        </div>
                        <div className='group relative transition-all duration-300'>
                            <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded"></div>
                            <Link className='relative' href='/privacy-policy'>                      
                            <p className='px-4 py-2 shadow z-10 bg-white border-carbon border-2 rounded'>Privacy Policy</p>
                            </Link>
                        </div>
                       
                        
                    </div>
                    
                </div>
        </div>
    </footer>
  )
}
export default Footer