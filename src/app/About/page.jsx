'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const testimonialRefs = useRef([]);

  const testimonials = [
    {
      name: "Jane Doe",
      position: "Software Engineer",
      message: "This platform has revolutionized the way I write and share content!",
    },
    {
      name: "John Smith",
      position: "Tech Blogger",
      message: "AI suggestions are mind‑blowingly good. Highly recommended!",
    },
    {
      name: "Nikhil Gupta",
      position: "Software Developer",
      message: "Very interactive UI compared to other existing blog platforms.",
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -100, opacity: 0, duration: 1.2,
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' }
      });
      gsap.from(textRef.current, {
        x: 100, opacity: 0, duration: 1.2,
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
      });
      testimonialRefs.current.forEach((el, idx) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 1,
          delay: idx * 0.2,
          scrollTrigger: { trigger: el, start: 'top 90%' }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          What Are We All About?
        </h1>
        <p className="text-lg text-white leading-relaxed">
          We are a platform committed to delivering the latest updates and insights in the world of technology — powered by AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        <div ref={imageRef}>
          <Image
            src="/team.jpg"
            alt="Our team"
            width={600}
            height={400}
            className="rounded-lg shadow-xl w-full object-cover"
          />
        </div>

        <div ref={textRef}>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
          <p className="text-blue-200 text-lg">
            Our mission is to democratize tech news and empower every reader to stay ahead of the curve. Whether you’re an AI enthusiast, a startup founder, or a lifelong learner — we curate stories that matter, with clarity and integrity.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">Testimonials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              ref={el => testimonialRefs.current[idx] = el}
              className="p-6 bg-gray-800 text-white rounded-lg shadow-lg"
            >
              <p className="italic mb-4">“{t.message}”</p>
              <div className="font-semibold">{t.name}</div>
              <div className="text-gray-400 text-sm">{t.position}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
