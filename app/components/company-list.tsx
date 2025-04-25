'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
// Update interface to match the API response
interface Company {
  id: string;
  name: string;
  description: string;
  field: string;
  contact_name: string;
  contact_emaill: string;
  phone_number: string;
  wallet_address: string;
  verification_date: string | null;
  verification_status: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: Company[];
}

// Display interface (what we show on the UI)
interface CompanyData {
  companyName: string;
  field: string;
  registrationDate: string;
  totalCarbonEmission: number;
  wallet_address: string;
  productTracked: number;
  lastUpdate: string;
  verificationStatus: string;
  verificationDate: string;
}

const CompanyList = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageDecimal, setPageDecimal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;

  // Fetch company data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch companies data from the API instead of Supabase
        const response = await fetch('https://carbonio-backend.onrender.com/companies/verified');
        const result: ApiResponse = await response.json();
        
        if (!response.ok) {
          console.error('Error fetching company data:', result);
          return;
        }

        // Set total count for pagination
        setTotalCount(result.data.length);
        
        // Get current page of companies
        const paginatedCompanies = result.data.slice(page, page + itemsPerPage);

        // Process company data without trying to fetch products directly
        // If you need product data, check if there's another endpoint available
        const processedData: CompanyData[] = paginatedCompanies.map(company => {
          // Since we don't have access to products data yet, use placeholder values
          // You'll need to update this once you have the correct endpoint for products
          
          return {
            companyName: company.name,
            field: company.field,
            registrationDate: company.created_at,
            wallet_address: company.wallet_address,
            totalCarbonEmission: 0, // Placeholder - replace when product data is available
            productTracked: 0,      // Placeholder - replace when product data is available
            lastUpdate: company.updated_at,
            verificationStatus: company.verification_status,
            verificationDate: company.verification_date ? 
              new Date(company.verification_date).toISOString().split('T')[0] : 
              'Not verified'
          };
        });
        setCompanies(processedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  const handlePageDecimalIncrement = () => {
    setPageDecimal(pageDecimal + 1);
    setPage((pageDecimal + 1) * itemsPerPage);
  };
  
  const handlePageDecimalDecrement = () => {
    setPageDecimal(pageDecimal - 1);
    setPage((pageDecimal - 1) * itemsPerPage);
  };

  // Display a loading state
  if (loading && companies.length === 0) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
            <p className='mb-4 text-2xl font-bold'>Company list</p>
            <p className='text-center py-8'>Loading company data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='text-black w-full py-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
          <p className='mb-4 text-2xl font-bold'>Company list</p>
          
          {companies.map((company, index) => (
              <div key={index} className='px-2 sm:px-4 py-4 border-carbon border-2 mb-4 rounded'>
                <div className='flex gap-4'>
                  <div className='w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center'>
                    <span className='text-2xl font-bold'>{company.companyName[0]}</span>
                  </div>
                  <div className='flex flex-col justify-end w-full'>
                    <div className='flex items-center justify-between gap-4'>
                      <Link href={`/company-dashboard/${company.companyName}`} className='flex items-start gap-2'>
                        <h2 className='text-2xl font-bold text-purple-700 mb-1'>{company.companyName}</h2>
                        <Image
                          src={"/images/verified.jpg"}
                          width={25}
                          height={25}
                          alt='verified indicator'
                        />
                      </Link>
                      <Link target='_blank' href={`https://explorer.solana.com/address/${company.wallet_address}}`}>
                      <p className='text-lg font-normal ml-2 hover:underline hover:text-purple-700'><span className='text-purple-700 font-bold'>Account address:</span> {company.wallet_address}</p>
                      </Link>
                    </div>
                    {Array.isArray(company.field) ? (
                      <div className="flex flex-wrap gap-1">
                        {company.field.map((item, index) => (
                          <span key={index} className="bg-gray-200 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p>{company.field || '-'}</p>
                    )}                  
                  </div>
                </div>
                {/* <div className='grid grid-cols-2 gap-2'>
                  <p className='font-medium'>Total emission:</p>
                  <p>{company.totalCarbonEmission.toFixed(2)} kgCO₂e</p>
                  
                  <p className='font-medium'>Products tracked on Solana blockchain:</p>
                  <p>{company.productTracked}</p>

                  <p className='font-medium'>Registration date:</p>
                  <p>{new Date(company.registrationDate).toLocaleDateString()}</p>
                  
                  <p className='font-medium'>Last updated:</p>
                  <p>{new Date(company.lastUpdate).toLocaleDateString()}</p>
                  
                  <p className='font-medium'>Verification status:</p>
                  <p>{company.verificationStatus}</p>
                </div> */}
              </div>
            
          ))}
          
          {companies.length === 0 && (
            <p className='text-center py-8'>No companies found.</p>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <span>
              Showing {page + 1}-{Math.min(page + itemsPerPage, totalCount)} of {totalCount}
            </span>
            <div className="flex gap-2 w-auto">
              <div className='group relative transition-all duration-100'>
                <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 rounded-[4px]"></div>
                <button 
                  onClick={handlePageDecimalDecrement}
                  disabled={page === 0}
                  className="relative bg-white px-4 py-2 border-2 border-carbon rounded flex-[1] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
              </div>
              
              <div className='group relative transition-all duration-100'>
                <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 rounded-[4px]"></div>
                <button
                  onClick={handlePageDecimalIncrement}
                  disabled={page + itemsPerPage >= totalCount}
                  className="relative px-4 py-2 border-2 border-carbon rounded flex-[1] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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