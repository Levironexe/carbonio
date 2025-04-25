import React from 'react'
import Image from 'next/image'
import {WhatWeDo, OurTeam} from '@/app/components/index'

const AboutUsPage = () => {
  return (
    <div className='flex flex-col gap-[146px]'>
        <WhatWeDo/>
        <OurTeam/>
    </div>

  )
}

export default AboutUsPage