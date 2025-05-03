// export default function LatestVideo() {
//     return (
//         <section id="latest-video" className="bg-black text-white py-16 px-4">
//             <div className="max-w-4xl mx-auto text-center space-y-8">
//                 <h2 className="text-3xl md:text-4xl font-semibold">Latest Release</h2>
//                 <div className="aspect-video w-full">
//                     <iframe
//                         className="w-full h-full rounded-xl shadow-lg"
//                         src="https://www.youtube.com/embed/xCkIqadBMOE"
//                         title="Latest Song - Dualnature"
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                     ></iframe>
//                 </div>

//             </div>
//         </section>
//     );
// }




'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaShareAlt, FaDownload, FaBookmark, FaSpotify, FaInstagram } from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineArrowRight, HiOutlineHeart } from 'react-icons/hi2';

export default function LatestVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const overlayRef = useRef(null);

    // Track visibility for scroll animations
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Video information
    const videoInfo = {
        title: "Jo Keh Na Saka",
        description: "A song about unrequited love and longing, featuring heartfelt melodies and emotional lyrics.",
        released: "August 6, 2024",
        duration: "3:42",
        genre: "Pop / Heartbreak"
    };

    // Simulate social stats
    const socialStats = {
        views: "127K",
        likes: "9.8K",
        shares: "2.4K"
    };

    const handlePlayClick = () => {
        if (videoRef.current) {
            // Post message to iframe to play video
            videoRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            setIsPlaying(true);
            setShowOverlay(false);
        }
    };

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
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Function to handle messages from the iframe
        const handleMessage = (event) => {
            // Only handle messages from YouTube
            if (event.origin !== 'https://www.youtube.com') return;

            try {
                const data = JSON.parse(event.data);
                if (data.event === 'onStateChange') {
                    // 1 = playing, 2 = paused, 0 = ended
                    setIsPlaying(data.info === 1);
                    if (data.info === 0) {
                        setShowOverlay(true);
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

    const handleCtaClick = (action) => {
        if (action === 'Follow') {
            window.open('https://open.spotify.com/artist/75lxD3C0pgTahGqOSeZFKB?si=a0wUeUg6RzSP_rc8ddHuPg', '_blank', 'noopener,noreferrer'); // Replace with your Spotify artist URL
        } else if (action === 'Follow on Instagram') {
            window.open('https://www.instagram.com/thisisdualnature', '_blank', 'noopener,noreferrer'); // Replace with your fan club URL
        } else if (action === 'Subscribe') {
            window.open('https://www.youtube.com/@thisisdualnature', '_blank', 'noopener,noreferrer'); // Replace with your YouTube channel URL
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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

    return (
        <section
            id="latest-video"
            ref={sectionRef}
            className="relative bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white py-24 px-4 overflow-hidden"
        >

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-black to-gray-900 backdrop-blur-md" />
            {/* <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-900 to-gray-900 backdrop-blur-md" /> */}

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
            {/* Animated background elements */}
            {/* <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div> */}

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

                        <div className="flex flex-wrap gap-4 text-sm">
                            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                                Released: {videoInfo.released}
                            </div>
                            {/* <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                                Duration: {videoInfo.duration}
                            </div> */}
                            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                                {videoInfo.genre}
                            </div>
                        </div>

                        {/* <div className="flex items-center space-x-6 pt-2">
                            <div className="flex items-center space-x-1">
                                <span className="text-sm text-gray-400">Views</span>
                                <span className="font-semibold">{socialStats.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <HiOutlineHeart className="h-4 w-4 text-pink-400" />
                                <span className="font-semibold">{socialStats.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FaShareAlt className="h-3 w-3 text-blue-400" />
                                <span className="font-semibold">{socialStats.shares}</span>
                            </div>
                        </div> */}

                        {/* Call to Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2.5 bg-coral to-blue-500 rounded-lg font-medium flex items-center space-x-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                                onClick={() => handleCtaClick('Subscribe')}
                            >
                                <span>Subscribe</span>
                                <HiOutlineArrowRight className="h-4 w-4" />
                            </motion.button>

                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-5 py-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300"
                                onClick={() => handleCtaClick('Download')}
                            >
                                <FaDownload className="h-3.5 w-3.5" />
                                <span>Download</span>
                            </motion.button> */}

                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all duration-300"
                                onClick={() => handleCtaClick('Save')}
                            >
                                <FaBookmark className="h-4 w-4" />
                            </motion.button> */}
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
                                    src="https://www.youtube.com/embed/xCkIqadBMOE?enablejsapi=1&controls=0&rel=0&modestbranding=1"
                                    title={videoInfo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    onLoad={() => setVideoLoaded(true)}
                                ></iframe>
                            </div>

                            {/* Custom video overlay with play button */}
                            {/* {showOverlay && (
                                <div 
                                    ref={overlayRef}
                                    className="absolute inset-0 z-20 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer"
                                    onClick={handlePlayClick}
                                >
                                    <motion.div 
                                        className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                                            <FaPlay className="text-white ml-1 h-6 w-6" />
                                        </div>
                                    </motion.div>
                                    <p className="mt-4 font-medium text-lg text-white/90">Watch Now</p>
                                </div>
                            )} */}

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