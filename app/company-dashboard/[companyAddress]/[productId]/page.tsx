'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

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
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
      }
    }
  }
)

interface Product {
  id: string
  name: string
  description: string
  company_id: string
  category: string
  total_carbon_footprint: number
  verification_status: string
  verification_date: string | null
  blockchain_reference: string | null
  image: string | null
  created_at: string
}

interface Company {
  id: string
  name: string
  wallet_address: string
  field: string
  description: string | null
  verification_status: string
}

interface ProductionStage {
  id: string
  company_id: string
  name: string
  description: string
  created_at: string
}

interface EmissionData {
  id: string
  product_id: string
  stage_id: string
  stage_order: number
  co2_equivalent: number
  measurement_unit: string
  created_at: string
}

const ProductDetail = () => {
  const params = useParams()
  const router = useRouter()
  const companyAddress = params.companyAddress as string
  const productId = params.productId as string

  const [product, setProduct] = useState<Product | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [stages, setStages] = useState<ProductionStage[]>([])
  const [emissions, setEmissions] = useState<EmissionData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        
        // First get company by wallet address
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('wallet_address', companyAddress)
          .maybeSingle() // Use maybeSingle instead of single to handle empty results

        if (companyError) throw companyError
        
        if (!companyData) {
          throw new Error('Company not found')
        }
        
        setCompany(companyData)
        
        // Fetch product data
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()

        if (productError) throw productError
        
        if (!productData) {
          throw new Error('Product not found')
        }
        
        setProduct(productData)
        
        // Check if this product belongs to the company
        if (productData.company_id !== companyData.id) {
          throw new Error('This product does not belong to this company')
        }
        
        // Fetch production stages 
        const { data: stagesData, error: stagesError } = await supabase
          .from('production_stages')
          .select('*')
          .eq('company_id', companyData.id)
          
        if (stagesError) throw stagesError
        setStages(stagesData || [])
        
        // Fetch emission data
        const { data: emissionsData, error: emissionsError } = await supabase
          .from('product_emission_data')
          .select('*')
          .eq('product_id', productId)
          .order('stage_order', { ascending: true })
          
        if (emissionsError) throw emissionsError
        setEmissions(emissionsData || [])
        
      } catch (error: any) {
        console.error("Error fetching product details:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (companyAddress && productId) {
      fetchProductDetails()
    }
  }, [companyAddress, productId])

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
            <p className='mb-4 text-2xl font-bold'>Product Details</p>
            <p className='text-center py-8'>Loading product information...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
            <p className='mb-4 text-2xl font-bold'>Product Not Found</p>
            <p className='text-center py-8 text-red-500'>{error}</p>
            <div className='flex justify-center'>
              <Link 
                href={`/company-dashboard/${companyAddress}`}
                className="px-4 py-2 bg-purple-700 text-white rounded-[4px]"
              >
                Back to Company Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No product found
  if (!product || !company) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
            <p className='mb-4 text-2xl font-bold'>Product Not Found</p>
            <p className='text-center py-8'>This product doesn't exist or has been removed.</p>
            <div className='flex justify-center'>
              <Link 
                href={`/company-dashboard/${companyAddress}`}
                className="px-4 py-2 bg-purple-700 text-white rounded-[4px]"
              >
                Back to Company Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='text-black w-full py-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Breadcrumb navigation */}
        <div className='mb-4 text-sm'>
          <Link href="/company-dashboard" className='text-purple-700 hover:underline'>Companies</Link>
          <span className='mx-2'>/</span>
          <Link href={`/company-dashboard/${company.wallet_address}`} className='text-purple-700 hover:underline'>{company.name}</Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-500'>{product.name}</span>
        </div>

        {/* Product header */}
        <div className='rounded-[4px] border-2 border-carbon mb-6 shadow-lg shadow-carbon overflow-hidden'>
          <div className='flex flex-col md:flex-row'>
            {/* Product image */}
            <div className='md:w-1/3 h-[300px] relative bg-gray-100 flex items-center justify-center overflow-hidden'>
              {product.image ? (
                <img
                src={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                alt={product.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <svg 
                    className="h-24 w-24 text-gray-300" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className='text-gray-400 mt-2'>No image available</p>
                </div>
              )}
            </div>
            
            {/* Product info */}
            <div className='md:w-2/3 p-6'>
              <div className='flex items-start justify-between'>
                <div>
                  <h1 className='text-3xl font-bold text-purple-700'>{product.name}</h1>
                  <div className='flex items-center gap-2 mt-2'>
                    <Link 
                      href={`/company-dashboard/${company.wallet_address}`}
                      className='text-sm font-medium text-purple-700 hover:underline flex items-center'
                    >
                      {company.name}
                    </Link>
                    {company.verification_status === "verified" && (
                      <div className='bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium'>
                        Verified Company
                      </div>
                    )}
                    {product.category && (
                      <div className='bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs'>
                        {product.category}
                      </div>
                    )}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                  product.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {product.verification_status}
                </div>
              </div>
              
              <div className='my-6 pb-6 border-b border-gray-200'>
                <h2 className='text-lg font-medium mb-2'>Description</h2>
                <p className='text-gray-700'>{product.description}</p>
              </div>
              
              <div className='grid grid-cols-2 gap-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Total CO₂ Footprint</p>
                  <p className='text-xl font-bold'>{product.total_carbon_footprint || 'N/A'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Created</p>
                  <p className='text-base'>{formatDate(product.created_at)}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Verification Date</p>
                  <p className='text-base'>{formatDate(product.verification_date)}</p>
                </div>
                {product.blockchain_reference && (
                  <div>
                    <p className='text-sm text-gray-500'>Blockchain Reference</p>
                    <a
                      href={`https://explorer.solana.com/address/${product.blockchain_reference}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-purple-700 hover:underline text-base'
                    >
                      View on Solana
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs navigation */}
        <div className='mb-4 border-b border-gray-200'>
          <div className='flex flex-wrap -mb-px'>
            <button
              className={`mr-2 inline-block py-4 px-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'text-purple-700 border-b-2 border-purple-700'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`mr-2 inline-block py-4 px-4 text-sm font-medium ${
                activeTab === 'emissions'
                  ? 'text-purple-700 border-b-2 border-purple-700'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('emissions')}
            >
              Carbon Emissions
            </button>
            <button
              className={`mr-2 inline-block py-4 px-4 text-sm font-medium ${
                activeTab === 'verification'
                  ? 'text-purple-700 border-b-2 border-purple-700'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('verification')}
            >
              Verification
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className='rounded-[4px] border-2 border-carbon px-4 py-4 shadow-lg shadow-carbon'>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className='text-2xl font-bold mb-6'>Product Overview</h2>
              
              <div className='mb-8'>
                <h3 className='text-xl font-medium mb-4'>About this Product</h3>
                <p className='mb-4'>{product.description}</p>
                <p className='mb-4'>
                  This product is manufactured by <span className='font-medium'>{company.name}</span>
                  {company.field && `, a company operating in the ${company.field} industry`}.
                  {company.description && ` ${company.description}`}
                </p>
              </div>
              
              <div className='mb-8'>
                <h3 className='text-xl font-medium mb-4'>Production Stages</h3>
                {stages.length > 0 ? (
                  <div className='space-y-4'>
                    {stages.map((stage, index) => (
                      <div key={stage.id} className='p-4 border-2 border-carbon rounded-[4px]'>
                        <div className='flex items-center gap-2 mb-2'>
                          <div className='w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-medium'>
                            {index + 1}
                          </div>
                          <h4 className='text-lg font-medium'>{stage.name}</h4>
                        </div>
                        <p className='text-gray-700'>{stage.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='py-8 text-center text-gray-500'>
                    No production stages have been defined for this product.
                  </div>
                )}
              </div>
              
              <div>
                <h3 className='text-xl font-medium mb-4'>Product Details</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='p-4 bg-gray-50 rounded-[4px]'>
                    <p className='text-sm text-gray-500'>Product Category</p>
                    <p className='font-medium'>{product.category || 'Not specified'}</p>
                  </div>
                  <div className='p-4 bg-gray-50 rounded-[4px]'>
                    <p className='text-sm text-gray-500'>Created Date</p>
                    <p className='font-medium'>{formatDate(product.created_at)}</p>
                  </div>
                  <div className='p-4 bg-gray-50 rounded-[4px]'>
                    <p className='text-sm text-gray-500'>Total Carbon Footprint</p>
                    <p className='font-medium'>{product.total_carbon_footprint || 'Not measured'}</p>
                  </div>
                  <div className='p-4 bg-gray-50 rounded-[4px]'>
                    <p className='text-sm text-gray-500'>Verification Status</p>
                    <p className='font-medium'>{product.verification_status}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Emissions Tab */}
          {activeTab === 'emissions' && (
            <div>
              <h2 className='text-2xl font-bold mb-6'>Carbon Emissions</h2>
              
              <div className='mb-8'>
                <div className='p-4 bg-gray-50 rounded-[4px] mb-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-500'>Total Carbon Footprint</p>
                      <p className='text-3xl font-bold'>{product.total_carbon_footprint || '0'}</p>
                    </div>
                    <div className='text-sm text-gray-500'>
                      CO₂ equivalent
                    </div>
                  </div>
                </div>
                
                {emissions.length > 0 ? (
                  <div className='space-y-4'>
                    <h3 className='text-xl font-medium'>Emissions by Stage</h3>
                    
                    {emissions.map((emission, index) => {
                      // Find the stage name
                      const stageName = stages.find(s => s.id === emission.stage_id)?.name || `Stage ${emission.stage_order}`
                      
                      return (
                        <div key={emission.id} className='p-4 border-2 border-carbon rounded-[4px]'>
                          <div className='flex justify-between items-center mb-2'>
                            <div className='flex items-center gap-2'>
                              <div className='w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center text-sm font-medium'>
                                {emission.stage_order}
                              </div>
                              <h4 className='text-lg font-medium'>{stageName}</h4>
                            </div>
                            <div className='text-right'>
                              <p className='text-2xl font-bold'>{emission.co2_equivalent}</p>
                              <p className='text-xs text-gray-500'>{emission.measurement_unit}</p>
                            </div>
                          </div>
                          
                          {/* Visual percentage bar */}
                          <div className='w-full bg-gray-200 rounded-full h-2.5 mb-2'>
                            <div 
                              className='bg-purple-700 h-2.5 rounded-full' 
                              style={{ 
                                width: `${Math.min(
                                  (emission.co2_equivalent / product.total_carbon_footprint) * 100, 
                                  100
                                )}%` 
                              }}
                            ></div>
                          </div>
                          
                          <p className='text-xs text-gray-500'>
                            Recorded on {formatDate(emission.created_at)}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className='py-8 text-center text-gray-500'>
                    No detailed emission data is available for this product.
                  </div>
                )}
              </div>
              
              <div className='bg-gray-50 p-6 rounded-[4px]'>
                <h3 className='text-lg font-medium mb-2'>About Carbon Tracking</h3>
                <p className='text-gray-700 mb-2'>
                  This product&apos;s carbon emissions are tracked throughout its lifecycle and verified on blockchain for transparency and accountability.
                </p>
                <p className='text-gray-700'>
                  Each production stage&apos;s carbon footprint is measured and recorded, providing a comprehensive view of the product&apos;s environmental impact.
                </p>
              </div>
            </div>
          )}
          
          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <div>
              <h2 className='text-2xl font-bold mb-6'>Verification Status</h2>
              
              <div className='p-4 border-2 border-carbon rounded-[4px] mb-8'>
                <div className='flex items-center gap-4'>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    product.verification_status === 'verified' 
                      ? 'bg-green-100 text-green-800' 
                      : product.verification_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.verification_status === 'verified' ? (
                      <svg 
                        className="h-8 w-8" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : product.verification_status === 'pending' ? (
                      <svg 
                        className="h-8 w-8" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    ) : (
                      <svg 
                        className="h-8 w-8" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className='text-xl font-medium'>
                      Status: {product.verification_status.charAt(0).toUpperCase() + product.verification_status.slice(1)}
                    </h3>
                    {product.verification_date ? (
                      <p className='text-gray-500'>Verified on {formatDate(product.verification_date)}</p>
                    ) : (
                      <p className='text-gray-500'>Not yet verified</p>
                    )}
                  </div>
                </div>
              </div>
              
              {product.blockchain_reference && (
                <div className='mb-8'>
                  <h3 className='text-xl font-medium mb-4'>Blockchain Verification</h3>
                  <p className='mb-4'>
                    This product&apos;s data has been verified and stored on the Solana blockchain for immutable record-keeping and transparency.
                  </p>
                  <div className='p-4 bg-gray-50 rounded-[4px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                    <div>
                      <p className='text-sm text-gray-500 mb-1'>Blockchain Reference</p>
                      <p className='font-mono text-sm truncate max-w-sm'>{product.blockchain_reference}</p>
                    </div>
                    <a
                      href={`https://explorer.solana.com/address/${product.blockchain_reference}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='px-4 py-2 bg-purple-700 text-white rounded-[4px] text-sm hover:bg-purple-800 transition-colors'
                    >
                      View on Solana Explorer
                    </a>
                  </div>
                </div>
              )}
              
              <div className='bg-gray-50 p-6 rounded-[4px]'>
                <h3 className='text-lg font-medium mb-2'>About Our Verification Process</h3>
                <p className='text-gray-700 mb-2'>
                  Our verification process ensures that all product data, including carbon emissions, production methods, and supply chain information, is accurate and reliable.
                </p>
                <p className='text-gray-700'>
                  Once verified, products receive a blockchain-backed certificate that confirms their environmental claims and enables transparent tracking throughout the supply chain.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail