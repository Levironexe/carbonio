import React from 'react'
import Image from 'next/image'

const OurCompany = () => {
    return (
      <main className='text-black w-full px-4 sm:px-6 md:px-10'>
          <div className='max-w-6xl mx-auto'>
             

              <div className='flex justify-between items-end mt-4 sm:mt-6 md:mt-8'>
              <div>
                <h2 className='text-[18px] sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4'>Our company</h2>
                <p className='text-base sm:text-lg md:text-xl lg:text-[18px] mb-6 sm:mb-8 md:mb-12'>Explore our company scale through the numbers.</p>
              </div>
                  <Image
                      src="/images/swinburne-uni.png"
                      alt='swinburne univercity, aus'
                      width={300}
                      height={300}
                  />
              </div>
              <div className='p-4 sm:p-6 md:p-8 shadow-xl shadow-carbon border-2 border-black rounded-[4px]'>
                <div className='flex flex-col gap-4 sm:gap-6 md:gap-8'>         
                  <div className="group relative transition-all duration-300">
                      <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
                      <div className="relative z-10 p-3 sm:p-4 md:p-6 px-4 sm:px-8 md:px-12 bg-white border-2 border-carbon rounded-[4px] flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
                        <h3 className="w-full md:flex-[2] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-purple-700 md:ml-4 lg:ml-8">125+</h3>
                        <p className="w-full md:flex-[1] text-left text-base sm:text-lg md:text-xl lg:text-[18px]">
                          Consultants, carbon auditor, engineers and other experts worldwide
                        </p>
                      </div>
                  </div>
                  <div className="group relative transition-all duration-300">
                      <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
                      <div className="relative z-10 p-3 sm:p-4 md:p-6 px-4 sm:px-8 md:px-12 bg-white border-2 border-carbon  rounded-[4px] flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
                        <h3 className='w-full md:flex-[2] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-purple-700 md:ml-4 lg:ml-8'>26,000+</h3>
                        <p className='w-full md:flex-[1] text-left text-base sm:text-lg md:text-xl lg:text-[18px]'>Individual product footprints verified on Solana BlockChain</p>
                      </div>
                  </div>
                  <div className="group relative transition-all duration-300">
                      <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
                      <div className="relative z-10 p-3 sm:p-4 md:p-6 px-4 sm:px-8 md:px-12 bg-white border-2 border-carbon  rounded-[4px] flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
                        <h3 className='w-full md:flex-[2] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-purple-700 md:ml-4 lg:ml-8'>-45%</h3>
                        <p className='w-full md:flex-[1] text-left text-base sm:text-lg md:text-xl lg:text-[18px]'>Average carbon reduction achieved by companies using our blockchain verification</p>
                      </div>
                  </div>
                  <div className="group relative transition-all duration-300">
                      <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
                      <div className="relative z-10 p-3 sm:p-4 md:p-6 px-4 sm:px-8 md:px-12 bg-white border-2 rounded-[4px] border-carbon  flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-0">
                        <h3 className='w-full md:flex-[2] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-purple-700 md:ml-4 lg:ml-8'>40+</h3>                    
                        <p className='w-full md:flex-[1] text-left text-base sm:text-lg md:text-xl lg:text-[18px]'>Industries covered by our carbon tracking system, from agriculture to manufacturing</p>
                      </div>
                  </div>
                </div>
              </div>   
          </div>
      </main>
    )
  }

export default OurCompany