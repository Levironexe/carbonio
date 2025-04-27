import React from 'react'
import { FileUp } from 'lucide-react'

const TutorialB = () => {
  return (
    <div className='rounded border-2 border-carbon p-4'>
        <div>
            <div className='flex gap-2 items-center text-purple-700'>
                <FileUp/>
                <h3 className='text-xl font-bold'>How to Blockchain Carbon Verification to upload your very own data</h3>
            </div>
            <p className='text-sm mb-3'>Follow these steps to get used to our blockchain-based feature.</p>
            <div className='space-y-3'>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>1</div>
                    <div>
                        <p className='font-bold'>Navigate to the <a target='_blank' href='https//webcuatrung.com/upload' className='hover:text-purple-700 underline'>Upload</a> section from the <a target='_blank' href='https//webcuatrung.com' className='hover:text-purple-700 underline'>Carbonio Partner website</a>&apos;s navigation bar</p>
                        <p>From the list or search bar to view their specific product&apos;s carbon data.</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>2</div>
                    <div>
                        <p className='font-bold'>Download the template file in .xlsx format</p>
                        <p>Download it if you haven&apos;t already prepared your data in the correct format.</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>3</div>
                    <div>
                        <p className='font-bold'>Click &quot;Upload File&quot;</p>
                        <p>then select your prepared Excel spreadsheet with emission data.</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>4</div>
                    <div>
                        <p className='font-bold'>Confirm and submit</p>
                        <p>View your data and perform a confirmation to process your data and record it securely on the Solana blockchain.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TutorialB