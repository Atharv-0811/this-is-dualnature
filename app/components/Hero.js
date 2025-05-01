'use client';

import { useEffect, useState } from 'react';

const fontClasses = [
    'font-poppins', // Your custom fonts defined in CSS
    'font-grotesk',
    'font-playfair',
    'font-barlow',
    'font-rubik',
    'font-outfit',
    'font-funky',
    'font-mono'
];

export default function Hero() {

    const [fontIndex, setFontIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFontIndex((prev) => (prev + 1) % fontClasses.length);
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden -mt-16">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-800 to-black opacity-70 z-10" />
            <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <span className="text-5xl md:text-6xl font-grotesk tracking-wide transition-all duration-500 ease-in-out transform">THIS IS </span>
                <h1
                    className={`text-5xl md:text-7xl font-bold tracking-wide transition-all duration-500 ease-in-out transform ${fontClasses[fontIndex]}`}
                    style={{ willChange: 'transform, opacity' }}
                >
                    DUALNATURE
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 py-5">Versatile. Multi-genre. Limitless Music.</p>
                <a
                    href="#discography"
                    className="inline-block bg-coral text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-white hover:text-charcoal transition transform hover:scale-105"
                >
                    Explore Our Music
                </a>
            </div>
        </section>
    );
}
