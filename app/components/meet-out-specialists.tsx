import React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'

const MeetOurSpecialists = () => {
  return (
    <div id='specialists' className='w-full px-4 sm:px-6 md:px-10'>
        <div className='max-w-6xl mx-auto'>
            <h2 className='text-[20px] sm:text-3xl md:text-4xl lg:text-5xl text-black text-center font-bold mb-2 sm:mb-3 md:mb-4'>Meet our SPECIALISTS</h2>
            <p className='text-base sm:text-lg md:text-xl lg:text-[20px] text-black text-center mb-4 sm:mb-6 md:mb-8'>Trusted minds behind sustainability progress.</p>
            <div className='flex items-center'>
              <div className='flex-[1]'>
                <Image
                  src="/images/phat_portrait.jpg"
                  width={250}
                  height={250}
                  alt="Phat - a Solana Blockchain export."
                />
              </div>
              <div className='flex-[3] p-12 text-[20px] text-black'>
                <div className="">
                  <Quote className="w-24 h-24 text-purple-700"/>
                </div>
                <p className='text-justify mb-8'>The biggest challenge in carbon reduction isn&apos;t measurement—it&apos;s trust. 
                  When emissions data passes through multiple hands in a supply chain, its integrity diminishes at each transfer. 
                  With Solana&apos;s high-throughput blockchain, we&apos;ve finally solved this &apos;trust bottleneck&apos;.
                  Now a product&apos;s carbon story can be verified by anyone, anywhere, with cryptographic certainty. 
                  What used to take months of manual auditing becomes instant, transparent, and tamper-proof. 
                  This isn&apos;t just about better reporting—it&apos;s about creating a market that can finally reward genuine sustainability.</p>
                  <p className='text-right'><span className='font-bold'>Phat Veo</span> - a Solana Blockchain expert</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MeetOurSpecialists