"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
    return (
        <section className="py-24 bg-[var(--color-background)] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Image Side (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden rounded-sm shadow-2xl">
                            {/* Placeholder for an actual image */}
                            <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-400 font-serif italic text-2xl">
                                [Church Image Here]
                            </div>

                            {/* Gold Border Accent */}
                            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[var(--color-accent)]/30" />
                        </div>

                        {/* Decor Element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--color-primary)]/10 -z-10 rounded-full blur-2xl" />
                    </motion.div>

                    {/* Text Side (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <h3 className="text-[var(--color-accent)] font-sans text-sm tracking-[0.2em] uppercase mb-4">
                            Our Story
                        </h3>
                        <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-primary)] mb-6 leading-tight">
                            Rooted in Love,<br />Growing in Faith.
                        </h2>
                        <p className="font-sans text-lg text-stone-600 mb-8 leading-relaxed max-w-md">
                            We believe in creating a space where everyone feels welcome. Our community is built on the foundation of unconditional love and the transformative power of grace.
                        </p>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium hover:text-[var(--color-accent)] transition-colors duration-300 group"
                        >
                            <span className="border-b border-[var(--color-primary)] group-hover:border-[var(--color-accent)] transition-colors">Learn More About Us</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
