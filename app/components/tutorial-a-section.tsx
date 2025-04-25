import React from 'react'
import { Shapes } from 'lucide-react'

const TutorialA = () => {
  return (
    <div className='rounded border-2 border-carbon p-4'>
        <div>
            <div className='flex gap-2 items-center text-purple-700'>
                <Shapes/>
                <h3 className='text-xl font-bold text-purple-700'>How to Use Carbon Footprint Dashboard </h3>

            </div>
            <p className='text-sm mb-3'>Follow these steps to get used to our dashboard.</p>
            <div className='space-y-3'>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>1</div>
                    <div>
                        <p className='font-bold '>Select a verified company in the <a target='_blank' href='/company-dashboard' className='hover:text-purple-700 underline'>Dashboard</a></p>
                        <p>From the list or search bar to view their specific product's carbon data.</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>2</div>
                    <div>
                        <p className='font-bold'>Explore the visualization panels</p>
                        <p>This is showing emissions by manufacturing stage, product type, and timeline comparisons.</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>3</div>
                    <div>
                        <p className='font-bold'>Filter valid/invalid data of the chosen company</p>
                        <p>Some of the company's data may not be verified or audited by the third party.</p>
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='h-6 w-6 bg-carbon rounded text-white text-center'>4</div>
                    <div>
                        <p className='font-bold'>Export or share data</p>
                        <p>Any report can be shared by clicking the export button in the top-right corner of each chart.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TutorialA