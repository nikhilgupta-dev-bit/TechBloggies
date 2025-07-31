"use client";
import react from 'react';
export default function Footer (){
    return(
            <footer className="bg-black text-white py-12 mt-0 ">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-4">STAY CONNECTED</h3>
                <p className="text-gray-400 mb-6">
                    Subscribe for the latest updates in tech and life
                </p>
                <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors duration-300">
                    SUBSCRIBE NOW
                </button>
            </div>
        </footer>
    )
}
