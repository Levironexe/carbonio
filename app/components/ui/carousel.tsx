"use client";
import { ArrowRight } from "lucide-react";
import { useState, useRef, useId, useEffect, useCallback } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface SlideData {
  title: string;
  button: string;
  src: string;
  author?: string;
  role?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const isActive = current === index;
  
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);

  // Only use requestAnimationFrame for the active slide
  useEffect(() => {
    if (!isActive) return;
    
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isActive]);

  // const handleMouseMove = (event: React.MouseEvent) => {
  //   if (!isActive) return;
    
  //   const el = slideRef.current;
  //   if (!el) return;

  //   const r = el.getBoundingClientRect();
  //   xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
  //   yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  // };

  // const handleMouseLeave = () => {
  //   xRef.current = 0;
  //   yRef.current = 0;
  // };

  
  //button
  const { src, title, author, role } = slide;

  return (
    <li
      ref={slideRef}
      className="flex flex-1 w-full"
      tabIndex={0}
      role="tabpanel"
      id={`slide-${index}`}
      aria-labelledby={`slide-tab-${index}`}
    >
      <div className="flex items-center w-full bg-white rounded overflow-hidden">
        <div className="flex-[1] relative">
          <Image
            src={src}
            width={250}
            height={250}
            alt={`${author || 'Specialist'} - ${role || 'Expert'}`}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex-[3] p-12 text-[18px] text-black">
          <div>
            <Quote className="w-24 h-24 text-purple-700" />
          </div>
          <p className="text-justify mb-8">{title}</p>
          {(author || role) && (
            <p className="text-right">
              {author && <span className="font-bold">{author}</span>}
              {role && ` - ${role}`}
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
  disabled?: boolean;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
  disabled = false,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-white border-2 border-transparent rounded focus:border-carbon focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      title={title}
      onClick={handleClick}
      disabled={disabled}
      aria-label={title}
    >
      <ArrowRight className="text-black" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  loop?: boolean;
}

export function Carousel({ slides, loop = true }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const handlePreviousClick = useCallback(() => {
    const previous = current - 1;
    setCurrent(previous < 0 ? (loop ? slides.length - 1 : 0) : previous);
  }, [current, slides.length, loop]);

  const handleNextClick = useCallback(() => {
    const next = current + 1;
    setCurrent(next === slides.length ? (loop ? 0 : slides.length - 1) : next);
  }, [current, slides.length, loop]);

  const handleSlideClick = useCallback((index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  }, [current]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === carouselRef.current || 
          carouselRef.current?.contains(document.activeElement)) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            handlePreviousClick();
            break;
          case 'ArrowRight':
            e.preventDefault();
            handleNextClick();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePreviousClick, handleNextClick]);

  return (
    <div
      ref={carouselRef}
      className="relative max-w-6xl mx-auto overflow-hidden" 
      role="region"
      aria-roledescription="carousel"
      aria-label="Specialists carousel"
      tabIndex={0}
    >
      <h2 id={`carousel-heading-${id}`} className="sr-only">Specialists Carousel</h2>
      
      {/* Slide container with fixed height */}
      <div className="relative h-[400px]">
        <ul
          className="absolute inset-0 flex h-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            width: `${slides.length * 100}%`
          }}
          aria-live="polite"
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>
      </div>
      
      {/* Controls positioned below the slide container */}
      <div className="flex justify-center items-center mt-8">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
          disabled={!loop && current === 0}
        />
        
        {/* Slide indicators */}
        <div className="flex justify-center items-center gap-2 z-10 py-2 mx-4">
          {slides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              className={`w-3 h-3 rounded transition-all ${
                current === index ? 'bg-purple-700 scale-125' : 'bg-gray-300'
              }`}
              onClick={() => handleSlideClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? 'true' : 'false'}
              id={`slide-tab-${index}`}
              aria-controls={`slide-${index}`}
              role="tab"
            />
          ))}
        </div>
        
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
          disabled={!loop && current === slides.length - 1}
        />
      </div>
    </div>
  );
}