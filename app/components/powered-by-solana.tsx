import React from 'react'
// import Image from 'next/image';
import Link from 'next/link';

const PoweredBySolana = () => {
  const features = [
    {
      title: "Immutable Verification",
      description: "Once recorded on Solana's blockchain, emissions data cannot be altered, ensuring complete transparency and eliminating greenwashing risks."
    },
    {
      title: "Real-Time Tracking",
      description: "Monitor emissions as they happen with transaction speeds of 65,000 TPS, enabling continuous monitoring rather than periodic reporting."
    },
    {
      title: "Energy-Efficient Validation",
      description: "Solana's proof-of-stake consensus uses just 0.0001% of the energy of traditional carbon reporting systems, aligning with our sustainability mission."
    }
  ]

  return (
    <div className='w-full text-black bg-[url("/images/bg.png")] min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-between py-16'>        
      <div className='mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold text-center mb-6'>Powered by <span className='text-purple-700'>Solana Blockchain</span></h2>
        <p className='text-lg sm:text-lg text-center w-full max-w-2xl mx-auto'>
          Track and verify carbon emissions across the supply chain with real-time, tamper-proof data secured by Solana&apos;s high-performance blockchain.
        </p>
      </div>
      
      <div className='max-w-6xl mx-auto w-full px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='bg-white/50 hover:bg-white backdrop-blur-sm rounded border-2 border-purple-900 p-8 flex flex-col items-center text-center transition-all hover:shadow-lg'>
              <h3 className='text-xl font-bold mb-4'>{feature.title}</h3>
              <p className='text-carbon'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className='mt-12 text-center'>
        <Link href="https://solana.com/" target='_blank' className='inline-flex items-center text-carbon font-medium hover:text-purple-700'>
          <p className='transition-all duration-150 hover:mr-2'>Learn more about Solana blockchain</p>
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default PoweredBySolana