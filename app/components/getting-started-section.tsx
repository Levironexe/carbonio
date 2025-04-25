'use client'
import React, { useState } from 'react'
import TutorialA from './tutorial-a-section';
import TutorialB from './tutorial-b-section';

const GettingStarted = () => {
    const [tutorialSelected, setTutorialSelected] = useState<string | null>("ViewDashboard");
  return (
    <div id='getting-started'>
        <h3 className="text-center text-base sm:text-2xl md:text-3xl mb-8 font-bold mt-20">Getting Started Tutorial</h3>
        <div className='relative flex rounded border-carbon border-2 cursor-pointer mb-4'>
            <div className={`absolute w-1/2 bg-carbon top-0 bottom-0 transition-all duration-400  
                ${tutorialSelected === "UploadData" ? "translate-x-full" : "translate-x-0"}`}></div>
            <p onClick={() => setTutorialSelected("ViewDashboard")}
                className={`z-10 relative w-full text-center px-4 py-1 transition-colors duration 400
                 ${tutorialSelected === "ViewDashboard" ? "text-white" : "text-black"}`}>Carbon Footprint Dashboard
            </p>
            <p onClick={() => setTutorialSelected("UploadData")}
                className={`z-10 relative w-full text-center px-4 py-1 transition-colors duration 400
               ${tutorialSelected === "UploadData" ? "text-white" : "text-black"}`}>Blockchain Carbon Verification
            </p>
        </div>
        {tutorialSelected == "ViewDashboard" ? (
            <div className='shadow-lg shadow-carbon'>
                <TutorialA/>
            </div>
        ) : (
            <div className='shadow-lg shadow-carbon'>
                <TutorialB/>
            </div>
        )}
    </div>
  )
}

export default GettingStarted