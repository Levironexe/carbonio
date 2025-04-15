import React from 'react'
// import SliderPage from './ImageSlider'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const MeetCarbonioSection = () => {
    return (
      <main className='w-full p-2 sm:p-4 md:p-6 px-4 sm:px-6 md:px-10'>
        <div className='max-w-6xl mx-auto'>
          <div className='w-full sm:w-3/4 md:w-1/2 mb-6 sm:mb-8 md:mb-12'>
            <h2 className='font-bold text-[18px] sm:text-3xl md:text-4xl lg:text-4xl text-black mb-2 sm:mb-3 md:mb-4'>
              Meet <span className='bg-gradient-to-r from-purple-800 to-purple-600 text-transparent bg-clip-text'>CARBONIO</span>
            </h2>
            <p className='text-base sm:text-lg md:text-xl lg:text-[18px] text-black'>
              A global Solana blockchain-based system accelerate the move to a decarbonised future.
            </p>
          </div>

          <div className='w-full flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 text-black'>
            <div className='w-full lg:flex-1 flex flex-col justify-between rounded-[4px] border-2 border-carbon shadow-carbon shadow-lg pt-6 sm:pt-8 md:pt-12 hover:scale-[1.02] transition-all duration-200'>
              <div>
                <h3 className='font-bold text-xl sm:text-[18px] mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4 md:px-6'>Transparent by Default</h3>
                <p className='text-base sm:text-lg md:text-xl lg:text-[18px] px-3 sm:px-4 md:px-6'>
                  Give every product a digital carbon ID, verified across the supply chain — no more guesswork, just real data.
                </p>
              </div>
              
              <Image
                src="/images/road.png"
                alt="trust"
                width={600}
                height={500}
                className=' transition-all duration-200 mt-4'
              />
            </div>
            <div className='w-full lg:flex-1 flex flex-col justify-between rounded-[4px] border-2 border-carbon shadow-carbon shadow-lg pt-6 sm:pt-8 md:pt-12 hover:scale-[1.02] transition-all duration-200'>
              <div>
                <h3 className='font-bold text-xl sm:text-[18px] mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4 md:px-6'>Scalable from Day One</h3>
                <p className='text-base sm:text-lg md:text-xl lg:text-[18px] px-3 sm:px-4 md:px-6'>
                  Powered by blockchain and oracles, ensuring emission data is tamper-proof, auditable, and secure from source to shelf.
                </p>
              </div>
              <Image
                src="/images/building.png"
                alt="trust"
                width={600}
                height={600}
                className=' transition-all duration-200 mt-4'
              />
            </div>
            <div className='w-full lg:flex-[2] flex flex-col gap-4 sm:gap-6 md:gap-8'>
              <div className='flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8'>
                <div className='w-full md:flex-1 flex flex-col justify-between rounded-[4px] border-2 border-carbon shadow-carbon shadow-lg py-6 sm:py-8 md:py-12 hover:scale-[1.02] transition-all duration-200'>
                  <div>
                    <h3 className='font-bold text-xl sm:text-[18px] mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4 md:px-6'>Trustless, Not Trust-Based</h3>
                    <p className='text-base sm:text-lg md:text-xl lg:text-[18px] px-3 sm:px-4 md:px-6'>
                      Designed for high-volume supply chains with Solana&apos;s speed and cost-efficiency — ready for real-world adoption.
                    </p>
                  </div>
                  <Image
                    src="/images/trust.png"
                    alt="trust"
                    width={600}
                    height={600}
                    className=' transition-all duration-200 mt-4'
                  />
                </div>
                <div className='w-full md:flex-1 flex flex-col justify-between rounded-[4px] border-2 border-carbon shadow-carbon shadow-lg pt-6 sm:pt-8 md:pt-12 hover:scale-[1.02] transition-all duration-200'>
                  <div>
                    <h3 className='font-bold text-xl sm:text-[18px] mb-2 sm:mb-3 md:mb-4 px-3 sm:px-4 md:px-6'>Emission Reduction Solution</h3>
                    <p className='text-base sm:text-lg md:text-xl lg:text-[18px] px-3 sm:px-4 md:px-6'>
                      Enable systematic carbon reduction with smart emission tracking — identify hotspots, implement targeted strategies.
                    </p>
                  </div>
                  <Image
                    src="/images/pointer.png"
                    alt="trust"
                    width={600}
                    height={600}
                    className='transition-all duration-200 mt-4'
                  />
                </div>
              </div>
              <Link 
                href="#specialists" 
                className='bg-purple-800 hover:bg-purple-700 rounded-[4px] h-full p-3 sm:p-4 text-white shadow-purple-800 shadow-lg flex justify-between items-center text-base sm:text-lg md:text-xl lg:text-[18px] hover:pr-4 sm:hover:pr-5 md:hover:pr-6 transition-all duration-200'
              >
                <p>Meet our specialist</p>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"/>
              </Link>
            </div>    
          </div>
        </div>
      </main>
    )
  }
  

export default MeetCarbonioSection
