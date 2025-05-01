'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const tracks = [
    {
        title: "Dune",
        src: "api/audio/Dune2.mp3",
    },
    {
        title: "Look at the Sky",
        src: "api/audio/look_at_the_sky_demo.mp3",
    },
    {
        title: "chilllikedat",
        src: "api/audio/chilllikedat.mp3",
    },
];

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function Demos() {
    return (
        <section id="demos" className="relative px-6 py-12 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-gray-800 to-black opacity-70 z-10" />
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
    const wasPlayingRef = useRef(false);

    useEffect(() => {
        const audio = audioRef.current;
        const update = () => {
            setProgress((audio.currentTime / audio.duration) * 100);
            setCurrentTime(audio.currentTime);
        };
        audio.addEventListener('timeupdate', update);
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });
        return () => {
            audio.removeEventListener('timeupdate', update);
        };
    }, []);

    // Generate random waveform only once
    useEffect(() => {
        const bars = Array.from({ length: 80 }, () =>
            Math.floor(Math.random() * 20 + 5)
        );
        setWaveform(bars);
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const seekTime = (offsetX / rect.width) * duration;
        
        // Store the current play state
        wasPlayingRef.current = isPlaying;
        
        // Pause the audio while seeking
        audioRef.current.pause();
        
        // Set the new time
        audioRef.current.currentTime = seekTime;
        
        // Resume playing if it was playing before
        if (wasPlayingRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
            <audio ref={audioRef} src={track.src} preload="metadata" />
            <div className="flex items-center gap-4">
                <button onClick={togglePlay}>
                    {isPlaying ? (
                        <Pause className="w-6 h-6 text-coral" />
                    ) : (
                        <Play className="w-6 h-6 text-coral" />
                    )}
                </button>
                <div>
                    <div className="font-semibold text-lg">{track.title}</div>
                    <div className="text-sm text-gray-400">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>
            </div>

            {/* Smooth, full-width waveform */}
            <div
                ref={progressBarRef}
                className="mt-4 h-14 flex items-end gap-[2px] bg-[#2a2a2a] rounded cursor-pointer overflow-hidden px-1"
                onClick={handleSeek}
            >
                {waveform.map((height, i) => {
                    const isPlayed = (i / waveform.length) * 100 < progress;
                    return (
                        <div
                            key={i}
                            className="flex-grow rounded-sm"
                            style={{
                                height: `${height}px`,
                                backgroundColor: isPlayed ? '#ff6f61' : '#555',
                                transition: 'background-color 0.1s ease',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}


