"use client";
import React from 'react';
import { Carousel } from './ui/carousel';

const MeetOurSpecialistsCarousel = () => {
  const specialistsData = [
    {
      title: "The biggest challenge in carbon reduction isn't measurement—it's trust. When emissions data passes through multiple hands in a supply chain, its integrity diminishes at each transfer. With Solana's high-throughput blockchain, we've finally solved this 'trust bottleneck'. Now a product's carbon story can be verified by anyone, anywhere, with cryptographic certainty. What used to take months of manual auditing becomes instant, transparent, and tamper-proof. This isn't just about better reporting—it's about creating a market that can finally reward genuine sustainability.",
      button: "Learn More",
      src: "/images/phat_portrait.jpg",
      author: "Phat Veo",
      role: "Solana Blockchain expert"
    },
    {
      title: "Sustainability isn't just about good intentions—it's about good data. Through our implementation of IoT sensors and real-time monitoring, companies can now track their carbon emissions with unprecedented accuracy. This transforms abstract sustainability goals into concrete, measurable achievements that can be verified and optimized continuously.",
      button: "Learn More",
      src: "/images/toan_portrait.png",
      author: "Toan Truong",
      role: "Senior backend developer"
    },
    {
      title: "I built our blockchain verification system to solve the trust problem in carbon reporting. When a company uploads their emissions data and watches it become immutable on Solana, that's not just technology—it's accountability made visible. We're not just tracking carbon; we're redefining what transparency means for corporate sustainability.",
      button: "Learn More",
      src: "/images/trung_portrait.png",
      author: "Hoang Trung",
      role: "Lead full-stack developer"
    },
    {
      title: "As an Industrial Carbon Strategy Lead, I've seen countless sustainability initiatives struggle with data reliability. This platform is a game-changer—it transforms abstract emission targets into actionable insights with blockchain verification that ensures accountability. For the first time, I can confidently map our carbon reduction journey with data I know is immutable and transparent. This isn't just about reporting numbers; it's about building the credibility needed to drive meaningful change across our industrial operations.",
      button: "Learn More",
      src: "/images/khang_portrait.png",
      author: "Hoang Trung",
      role: "AWS specialist & Industrial Carbon Strategy Lead"
    },
  ];

  return (
    <div id='specialists' className='w-full px-4 sm:px-6 md:px-10 py-16'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-[18px] sm:text-3xl md:text-4xl lg:text-4xl text-black text-center font-bold mb-2 sm:mb-3 md:mb-4'>
          Meet our SPECIALISTS
        </h2>
        <p className='text-base sm:text-lg md:text-xl lg:text-[18px] text-black text-center mb-4 sm:mb-6 md:mb-10'>
          Trusted minds behind sustainability progress.
        </p>
        
        <Carousel slides={specialistsData} />
      </div>
    </div>
  );
};

export default MeetOurSpecialistsCarousel;