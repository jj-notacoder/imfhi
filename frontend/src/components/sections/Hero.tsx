"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, MapPin, Clock } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import WaveBackground from "@/components/ui/WaveBackground";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <section
            id="hero"
            ref={ref}
            className="relative min-h-[100vh] h-auto w-full overflow-hidden bg-stone-900 text-white pt-0"
        >
            {/* Background Layer */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 z-0"
            >
                <WaveBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7B0000]/10 to-black/80" />
            </motion.div>

            {/* Content Layer */}
            <motion.div
                style={{ opacity: opacityContent }}
                className="relative z-10 flex min-h-[100vh] flex-col items-center justify-center px-4 pt-[86px] pb-6 text-center max-w-5xl mx-auto w-full"
            >
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="font-serif text-[var(--color-accent)] uppercase tracking-[0.3em] text-[13px] font-medium drop-shadow-md"
                >
                    Welcome Home
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.35))" }}
                    className="relative w-[110px] h-auto mx-auto mt-[10px] mb-[8px]"
                >
                    {/* Using an img tag here easily maintains aspect ratio with height:auto */}
                    <img
                        src="/pictures/image-removebg-preview.png"
                        alt="In My Father's House Logo"
                        className="w-full h-auto object-contain block mx-auto"
                    />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="font-serif text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold tracking-tight leading-[1.1] text-white drop-shadow-2xl mt-0 mb-0 uppercase"
                >
                    In My Father&apos;s House
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="font-sans text-[16px] md:text-[18px] text-stone-100 font-light tracking-wide max-w-2xl mt-[6px] mb-[10px] drop-shadow-md"
                >
                    A place of presence, family, and transformation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    className="max-w-4xl text-center relative px-[28px] py-[16px] mt-[10px] mb-[12px]"
                >
                    {/* Glassmorphism backdrop for verse visibility */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-lg border border-[var(--color-accent)]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

                    <p className="relative font-serif italic text-[14px] md:text-[18px] text-white leading-relaxed mb-3 drop-shadow-lg font-medium">
                        &quot;Fear not, for I am with you; Be not dismayed, for I am your God.<br />
                        I will strengthen you, Yes, I will help you,<br />
                        I will uphold you with My righteous right hand.&quot;
                    </p>
                    <p className="relative font-sans uppercase tracking-[0.2em] text-[11px] md:text-[12px] text-[var(--color-accent)] font-bold">
                        Isaiah 41:10
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                    className="flex flex-row gap-4 w-full sm:w-auto items-center justify-center mt-[14px] mb-[12px]"
                >
                    <button
                        onClick={() => scrollToSection('services')}
                        className="group relative h-[48px] px-8 bg-[#7B0000] text-white font-sans text-[13px] md:text-[14px] tracking-widest uppercase font-bold rounded-sm overflow-hidden border border-[#900000] hover:border-[var(--color-accent)] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(123,0,0,0.6)] hover:scale-[1.02] flex items-center justify-center"
                    >
                        <span className="relative z-10 w-full text-center">Join Our Fellowship</span>
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
                    </button>

                    <button
                        onClick={() => scrollToSection('sermons')}
                        className="group relative h-[48px] px-8 bg-black/50 backdrop-blur-md border border-[var(--color-accent)]/50 text-white font-sans text-[13px] md:text-[14px] tracking-widest uppercase font-bold rounded-sm hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg"
                    >
                        <Play className="w-4 h-4 text-[var(--color-accent)] fill-[var(--color-accent)]" />
                        <span>Watch Latest Sermon</span>
                    </button>
                </motion.div>

                {/* Service Times Box - Integrated Fade */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-2 text-white text-center w-full py-[24px] px-[24px] z-20"
                    style={{ background: 'linear-gradient(180deg, rgba(13,0,0,0) 0%, rgba(13,0,0,0.7) 30%, rgba(13,0,0,0.7) 70%, rgba(13,0,0,0) 100%)' }}
                >
                    <div className="flex flex-col gap-1 items-center">
                        <span className="text-[var(--color-accent)] font-serif font-semibold uppercase tracking-widest text-[13px]">Saturdays (Tamil)</span>
                        <span className="font-serif text-[15px]">5:30 PM - 7:30 PM</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-[var(--color-accent)]/50" />
                    <div className="flex flex-col gap-1 items-center">
                        <span className="text-[var(--color-accent)] font-serif font-semibold uppercase tracking-widest text-[13px]">Sundays (English)</span>
                        <span className="font-serif text-[15px]">3:00 PM - 5:00 PM</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-[var(--color-accent)]/50" />
                    <div className="flex flex-col gap-1 items-center">
                        <span className="text-[var(--color-accent)] font-serif font-semibold uppercase tracking-widest text-[13px] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> Location
                        </span>
                        <span className="font-serif text-[15px]">Bretheren Church, Mussafah</span>
                    </div>
                </motion.div>

                {/* Seamless Connector Overlay Seam */}
                <div
                    className="absolute bottom-[-1px] left-0 w-full h-[120px] pointer-events-none z-10"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,0,0,0.95))' }}
                />
            </motion.div>
        </section>
    );
}
