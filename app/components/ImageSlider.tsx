'use client'
import React from 'react';

interface SliderProps {
    items: string[];
    width: number;
    height: number;
    reverse?: boolean;
}

const Slider = ({ items, width = 200, height = 80 }: SliderProps) => {
    return (
        <section>
            <div>
                <div>
                    <div
                        className="w-full overflow-hidden"
                        style={{
                            height: `${height}px`,
                            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10% 90%, transparent)',
                            maskImage: 'linear-gradient(to right, transparent, black 10% 90%, transparent)',
                        }}
                    >
                        <div
                            className="flex relative w-full"
                            style={{
                                minWidth: `${width * items.length}px`,
                            }}
                        >
                            {items.map((item, index) => (
                                <div
                                    key={`bottom-${index}`}
                                    className="absolute hover:grayscale-0 transition-all duration-500 flex items-center justify-center"
                                    style={{
                                        width: `${width}px`,
                                        height: `${height}px`,
                                        left: '100%',
                                        animation: 'reverseRun 35s linear infinite',
                                        animationDelay: `calc((35s / ${items.length}) * ${index} - 20s)`,
                                    }}
                                >
                                    <img
                                        src={item}
                                        alt={`Company ${index + 1}`}
                                        style={{
                                            height: '100%',
                                            width: 'auto',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes autoRun {
                    from {
                        left: 100%;
                    }
                    to {
                        left: -300px;
                    }
                }

                @keyframes reverseRun {
                    from {
                        left: -300px;
                    }
                    to {
                        left: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default function SliderPage() {
    const sliderImages = [
        '/images/carbon_trust_logo.png',
        '/images/ikea_logo.png',
        '/images/WWF_logo.jpg',
        '/images/dnv_,logo.png',
        '/images/ERM_consultancy_logo.jpg',
        '/images/energy_logo.png',
    ];

    return (
        <main className="w-full mx-auto">
            <Slider
                items={sliderImages}
                width={200}
                height={80}
            />
        </main>
    );
}
