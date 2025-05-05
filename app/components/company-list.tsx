'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useCompanyActions } from "../lib/company-utils"
import { createClient } from '@supabase/supabase-js';
import { DonutChart } from './index';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
      }
    }
  }
);

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

interface CompanyData {
  companyName: string;
  companyWalletAddr: string;
  verificationStatus: string;
  verificationTime: string;
  productsAmount: number;
}

const CompanyList = () => {
  const { fetchCompanyData } = useCompanyActions();
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageDecimal, setPageDecimal] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;
  const [noVerifiedCompanyFound, setNoVerifiedCompanyFound] = useState(false);
  const [stopRefreshing, setStopRefreshing] = useState(false);
  const [totalCompanies, setTotalCompany] = useState<number>(0);
  const [totalProduct, setTotalProducts] = useState(0);

  const getAllWalletAddresses = async () => {
    if (!supabase) return [];
    
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('wallet_address');
        // .eq('verification_status', 'verified'); // Enable when ready
        if (data) {
          setTotalCompany(data?.length)
        }
      if (error) {
        throw error;
      }
      // Extract wallet addresses from the result
      const walletAddresses = data.map(item => item.wallet_address);
      
      // Filter out any null or empty wallet addresses
      return walletAddresses.filter(address => address);
      
    } catch (error) {
      console.error("Error fetching wallet addresses from Supabase:", error);
      return [];
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const walletAddresses = await getAllWalletAddresses();
      
      const fetchedCompanies: CompanyData[] = [];
      
      for (const walletAddr of walletAddresses) {
        try {
          const result = await fetchCompanyData(walletAddr);
          if (!result) {
            setNoVerifiedCompanyFound(true);
          }
          if (result?.companyName != '') {
            setStopRefreshing(true);
            if (result?.productsAmount) {
              setTotalProducts(totalProduct + result?.productsAmount)
            }
          }
          if (result) {
            fetchedCompanies.push(result);
          }
        } catch (error) {
          console.error(`Error fetching data for ${walletAddr}:`, error);
        }
      }
      
      setCompanies(fetchedCompanies);
      setTotalCount(fetchedCompanies.length);
    } catch (error) {
      console.error("Failed to fetch company data:", error);
      setError("Failed to load company data");
    } finally {
      setLoading(false);
    }
  }, [getAllWalletAddresses, fetchCompanyData]);

  // Use a delayed effect to ensure all connections are established
  useEffect(() => {
    if (!noVerifiedCompanyFound || !stopRefreshing) {
    // console.log("Initial load effect running");
    const timer = setTimeout(() => {
      // console.log("Triggering initial data fetch");
      fetchData();
    }, 1000);
    return () => clearTimeout(timer);
    }
  }, [fetchData]);

  const ForceRefresh = () => {
    setStopRefreshing(false);
    fetchData();
  }

  const handlePageDecimalIncrement = () => {
    setPageDecimal(pageDecimal + 1);
    setPage((pageDecimal + 1) * itemsPerPage);
  };
  
  const handlePageDecimalDecrement = () => {
    setPageDecimal(pageDecimal - 1);
    setPage((pageDecimal - 1) * itemsPerPage);
  };

  // Get the current page of companies
  const currentCompanies = companies.slice(page, page + itemsPerPage);

  // Display a loading state
  if (loading && companies.length === 0 || !stopRefreshing) {
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

  // Display error state
  if (error) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
              <p className=' text-2xl font-bold mb-4'>Company list</p>
            <p className='text-center py-8 text-red-500'>{error}</p>
            <div className='flex justify-center'>
              <button 
                onClick={ForceRefresh}
                className="px-4 py-2 bg-purple-700 text-white rounded-[4px]"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='text-black w-full py-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='rounded-[4px] border-2 border-carbon  px-2 sm:px-4 py-4  shadow-lg shadow-carbon mb-8'>
          <div className='flex gap-4 items-center mb-4 '>
          <p className='text-2xl font-bold'>Summary</p>
          <div className='w-full h-1 bg-purple-700 rounded'></div>
          </div>
            <div className='flex  gap-2 sm:gap-4 text-[18px]'>
              
                <div className='flex flex-col items-center justify-end gap-4 pb-12 flex-[1] border-2 border-carbon rounded px-2 sm:px-4 py-4'>
                      <p> 
                          Total CO₂e tracked on Solana:
                      </p>  
                      <p className='font-bold text-5xl'>
                          1231
                      </p>  

                   
                </div>
                <div className='text-center flex-[1] flex flex-col items-center justify-end gap-4  pb-12  border-2 border-carbon rounded px-2 sm:px-4 py-4'>
                <p className=''>Total products:</p>
                <p className='text-center text-5xl font-bold mt-4'>11</p>

                   
                </div>
                <div className='text-center flex-[1] flex flex-col items-center justify-end gap-4  pb-12 border-2 border-carbon rounded px-2 sm:px-4 py-4'>
                <p>Total stages:</p>
                    <p className='text-center text-5xl font-bold mt-4'>55</p>

                </div>  
                <div className='flex-[2] flex gap-2 w-fit border-2 border-carbon rounded px-2 sm:px-4 py-4'>
                <div className='flex flex-col justify-between'>
                  <p className='w-fit'>Verified company percentage:</p>
                  <p className='font-bold text-5xl mt-4 pb-9 '>
                    <span className='text-green-500'>{totalCount}</span>/
                    <span className='text-red-500'>{totalCompanies}</span>
                  </p>
                </div>
                <div className='w-1/2'>
                  <DonutChart Verified={totalCount} Unverified={totalCompanies}/>
                </div>
              </div>  
              </div>
          </div>
        <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
          
          <div className='w-full flex justify-between items-center mb-4'>
          <p className='text-2xl font-bold'>Company list</p>          
          <button className='px-4 py-2 rounded bg-purple-700 text-white' onClick={ForceRefresh}>Refresh</button>
          </div>
          
          {currentCompanies.length > 0 ? (
            currentCompanies.map((company, index) => (
              <div key={index} className='px-2 sm:px-4 py-4 border-carbon border-2 mb-4 rounded'>
                <div className='flex gap-4'>
                  <div className='w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center'>
                    <span className='text-2xl font-bold'>{company.companyName[0]}</span>
                  </div>
                  <div className='flex flex-col justify-end w-full'>
                    <div className='flex items-center justify-between gap-4'>
                      <Link href={`/company-dashboard/${company.companyWalletAddr}`} className='flex items-start gap-2'>
                        <h2 className='text-2xl font-bold text-purple-700 mb-1'>{company.companyName}</h2>
                        <Image
                          src={"/images/verified.jpg"}
                          width={25}
                          height={25}
                          alt='verified indicator'
                        />
                      </Link>
                      <Link target='_blank' href={`https://explorer.solana.com/address/${company.companyWalletAddr}?cluster=devnet`}>
                        <p className='text-lg font-normal ml-2 hover:underline hover:text-purple-700'>
                          <span className='text-purple-700 font-bold'>Account address:</span> {company.companyWalletAddr}
                        </p>
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <p className='font-medium'>Verification status:</p>
                      <p>{company.verificationStatus}</p>
                      
                      <p className='font-medium'>Verification time:</p>
                      <p>{company.verificationTime}</p>
                      
                      <p className='font-medium'>Products tracked:</p>
                      <p>{company.productsAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center py-8 text-red-500'>No verified companies found.</p>
          )}
          
          {companies.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyList