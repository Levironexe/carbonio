import React from 'react'
// import { useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//         auth: {
//             persistSession: false,
//             autoRefreshToken: false,
//             detectSessionInUrl: false
//         },
//         global: {
//             headers: {
//             'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//             'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
//             }
//         }
//     }
// )

// Main company interface to match companies table
export interface Company {
    id: number;
    name: string;
    description: string;
    field: string;
    contact_name: string;
    contact_email: string;
    phone_number: string;
    address: string;
    registration_date: string;
    verification_status: 'Verified' | 'Pending' | 'Unverified';
    created_at: string;
    updated_at: string;
  }
  
  // Product interface to match products table
  export interface Product {
    id: number;
    company_id: number;
    name: string;
    description: string;
    category: string;
    created_at: string;
    total_carbon_footprint: number;
    blockchain_reference: string;
    verification_status: 'Verified' | 'Pending' | 'Unverified';
    verification_date: string | null;
  }
  
  // Production stage interface to match production_stages table
  export interface ProductionStage {
    id: number;
    company_id: number;
    name: string;
    description: string;
    created_at: string;
  }
  
  // Carbon tag interface to match carbon_tags table
  export interface CarbonTag {
    id: number;
    product_id: number;
    qr_code_data: string;
    created_at: string;
  }
  
  // Emissions data interface to match product_emission_data table
  export interface ProductEmissionData {
    id: number;
    product_id: number;
    stage_id: number;
    stage_order: number;
    co2_equivalent: number;
    measurement_unit: string;
    created_at: string;
  }
  
  // Combined interface for company detail page
  export interface CompanyDetailData {
    company: Company;
    products: Product[];
    productionStages: ProductionStage[];
    carbonTags: CarbonTag[];
    emissionData: ProductEmissionData[];
    
    // Calculated fields
    totalCarbonEmission: number;
    verifiedProductsCount: number;
    verificationRate: number;
    latestVerificationDate: string | null;
  }

const page = () => {
  return (
    <div>page</div>
  )
}

export default page