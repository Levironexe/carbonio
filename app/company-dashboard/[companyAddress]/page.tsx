'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
  category: string
  total_carbon_footprint: number
  verification_status: string
  verification_date: string | null
  image: string | null
  blockchain_reference: string | null
  created_at: string
}

interface Company {
  id: string
  name: string
  website: string | null
  native_name: string | null
  description: string | null
  field: string | null
  contact_emaill: string
  phone_number: string
  wallet_address: string
  verification_status: string
  verification_date: string | null
}

const CompanyDetails = () => {
  const params = useParams()
  const companyAddress = params.companyAddress as string

  const [company, setCompany] = useState<Company | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCompanyAndProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch company details by wallet address
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('wallet_address', companyAddress)
          .single()

        if (companyError) throw companyError
        
        if (!companyData) {
          throw new Error('Company not found')
        }

        setCompany(companyData)

        // Fetch company's products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('company_id', companyData.id)
          .order('created_at', { ascending: false })

        if (productsError) throw productsError
        
        setProducts(productsData || [])
        setFilteredProducts(productsData || [])

        // Extract unique categories
        if (productsData) {
          const uniqueCategories = Array.from(
            new Set(productsData.map((product) => product.category).filter(Boolean))
          ) as string[]
          
          setCategories(['all', ...uniqueCategories])
        }
      } catch (error: any) {
        console.error("Error fetching company details:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (companyAddress) {
      fetchCompanyAndProducts()
    }
  }, [companyAddress])

  // Filter products when search term or category changes
  useEffect(() => {
    let filtered = [...products]
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  // Loading state
  if (loading) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
            <p className='mb-4 text-2xl font-bold'>Company Details</p>
            <p className='text-center py-8'>Loading company data...</p>
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
            <p className='mb-4 text-2xl font-bold'>Company Not Found</p>
            <p className='text-center py-8 text-red-500'>{error}</p>
            <div className='flex justify-center'>
              <Link 
                href="/company-dashboard"
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

  // No company found
  if (!company) {
    return (
      <div className='text-black w-full py-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='rounded-[4px] border-2 border-carbon px-2 sm:px-4 py-4 shadow-lg shadow-carbon'>
            <p className='mb-4 text-2xl font-bold'>Company Not Found</p>
            <p className='text-center py-8'>This company doesn't exist or has been removed.</p>
            <div className='flex justify-center'>
              <Link 
                href="/company-dashboard"
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
        {/* Company header */}
        <div className='rounded-[4px] border-2 border-carbon px-4 py-4 shadow-lg shadow-carbon mb-6'>
          <div className='flex gap-4 items-center'>
            <div className='w-[80px] h-[80px] bg-gray-200 rounded-full flex items-center justify-center'>
              <span className='text-3xl font-bold'>{company.name[0]}</span>
            </div>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <h1 className='text-3xl font-bold text-purple-700'>{company.name}</h1>
                {company.verification_status === "verified" && (
                  <Image
                    src="/images/verified.jpg"
                    width={25}
                    height={25}
                    alt='verified indicator'
                  />
                )}
              </div>
              <p className='text-lg mt-1'>{company.description || 'No description available'}</p>
            </div>
            <div className='flex flex-col gap-2 items-end'>
              {company.website && (
                <a 
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-purple-700 hover:underline flex items-center'
                >
                  <svg 
                    className="h-4 w-4 mr-1" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Visit Website
                </a>
              )}
              <Link 
                target='_blank' 
                href={`https://explorer.solana.com/address/${company.wallet_address}`}
                className='text-purple-700 hover:underline flex items-center'
              >
                <svg 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                View on Solana
              </Link>
            </div>
          </div>
          
          <div className='mt-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
              <p className='font-medium'>Field:</p>
              <p>{company.field || 'N/A'}</p>
            </div>
            
            <div>
              <p className='font-medium'>Verification Status:</p>
              <p className='flex items-center'>
                {company.verification_status || 'N/A'}
                {company.verification_status === 'verified' && (
                  <svg 
                    className="h-4 w-4 ml-1 text-green-500" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </p>
            </div>
            
            <div>
              <p className='font-medium'>Verification Date:</p>
              <p>{formatDate(company.verification_date)}</p>
            </div>
            
            <div>
              <p className='font-medium'>Contact:</p>
              <p>{company.contact_emaill || 'N/A'}</p>
            </div>
          </div>
          
          <div className='mt-4'>
            <Link href="/company-dashboard" className='text-purple-700 hover:underline'>
              &larr; Back to Company Dashboard
            </Link>
          </div>
        </div>
        
        {/* Product list section */}
        <div className='rounded-[4px] border-2 border-carbon px-4 py-4 shadow-lg shadow-carbon'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
            <div>
              <h2 className='text-2xl font-bold'>Products</h2>
              <p className='text-gray-500'>{products.length} product{products.length !== 1 ? 's' : ''} tracked</p>
            </div>
            
            <div className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
              {/* Category filter */}
              <div className='flex flex-wrap gap-2'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 text-sm rounded ${
                      selectedCategory === category
                        ? 'bg-purple-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
              
              {/* Search box */}
              <div className='relative w-full md:w-64'>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className='px-4 py-2 border-2 border-carbon rounded-[4px] pl-10 w-full'
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* No products state */}
          {products.length === 0 && (
            <div className='py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg'>
              <svg 
                className="h-16 w-16 text-gray-400" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M20 7l-8-4-8 4m16 0v10l-8 4m0-10L4 7m8 4v10"></path>
              </svg>
              <p className='mt-4 text-xl font-medium text-gray-500'>No products found</p>
              <p className='mt-2 text-gray-400'>This company hasn't added any products yet.</p>
            </div>
          )}

          {/* No search results */}
          {products.length > 0 && filteredProducts.length === 0 && (
            <div className='py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg'>
              <svg 
                className="h-16 w-16 text-gray-400" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className='mt-4 text-xl font-medium text-gray-500'>No matching products</p>
              <p className='mt-2 text-gray-400'>Try using different search terms or categories</p>
              <div className='mt-4 flex gap-2'>
                <button 
                  onClick={() => setSearchTerm('')}
                  className='px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-[4px] hover:bg-gray-300'
                >
                  Clear Search
                </button>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className='px-4 py-2 text-sm bg-purple-700 text-white rounded-[4px]'
                >
                  View All Categories
                </button>
              </div>
            </div>
          )}

          {/* Products grid */}
          {filteredProducts.length > 0 && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredProducts.map((product) => (
                <div key={product.id} className='border-2 border-carbon rounded-[4px] overflow-hidden hover:shadow-lg transition-shadow'>
                  <div className='h-48 bg-gray-200 relative'>
                    {product.image ? (
                      <Image
                        src={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                        // src={"/images/box.png"}
                        alt={product.name}
                        fill
                        className='object-cover'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full bg-gray-100'>
                        <svg 
                          className="h-16 w-16 text-gray-300" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="1" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    )}
                    <div className='absolute bottom-2 right-2 bg-carbon text-white px-2 py-1 rounded-[4px] text-sm'>
                      CO₂e: {product.total_carbon_footprint || 'N/A'}
                    </div>
                  </div>
                  
                  <div className='p-4'>
                    <div className='flex justify-between items-start'>
                      <h3 className='text-xl font-bold text-purple-700'>{product.name}</h3>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                        product.verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                        product.verification_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.verification_status || 'Unknown'}
                      </span>
                    </div>
                    
                    <p className='text-sm text-gray-500 mt-1'>
                      {product.category && (
                        <span className='bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs'>
                          {product.category}
                        </span>
                      )}
                    </p>
                    
                    <p className='text-gray-600 mt-2 line-clamp-2'>{product.description}</p>
                    
                    <div className='flex justify-between items-center mt-4'>
                      <p className='text-xs text-gray-500'>
                        Created: {formatDate(product.created_at)}
                      </p>
                      
                      <Link 
                          href={`/company-dashboard/${company.wallet_address}/${product.id}`}
                          className='text-purple-700 hover:text-purple-900 hover:underline text-sm font-medium'
                      >
                        View Details &rarr;
                      </Link>
                    </div>
                    
                    {product.blockchain_reference && (
                      <div className='mt-2 pt-2 border-t border-gray-100'>
                        <Link 
                          href={`https://explorer.solana.com/address/${product.blockchain_reference}`}
                          target="_blank"
                          className='text-xs text-gray-500 hover:text-purple-700 flex items-center'
                        >
                          <svg 
                            className="h-3 w-3 mr-1" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                          </svg>
                          View on blockchain
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanyDetails