// 'use client';
// import { useState, useRef, useEffect } from 'react';
// import { Play, Pause } from 'lucide-react';

// const tracks = [
//     {
//         title: "Dune",
//         src: "api/audio/Dune2.mp3",
//     },
//     {
//         title: "Look at the Sky",
//         src: "api/audio/look_at_the_sky_demo.mp3",
//     },
//     {
//         title: "chilllikedat",
//         src: "api/audio/chilllikedat.mp3",
//     },
// ];

// function formatTime(seconds) {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// }

// export default function Demos() {
//     return (
//         <section id="demos" className="relative px-6 py-12 text-white">
//             <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-800 to-black opacity-70 z-10" />
//             <div className="relative z-20">
//                 <h2 className="text-3xl font-bold text-center mb-6">Unreleased Tracks</h2>
//                 <div className="space-y-8 max-w-3xl mx-auto">
//                     {tracks.map((track, i) => (
//                         <AudioPlayer key={i} track={track} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// function AudioPlayer({ track }) {
//     const audioRef = useRef(null);
//     const progressBarRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [progress, setProgress] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [waveform, setWaveform] = useState([]);
//     const wasPlayingRef = useRef(false);

//     useEffect(() => {
//         const audio = audioRef.current;
//         const update = () => {
//             setProgress((audio.currentTime / audio.duration) * 100);
//             setCurrentTime(audio.currentTime);
//         };
//         audio.addEventListener('timeupdate', update);
//         audio.addEventListener('loadedmetadata', () => {
//             setDuration(audio.duration);
//         });
//         return () => {
//             audio.removeEventListener('timeupdate', update);
//         };
//     }, []);

//     // Generate random waveform only once
//     useEffect(() => {
//         const bars = Array.from({ length: 80 }, () =>
//             Math.floor(Math.random() * 20 + 5)
//         );
//         setWaveform(bars);
//     }, []);

//     const togglePlay = () => {
//         const audio = audioRef.current;
//         if (isPlaying) {
//             audio.pause();
//         } else {
//             audio.play();
//         }
//         setIsPlaying(!isPlaying);
//     };

//     const handleSeek = (e) => {
//         const rect = progressBarRef.current.getBoundingClientRect();
//         const offsetX = e.clientX - rect.left;
//         const seekTime = (offsetX / rect.width) * duration;
        
//         // Store the current play state
//         wasPlayingRef.current = isPlaying;
        
//         // Pause the audio while seeking
//         audioRef.current.pause();
        
//         // Set the new time
//         audioRef.current.currentTime = seekTime;
        
//         // Resume playing if it was playing before
//         if (wasPlayingRef.current) {
//             audioRef.current.play();
//         }
//     };

//     return (
//         <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
//             <audio ref={audioRef} src={track.src} preload="metadata" />
//             <div className="flex items-center gap-4">
//                 <button onClick={togglePlay}>
//                     {isPlaying ? (
//                         <Pause className="w-6 h-6 text-coral" />
//                     ) : (
//                         <Play className="w-6 h-6 text-coral" />
//                     )}
//                 </button>
//                 <div>
//                     <div className="font-semibold text-lg">{track.title}</div>
//                     <div className="text-sm text-gray-400">
//                         {formatTime(currentTime)} / {formatTime(duration)}
//                     </div>
//                 </div>
//             </div>

//             {/* Smooth, full-width waveform */}
//             <div
//                 ref={progressBarRef}
//                 className="mt-4 h-14 flex items-end gap-[2px] bg-[#2a2a2a] rounded cursor-pointer overflow-hidden px-1"
//                 onClick={handleSeek}
//             >
//                 {waveform.map((height, i) => {
//                     const isPlayed = (i / waveform.length) * 100 < progress;
//                     return (
//                         <div
//                             key={i}
//                             className="flex-grow rounded-sm"
//                             style={{
//                                 height: `${height}px`,
//                                 backgroundColor: isPlayed ? '#ff6f61' : '#555',
//                                 transition: 'background-color 0.1s ease',
//                             }}
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }


'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader } from 'lucide-react';

const tracks = [
    {
        title: "Dune",
        src: "/api/audio/Dune2.mp3",
    },
    {
        title: "Look at the Sky",
        src: "/api/audio/look_at_the_sky_demo.mp3",
    },
    {
        title: "chilllikedat",
        src: "/api/audio/chilllikedat.mp3",
    },
];

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function Demos() {
    return (
        <section id="demos" className="relative px-6 py-12 text-white">
            <div className="absolute inset-0 bg-gradient-to-tl from-black via-gray-900 to-purple-900 z-10" />
            <div className="relative z-20">
                <h2 className="text-3xl font-bold text-center mb-6">Unreleased Tracks</h2>
                <div className="space-y-8 max-w-3xl mx-auto">
                    {tracks.map((track, i) => (
                        <AudioPlayer key={i} track={track} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AudioPlayer({ track }) {
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [waveform, setWaveform] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const draggingRef = useRef(false);

    useEffect(() => {
        const audio = audioRef.current;
        
        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };
        
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };
        
        const handleError = (e) => {
            console.error("Audio error:", e);
            setLoadError(true);
            setIsLoading(false);
        };
        
        const handleEnd = () => {
            setIsPlaying(false);
            audio.currentTime = 0;
            setProgress(0);
            setCurrentTime(0);
        };
        
        // Generate random waveform based on track (to ensure consistency)
        const seed = track.title.charCodeAt(0) || 123;
        const bars = Array.from({ length: 80 }, (_, i) => 
            Math.floor((Math.sin(i * 0.2 + seed) * 0.5 + 0.5) * 15 + 5)
        );
        setWaveform(bars);
        
        // Event listeners
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
        audio.addEventListener('ended', handleEnd);
        
        // Force load metadata
        audio.load();
        
        // Set a timeout for loading - if metadata doesn't load in 3 seconds, mark as error
        const timeout = setTimeout(() => {
            if (isLoading && duration === 0) {
                setLoadError(true);
                setIsLoading(false);
            }
        }, 3000);
        
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('ended', handleEnd);
            clearTimeout(timeout);
        };
    }, [track.title, duration, isLoading]);

    const togglePlay = () => {
        const audio = audioRef.current;
        
        if (loadError) {
            // Try to reload if there was an error
            audio.load();
            setLoadError(false);
            setIsLoading(true);
            return;
        }
        
        if (isPlaying) {
            audio.pause();
        } else {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Playback started successfully
                    })
                    .catch(error => {
                        console.error("Play failed:", error);
                        setIsPlaying(false);
                    });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        if (loadError || isLoading) return;
        
        const rect = progressBarRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
        const seekTime = percentage * duration;
        
        if (isNaN(seekTime)) return;
        
        const wasPlaying = isPlaying;
        
        if (wasPlaying) {
            audioRef.current.pause();
        }
        
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
        setProgress(percentage * 100);
        
        if (wasPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Resume play failed:", error);
                    setIsPlaying(false);
                });
            }
        }
    };
    
    // Track mouse movements for a smoother dragging experience
    const handleMouseDown = (e) => {
        draggingRef.current = true;
        handleSeek(e);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleMouseMove = (e) => {
        if (draggingRef.current) {
            handleSeek(e);
        }
    };
    
    const handleMouseUp = () => {
        draggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
            <audio 
                ref={audioRef} 
                src={track.src} 
                preload="metadata"
                crossOrigin="anonymous"
            />
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={togglePlay}
                    disabled={isLoading && !loadError}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#333] hover:bg-coral transition-colors"
                >
                    {isLoading ? (
                        <Loader className="w-5 h-5 text-gray-300 animate-spin" />
                    ) : loadError ? (
                        <div className="text-red-500 text-xs">Retry</div>
                    ) : isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                    ) : (
                        <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                </button>
                
                <div className="flex-grow">
                    <div className="font-semibold text-lg">{track.title}</div>
                    <div className="text-sm text-gray-400">
                        {formatTime(currentTime)} / {loadError ? "Error" : isLoading ? "Loading..." : formatTime(duration)}
                    </div>
                </div>
            </div>

            {/* Interactive waveform */}
            <div
                ref={progressBarRef}
                className="mt-4 h-14 flex items-end gap-[2px] bg-[#2a2a2a] rounded cursor-pointer overflow-hidden px-1"
                onMouseDown={handleMouseDown}
            >
                {waveform.map((height, i) => {
                    const isPlayed = (i / waveform.length) * 100 < progress;
                    return (
                        <div
                            key={i}
                            className="flex-grow rounded-sm transition-all duration-100"
                            style={{
                                height: `${height}px`,
                                backgroundColor: isPlayed 
                                    ? loadError ? '#f87171' : '#ff6f61' 
                                    : isLoading ? '#444' : '#555',
                                opacity: isLoading ? 0.7 : 1
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}