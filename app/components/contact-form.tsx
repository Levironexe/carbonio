"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CarTaxiFront } from "lucide-react"
import Image from "next/image"
import { useWallet } from '@solana/wallet-adapter-react'
import { createClient } from "@supabase/supabase-js"
import axios from "axios"
import { stringify } from "querystring"
import { useCompanyActions } from "../lib/company-utils"

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

interface submitData {
  name: string,
  native_name: string,
  contact_emaill: string,
  phone_number: string,
  wallet_address: string
  fax: string,
  website: string,
  field: string[]
}

const ContactForm = () => {
  const { createCompany, fetchCompanyData, addProduct, verify } = useCompanyActions()
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const { publicKey, wallet, connected } = useWallet()
  const walletAddress = publicKey ? publicKey.toString() : ''
  const [companyName, setCompanyName] = useState('');
  const [nativeCompanyName, setNativeCompanyname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fax, setFax] = useState('')
  const [website, setWebsite] = useState('');
  const [walletExists, setWalletExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addOns = [
    "Manufacturers",
    "Small business",
    "Mid-sized Enterprise",
    "Large Corporation",
    "Eco-Conscious Startups",
    "Logistics & Shipping Companies",
    "Food & Beverage Producers",
  ]

  // Check if the wallet address exists whenever it changes
  useEffect(() => {
    const checkWalletAddress = async () => {
      if (!walletAddress) {
        setWalletExists(null);
        return;
      }
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq("wallet_address", walletAddress);
        
        if (error) throw error;
        
        // If data length is not 0, the wallet exists
        setWalletExists(data && data.length > 0);
      } catch (error) {
        console.error('Error checking wallet address:', error);
        setWalletExists(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkWalletAddress();
  }, [walletAddress]);

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) => (prev.includes(addon) ? prev.filter((item) => item !== addon) : [...prev, addon]))
  }
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    
    if (!walletAddress) {
      alert("Please connect your wallet first");
      return;
    }
    
    // Double-check that the wallet doesn't exist
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq("wallet_address", walletAddress);
      
    if (data && data.length > 0) {
      alert("This wallet address is already registered with a company");
      setWalletExists(true);
      return;
    }
    
    const endpoint = 'https://carbonio-backend.onrender.com/companies/created';
    const companyData: submitData = {
      name: companyName,
      native_name: nativeCompanyName,
      contact_emaill: email,
      phone_number: phoneNumber,
      wallet_address: walletAddress, 
      fax: fax,
      website: website,
      field: selectedAddOns,
    };
    
    // Create company on the blockchain
    try {
      // await createCompany(companyName);
      await createCompany(walletAddress);
    } catch (error) {
      console.error("Error creating company:", error);
      alert("Failed to create company on blockchain");
      return;
    }

    try {
      if (endpoint) {
        const response = await axios.post(endpoint, companyData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Success:', response.data);
        alert("Company registered successfully!");
        // You might want to refresh the wallet check here
        setWalletExists(true);
      } else {
        console.log("endpoint is not correct");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data || error.message);
      } else {
        console.error('Error:', error);
      }
      alert("Failed to register company");
    }
  }

  return (
    <div className="min-h-screen bg-white text-black sm:p-4 md:p-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 md:p-8 lg:p-12 border-2 border-carbon shadow-xl shadow-carbon rounded-[4px]">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-6 lg:gap-8">
          <div className="mb-6 sm:mb-8 lg:mb-0 lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-700 to-purple-800 bg-clip-text text-transparent">
              DROP<br />US A LINE
            </h1>
            <p className="text-base sm:text-sm md:text-lg lg:text-lg text-black">
              Tell us about your business and your sustainability goals.
              <br /> We&apos;re excited to learn how you&apos;re tackling carbon impact and how our technology can support your journey toward transparency and accountability.
            </p>
            <div className="flex justify-center py-12">
              <Image
                src="/images/light_bult.png"
                height={200}
                width={200}
                alt="light bult"
                className="flex justify-center"
              />
            </div>
          </div>

          {!connected ? (
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="text-center p-8 border-2 border-carbon rounded-[4px]">
                <p className="text-lg font-bold mb-4">Please connect your wallet to register a company</p>
                <p>Use the wallet button in the navigation bar to connect.</p>
              </div>
            </div>
          ) : isLoading ? (
            <div className="lg:w-1/2 flex items-center justify-center">
              <p className="text-lg font-bold">Checking wallet status...</p>
            </div>
          ) : walletExists ? (
            <div className="lg:w-1/2 flex items-start justify-center">
              <div className="text-center p-8 border-2 border-red-500 rounded-[4px]">
                <p className="text-lg font-bold mb-4 text-red-500">This wallet is already registered with a company</p>
                <p>Please use a different wallet address to register a new company.</p>
                <p className="mt-4 text-sm">Wallet address: {walletAddress}</p>
              </div>
            </div>
          ) : (
            <form className="space-y-4 sm:space-y-4 lg:w-1/2" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between items-center font-bold">
                  <label>Wallet address</label>
                  <label className="text-purple-700">Solana wallet: {wallet?.adapter.name}</label>
                </div>
                
                <p className="cursor-not-allowed w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700">
                  {walletAddress}
                </p>
              </div>

              <label className="font-bold">Company name</label>
              <input
                type="text"
                onChange={(e) => (setCompanyName(e.target.value))}
                placeholder="Company name in English"
                className="w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700"
                required
              />
              <input
                type="text"
                onChange={(e) => (setNativeCompanyname(e.target.value))}
                placeholder="Company name in native language"
                className="w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700 mb-6"
              />

              <label className="font-bold">Office information</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => (setEmail(e.target.value))}
                className="w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700"
                required
              />
              
              <input
                type="text"
                placeholder="Phone number"
                onChange={(e) => (setPhoneNumber(e.target.value))}
                className="w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700"
                required
              />

              <input
                type="text"
                placeholder="Fax"
                onChange={(e) => (setFax(e.target.value))}
                className="w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700"
              />

              <input
                type="text"
                placeholder="Website"
                onChange={(e) => (setWebsite(e.target.value))}
                className="w-full bg-white rounded p-2 sm:p-3 md:p-3 border-2 border-carbon focus:outline-none focus:border-purple-700 mb-6"
              />

              <div>
                <h3 className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 flex items-center gap-2">
                  Add-Ons
                  <span className="bg-carbon text-white rounded-[4px] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 inline-flex items-center justify-center text-xs sm:text-sm">
                    ?
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {addOns.map((addon) => (
                    <button
                      key={addon}
                      type="button"
                      onClick={() => toggleAddOn(addon)}
                      className={`px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-[4px] border text-xs sm:text-sm md:text-base transition-colors ${
                        selectedAddOns.includes(addon)
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-purple-800 hover:border-purple-500"
                      }`}
                    >
                      {addon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3 pt-3 sm:pt-4">
                <button 
                  type="submit"
                  className="w-full sm:w-fit px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-[4px] bg-purple-700 text-white font-semibold flex items-center justify-center sm:justify-start gap-2 hover:gap-3 md:hover:gap-3 duration-200 hover:opacity-90 transition-all"
                >
                  Hand us your information
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="text-xs sm:text-sm md:text-base text-black/80">Estimated respond time → 3 business days</span>
              </div>
              <div className="text-left mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                <p className="text-black/80 mb-2 sm:mb-3 md:mb-4 mt-6 sm:mt-12 md:mt-16 lg:mt-24 text-xs sm:text-sm md:text-base">or email us at</p>
                <a
                  href="mailto:nguyenphuoc4805@gmail.com"
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold hover:text-purple-700 transition-colors underline"
                >
                  nguyenphuoc4805.com
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default ContactForm