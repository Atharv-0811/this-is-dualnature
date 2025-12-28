'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaInstagram, FaYoutube, FaApple } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi2';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export default function LatestVideo() {
    // Unused state commented out
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [showOverlay, setShowOverlay] = useState(true);
    // const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLIFrameElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Video information
    const videoInfo = {
        title: "Rose Lenses",
        description: "From a timeless painting to unyielding resolve, this song explores finding freedom in floating above it all.",
        released: "June 11, 2025",
        duration: "3:42",
        genre: "Jazz Pop"
    };

    // const handlePlayClick = () => {
    //     if (videoRef.current && videoRef.current.contentWindow) {
    //         // Post message to iframe to play video
    //         videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    //         setIsPlaying(true);
    //         setShowOverlay(false);
    //     }
    // };

    // Handle visibility detection for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Handle player state tracking
    useEffect(() => {
        // Add YouTube iframe API script if not already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
        }

        // Function to handle messages from the iframe
        const handleMessage = (event: MessageEvent) => {
            // Only handle messages from YouTube
            if (event.origin !== 'https://www.youtube.com') return;

            try {
                const data = JSON.parse(event.data);
                if (data.event === 'onStateChange') {
                    // 1 = playing, 2 = paused, 0 = ended
                    // setIsPlaying(data.info === 1);
                    if (data.info === 0) {
                        // setShowOverlay(true);
                    }
                }
            } catch (e) {
                // Not a JSON message or other error
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleCtaClick = (action: string) => {
        if (action === 'Follow') {
            window.open('https://open.spotify.com/artist/75lxD3C0pgTahGqOSeZFKB?si=a0wUeUg6RzSP_rc8ddHuPg', '_blank', 'noopener,noreferrer'); // Replace with your Spotify artist URL
        } else if (action === 'Follow on Instagram') {
            window.open('https://www.instagram.com/thisisdualnature', '_blank', 'noopener,noreferrer'); // Replace with your fan club URL
        } else if (action === 'Subscribe') {
            window.open('https://www.youtube.com/@thisisdualnature', '_blank', 'noopener,noreferrer'); // Replace with your YouTube channel URL
        }
    };

    return (
        <section
            id="latest-video"
            ref={sectionRef}
            className="relative bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white py-16 px-4 overflow-hidden min-h-screen mt-24 md:py-24 md:mt-26"
        >

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-black to-gray-900 backdrop-blur-md" />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Abstract sound wave patterns */}
                <svg className="absolute -left-20 top-1/4 w-64 h-64 text-coral opacity-10" viewBox="0 0 200 200">
                    <path fill="currentColor" d="M47.7,-61.1C62.3,-52.8,75.1,-37.9,79.1,-21.3C83.1,-4.7,78.4,13.5,69.6,29.1C60.8,44.7,48,57.8,32.8,67.1C17.7,76.3,0.2,81.9,-18.8,79.9C-37.8,77.9,-58.3,68.3,-70,52.4C-81.7,36.5,-84.7,14.4,-81,-5.9C-77.4,-26.2,-67.1,-44.5,-52.7,-53.2C-38.3,-61.9,-19.1,-60.9,-0.9,-59.8C17.4,-58.7,34.8,-57.5,47.7,-61.1Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute -right-20 bottom-1/4 w-96 h-96 text-cyan-400 opacity-10" viewBox="0 0 200 200">
                    <path fill="currentColor" d="M38.1,-51.1C51.6,-40.8,66.5,-32.5,72.5,-19.8C78.6,-7.1,75.8,10,68.5,24.3C61.2,38.6,49.3,50.1,35.6,58.6C21.8,67.1,6.2,72.5,-7.5,69.5C-21.2,66.6,-33.1,55.2,-44.4,43.1C-55.8,30.9,-66.7,17.9,-71.3,1.9C-75.9,-14,-74.2,-31.9,-64.8,-43.3C-55.3,-54.7,-38.1,-59.5,-23.4,-59.7C-8.7,-59.9,3.6,-55.5,17,-50.8C30.5,-46.1,45.2,-41.2,51.6,-32.4C58,-23.7,57.1,-11.8,56.7,-0.2L58.1,3.8" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    {/* Text Content - 2 columns on large screens */}
                    <motion.div
                        className="lg:col-span-2 space-y-6 text-left"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="flex items-center space-x-2">
                            <span className="bg-gradient-to-r from-red-500 to-purple-500 h-6 w-1.5 rounded-full"></span>
                            <div className="flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-purple-300">
                                <HiOutlineSparkles className="h-4 w-4" />
                                <span>New Release</span>
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-blue-200">
                            {videoInfo.title}
                        </h2>

                        <p className="text-gray-300 text-lg">
                            {videoInfo.description}
                        </p>

                        {/* Call to Action Buttons */}
                        <div className="flex flex-col gap-3 pt-2 w-full">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center px-6 py-4 bg-[#1db954] text-white rounded-lg font-medium text-lg"
                                onClick={() => window.open('https://open.spotify.com/album/4Jdg1NOrLi27pYsYPuTaA6?si=dogLzpEpQgCOkY-_prMNgg', '_blank', 'noopener,noreferrer')}
                                aria-label="Listen on Spotify"
                            >
                                <FaSpotify className="h-6 w-6 mr-2" />
                                <span>Listen on Spotify</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center px-6 py-4 bg-[#FF0000] text-white rounded-lg font-medium text-lg"
                                onClick={() => window.open('https://music.youtube.com/watch?v=MRxUxcNAWkg', '_blank', 'noopener,noreferrer')}
                                aria-label="Listen on YouTube Music"
                            >
                                <FaYoutube className="h-6 w-6 mr-2" />
                                <span>Listen on YouTube Music</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center px-6 py-4 bg-[#fa536b] text-white rounded-lg font-medium text-lg"
                                onClick={() => window.open('https://music.apple.com/in/album/rose-lenses/1813632776?i=1813632777', '_blank', 'noopener,noreferrer')}
                                aria-label="Listen on Apple Music"
                            > <FaApple className="h-6 w-6 mr-2" />
                                <span>Listen on Apple Music</span>
                            </motion.button>

                        </div>
                    </motion.div>

                    {/* Video Content - 3 columns on large screens */}
                    <motion.div
                        className="lg:col-span-3 relative"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20">
                            {/* Video Player */}
                            <div className="absolute inset-0 z-10">
                                <iframe
                                    ref={videoRef}
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/8H6Z2Of1cjA?si=aSwCLGDuyHk_h3W_"
                                    title={videoInfo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                // onLoad={() => setVideoLoaded(true)}
                                ></iframe>
                            </div>

                            {/* Video decorative elements */}
                            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-50 blur-xl"></div>
                            <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-50 blur-xl"></div>

                            {/* Video frame decoration */}
                            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none z-30"></div>
                        </div>

                        {/* Video information - mobile only (lg:hidden) */}
                        <div className="mt-6 lg:hidden">
                            <h3 className="text-xl font-bold">{videoInfo.title}</h3>
                            <p className="text-gray-400 mt-2">{videoInfo.description}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom banner with additional CTA */}
                <motion.div
                    className="mt-16 py-6 px-8 rounded-xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div>
                        <h3 className="text-xl font-semibold">Want More Dualnature?</h3>
                        <p className="text-gray-300 mt-1">Explore demos, remixes, and behind-the-scenes content</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-[#EE2A7B] to-[#6228D7] rounded-lg font-medium shadow-lg shadow-purple-500/20 flex items-center space-x-2"
                            onClick={() => handleCtaClick('Follow on Instagram')}
                        >
                            <FaInstagram className="h-5 w-5" />
                            <span>Follow on Instagram</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-white/10 bg-[#1db954] backdrop-blur-sm hover:bg-white/20 rounded-lg font-medium flex items-center space-x-2"
                            onClick={() => handleCtaClick('Follow')}
                        >
                            <FaSpotify className="h-5 w-5" />
                            <span>Follow on Spotify</span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Inline styles for animations not easily done with Tailwind */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -30px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 30px) scale(1.05); }
                }
                
                .animate-blob {
                    animation: blob 25s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: -2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: -4s;
                }
            `}</style>
        </section>
    );
}
