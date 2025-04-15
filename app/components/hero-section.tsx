import Image from "next/image"

const HeroSection = () => {
  return (
    <main className="px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 h-auto">
        <div className="w-full md:flex-[3] bg-gradient-to-b rounded-[4px] text-left flex justify-end mb-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold">
              Carbon Transparency Secured by <span className="text-purple-700"> Solana Blockchain</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mt-2 sm:mt-4">
              Track emissions across your entire supply chain with immutable verification technology
            </p>
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
