import React from 'react'

const CompanySummary = () => {
  return (
    <div className='text-black w-full p-4'>
        <div className='max-w-6xl mx-auto'>
            <div className='rounded-[4px] border-2 border-carbon  px-2 sm:px-4 py-4  shadow-lg shadow-carbon'>
                <p className='mb-4 text-2xl font-bold'>Summary</p>
                <div className='flex gap  gap-2 sm:gap-4 text-[18px]'>
                    <div className='flex-[1] border-2 border-carbon rounded-[4px] px-2 sm:px-4 py-4'>
                        <p>Average data freshness</p>
                    </div>
                    <div className='flex-[1] border-2 border-carbon rounded-[4px] px-2 sm:px-4 py-4'>
                        <p>
                            Total CO₂e tracked on Solana
                        </p>
                    </div>
                    <div className='flex-[1] border-2 border-carbon rounded-[4px] px-2 sm:px-4 py-4'>
                        <p className=''>Highest reduction</p>
                    </div>
                    <div className='flex-[1] border-2 border-carbon rounded-[4px] px-2 sm:px-4 py-4'>
                        <p>Supply Chain Coverage</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CompanySummary