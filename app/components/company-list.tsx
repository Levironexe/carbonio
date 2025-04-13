'use client'
import React from 'react'
import Image from 'next/image';
import { useState } from 'react';

const companies = [
    {
      id: 1,
      name: 'Unilever',
      logo: '/images/emission7.jpg',
      industry: 'Consumer Goods',
      totalEmissions: 58642,
      lastUpdated: '2025-04-10',
      status: 'Verified',
      changePercent: -5.3,
      product_count: 142,
      verification_date: '2025-04-10'
    },
    {
      id: 2,
      name: 'Tesla',
      logo: '/images/emission7.jpg',
      industry: 'Automotive',
      totalEmissions: 32450,
      lastUpdated: '2025-04-12',
      status: 'Verified',
      changePercent: -12.7,
      product_count: 23,
      verification_date: '2025-04-12'
    },
    {
      id: 3,
      name: 'Samsung Electronics',
      logo: '/images/emission7.jpg',
      industry: 'Technology',
      totalEmissions: 78230,
      lastUpdated: '2025-04-05',
      status: 'Unverified',
      changePercent: 2.1,
      product_count: 215,
      verification_date: null
    },
    {
      id: 4,
      name: 'Nestle',
      logo: '/images/emission7.jpg',
      industry: 'Food & Beverage',
      totalEmissions: 92105,
      lastUpdated: '2025-04-08',
      status: 'Verified',
      changePercent: -1.8,
      product_count: 189,
      verification_date: '2025-04-08'
    },
    {
      id: 5,
      name: 'Volkswagen Group',
      logo: '/images/emission7.jpg',
      industry: 'Automotive',
      totalEmissions: 124530,
      lastUpdated: '2025-04-01',
      status: 'Pending',
      changePercent: 0.6,
      product_count: 98,
      verification_date: null
    },
    {
      id: 6,
      name: 'IKEA',
      logo: '/images/emission7.jpg',
      industry: 'Retail',
      totalEmissions: 42380,
      lastUpdated: '2025-04-11',
      status: 'Verified',
      changePercent: -8.3,
      product_count: 76,
      verification_date: '2025-04-11'
    },
    {
      id: 7,
      name: 'Apple',
      logo: '/images/emission7.jpg',
      industry: 'Technology',
      totalEmissions: 51720,
      lastUpdated: '2025-04-07',
      status: 'Verified',
      changePercent: -4.2,
      product_count: 48,
      verification_date: '2025-04-07'
    },
    {
      id: 8,
      name: 'Toyota Motor',
      logo: '/images/emission7.jpg',
      industry: 'Automotive',
      totalEmissions: 82340,
      lastUpdated: '2025-03-28',
      status: 'Unverified',
      changePercent: 1.5,
      product_count: 112,
      verification_date: null
    }
  ];

 

const CompanyList = () => {
    const [pageDecimal, setPageDecimal] = useState(0);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const handlePageDecimalIncrement = (decimal: number) => {
        setPageDecimal(decimal + 1);
        setPage((decimal + 1) * 15);
      };
      const handlePageDecimalDecrement = (decimal: number) => {
        setPageDecimal(decimal - 1);
        setPage((decimal - 1) * 15);
      };

  return (
    <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
            <div className='rounded-[4px] border-2 border-carbon  px-2 sm:px-4 py-4  shadow-lg shadow-carbon'>
                <p className='mb-4 text-2xl font-bold'>Company list</p>
                {companies.map((company) => (
                    <div className='px-2 sm:px-4 py-4 border-carbon border-2 mb-4 '>
                        <div className='flex gap-4 mb-6'>
                            <Image
                                src={company.logo}
                                width={60}
                                height={60}
                                alt='company logo'
                                className='rounded-full'
                            />
                            <div className='flex flex-col justify-end'>
                                <h2 className='text-2xl font-bold'>{company.name}</h2>
                                <p>{company.industry}</p>
                            </div>
                        </div>
                        <div>
                            <p>Total emission:</p>
                            <p>Product tracked on Solana blockchain:</p>
                            <p>Year-over-year change:</p>
                            <p>Last Updated:</p>
                            <p>Verification date:</p>
                        </div>
                    </div>
                ))}
                <div className="mt-4 flex justify-between items-center">
              <span>
                Showing {page + 1}-{Math.min(page + 5, totalCount)} of {totalCount}
              </span>
              <div className="flex gap-2 w-auto">
              <div className='group relative transition-all duration-100'>
              <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 rounded-[4px]"></div>

              <button 
                  onClick={() => handlePageDecimalDecrement(pageDecimal)}
                  disabled={page === 0}
                  className="relative bg-white px-4 py-2 border-2 border-carbon rounded flex-[1]"
                >
                  Previous
                </button>
              </div>

                
                <div className='group relative transition-all duration-100'>
                    <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 rounded-[4px]"></div>

                    <button
                    onClick={() => handlePageDecimalIncrement(pageDecimal)}
                    disabled={page + 5 >= totalCount}
                    className="relative px-4 py-2 border-2 border-carbon rounded flex-[1] bg-white"
                    >
                    Next
                    </button>
                </div>

              </div>
            </div>

            </div>
        </div>
    </div>
  )
}

export default CompanyList