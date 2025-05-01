// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// const fontClasses = [
//     'font-poppins', // Your custom fonts defined in CSS
//     'font-grotesk',
//     'font-playfair',
//     'font-barlow',
//     'font-rubik',
//     'font-outfit',
//     'font-funky',
//     'font-mono'
// ];

// export default function Hero() {

//     const [fontIndex, setFontIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setFontIndex((prev) => (prev + 1) % fontClasses.length);
//         }, 1000);

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, []);

//     return (
//         <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden -mt-16">
//             <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-800 to-black opacity-80 z-10" />
//             <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
//             <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
//                 <motion.span 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="text-5xl md:text-6xl font-grotesk tracking-wide transition-all duration-500 ease-in-out transform text-white/90"
//                 >
//                     THIS IS 
//                 </motion.span>
//                 <motion.h1
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                     className={`text-5xl md:text-7xl font-bold tracking-wide transition-all duration-500 ease-in-out transform ${fontClasses[fontIndex]} text-white`}
//                     style={{ willChange: 'transform, opacity' }}
//                 >
//                     DUALNATURE
//                 </motion.h1>
//                 <motion.p 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                     className="text-lg md:text-2xl text-gray-300 py-5 font-light"
//                 >
//                     Versatile. Multi-genre. Limitless Music.
//                 </motion.p>
//                 <motion.a
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.6 }}
//                     href="#discography"
//                     className="inline-block bg-coral text-white px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-charcoal transition-all duration-300 transform hover:scale-105 font-medium tracking-wide"
//                 >
//                     Explore Our Music
//                 </motion.a>
//             </div>
//         </section>
//     );
// }


'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Musical genre styles with tailwind classes and names
const genreStyles = [
  {
    name: 'ELECTRONIC',
    font: 'font-mono',
    color: 'text-cyan-400',
    accentColor: 'from-cyan-500',
    secondaryColor: 'to-blue-600'
  },
  {
    name: 'HIP HOP',
    font: 'font-grotesk',
    color: 'text-amber-400',
    accentColor: 'from-amber-500',
    secondaryColor: 'to-red-600'
  },
  {
    name: 'INDIE ROCK',
    font: 'font-barlow',
    color: 'text-emerald-400',
    accentColor: 'from-emerald-500',
    secondaryColor: 'to-teal-600'
  },
  {
    name: 'POP',
    font: 'font-outfit',
    color: 'text-fuchsia-400',
    accentColor: 'from-fuchsia-500',
    secondaryColor: 'to-purple-600'
  },
  {
    name: 'SOUL',
    font: 'font-playfair',
    color: 'text-orange-400',
    accentColor: 'from-orange-500',
    secondaryColor: 'to-amber-600'
  },
  {
    name: 'EXPERIMENTAL',
    font: 'font-funky',
    color: 'text-rose-400',
    accentColor: 'from-rose-500',
    secondaryColor: 'to-pink-600'
  }
];

export default function Hero() {
  const [currentGenre, setCurrentGenre] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // For animated soundwave visualization
  const [soundBars, setSoundBars] = useState(
    Array.from({ length: 12 }, () => Math.random() * 0.8 + 0.2)
  );

  useEffect(() => {
    // Genre rotation
    const genreInterval = setInterval(() => {
      setCurrentGenre((prev) => (prev + 1) % genreStyles.length);
      
      // Refresh sound bars on genre change
      setSoundBars(Array.from({ length: 12 }, () => Math.random() * 0.8 + 0.2));
    }, 3000);
    
    // Animated soundwave effect
    let animationFrame;
    const animateBars = () => {
      if (audioPlaying) {
        setSoundBars(prevBars => 
          prevBars.map(() => audioPlaying ? Math.random() * 0.8 + 0.2 : 0.2)
        );
      }
      animationFrame = requestAnimationFrame(animateBars);
    };
    
    if (audioPlaying) {
      animationFrame = requestAnimationFrame(animateBars);
    }
    
    return () => {
      clearInterval(genreInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [audioPlaying]);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
          setAudioPlaying(false);
        });
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  const currentStyle = genreStyles[currentGenre];

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src="/api/audio/preview.mp3" 
        loop
        onEnded={() => setAudioPlaying(false)}
      />
      
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Dynamic gradient background */}
        <motion.div 
          key={`gradient-${currentGenre}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${currentStyle.accentColor} ${currentStyle.secondaryColor} opacity-20`}
        />
        
        {/* Textured overlay */}
        <div className="absolute inset-0 bg-[url('/images/noise-texture.png')] opacity-10 mix-blend-overlay" />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>
      
      {/* Animated geometric shapes floating in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`absolute rounded-full bg-gradient-to-br ${currentStyle.accentColor} ${currentStyle.secondaryColor} opacity-20 blur-md`}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              scale: [1, Math.random() * 0.5 + 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Intro text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden mb-2"
          >
            <motion.span className="text-lg md:text-xl tracking-widest font-light text-white/70 uppercase">
              THIS IS
            </motion.span>
          </motion.div>
          
          {/* Main title with dynamic genre shift */}
          <div className="mb-4 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-2"
            >
              DUALNATURE
            </motion.h1>
            
            {/* Genre indicator that changes */}
            <div className="h-12 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGenre}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`text-2xl md:text-3xl absolute w-full ${currentStyle.font} ${currentStyle.color} font-medium tracking-wider`}
                >
                  {currentStyle.name}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Interactive sound wave visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-1 my-8 cursor-pointer group"
            onClick={toggleAudio}
          >
            {soundBars.map((height, index) => (
              <motion.div
                key={`bar-${index}`}
                className="w-1 md:w-2 bg-white rounded-full"
                style={{ 
                  height: `${height * 60}px`,
                  opacity: audioPlaying ? 0.9 : 0.4
                }}
                animate={{
                  height: audioPlaying 
                    ? [`${height * 60}px`, `${Math.random() * 60 + 10}px`] 
                    : `${height * 20}px`,
                  opacity: audioPlaying ? [0.7, 1] : 0.4
                }}
                transition={{
                  duration: audioPlaying ? 0.4 : 0.8,
                  repeat: audioPlaying ? Infinity : 0,
                  repeatType: "reverse",
                }}
              />
            ))}
            
            <motion.span 
              className="ml-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300"
              animate={{ opacity: [0.7, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              {audioPlaying ? "Now Playing" : "Click to Preview"}
            </motion.span>
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light tracking-wide mb-10"
          >
            Blending boundaries. Creating experiences. Defining new sounds.
          </motion.p>
          
          {/* Call to action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <motion.a
              href="#discography"
              className="relative overflow-hidden px-8 py-4 rounded-full bg-white text-black font-medium tracking-wide group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Explore Our Music</span>
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${currentStyle.accentColor} ${currentStyle.secondaryColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                layoutId="cta-button-bg"
              />
              <motion.span 
                className="absolute inset-0 z-0 bg-white group-hover:bg-transparent transition-colors duration-300"
              />
            </motion.a>
            
            <motion.a
              href="#about"
              className="px-8 py-4 rounded-full border border-white/30 text-white font-medium tracking-wide hover:bg-white/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              About Us
            </motion.a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="flex flex-col items-center"
        >
          <span className="text-white/50 text-sm mb-2">Scroll</span>
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}