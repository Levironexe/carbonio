import React from 'react'
import { HeroSection, MeetCarbonioSection, OurCompany, MeetOurSpecialists, EarthChallenge, ChosenByTheBest, PoweredBySolana, Globe } from './components/index'

const page = () => {
  return (
    <div className='flex flex-col gap-[146px]'>
      <HeroSection/>
      <EarthChallenge/>
      <MeetCarbonioSection/>
      <PoweredBySolana/>
      <ChosenByTheBest/>
      <OurCompany/>
      <MeetOurSpecialists/>
    </div>
  )
}

export default page