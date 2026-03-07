"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Play, Music, Mic2, Disc } from "lucide-react";

export default function ComposerPage() {
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
                            <p className="font-outfit text-xl md:text-2xl leading-relaxed text-light/80 mb-6 font-light">
                                &quot;Bridging 8 years of Western Classical discipline with 6 years of modern Music Production. Specializing in narrative-driven scores that blend orchestral texture with contemporary sound design.&quot;
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
                                    <span className="text-light/90">Piano & Keyboards (8 Years)</span>
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

                {/* Selected Works - Compact List/Grid */}
                <section className="py-16">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="font-playfair text-2xl md:text-3xl">Selected Works</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Score for Blender Animation",
                                desc: "Orchestral Composition",
                                icon: <Music className="w-6 h-6 text-light/50 group-hover:text-coral transition-colors" />,
                                link: "https://youtu.be/aI9mY1mnf5I?si=uscImKsaJ06Swbnw"
                            },
                            {
                                title: "Sound Design Reel",
                                desc: "Foley, Texture, and Atmosphere",
                                icon: <Mic2 className="w-6 h-6 text-light/50 group-hover:text-coral transition-colors" />,
                                link: "https://www.behance.net/atharvchinchkar"
                            },
                            {
                                title: "Spotify Discography",
                                desc: "Modern Production & Arrangement",
                                icon: <Disc className="w-6 h-6 text-light/50 group-hover:text-coral transition-colors" />,
                                link: "https://open.spotify.com/artist/75lxD3C0pgTahGqOSeZFKB?si=tfzbWAGDRxiuZ0j0FxwtHA"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="h-64"
                            >
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className="group h-full border border-light/10 hover:border-light/30 bg-light/5 hover:bg-light/10 p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer block"
                                >
                                    <div className="flex w-full justify-between items-start mb-4">
                                        {item.icon}
                                        <ArrowRight className="w-4 h-4 text-light/30 -rotate-45 group-hover:rotate-0 group-hover:text-coral transition-all duration-300" />
                                    </div>

                                    <div>
                                        <h4 className="font-playfair text-xl mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                                        <p className="font-grotesk text-xs text-light/50 uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                    </div>
                </section>

            </main>

            {/* Simple Footer */}
            <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-light/5 mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-light/30 font-grotesk uppercase tracking-wider gap-4">
                    <span>© {new Date().getFullYear()} Atharv Chinchkar</span>
                </div>
            </footer>
        </div >
    );
}
