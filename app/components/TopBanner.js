// components/TopBanner.js
'use client';
import React from "react";

const TopBanner = () => {
    const handleScroll = (e) => {
        e.preventDefault();
        const section = document.getElementById("latest-video");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-center text-base md:text-lg py-4 font-semibold z-50 fixed top-0 left-0">
            {/* Mobile: short text, Desktop: full text */}
            <span className="block md:hidden">
                Rose Lenses –  
                <a
                    href="#latest-video"
                    onClick={handleScroll}
                    className="underline hover:text-yellow-100"
                >
                    <span> </span>Listen now!!
                </a>
            </span>
            <span className="hidden md:inline">
                🎵 See the world through “Rose Lenses” — our new jazz-pop single is live everywhere now.
                <a
                    href="#latest-video"
                    onClick={handleScroll}
                    className="underline hover:text-yellow-100 ml-2"
                >
                    Listen now
                </a>
            </span>
        </div>
    );
};

export default TopBanner;
