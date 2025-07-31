"use client";
import HeroTitle from "./components/HeroTitle";
import NewsTicker from "./components/NewsDisplay";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function HomePage() {
    return (
        <main className="bg-gray-50 text-gray-900 font-sans">
            <HeroTitle />
            <NewsTicker />
            <Hero />
            <Footer />
        </main>
    );
}
