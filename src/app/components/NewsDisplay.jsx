'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function NewsTicker() {
  const tickerRef = useRef(null);
  const containerRef = useRef(null);
  const tweenRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
      tweenRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const ticker = tickerRef.current;
    
    if (ticker) {
      // Clear any existing tweens
      tweenRef.current?.kill();
      
      // Create new tween
      tweenRef.current = gsap.to(ticker, {
        xPercent: -50,
        repeat: -1,
        ease: 'none',
        duration: 20,
      });
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [isMounted]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (tweenRef.current) {
      tweenRef.current.pause();
    }
  };
  
  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.play();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-black text-white py-4"
    >
      {/* Gradient fade on edges */}
      <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Ticker content */}
      <div
        ref={tickerRef}
        className="flex whitespace-nowrap font-mono text-base md:text-lg uppercase tracking-wider"
      >
        <span className="px-10">
          🚀 AI transforms headline creation → HeadlineGPT Pro & TitleCraft boost engagement by 30% & save 50% time!
        </span>
        <span className="px-10">
          🚀 AI transforms headline creation → HeadlineGPT Pro & TitleCraft boost engagement by 30% & save 50% time!
        </span>
      </div>
    </div>
  );
}
