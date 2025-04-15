"use client"
import Image from "next/image"
import { motion } from "framer-motion"

// Sample image data with different aspect ratios
const galleryImages = [
    {
        id: 1,
        src: "/images/emission7_bw.jpg",
        alt: "Gallery image 1",
        width: 800,
        height: 600,
        span: "col-span-2 row-span-2",
        alt_id: 1,
        alt_src: "/images/emission7.jpg",
       
      },
      {
        id: 2,
        src: "/images/emission9_bw.jpg",
        alt: "Gallery image 2",
        width: 300,
        height: 400,
        span: "col-span-1 row-span-1",
        alt_id: 2,
        alt_src: "/images/emission9.jpg",
        
      },
      {
        id: 3,
        src: "/images/emission5_bw.jpg",
        alt: "Gallery image 3",
        width: 600,
        height: 300,
        span: "col-span-2 row-span-1",
        alt_id: 3,
        alt_src: "/images/emission5.jpg",
       
      },
      {
        id: 4,
        src: "/images/emission6_bw.jpg",
        alt: "Gallery image 4",
        width: 400,
        height: 500,
        span: "col-span-1 row-span-2",
        alt_id: 4,
        alt_src: "/images/emission6.jpg",
       
      },
      {
        id: 5,
        src: "/images/emission3_bw.jpg",
        alt: "Gallery image 3",
        width: 600,
        height: 400,
        span: "col-span-2 row-span-1",
        alt_id: 5,
        alt_src: "/images/emission3.jpg",
       
      },
  {
    id: 6,
    src: "/images/emission4_bw.jpg",
    alt: "Gallery image 6",
    width: 300,
    height: 300,
    span: "col-span-1 row-span-1",
    alt_id: 5,
    alt_src: "/images/emission4.jpg",
   
  },
  {
    id: 7,
    src: "/images/emission10_bw.jpg",
    alt: "Gallery image 7",
    width: 500,
    height: 500,
    span: "col-span-1 row-span-2",
    alt_id: 7,
    alt_src: "/images/emission10.jpg",
  },
]

const fadeIn = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  }

  export function EarthChallenge() {
    return (
      <div className="w-full px-4 sm:px-6 md:px-10">
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-3 sm:mb-4 md:mb-6">
            <p className="text-black text-[18px] sm:text-3xl md:text-4xl lg:text-4xl  font-bold">
              An Earth&apos;s Threat - <span className="text-purple-700">Carbon Dioxide</span>
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
            initial="hidden"
            whileInView="reveal"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.3 }}  // This creates the delay between each child
          >
            {galleryImages.map((image) => (
              <motion.div
                key={image.id}
                className={`${image.span} overflow-hidden rounded-[4px] cursor-pointer`}
                variants={fadeIn}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/20" />
                  <Image
                    src={image.alt_src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="absolute inset-0 z-10 bg-black h-full w-full opacity-0 hover:opacity-100 object-cover transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className="text-black text-base sm:text-lg md:text-xl lg:text-[18px] col-span-1 sm:col-span-2 row-span-1 text-right"
              variants={fadeIn}
              transition={{ duration: 0.7 }}
            >
              <p><span className="text-purple-700 font-bold">Carbon emissions</span> present one of today&apos;s <span className="font-bold">most critical environmental challenges</span>. 
                These industrial activities contribute significantly to climate change, releasing greenhouse gases that trap heat in our atmosphere. 
                As we confront this reality, understanding these emission sources becomes crucial for developing 
                effective policies and technologies that can help transition toward a more sustainable future while meeting growing global energy demands... </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }