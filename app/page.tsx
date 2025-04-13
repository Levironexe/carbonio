import React from 'react'
import { HeroSection, MeetCarbonioSection, OurCompany, MeetOurSpecialists, EarthChallenge } from './components/index'

const page = () => {
  return (
    <div className='flex flex-col gap-[146px]'>
      <HeroSection/>
      <EarthChallenge/>
      <MeetCarbonioSection/>
      <OurCompany/>
      {/* <PoweredBySolana/> */}
      <MeetOurSpecialists/>
    </div>
  )
}

export default page