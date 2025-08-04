'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    // Handle email submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  const image = "https://res.cloudinary.com/ddcg0rzlo/image/upload/v1650696868/new-nft-hero-section-image_gcqla0.png";

  return (
    <div className="min-h-screen bg-black relative overflow-hidden w-full m-0 p-0">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 items-center py-16">
          <div className="px-4 sm:px-6 max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-[55px] leading-tight text-white font-bold pt-10 sm:pt-0">
              Discover unique AI-powered blogs on our platform with ease
            </h1>

            <form onSubmit={handleSubmit} className="relative mt-6 max-w-md">
              <div className="max-w-[345px] h-[70px] relative">
                <svg viewBox="0 0 445 75" className="absolute w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.3 2.2h425.65c6.27 0 9.63 7.38 5.52 12.12L391.96 70.25c-1.39 1.6-3.4 2.52-5.52 2.52H9.3A7.32 7.32 0 0 1 2 65.45V9.54C2 5.5 5.28 2.2 9.3 2.2Z" stroke="#FFA503" strokeWidth="4" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to get started 📧"
                  className="absolute inset-0 bg-transparent px-4 text-white w-full h-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 text-sm sm:text-lg z-10"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors z-20">
                  Join
                </button>
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </form>

            <p className="text-white mt-10 text-2xl font-medium">
              Travel through the world with our Blogs.
            </p>
          </div>

          <div className="relative w-full h-full mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute -left-10 top-0 bottom-0 w-[100px] bg-gradient-to-r from-black to-transparent z-10" />
            <Image src={image} alt="Hero Image" width={1500} height={1500} className="w-full h-full object-cover mix-blend-lighten opacity-90 relative z-0" />
            <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black via-black/70 to-transparent z-20" />
            <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-black via-black/70 to-transparent z-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
