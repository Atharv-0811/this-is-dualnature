// import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';  // Import icons

// export default function Discography() {
//     const albums = [
//         {
//             title: "Jo Keh Na Saka",
//             year: 2021,
//             cover: "/path-to-cover1.jpg",
//             links: {
//                 spotify: "https://open.spotify.com/track/3YHr3ndi95n5RlpOEn2dBl?si=73d02d16954840f5", // Replace with actual link
//                 appleMusic: "https://applemusic.com", // Replace with actual link
//                 youtube: "https://youtube.com", // Replace with actual link
//             }
//         },
//         {
//             title: "Song Two",
//             album: "Album Two",
//             year: 2020,
//             cover: "/path-to-cover2.jpg",
//             links: {
//                 spotify: "https://spotify.com",
//                 appleMusic: "https://applemusic.com",
//                 youtube: "https://youtube.com",
//             }
//         },
//         {
//             title: "Song Three",
//             album: "Album Three",
//             year: 2019,
//             cover: "/path-to-cover3.jpg",
//             links: {
//                 spotify: "https://spotify.com",
//                 appleMusic: "https://applemusic.com",
//                 youtube: "https://youtube.com",
//             }
//         }
//     ];

//     return (
//         <div className="bg-gray-900 text-white py-16">
//             <div className="max-w-6xl mx-auto text-center">
//                 <h2 className="text-4xl font-bold mb-8">Discography</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//                     {albums.map((album, index) => (
//                         <div key={index} className="bg-charcoal p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
//                             <img 
//                                 src={album.cover} 
//                                 alt={album.title} 
//                                 className="w-full h-64 object-cover rounded-lg mb-4"
//                             />
//                             <h3 className="text-xl font-semibold">{album.title}</h3>
//                             <p className="text-gray-400">{album.year}</p>

//                             {/* Social Media Links */}
//                             <div className="flex justify-center mt-4 space-x-4">
//                                 <a href={album.links.spotify} target="_blank" rel="noopener noreferrer">
//                                     <FaSpotify size={30} className="text-green-500 hover:text-white transition" />
//                                 </a>
//                                 <a href={album.links.appleMusic} target="_blank" rel="noopener noreferrer">
//                                     <FaApple size={30} className="text-black hover:text-white transition" />
//                                 </a>
//                                 <a href={album.links.youtube} target="_blank" rel="noopener noreferrer">
//                                     <FaYoutube size={30} className="text-red-500 hover:text-white transition" />
//                                 </a>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { FaSpotify, FaApple, FaYoutube } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Discography() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/spotify?type=artist&q=Dualnature');
        if (!res.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await res.json();

        const formattedTracks = await Promise.all(data.tracks.slice(0, 6).map(async track => {
          try {

            let youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(track.name + ' Dualnature')}`;
            // Fetch YouTube link for each track
            const youtubeRes = await fetch(`/api/youtube?q=${encodeURIComponent(track.name + ' Dualnature')}`);
            const youtubeData = await youtubeRes.json();

            return {
              title: track.name,
              year: new Date(track.album.release_date).getFullYear(),
              cover: track.album.images[0]?.url || '/default-cover.jpg',
              links: {
                spotify: track.external_urls.spotify,
                appleMusic: '#',
                // youtube: youtubeData.url || youtubeUrl,
                youtube: youtubeUrl,
              }
            };
          } catch (youtubeError) {
            console.error('Failed to fetch YouTube link for track:', track.name, youtubeError);
            return {
              title: track.name,
              year: new Date(track.album.release_date).getFullYear(),
              cover: track.album.images[0]?.url || '/default-cover.jpg',
              links: {
                spotify: track.external_urls.spotify,
                appleMusic: '#',
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

  if (loading) return <div className="text-white text-center py-16">Loading...</div>;
  if (error) return <div className="text-white text-center py-16">{error}</div>;
  if (tracks.length === 0) return <div className="text-white text-center py-16">No tracks found</div>;

  return (
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Dualnature's Top Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track, index) => (
            <div key={index} className="bg-charcoal p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out" data-aos="fade-up">
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="text-gray-400">{track.year}</p>

              <div className="flex justify-center mt-4 space-x-4">
                <a href={track.links.spotify} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  <FaSpotify size={30} className="text-green-500" />
                </a>
                <a href={track.links.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  <FaApple size={30} className="text-black" />
                </a>
                <a href={track.links.youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  <FaYoutube size={30} className="text-red-500" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
