import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const WantYourCompanyVerified = () => {
  return (
    <div className='mb-8 mt-20 flex justify-between items-center shadow-lg shadow-carbon rounded'>
        <div className='text-left border-2 border-carbon w-full rounded-l p-8 h-50 bg-white'>
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-2 text-purple-700">Get verified by our Auditors</h3>
            <p className='text-lg sm:text-lg text-black bg-clip-text mb-4'>Want to showcase your verified carbon footprint and demonstrate your commitment to sustainability?</p>
            <div className='group relative transition-all duration-300 w-fit'>
                <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded"></div>
                <Link className='relative' href='/collaboration'>                      
                    <p className='px-4 py-2 shadow z-10 bg-white border-carbon border-2 rounded'>Contact us now!</p>
                </Link>
            </div>
        </div>
        <Image
            src={"/images/ornament1.png"}
            alt='decoration'
            height={200}
            width={200}
            className='rounded-r'
        />
    </div>
  )
}

export default WantYourCompanyVerified