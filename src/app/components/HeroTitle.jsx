"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroTitle() {
  const textRef = useRef(null);

  useEffect(() => {
    const animatedText = textRef.current;
    if (animatedText) {
      const originalText = animatedText.textContent?.trim() || "";animatedText.innerHTML = `${originalText} ✨ `.repeat(10);

      gsap.to(animatedText, {
        xPercent: -50,
        duration: 12,
        ease: "linear",
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-700 to-purple-900 h-20">
      <div className="w-full overflow-hidden whitespace-nowrap">
        <h1
          ref={textRef}
          className="
            inline-block 
            whitespace-nowrap 
            text-4xl 
            font-extrabold 
            bg-gradient-to-r from-cyan-300 via-purple-500 to-pink-500 
            bg-clip-text text-transparent 
            drop-shadow-lg 
            tracking-widest 
            px-4
          "
        >
          TECH & LIFE 🎞
        </h1>
      </div>
    </section>
  );
}
