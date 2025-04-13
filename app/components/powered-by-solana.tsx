import React from 'react'
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const poweredBySolana = () => {
  return (
    <main className='w-full text-black'>
        <div className='max-w-6xl mx-auto'>
            <h2 className='text-5xl font-bold mb-4'>Powered by Solana BlockChain</h2>
            <p className='text-2xl mb-12'>Track and verify carbon emissions across the supply chain with real-time, tamper-proof data powered by Solana.</p>
            <div className='flex gap-4 mb-8'>
                <div className="w-full bg-gradient-to-br from-purple-800 to-black/95 rounded-[4px]">
                    <p className='px-12 pt-12 text-white text-3xl'>
                        Transparency for companies and consumers
                    </p>
                    <Image
                    src="/images/frame_1.png"
                    alt="Frame 1"
                    width={600}
                    height={400}
                    className='rounded-[4px]'

                    />
                </div>
                <div className="w-full bg-gradient-to-br from-purple-800 to-black/95 rounded-[4px]">
                    <p className='px-12 pt-12 text-white text-3xl'>
                        Stake $EWT to Earn and Strengthen the Ecosystem                    
                    </p>
                    <Image
                    src="/images/frame_2.png"
                    alt="Frame 2"
                    width={600}
                    height={400}
                    className='rounded-[4px]'
                    />
                </div>
                <div className="w-full bg-gradient-to-br from-purple-800 to-black/95 rounded-[4px]">
                    <p className='px-12 pt-12 text-white text-3xl'>
                        Support with decentralised system                    
                    </p>
                    <Image
                    src="/images/frame_3.png"
                    alt="Frame 1"
                    width={600}
                    height={400}
                    className='rounded-[4px]'

                    />
                </div>
                
            </div>
            <div className='w-full bg-gradient-to-r from-purple-700 to-black rounded-[4px] flex justify-between '>
                <div className='text-white p-12'>
                    <h3 className='text-5xl mb-4 font-bold'>Solana Blockchain</h3>
                    <p className='text-2xl mb-20'>
                        Bring blockchain to the people. Solana supports experiences for power users, new consumers, and everyone in between.
                    </p>
                    <Link href="https://solana.com/" target="_blank" className='bg-white rounded-full text-black flex justify-between gap-20 items-center w-fit'>
                        <p className='p-6 text-2xl'>Learn more</p>
                        <div className="m-2 h-15 w-15 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition">
                        <ArrowRight />
                        </div>
                    </Link>
                </div>
                <div className='flex items-end'>
                    <Image
                    src="/images/frame_4.png"
                    alt="Frame 1"
                    width={1000}
                    height={800}
                    className='rounded-[4px]'
                    />
                </div>
            </div>

        </div>
    </main>
)
}

export default poweredBySolana