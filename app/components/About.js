// export default function About() {
//     return (
//         <div className="bg-gray-800 text-white py-16 min-h-screen">
//             <div className="max-w-4xl mx-auto text-center">
//                 <h2 className="text-4xl font-bold mb-6">About Dualnature</h2>
//                 <p className="text-lg mb-8">
//                     Dualnature is a music duo that blends genres and explores creative boundaries. With a passion for blending diverse styles, they bring a unique sound to the music scene, fusing elements from various genres and drawing inspiration from their multi-instrumental backgrounds.
//                 </p>
//                 <img 
//                     src="/path-to-your-image.jpg" 
//                     alt="Dualnature" 
//                     className="mx-auto mb-8 rounded-lg"
//                     style={{ maxWidth: '400px', height: 'auto' }}
//                 />
//                 <p className="text-lg">Connect with us and explore our music journey!</p>
//             </div>
//         </div>
//     );
// }


'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ExternalLink, Music, Headphones, Users, Zap } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const tabContent = {
    story: (
      <>
        <div className="text-center">
          <p className="text-lg text-gray-300 mb-6">
            We&apos;re Dualnature — two friends who met by chance in Mumbai and started making music just because it felt right.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            Pradnesh had been moving all around the country thanks to his dad&apos;s army job (basically a human tour of India), and eventually landed in Mumbai, where he met Atharv — a guy who can play more instruments than should be legal. Seriously, he&apos;s a Grade 8 pianist, drummer, guitarist, and probably knows how to play a table fan if you gave him 10 minutes. Pradnesh also plays guitar and keys — and brings the vibe, the chaos, and at least three backup snare options. From that point, music became less of a hobby and more of a shared language.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            Now? We&apos;re just two 20-year-olds making sounds that don&apos;t really belong to one genre — and we like it that way. Whether it&apos;s mellow, loud, glitchy, or emotional, if it feels real, we roll with it. We make what feels right in the moment. No rules, no labels, no &apos;what are we&apos; talk. We make everything ourselves — from writing to producing to obsessing over a snare for 6 hours straight.
          </p>
          <p className="text-lg text-gray-300 mb-6">
          Fast forward to now: we&apos;re working with artists from all over the world — sometimes literally talking through Google Translate. (Yes, that actually happened. Yes, it was wholesome.) But that&apos;s the point: we love connecting with anyone who feels something when they hear music. 
          </p>
          <p className="text-lg text-gray-300 mb-6">
            At the end of the day, we&apos;re just two friends who love music, storytelling, and making sounds that feel like home to someone out there.
          </p >
        </div>

      </>
    ),
    influences: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-300">
          <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-xl font-medium mb-3 text-coral">Electronic Roots</h4>
            <p>From Aphex Twin&apos;s experimental soundscapes to Four Tet&apos;s melodic constructions and Burial&apos;s atmospheric textures, our electronic influences create the foundation for our layered production approach.</p>
          </div>
          <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-xl font-medium mb-3 text-cyan-400">Hip-Hop Elements</h4>
            <p>We draw rhythmic inspiration from J Dilla&apos;s innovative drum patterns, Madlib&apos;s sample manipulation, and the narrative storytelling approach of Kendrick Lamar.</p>
          </div>
          <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-xl font-medium mb-3 text-emerald-400">Indie Sensibilities</h4>
            <p>Our melodic approach is shaped by Radiohead&apos;s sonic innovations, Bon Iver&apos;s emotional resonance, and the textural experimentation of Sigur Rós.</p>
          </div>
          <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-xl font-medium mb-3 text-amber-400">Classical Foundations</h4>
            <p>The harmonic complexity of Debussy, minimalist repetition of Philip Glass, and emotional dynamics of Ludovico Einaudi inform our compositional structures.</p>
          </div>
        </div>
      </>
    ),
    vision: (
      <>
        <div className="text-center">
          <p className="text-lg text-gray-300 mb-6">
            We&apos;re not here to chase trends—we&apos;re here to chase sounds that mean something.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            At Dualnature, we don&apos;t box ourselves into one vibe. We&apos;re into whatever feels honest—whether that&apos;s a stripped acoustic loop or a glitched-out synth drop. If it hits emotionally, it stays.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            We come from different places, literally and musically. That&apos;s what makes the process exciting. Every track is a mix of our moods, stories, and random voice notes turned into something real.
          </p>
          <p className="text-lg text-gray-300 mb-6 pb-4">
            We want to make music that connects-not just streams. That means working with people across languages, time zones, and styles to create songs that feel personal and alive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                icon: <Music className="w-8 h-8 mb-3 text-coral" />,
                title: "Genre? Who cares.",
                description: "We make what feels right, not what fits a box."
              },
              {
                icon: <Headphones className="w-8 h-8 mb-3 text-cyan-400" />,
                title: "Feel something.",
                description: "Our only real goal: if it moves you, it's working."
              },
              {
                icon: <Zap className="w-8 h-8 mb-3 text-emerald-400" />,
                title: "Keep Exploring.",
                description: "We're always learning, experimenting, and flipping our process."
              }
            ].map((item, index) => (
              <div key={index} className="bg-black/20 rounded-xl p-6 backdrop-blur-sm flex flex-col items-center text-center">
                {item.icon}
                <h4 className="text-xl font-medium mb-2">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  };

  return (
    <section id="about" className="relative py-8 pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black" />

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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span variants={itemVariants} className="text-coral uppercase tracking-widest text-sm font-medium">
            The Artists
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mt-2 mb-4 text-white">
            About Dualnature
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-1 bg-coral mx-auto" />
        </motion.div>

        {/* Profile section with images */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {/* First member */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-coral to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-xl" />
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 relative">
              <img
                src="/images/atharv-chinchkar.jpg"
                alt="First member"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white">Atharv Chinchkar</h3>
                <p className="text-gray-300">Music Producer, Multi-Instrumentalist</p>
              </div>
            </div>
          </motion.div>

          {/* Second member */}
          <motion.div variants={itemVariants} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-xl" />
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-900 relative">
              <img
                src="/images/pradnesh-kapte.jpg"
                alt="Second member"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white">Pradnesh Kapte</h3>
                <p className="text-gray-300">Music Producer, Songwriter/Lyricist</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabbed content section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Tab navigation */}
          <motion.div variants={itemVariants} className="flex justify-center mb-10">
            <div className="inline-flex bg-black/30 backdrop-blur-md rounded-full p-1.5 text-center">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'vision', label: 'Vision' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                    ? 'text-black'
                    : 'text-white/70 hover:text-white'
                    }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-coral rounded-full"
                      style={{ borderRadius: 9999 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab content */}
          <motion.div
            variants={itemVariants}
            className="bg-black/20 backdrop-blur-md rounded-2xl p-8 md:p-12"
          >
            {tabContent[activeTab]}
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 text-center"
        >
          <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8">
            Connect with us if you want to collaborate, vibe, or just talk music!
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/thisisdualnature/" target='_blank' rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E1306C] to-coral/80 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              <FaInstagram className="w-5 h-5" /> Discover<ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-white font-medium hover:bg-white/10 transition-all"
            >
              Get In Touch <Users className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}