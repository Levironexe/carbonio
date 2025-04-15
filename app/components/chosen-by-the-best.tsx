import React from 'react'
import SliderPage from './ImageSlider'

const ChosenByTheBest = () => {
  return (
    <div className='w-full p-2 sm:p-4 md:p-6 px-4 sm:px-6 md:px-10'>
        <div className='max-w-6xl mx-auto text-black'>
            <div className='w-full mb-6 sm:mb-8 md:mb-12'>
                <h2 className='font-bold text-[18px] sm:text-3xl md:text-4xl lg:text-4xl text-black mb-2 sm:mb-3 md:mb-4'>Chosen by the BEST OF THE BEST</h2>
                <p className='text-base sm:text-lg md:text-xl lg:text-[18px] text-black'>Our company is a reliable solution for industries.</p>
            
            </div>
            <SliderPage/>
        </div>
    </div>
  )
}

export default ChosenByTheBest