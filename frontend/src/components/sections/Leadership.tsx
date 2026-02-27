"use client";

import { motion } from "framer-motion";
import IlluminatedCard from "@/components/IlluminatedCard";

const leaders = [
    {
        name: "Pastor John Moses",
        role: "Senior Pastor",
        bio: "Passionate about teaching the Word and leading the church in grace and truth.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop", // Placeholder
    },
    {
        name: "Pastor Dr. Rajkumar",
        role: "Associate Pastor",
        bio: "Dedicated to creating an atmosphere of worship where people can encounter God.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop", // Placeholder
    }
];

export default function Leadership() {
    return (
        <motion.section
            id="leadership"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="leadership-section relative bg-gradient-to-b from-[#0D0000] via-[#1a0a00] to-[#111111] overflow-hidden"
            style={{ paddingTop: '180px', paddingBottom: '96px', marginTop: '-80px', marginBottom: '-2px' }}
        >
            {/* Top seamless fade — z-index MUST be lower than content */}
            <div
                className="absolute top-0 left-0 w-full pointer-events-none"
                style={{
                    height: '140px',
                    background: 'linear-gradient(to bottom, #0D0000 0%, #0D0000 30%, transparent 100%)',
                    zIndex: 5   // lower than content z-index of 10
                }}
            />

            {/* Decorative gold line — sits at top, above fade */}
            <div
                className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ top: '40px', zIndex: 6 }}
            >
                <motion.div
                    className="h-[1px] w-[200px] md:w-[280px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>

            {/* ALL CONTENT — z-index 10 so it always renders above gradients */}
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
                style={{ zIndex: 10 }}
            >
                {/* Heading block */}
                <div className="text-center mb-16">
                    <h2
                        className="font-cinzel font-bold text-[#D4AF37] tracking-[0.08em] leading-[1.1]"
                        style={{
                            fontSize: 'clamp(3.2rem, 7vw, 5.5rem)',
                            textShadow: '0 0 60px rgba(212,175,55,0.25)'
                        }}
                    >
                        LEADERSHIP
                    </h2>
                    <h3
                        className="font-cinzel font-semibold tracking-[0.06em]"
                        style={{
                            fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
                            color: 'rgba(212,175,55,0.80)',
                            marginTop: '16px',
                            marginBottom: '12px'
                        }}
                    >
                        Meet Our Leadership
                    </h3>
                    <p
                        className="font-serif"
                        style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                            color: 'rgba(255,215,160,0.82)',
                            lineHeight: '1.85',
                            maxWidth: '560px',
                            margin: '0 auto'
                        }}
                    >
                        Dedicated servant leaders committed to guiding our community.
                    </p>
                </div>

                <div className="flex justify-center gap-12 flex-wrap mt-12">
                    <IlluminatedCard
                        name="Pastor John Moses"
                        role="Senior Pastor"
                        imageSrc="/pictures/pastor john.jpeg"
                        bioText="Pastor John Moses leads In My Father's House with a heart for healing and restoration, carrying God's vision to set the captives free."
                    />
                    <IlluminatedCard
                        name="Pastor Dr. Rajkumar"
                        role="Associate Pastor"
                        imageSrc="/pictures/pastor raj.png"
                        bioText="Pastor Dr. Rajkumar serves with wisdom and grace, committed to building a family where every soul finds belonging and purpose in Christ."
                    />
                </div>

                {/* VIEW MORE Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center mt-[48px]"
                >
                    <a
                        href="/ministry-teams"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-[rgba(212,175,55,0.5)] bg-transparent text-[#D4AF37] font-cinzel text-[clamp(0.75rem,1.4vw,0.9rem)] font-semibold tracking-[0.25em] uppercase px-[48px] py-[14px] rounded-[2px] transition-all duration-250 hover:bg-[rgba(212,175,55,0.1)] hover:border-[#D4AF37]"
                    >
                        VIEW MORE
                    </a>
                </motion.div>
            </div>

            {/* Bottom seamless fade */}
            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{
                    height: '120px',
                    background: 'linear-gradient(to bottom, transparent 0%, #0D0000 100%)',
                    zIndex: 10
                }}
            />
        </motion.section>
    );
}
