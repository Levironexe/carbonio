'use client'
import React, { useState, useEffect } from 'react'
// import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Initialize Supabase client
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
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
      }
    }
  }
)

interface CompanyData {
  companyName: string;
  field: string;
  registrationDate: string;
  totalCarbonEmission: number;
  productTracked: number;
  lastUpdate: string;
}

const CompanyList = () => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageDecimal, setPageDecimal] = useState(0);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 5;

  // Fetch company data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch companies data
        const { data, error } = await supabase
          .from('companies')
          .select('id, name, field, registration_date, updated_at, verification_status')
          .order('name')
          .range(page, page + itemsPerPage - 1);

        if (error) {
          console.error('Error fetching company data:', error);
          return;
        }

        // Get total count for pagination
        const { count, error: countError } = await supabase
          .from('companies')
          .select('id', { count: 'exact', head: true });

        if (countError) {
          console.error('Error fetching count:', countError);
        } else {
          setTotalCount(count || 0);
        }

        // Fetch all products for these companies
        const companyIds = data.map(company => company.id);
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('company_id, total_carbon_footprint, verification_date')
          .in('company_id', companyIds);

        if (productError) {
          console.error('Error fetching product data:', productError);
          return;
        }

        // Process the data to match the interface
        const processedData: CompanyData[] = data.map(company => {
          // Filter products for this company
          const companyProducts = productData.filter(product => product.company_id === company.id);
          
          // Calculate total carbon emissions
          const totalCarbonEmission = companyProducts.reduce(
            (sum, product) => sum + (product.total_carbon_footprint || 0), 
            0
          );

          // Get latest verification date
          const latestVerification = companyProducts.length > 0 ? 
            new Date(Math.max(...companyProducts
              .filter(p => p.verification_date)
              .map(p => new Date(p.verification_date).getTime()))) : null;

          return {
            companyName: company.name,
            field: company.field,
            registrationDate: company.registration_date,
            totalCarbonEmission,
            productTracked: companyProducts.length,
            lastUpdate: company.updated_at,
            verificationStatus: company.verification_status,
            verificationDate: latestVerification ? latestVerification.toISOString().split('T')[0] : 'Not verified',
            // Calculate year-over-year change (this would need historical data)
            changePercent: -3.2 // Placeholder - ideally calculated from historical data
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
                <div className='flex gap-4 mb-6'>
                  <div className='w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center'>
                    <span className='text-2xl font-bold'>{company.companyName[0]}</span>
                  </div>
                  <div className='flex flex-col justify-end'>
                    <Link href={`/company-dashboard/${company.companyName}`}>
                      <h2 className='text-2xl font-bold'>{company.companyName}</h2>
                    </Link>
                    <p>{company.field}</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <p className='font-medium'>Total emission:</p>
                  <p>{company.totalCarbonEmission.toFixed(2)} kgCO₂e</p>
                  
                  <p className='font-medium'>Products tracked on Solana blockchain:</p>
                  <p>{company.productTracked}</p>

                  <p className='font-medium'>Registration date:</p>
                  <p>{new Date(company.registrationDate).toLocaleDateString()}</p>
                  
                  <p className='font-medium'>Last updated:</p>
                  <p>{new Date(company.lastUpdate).toLocaleDateString()}</p>

                </div>
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
                  className="relative bg-white px-4 py-2 border-2 border-carbon rounded flex-[1] disabled:opacity-50"
                >
                  Previous
                </button>
              </div>
              
              <div className='group relative transition-all duration-100'>
                <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 rounded-[4px]"></div>
                <button
                  onClick={handlePageDecimalIncrement}
                  disabled={page + itemsPerPage >= totalCount}
                  className="relative px-4 py-2 border-2 border-carbon rounded flex-[1] bg-white disabled:opacity-50"
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