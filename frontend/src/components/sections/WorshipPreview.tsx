"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function WorshipPreview() {
    return (
        <section className="relative py-32 bg-[var(--color-primary)] text-white overflow-hidden">

            {/* Background Particles/Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent),_transparent_70%)] opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <Music className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-6 opacity-80" />
                        <h2 className="font-serif text-3xl md:text-5xl mb-4">Worship in Spirit & Truth</h2>
                        <div className="w-24 h-[1px] bg-[var(--color-accent)] mx-auto my-6" />
                        <p className="font-sans text-lg text-white/80 max-w-2xl italic">
                            "Create in me a clean heart, O God, and renew a right spirit within me." &mdash; Psalm 51:10
                        </p>
                    </motion.div>

                    {/* Player Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-full max-w-3xl bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-8 hover:border-[var(--color-accent)]/50 transition-colors duration-500"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-stone-800 rounded-md flex items-center justify-center shrink-0">
                                <Music className="text-white/20" />
                            </div>
                            <div className="text-left flex-1">
                                <h3 className="text-xl font-serif mb-1">Latest Worship Release</h3>
                                <p className="text-white/60 text-sm mb-4">In My Father's House Worship Team</p>
                                <div className="h-1 bg-white/10 rounded-full w-full relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full bg-[var(--color-accent)] w-1/3" />
                                </div>
                            </div>
                            <button className="w-12 h-12 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-[var(--color-primary)] hover:scale-110 transition-transform">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
