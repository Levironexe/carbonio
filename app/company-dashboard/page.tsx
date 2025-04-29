import React from 'react'
import { CompanyList } from '@/app/components/index'

const page = () => {
  return (
    <div className='w-full'>
        <h1 className='text-black max-w-6xl mx-auto text-4xl mt-8 font-bold'>Company dashboard</h1>
        <CompanyList/>
    </div>
  )
}

export default page