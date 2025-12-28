'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader } from 'lucide-react';

interface Track {
    title: string;
    src: string;
}

const tracks: Track[] = [
    {
        title: "Dune",
        src: "/api/audio/Dune2.mp3",
    },
    {
        title: "Look at the Sky",
        src: "/api/audio/look_at_the_sky_demo.mp3",
    },
    {
        title: "Red Brick Motel",
        src: "/api/audio/Country.flac",
    },
];

function formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function Demos() {
    return (
        <section id="demos" className="relative px-6 py-2 text-white">
            <div className="absolute inset-0 bg-gradient-to-tl from-black via-gray-900 to-purple-900 z-10" />
            <div className="relative z-20">
                <h2 className="text-3xl font-bold text-center mb-8">Private Stash 💾</h2>
                <div className="space-y-8 max-w-3xl mx-auto">
                    {tracks.map((track, i) => (
                        <AudioPlayer key={i} track={track} />
                    ))}
                </div>
            </div>
            <div className="py-8"></div>
        </section>
    );
}

function AudioPlayer({ track }: { track: Track }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [waveform, setWaveform] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const draggingRef = useRef(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100 || 0);
        };

        const handleLoadedMetadata = () => {
            if (audio) {
                setDuration(audio.duration);
                setIsLoading(false);
            }
        };

        const handleError = (e: any) => {
            console.error("Audio error:", e);
            setLoadError(true);
            setIsLoading(false);
        };

        const handleEnd = () => {
            setIsPlaying(false);
            if (audio) {
                audio.currentTime = 0;
            }
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
        if (!audio) return;

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

    const handleSeek = (e: React.MouseEvent | MouseEvent) => {
        if (loadError || isLoading || !progressBarRef.current || !audioRef.current) return;

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
    const handleMouseDown = (e: React.MouseEvent) => {
        draggingRef.current = true;
        handleSeek(e);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
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
