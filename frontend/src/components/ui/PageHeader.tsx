"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

export default function PageHeader({
    title,
    subtitle,
    backgroundImage = "/worship_background.png"
}: PageHeaderProps) {
    return (
        <section className="relative h-[60vh] w-full overflow-hidden bg-stone-900 text-white flex items-center justify-center">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Image Fallback to Gradient if image missing */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-stone-900"
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                />

                {/* Overlay: Deep Red Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#7B0000]/70 via-[#7B0000]/50 to-black/90 mix-blend-multiply" />

                {/* Overlay: Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-amber-200/30 blur-[1px]"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + 100 + "%",
                            scale: Math.random() * 0.5 + 0.2,
                            opacity: 0,
                        }}
                        animate={{
                            y: -50,
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "linear",
                        }}
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-1 bg-[var(--color-accent)] mx-auto mb-6"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl mb-4 uppercase"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="font-sans text-lg md:text-xl text-stone-200 font-light tracking-wide max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </section>
    );
}
