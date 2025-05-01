// 'use client';

// import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// export default function Discography() {
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchTracks() {
//       try {
//         const res = await fetch('/api/spotify?type=artist&q=Dualnature');
//         if (!res.ok) {
//           throw new Error('Failed to fetch tracks');
//         }
//         const data = await res.json();
        
//         const formattedTracks = await Promise.all(data.tracks.slice(0, 6).map(async track => {
//           try {
//             let youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(track.name + ' Dualnature')}`;
//             // Fetch YouTube link for each track
//             const youtubeRes = await fetch(`/api/youtube?q=${encodeURIComponent(track.name + ' Dualnature')}`);
//             const youtubeData = await youtubeRes.json();
            
//             return {
//               title: track.name,
//               year: new Date(track.album.release_date).getFullYear(),
//               cover: track.album.images[0]?.url || '/default-cover.jpg',
//               links: {
//                 spotify: track.external_urls.spotify,
//                 appleMusic: '#',
//                 youtube: youtubeUrl,
//               }
//             };
//           } catch (youtubeError) {
//             console.error('Failed to fetch YouTube link for track:', track.name, youtubeError);
//             return {
//               title: track.name,
//               year: new Date(track.album.release_date).getFullYear(),
//               cover: track.album.images[0]?.url || '/default-cover.jpg',
//               links: {
//                 spotify: track.external_urls.spotify,
//                 appleMusic: '#',
//                 youtube: '#',
//               }
//             };
//           }
//         }));
        
//         setTracks(formattedTracks);
//       } catch (error) {
//         console.error('Failed to load tracks', error);
//         setError('Failed to load tracks. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTracks();
//   }, []);

//   if (loading) return <div className="text-white text-center py-16">Loading...</div>;
//   if (error) return <div className="text-white text-center py-16">{error}</div>;
//   if (tracks.length === 0) return <div className="text-white text-center py-16">No tracks found</div>;

//   return (
//     <div className="bg-gradient-to-b from-gray-900 to-charcoal text-white py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-bold mb-12 text-center font-grotesk tracking-wide"
//         >
//           Dualnature's Top Tracks
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {tracks.slice(0,3).map((track, index) => (
//             <motion.div 
//               key={index} 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="group bg-charcoal/80 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform hover:-translate-y-1 backdrop-blur-sm border border-gray-700/50"
//               data-aos="fade-right"
//             >
//               <div className="relative overflow-hidden rounded-lg mb-4">
//                 <img
//                   src={track.cover}
//                   alt={track.title}
//                   className="w-full h-64 object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>
//               <h3 className="text-xl font-semibold mb-1 font-grotesk">{track.title}</h3>
//               <p className="text-gray-400 text-sm mb-4">{track.year}</p>

//               <div className="flex justify-center space-x-6">
//                 <a href={track.links.spotify} target="_blank" rel="noopener noreferrer" 
//                   className="transform hover:scale-110 transition-transform duration-300 hover:opacity-80">
//                   <FaSpotify size={28} className="text-green-500" />
//                 </a>
//                 {/* <a href={track.links.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
//                   <FaApple size={30} className="text-black" />
//                 </a> */}
//                 <a href={track.links.youtube} target="_blank" rel="noopener noreferrer" 
//                   className="transform hover:scale-110 transition-transform duration-300 hover:opacity-80">
//                   <FaYoutube size={28} className="text-red-500" />
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
//           {tracks.slice(3,6).map((track, index) => (
//             <motion.div 
//               key={index} 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="group bg-charcoal/80 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform hover:-translate-y-1 backdrop-blur-sm border border-gray-700/50"
//               data-aos="fade-left"
//             >
//               <div className="relative overflow-hidden rounded-lg mb-4">
//                 <img
//                   src={track.cover}
//                   alt={track.title}
//                   className="w-full h-64 object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>
//               <h3 className="text-xl font-semibold mb-1 font-grotesk">{track.title}</h3>
//               <p className="text-gray-400 text-sm mb-4">{track.year}</p>

//               <div className="flex justify-center space-x-6">
//                 <a href={track.links.spotify} target="_blank" rel="noopener noreferrer" 
//                   className="transform hover:scale-110 transition-transform duration-300 hover:opacity-80">
//                   <FaSpotify size={28} className="text-green-500" />
//                 </a>
//                 {/* <a href={track.links.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
//                   <FaApple size={30} className="text-black" />
//                 </a> */}
//                 <a href={track.links.youtube} target="_blank" rel="noopener noreferrer" 
//                   className="transform hover:scale-110 transition-transform duration-300 hover:opacity-80">
//                   <FaYoutube size={28} className="text-red-500" />
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { FaSpotify, FaYoutube } from 'react-icons/fa';
import { HiOutlineMusicalNote, HiMiniArrowTrendingUp } from "react-icons/hi2";
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Discography() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState('all');
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const audioRef = useRef(null);
  
  // For a real implementation, you would get these from your API
  const genres = [
    { id: 'all', name: 'All Tracks' },
    { id: 'electronic', name: 'Electronic' },
    { id: 'hip-hop', name: 'Hip-Hop' },
    { id: 'ambient', name: 'Ambient' },
    { id: 'experimental', name: 'Experimental' }
  ];

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/spotify?type=artist&q=Dualnature');
        if (!res.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await res.json();
        
        // Simulate genre assignment - in a real scenario, this would come from your API
        const genreMapping = ['electronic', 'hip-hop', 'ambient', 'experimental', 'electronic', 'hip-hop'];
        
        const formattedTracks = await Promise.all(data.tracks.slice(0, 6).map(async (track, index) => {
          try {
            const trackGenre = genreMapping[index % genreMapping.length];
            let youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(track.name + ' Dualnature')}`;
            // Fetch YouTube link for each track
            const youtubeRes = await fetch(`/api/youtube?q=${encodeURIComponent(track.name + ' Dualnature')}`);
            const youtubeData = await youtubeRes.json();
            
            return {
              id: `track-${index}`,
              title: track.name,
              year: new Date(track.album.release_date).getFullYear(),
              cover: track.album.images[0]?.url || '/default-cover.jpg',
              genre: trackGenre,
              previewUrl: track.preview_url || null,
              links: {
                spotify: track.external_urls.spotify,
                youtube: youtubeUrl,
              }
            };
          } catch (youtubeError) {
            console.error('Failed to fetch YouTube link for track:', track.name, youtubeError);
            return {
              id: `track-${index}`,
              title: track.name,
              year: new Date(track.album.release_date).getFullYear(),
              cover: track.album.images[0]?.url || '/default-cover.jpg',
              genre: genreMapping[index % genreMapping.length],
              previewUrl: null,
              links: {
                spotify: track.external_urls.spotify,
                youtube: '#',
              }
            };
          }
        }));
        
        setTracks(formattedTracks);
      } catch (error) {
        console.error('Failed to load tracks', error);
        setError('Failed to load tracks. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  // Play audio preview when hovering over a track
  useEffect(() => { 
    if (hoveredTrack && hoveredTrack.previewUrl && audioRef.current) {
      audioRef.current.src = hoveredTrack.previewUrl;
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [hoveredTrack]);

  const filteredTracks = activeGenre === 'all' 
    ? tracks 
    : tracks.filter(track => track.genre === activeGenre);

  if (loading) {
    return (
      <div className="bg-black min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-teal-500 border-l-pink-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-lg font-medium">Loading tracks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white text-center py-16 px-4">
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Oops!</h3>
          <p>{error}</p>
          <button 
            className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return <div className="text-white text-center py-16">No tracks found</div>;
  }

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white py-20 min-h-screen">
      <audio ref={audioRef} className="hidden" />
      
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-3 font-grotesk tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Multi-Genre Magic
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore Dualnature's versatile discography spanning electronic, hip-hop, ambient and experimental sounds
          </p>
        </motion.div>

        {/* Genre filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setActiveGenre(genre.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                activeGenre === genre.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/80'
              }`}
            >
              {genre.id !== 'all' && <HiOutlineMusicalNote className="mr-1" />}
              {genre.id === 'all' && <HiMiniArrowTrendingUp className="mr-1" />}
              {genre.name}
            </button>
          ))}
        </motion.div>

        {/* Tracks grid with filtering animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative group rounded-xl overflow-hidden shadow-xl bg-gradient-to-br ${getGradientByGenre(track.genre)}`}
                onMouseEnter={() => setHoveredTrack(track)}
                onMouseLeave={() => setHoveredTrack(null)}
              >
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                
                {/* Background pattern based on genre */}
                <div className="absolute inset-0 opacity-10 z-0" 
                     style={{backgroundImage: getPatternByGenre(track.genre)}}></div>
                
                <div className="relative z-10 p-6">
                  <div className="aspect-square overflow-hidden rounded-lg mb-5 shadow-2xl">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Play indicator */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black ml-1">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{track.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-white/70">{track.year}</span>
                        <span className="w-1 h-1 rounded-full bg-white/50"></span>
                        <span className="text-xs px-2 py-1 rounded-full border border-white/20 backdrop-blur-sm capitalize">
                          {track.genre}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-3">
                      <a
                        href={track.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      >
                        <FaSpotify size={20} className="text-green-400" />
                      </a>
                      <a
                        href={track.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      >
                        <FaYoutube size={20} className="text-red-500" />
                      </a>
                    </div>
                    
                    {/* Waveform visualization (purely decorative) */}
                    <div className="flex items-center space-x-1 h-6">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-1 bg-white/70 rounded-full transform transition-all duration-300 ${
                            hoveredTrack?.id === track.id ? 'animate-pulse scale-y-100' : 'scale-y-50'
                          }`}
                          style={{ 
                            height: `${Math.floor(Math.random() * 16) + 5}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Visual feedback when no tracks match the filter */}
        {filteredTracks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-400">No tracks found in this genre.</p>
            <button
              onClick={() => setActiveGenre('all')}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
            >
              Show all tracks
            </button>
          </motion.div>
        )}
        
        {/* Dynamic bottom visual element */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 pt-10 border-t border-white/10 text-center"
        >
          <p className="text-white/60 max-w-lg mx-auto">
            Dualnature's music traverses boundaries, blending electronic foundations with organic elements to create unique sonic landscapes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Helper functions for genre-specific styling
function getGradientByGenre(genre) {
  switch (genre) {
    case 'electronic':
      return 'from-blue-900 to-purple-900';
    case 'hip-hop':
      return 'from-amber-900 to-rose-900';
    case 'ambient':
      return 'from-teal-900 to-emerald-900';
    case 'experimental':
      return 'from-violet-900 to-fuchsia-900';
    default:
      return 'from-gray-900 to-slate-900';
  }
}

function getPatternByGenre(genre) {
  switch (genre) {
    case 'electronic':
      return 'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.7) 0%, transparent 20%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.7) 0%, transparent 20%)';
    case 'hip-hop':
      return 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 113, 133, 0.2) 10px, rgba(251, 113, 133, 0.2) 20px)';
    case 'ambient':
      return 'radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.5) 0%, transparent 50%)';
    case 'experimental':
      return 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 25%, transparent 25%), linear-gradient(225deg, rgba(124, 58, 237, 0.2) 25%, transparent 25%), linear-gradient(45deg, rgba(124, 58, 237, 0.2) 25%, transparent 25%), linear-gradient(315deg, rgba(124, 58, 237, 0.2) 25%, transparent 25%)';
    default:
      return 'none';
  }
}