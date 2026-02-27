"use client";

import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useState } from "react";

export default function SermonPreview() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h3 className="text-[var(--color-primary)] font-serif text-sm tracking-[0.2em] uppercase mb-3">Latest Message</h3>
                    <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Word for the Week</h2>
                </div>

                <div className="flex justify-center">
                    <motion.div
                        className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        onClick={() => setIsPlaying(true)}
                    >
                        {/* Thumbnail Placeholder */}
                        <div className="absolute inset-0 bg-stone-800 flex items-center justify-center">
                            <span className="text-stone-600 font-serif italic text-lg">[Sermon Thumbnail Image]</span>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(123,0,0,0.5)] group-hover:bg-[var(--color-accent)] transition-colors duration-300"
                            >
                                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                            </motion.div>
                        </div>

                        {/* Sermon Details */}
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <div className="inline-block px-3 py-1 bg-[var(--color-accent)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider mb-3">
                                New Series
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-2">The Power of Presence</h3>
                            <p className="text-white/80 font-sans">Sunday, October 24, 2025 • Pastor John Doe</p>
                        </div>

                        {/* Gold Accent Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-accent)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </motion.div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            {isPlaying && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                            [Video Player Placeholder]
                            {/* You would embed YouTube/Vimeo iframe here */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
