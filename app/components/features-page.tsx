"use client"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Play, LineChart, BarChart2 } from "lucide-react"
import Image from "next/image"
import GettingStarted from "./getting-started-section"
import WantYourCompanyVerified from "./WantYourCompanyVerified"

const FeaturesPage = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  return (
    <div className="w-full text-black px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mt-12">
          <h1 className="text-[18px] sm:text-3xl md:text-4xl lg:text-5xl font-bold">Discover What Our App Can Do</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-[18px] mt-2">
            Explore our powerful features designed to help you accomplish more with less effort.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 mb-14 justify-center">
            <div className="group relative">
              <div className="absolute inset-0 bg-white border-2 border-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
              <Link
                href={"#getting-started"}
                className="relative flex gap-2 rounded hover:gap-4 bg-carbon px-4 py-2 text-white border-2 border-carbon transition-all duration-200"
              >
                <p>Get started</p>
                <ArrowRight className="text-sm" />
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
              <Link
              target="_blank"
                href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
                className="relative flex gap-2 z-10 hover:gap-4 rounded bg-white px-4 py-2 text-carbon border-2 border-carbon hover:text-purple-700 transition-all duration-200"
              >
                <p>View demo</p>
                <Play className="text-sm" />
              </Link>
            </div>
          </div>
          <h3 className="text-center text-base sm:text-2xl md:text-3xl mb-8 font-bold">Key Features</h3>
        </div>

        {/* Features section - stacks on mobile, side by side on larger screens */}
        <div className="flex flex-col md:flex-row relative mb-16 gap-6 md:gap-0 shadow-lg shadow-carbon rounded">
          {/* Overlay for hover effect */}
          <div
            className={`absolute rounded inset-0 w-full ${
              isHovered !== null ? "bg-white/10 backdrop-blur-xl z-10 border-2 border-carbon" : "z-0 bg-transparent"
            } transition-all duration-300 hidden md:block`}
          ></div>

          {/* Feature A - Carbon Footprint Dashboard */}
          <div
            onMouseEnter={() => setIsHovered("dashboard")}
            onMouseLeave={() => setIsHovered(null)}
            className={`relative p-6 md:w-1/2 bg-white transition-all duration-300 ease-in-out  border-carbon flex flex-col justify-between rounded-l border-2
              ${
                isHovered === "dashboard" 
                  ? "md:w-3/5 md:z-20"
                  : isHovered === "blockchain"
                    ? "md:w-2/5 md:z-0"
                    : "md:z-20"
              }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <LineChart className="text-purple-700 h-6 w-6" />
                <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-purple-700">
                  Carbon Footprint Dashboard
                </h2>
              </div>
              <p className="text-sm md:text-base text-purple-700 mt-2">
                Access comprehensive visualization of companies' emission data across all manufacturing stages
              </p>
              <div className="flex items-center justify-center py-8">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Carbon Footprint Dashboard visualization"
                  width={500}
                  height={300}
                  className={`transition-all duration-200 rounded `}
                />
              </div>
              <p className="mb-4">
                <span className="font-bold">Carbon Footprint Dashboard</span> helps you visualize verified company
                emissions data across the entire manufacturing lifecycle. With our interactive charts, you can identify
                carbon hotspots and track sustainability progress.
              </p>
              <ul className="space-y-3 mb-6 list-disc pl-5">
                <li className="text-carbon">
                  <span>View comprehensive carbon metrics by product or process</span>
                </li>
                <li>
                  <span>Compare emissions against industry benchmarks</span>
                </li>
                <li>
                  <span>Generate customizable sustainability reports</span>
                </li>
              </ul>
            </div>

            <div className="w-full flex justify-center mt-6">
              <Link
                target="_blank"
                href={"/company-dashboard"}
                className="w-full px-4 py-3 bg-purple-700 rounded text-white text-center hover:bg-purple-800 transition-colors"
              >
                View now
              </Link>
            </div>
          </div>

          {/* Feature B - Blockchain Carbon Verification */}
          <div
            onMouseEnter={() => setIsHovered("blockchain")}
            onMouseLeave={() => setIsHovered(null)}
            className={`relative p-6 md:w-1/2 text-white bg-carbon border-2 border-carbon transition-all duration-300 ease-in-out flex flex-col justify-between rounded-r
              ${
                isHovered === "blockchain"
                  ? "md:w-3/5 md:z-20"
                  : isHovered === "dashboard"
                    ? "md:w-2/5 md:z-0"
                    : "md:z-20"
              }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="text-white h-6 w-6" />
                <h2 className="text-base sm:text-2xl md:text-3xl font-bold">Blockchain Carbon Verification</h2>
              </div>
              <p className="text-sm md:text-base text-gray-100 mt-2">
                Upload and calculate emissions with secure verification recorded on the Solana blockchain
              </p>
              <div className="flex items-center justify-center py-8">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  alt="Blockchain Carbon Verification interface"
                  width={500}
                  height={300}
                  className={`transition-all duration-200`}
                />
              </div>
              <p className="mb-4">
                <span className="font-bold">Blockchain Carbon Verification </span>secures your emissions data with
                immutable blockchain technology. With our Solana integration, you can authenticate and certify your
                carbon calculations with complete transparency.
              </p>
              <ul className="space-y-3 mb-6 list-disc pl-5">
                <li>
                  <span>Upload emissions data directly from Excel spreadsheets</span>
                </li>
                <li>
                  <span>Calculate carbon footprint using standardized methodologies</span>
                </li>
                <li>
                  <span>Create tamper-proof verification certificates on Solana</span>
                </li>
              </ul>
            </div>
            <div className="w-full flex justify-center mt-6">
              <Link
              target="_blank"
                href={"https://www.web-cua_trung.com"}
                className="w-full px-4 py-3 bg-white rounded text-carbon text-center hover:bg-gray-100 transition-colors"
              >
                Upload and calculate now
              </Link>
            </div>
          </div>
        </div>
        <GettingStarted/>
        <WantYourCompanyVerified/>
      </div>     
    </div>
  )
}

export default FeaturesPage
