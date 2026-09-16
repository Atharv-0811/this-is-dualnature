"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play, Music, Mic2, Disc, Film, X, Mail, Instagram } from "lucide-react";

// TODO: replace with the real address before sharing this page.
const CONTACT_EMAIL = "atharvchinchkar@gmail.com";

// Add a project by copying one entry below. Use `video` for a local clip, `link` for an external page.
const works = [
    {
        title: "Short Film — Prom Scene",
        desc: "Co-produced the track, mixed and mastered",
        icon: <Film className="w-5 h-5" />,
        video: "/composer/prom-scene.webm"
    },
    {
        title: "Score for an Animated Short",
        desc: "Original orchestral music — watch on YouTube",
        icon: <Music className="w-5 h-5" />,
        link: "https://youtu.be/aI9mY1mnf5I?si=uscImKsaJ06Swbnw"
    },
    {
        title: "Sound Design Reel",
        desc: "Foley, texture and atmosphere — view on Behance",
        icon: <Mic2 className="w-5 h-5" />,
        link: "https://www.behance.net/atharvchinchkar"
    },
    {
        title: "Released Music",
        desc: "Original songs and production — listen on Spotify",
        icon: <Disc className="w-5 h-5" />,
        link: "https://open.spotify.com/artist/75lxD3C0pgTahGqOSeZFKB?si=tfzbWAGDRxiuZ0j0FxwtHA"
    }
];

// Work without a public link yet. Same idea as `works` — copy a line to add one.
const credits = [
    {
        title: "Theme song — short film",
        role: "Produced, mixed and mastered. The film is still screening at festivals, so the track isn't public yet."
    },
    {
        title: "Student films — college film department",
        role: "Original music and sound for departmental productions."
    },
    {
        title: "Podcast intro theme",
        role: "Written and produced."
    }
];

export default function ComposerPage() {
    const [activeVideo, setActiveVideo] = useState<{ title: string; src: string } | null>(null);

    useEffect(() => {
        if (!activeVideo) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveVideo(null);
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [activeVideo]);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-charcoal text-light font-sans selection:bg-coral selection:text-white flex flex-col">
            {/* Custom Minimal Header */}
            <header className="w-full flex justify-between items-center px-6 md:px-12 py-6 border-b border-light/5">
                <Link href="/" className="flex items-center gap-2 text-sm text-light/60 hover:text-coral transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Dualnature</span>
                </Link>
                <span className="text-xs tracking-widest uppercase text-light/30 font-grotesk">Portfolio: Atharv C.</span>
            </header>

            <main className="flex-grow flex flex-col px-6 md:px-12 lg:px-24">

                {/* Functional Hero Section */}
                <motion.section
                    className="py-16 md:py-24 border-b border-light/5"
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                >
                    <div className="max-w-4xl">
                        <motion.h1 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight leading-tight">
                            Composition & Sound Design
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="font-outfit text-xl text-light/60 mb-8 max-w-2xl">
                            Select works by Atharv Chinchkar (Dualnature).
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <Link href="https://on.soundcloud.com/uY5BKsdHdR65CY7OQH" target="_blank" className="flex items-center gap-2 bg-light text-charcoal px-6 py-3 hover:bg-coral hover:text-white transition-all duration-300 font-medium text-sm tracking-wide">
                                <Music className="w-4 h-4" />
                                <span>Studio Works</span>
                            </Link>
                            <Link href="https://on.soundcloud.com/vD44ZEuKFEjbVfLm2X" target="_blank" className="flex items-center gap-2 border border-light/20 text-light px-6 py-3 hover:bg-light/10 hover:border-light/40 transition-all duration-300 font-medium text-sm tracking-wide">
                                <Disc className="w-4 h-4" />
                                <span>Score Sketches</span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Recent Work - Compact List/Grid */}
                <section className="py-16 border-b border-light/5">
                    <div className="mb-8 max-w-2xl">
                        <h3 className="font-playfair text-2xl md:text-3xl mb-3">Recent Work</h3>
                        <p className="font-outfit text-base md:text-lg text-light/60">
                            A few recent projects. Tap any card to watch or listen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {works.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="min-h-40 md:h-44"
                            >
                                {item.video ? (
                                    <button
                                        type="button"
                                        onClick={() => setActiveVideo({ title: item.title, src: item.video })}
                                        onMouseEnter={(e) => e.currentTarget.querySelector("video")?.play()}
                                        onMouseLeave={(e) => e.currentTarget.querySelector("video")?.pause()}
                                        className="group relative h-full w-full overflow-hidden border border-light/10 hover:border-light/30 text-left transition-all duration-300 cursor-pointer"
                                    >
                                        <video
                                            src={`${item.video}#t=0.1`}
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20" />

                                        <div className="relative h-full p-4 flex flex-col justify-between gap-4">
                                            <div className="flex w-full justify-between items-start">
                                                <span className="text-light/70 group-hover:text-coral transition-colors">{item.icon}</span>
                                                <Play className="w-4 h-4 text-light/50 group-hover:text-coral transition-colors" />
                                            </div>

                                            <div>
                                                <h4 className="font-playfair text-base md:text-lg mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                                                <p className="font-outfit text-xs text-light/60">{item.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                ) : item.link ? (
                                    <Link
                                        href={item.link}
                                        target="_blank"
                                        className="group h-full border border-light/10 hover:border-light/30 bg-light/5 hover:bg-light/10 p-4 flex flex-col justify-between gap-4 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex w-full justify-between items-start">
                                            <span className="text-light/50 group-hover:text-coral transition-colors">{item.icon}</span>
                                            <ArrowRight className="w-4 h-4 text-light/30 -rotate-45 group-hover:rotate-0 group-hover:text-coral transition-all duration-300" />
                                        </div>

                                        <div>
                                            <h4 className="font-playfair text-base md:text-lg mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                                            <p className="font-outfit text-xs text-light/50">{item.desc}</p>
                                        </div>
                                    </Link>
                                ) : null}
                            </motion.div>
                        ))}

                    </div>
                </section>

                {/* Other Credits */}
                <section className="py-16 border-b border-light/5">
                    <div className="mb-8 max-w-2xl">
                        <h3 className="font-playfair text-2xl md:text-3xl mb-3">Other Credits</h3>
                        <p className="font-outfit text-base md:text-lg text-light/60">
                            Work that doesn&apos;t have a video or a public link to share yet.
                        </p>
                    </div>

                    <ul className="max-w-3xl border-t border-light/10">
                        {credits.map((credit) => (
                            <li
                                key={credit.title}
                                className="py-5 border-b border-light/10 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-10"
                            >
                                <span className="font-outfit text-base md:text-lg text-light/90 sm:shrink-0">{credit.title}</span>
                                <span className="font-outfit text-sm text-light/50 sm:text-right sm:max-w-sm">{credit.role}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Content Grid: Bio & Spec Sheet */}
                <section className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-light/5">
                    {/* Bio Column */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="font-playfair text-2xl md:text-3xl mb-4">About</h3>
                            <p className="font-outfit text-lg md:text-xl leading-relaxed text-light/80">
                                A classically trained pianist with over ten years of experience, I compose and produce
                                original music for short films, animation and visual media. I blend traditional
                                instrumentation — piano and guitar — with custom-built soundscapes to create versatile,
                                emotionally driven scores. From the first sketch to the final mix, my focus is on music
                                that serves the story.
                            </p>
                        </motion.div>
                    </div>

                    {/* Spec Sheet Column */}
                    <div className="lg:col-span-5">
                        <motion.div
                            className="bg-darkgray/20 border border-light/10 p-6 md:p-8"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h3 className="font-playfair text-xl mb-6 border-b border-light/10 pb-2">Credentials</h3>
                            <ul className="space-y-4 font-grotesk text-sm tracking-wide">
                                <li className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 sm:gap-4">
                                    <span className="text-light/40 uppercase text-xs w-32 shrink-0">Certification</span>
                                    <span className="text-light/90">Trinity College London (Grade 8 Piano)</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 sm:gap-4">
                                    <span className="text-light/40 uppercase text-xs w-32 shrink-0">Primary Instrument</span>
                                    <span className="text-light/90">Piano & Keyboards (10 Years)</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 sm:gap-4">
                                    <span className="text-light/40 uppercase text-xs w-32 shrink-0">Production</span>
                                    <span className="text-light/90">Ableton / FL Studio (6 Years)</span>
                                </li>
                                <li className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 sm:gap-4">
                                    <span className="text-light/40 uppercase text-xs w-32 shrink-0">Key Skills</span>
                                    <span className="text-light/90">Orchestration, Score Notation</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Playlist */}
                <section className="py-16">
                    <div className="mb-8 max-w-2xl">
                        <h3 className="font-playfair text-2xl md:text-3xl mb-3">Listen</h3>
                        <p className="font-outfit text-base md:text-lg text-light/60">
                            A playlist of unreleased cinematic music. Press play below — no sign-up or download needed.
                        </p>
                    </div>

                    <div className="border border-light/10 bg-light/5 p-2 md:p-4">
                        <iframe
                            title="Unreleased Cinematic Music — playlist by Dualnature on SoundCloud"
                            width="100%"
                            height="450"
                            scrolling="no"
                            frameBorder="no"
                            loading="lazy"
                            allow="autoplay; encrypted-media"
                            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A1457904904%3Fsecret_token%3Ds-PHSPzKDNonv&color=%238495a4&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                            className="block w-full"
                        />
                    </div>

                    <p className="mt-4 font-grotesk text-xs text-light/40 tracking-wide">
                        <Link href="https://soundcloud.com/thisisdualnature" target="_blank" className="hover:text-coral transition-colors">
                            Dualnature
                        </Link>
                        {" · "}
                        <Link href="https://soundcloud.com/thisisdualnature/sets/unreleased-cinematic-music/s-PHSPzKDNonv" target="_blank" className="hover:text-coral transition-colors">
                            Unreleased Cinematic Music
                        </Link>
                    </p>
                </section>

                {/* Contact */}
                <section className="py-16 border-t border-light/5">
                    <div className="max-w-2xl">
                        <h3 className="font-playfair text-2xl md:text-3xl mb-3">Get in Touch</h3>
                        <p className="font-outfit text-base md:text-lg text-light/60 mb-8">
                            If you have a project coming up, I&apos;d be glad to hear about it — an original score,
                            a theme song, or mixing and mastering for a track you already have.
                        </p>

                        <Link
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="inline-flex items-center gap-2 bg-light text-charcoal px-6 py-3 hover:bg-coral hover:text-white transition-all duration-300 font-medium text-sm tracking-wide"
                        >
                            <Mail className="w-4 h-4" />
                            <span>{CONTACT_EMAIL}</span>
                        </Link>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
                            <Link
                                href="https://www.instagram.com/thisisdualnature"
                                target="_blank"
                                className="inline-flex items-center gap-2 font-outfit text-sm text-light/60 hover:text-coral transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                                <span>Instagram</span>
                            </Link>
                            <Link
                                href="https://soundcloud.com/thisisdualnature"
                                target="_blank"
                                className="inline-flex items-center gap-2 font-outfit text-sm text-light/60 hover:text-coral transition-colors"
                            >
                                <Music className="w-4 h-4" />
                                <span>SoundCloud</span>
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            {/* Simple Footer */}
            <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-light/5 mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-light/30 font-grotesk uppercase tracking-wider gap-4">
                    <span>© {new Date().getFullYear()} Developed by{' '}
                    <a
                        href="https://atharvchinchkar.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coral hover:underline"
                    >
                        Atharv Chinchkar
                    </a></span>
                </div>
            </footer>

            {activeVideo && (
                <div
                    className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4"
                    onClick={() => setActiveVideo(null)}
                >
                    <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center gap-4 mb-3">
                            <h4 className="font-playfair text-lg md:text-xl">{activeVideo.title}</h4>
                            <button
                                type="button"
                                onClick={() => setActiveVideo(null)}
                                className="flex items-center gap-2 border border-light/20 px-4 py-2 text-sm hover:bg-light/10 hover:border-light/40 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                <span>Close</span>
                            </button>
                        </div>

                        <video
                            src={activeVideo.src}
                            controls
                            autoPlay
                            playsInline
                            className="w-full max-h-[70vh] bg-black"
                        />
                    </div>
                </div>
            )}
        </div >
    );
}
