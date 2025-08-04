"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased bg-gray-50">
          {/* Header */}
          <header className="border-b border-gray-200 sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner">
                    <Image src="/logo.png" alt="TechBloggies Logo" width={32} height={32} />
                  </div>
                  <span className="text-2xl font-extrabold text-white tracking-tight">TechBloggies</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-4">
                  <Link href="/" className="group">
                    <span className="px-4 py-2 rounded-md border border-white/20 bg-white/10 backdrop-blur-md text-white transition-transform duration-1000 ease-in-out group-hover:scale-105 group-focus:scale-105 hover:shadow-lg">
                      Home
                    </span>
                  </Link>
                  <Link href="/posts" className="group">
                    <span className="px-4 py-2 rounded-md border border-white/20 bg-white/10 backdrop-blur-md text-white transition-transform duration-1000 ease-in-out group-hover:scale-105 group-focus:scale-105 hover:shadow-lg">
                      Posts
                    </span>
                  </Link>
                  <Link href="/About" className="group">
                    <span className="px-4 py-2 rounded-md border border-white/20 bg-white/10 backdrop-blur-md text-white transition-transform duration-1000 ease-in-out group-hover:scale-105 group-focus:scale-105 hover:shadow-lg">
                      About
                    </span>
                  </Link>
                  <Link href="/ai-assistence" className="group">
                    <span className="px-4 py-2 rounded-md border border-white/20 bg-white/10 backdrop-blur-md text-white transition-transform duration-1000 ease-in-out group-hover:scale-105 group-focus:scale-105 hover:shadow-lg">
                      AI Assistance
                    </span>
                  </Link>
                </nav>

                {/* Auth Section */}
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <SignInButton>
                      <button className="text-white hover:text-gray-200 transition-colors font-medium">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-md">
                        Get Started
                      </button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <Link href="/dashboard" className="text-white hover:text-gray-200 transition-colors font-medium mr-2">
                      Dashboard
                    </Link>
                    <Link href="/posts/create" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold shadow-md">
                      Write Post
                    </Link>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 shadow-md",
                        },
                      }}
                      afterSignOutUrl="/"
                    />
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
