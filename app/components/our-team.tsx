import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const OurTeam = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Toan Truong",
            portrait: "/images/phat_portrait.jpg",
            role: "Carbonio senior fullstack developer",
            linkedin: ""
        },
        {
            id: 2,
            name: "Phat Veo",
            portrait: "/images/phat_portrait.jpg",
            role: "Solana Blockchain expert",
            linkedin: ""
        },
        {
            id: 3,
            name: "Trung",
            portrait: "/images/phat_portrait.jpg",
            role: "Carbonio fullstack developer",
            linkedin: ""
        },
        {
            id: 4,
            name: "Gia Khang",
            portrait: "/images/phat_portrait.jpg",
            role: "Environmental activist & Senior backend developer",
            linkedin: ""
        },
        {
            id: 5,
            name: "Thien Phuoc",
            portrait: "/images/phat_portrait.jpg",
            role: "Carbonio fullstack developer",
            linkedin: ""
        },
        {
            id: 6,
            name: "Tristan Nguyen",
            portrait: "/images/phat_portrait.jpg",
            role: "Solana Blockchain expert & Strategist",
            linkedin: ""
        },
    ]

    return (
        <div  id='our-team' className='w-full text-black px-4 sm:px-6 md:px-10 py-8'>
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-[18px] sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold pb-12'>OUR TEAM</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {teamMembers.map((member) => (
                        <div key={member.id} className="group relative transition-all duration-300">
                            <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-2 group-hover:-right-2 rounded-[4px]"></div>
                            <div className="relative z-10 bg-white border-2 border-black rounded-[4px] overflow-hidden h-96">
                                <div className="h-64 relative overflow-hidden">
                                    <Image 
                                        src={member.portrait} 
                                        alt={`Portrait of ${member.name}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4 h-32 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl  text-purple-700">{member.name}</h3>
                                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] mt-1 line-clamp-2">{member.role}</p>
                                    </div>
                                    {member.linkedin && (
                                        <Link 
                                            href={member.linkedin}
                                            className="mt-2 inline-block text-sm text-purple-700 hover:text-purple-900"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn Profile
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OurTeam