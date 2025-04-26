import Image from "next/image"
import Link from "next/link"

const HeroSection = () => {
  return (
    <main className="px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 h-auto items-center">
        <div className="w-full md:flex-[3] bg-gradient-to-b rounded-[4px] text-left justify-end mb-12">
          <div className="flex flex-col justify-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-carbon font-bold">
              Carbon Transparency Secured by <span className="text-purple-700"> Solana Blockchain</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-carbon mt-2 sm:mt-4">
              Track emissions across your entire supply chain with immutable verification technology
            </p>
          </div>
          <div className="flex flex-col  w-fit ">
            <div className="flex gap-4 mb-4">
            <div className="group relative transition-all duration-300">
              <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded"></div>
              <Link className="relative" href={"/company-dashboard"}>
                <p className="px-4 py-2 shadow z-10 bg-white border-carbon border-2 rounded">Explore CO2 emission of companies</p>
              </Link>
            </div>
                          <div className="group relative transition-all duration-300">
              <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded"></div>
              <Link className="relative" href={"/our-globe"}>
                <p className="px-4 py-2 shadow z-10 bg-white border-carbon border-2 rounded">View global CO2 emission</p>
              </Link>
            </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold">OR</p>
              <Link href={"/web-cua-Trung"} className="flex w-full rounded bg-purple-700 text-white hover:bg-purple-600 shadow-lg shadow-purple-700 px-4 py-2 border-2 border-purple-700 justify-center transition-all duration-200" >Upload your carbon footprint and calculate it</Link>
            </div>
          </div>

        </div>
        <div className="w-full md:flex-[2] relative mt-4 md:mt-0 flex items-end">
          <div className="rounded-[50px] w-full h-full absolute bg-transparent"></div>
          <Image
            src="/images/emission2.png"
            alt="carbon emission"
            width={800}
            height={1200}
            className="w-full h-auto"
          />
        </div>
      </div>
    </main>
  )
}

export default HeroSection
