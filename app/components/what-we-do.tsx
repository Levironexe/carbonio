import React from 'react'
import Image from 'next/image'

const WhatWeDo = () => {
  return (
    <div id='what-we-do' className='w-full text-black px-4 sm:px-6 md:px-10'>
        <div className='max-w-6xl mx-auto mt-12'>
            <div>
                <h1 className='text-[18px] sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold pb-4'>WHAT WE DO</h1>
                {/* Hero section */}
                <div className='flex justify-between items-center w-full border-b-2 border-t-2 border-carbon gap-12'>
                    <div className='flex-[3] mb-4'>
                        <h2 className='text-[18px] sm:text-3xl md:text-4xl lg:text-4xl font-bold pb-4'>Our <span className='text-purple-700'>mission</span></h2>
                        <p className='text-base sm:text-lg md:text-xl lg:text-[18px] text-justify'>At carbonio, we&apos;re on a mission to bring unprecedented transparency to global supply chains. 
                            We believe that accurate carbon accounting is the first step toward meaningful climate action, 
                            and we&apos;re making this possible—one product at a time.</p>
                    </div>
                    <div className='flex-[2]'>
                        <Image
                            src="/images/what_we_do_hero_image.jpg"
                            width={500}
                            height={500}
                            alt='what_we_do_hero_image'
                        />
                    </div>
                </div>
                <div className='flex justify-between items-center w-full border-b-2 border-b-carbon gap-12'>
                    <div className='flex-[2]'>
                        <Image
                            src="/images/the_problem_we_are_solving.jpg"
                            width={500}
                            height={500}
                            alt='what_we_do_hero_image'

                        />
                    </div>
                    <div className='flex-[3] mb-4 text-left'>
                        <h2 className='text-[18px] sm:text-3xl md:text-4xl lg:text-4xl font-bold  pb-4'>The <span className='text-pink-700'>problem we&apos;re solving</span></h2>
                        <p className='text-base sm:text-lg md:text-xl lg:text-[18px] text-justify'>Today&apos;s carbon tracking systems are fragmented, opaque, and often inaccurate. Scope 3 emissions—those embedded in supply chains—represent up to 80% of many companies' carbon footprints, yet they remain the most difficult to measure and verify. As regulations tighten and consumers demand greater transparency, businesses need better solutions.</p>
                    </div>
                </div>
                <div className='flex justify-between items-center w-full border-b-2 border-b-carbon gap-12'>
                    <div className='flex-[3] mb-4'>
                        <h2 className='text-[18px] sm:text-3xl md:text-4xl lg:text-4xl font-bold  pb-4'>Our Solution</h2>
                        <p className='text-base sm:text-lg md:text-xl lg:text-[18px]mb-2 '>CarbonChain ID leverages Solana&apos;s high-performance blockchain technology to create digital carbon identities for products. Our platform enables:</p>
                        <div className=''>
                            <div className='flex gap-3 items-center mb-1'>
                                <div className='h-3 w-3 rounded bg-purple-700 '></div>
                                <p className='text-xl'>Verified emissions tracking across every stage of production</p>
                            </div>
                            <div className='flex gap-3 items-center mb-1'>
                                <div className='h-3 w-3 rounded bg-purple-700 '></div>
                                <p className='text-xl'>Immutable records that prevent greenwashing
                                </p>
                            </div>
                            <div className='flex gap-3 items-center mb-1'>
                                <div className='h-3 w-3 rounded bg-purple-700 '></div>
                                <p className='text-xl'>Real-time visibility for businesses and consumers</p>
                            </div>
                            <div className='flex gap-3 items-center mb-1'>
                                <div className='h-3 w-3 rounded bg-purple-700 '></div>
                                <p className='text-xl'>Scalable solutions that grow with your business</p>
                            </div>
                        </div>
                      
                    </div>
                    <div className='flex-[2]'>
                        <Image
                            src="/images/solana_solution.jpg"
                            width={500}
                            height={500}
                            alt='what_we_do_hero_image'
                        />
                    </div>
                </div>
            </div>
            <div id='our-team'>

            </div>
        </div>
    </div>
  )
}

export default WhatWeDo