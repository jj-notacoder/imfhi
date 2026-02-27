"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <motion.section
            id="about"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-section relative py-24 bg-gradient-to-b from-[#0D0000] via-[#1a0a00] to-[#111111] overflow-hidden"
        >
            {/* Section Divider (Top) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[1px] bg-[#D4AF37] opacity-40 z-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column Content */}
                    <div className="space-y-10">
                        {/* Gold Label - fades in first */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center mb-2"
                        >
                        </motion.div>

                        {/* Text Col - slides in from left */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <h2>
                                ABOUT US
                            </h2>
                            <h3 className="subheading" style={{ marginBottom: "20px" }}>
                                Who We Are
                            </h3>
                            <p className="font-sans text-[clamp(0.9rem,1.6vw,1.05rem)] text-[rgba(255,220,180,0.75)] leading-relaxed">
                                In My Father&apos;s House carries the same vision given to our founder — to heal the brokenhearted and set the captives free from sin, sickness and pain. Under Pastor V. Dil&apos;s ministry, confirmed by signs, wonders and miracles, we serve the people of Abu Dhabi as part of King&apos;s Revival Church International — a movement touching the UAE, UK, and nations worldwide through open-air Miracle Moments Healing Festivals.
                            </p>
                            <br></br>

                            <h3 className="subheading" style={{ marginTop: "36px", marginBottom: "20px" }}>
                                Our Mission
                            </h3>

                            <div className="mission-cards-container space-y-4">
                                <div className="space-y-4">
                                    {[
                                        { title: "Wiping the Tears", quote: "\"He will wipe away every tear from their eyes... for the former things have passed away.\"", ref: "Revelation 21:4" },
                                        { title: "Helping the Needy", quote: "\"Whoever is generous to the poor lends to the Lord, and he will repay him for his deed.\"", ref: "Proverbs 19:17" },
                                        { title: "Empowering Others", quote: "\"Those who hope in the Lord will renew their strength. They will soar on wings like eagles.\"", ref: "Isaiah 40:29-31" }
                                    ].map((mission, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="py-3 pl-4 border-l-[3px] border-[#D4AF37] bg-white/5 rounded-r-sm"
                                        >
                                            <h4 className="missionTitle mb-2 pl-3 border-l-[3px] border-[#D4AF37]">{mission.title}</h4>
                                            <p className="scripture mb-1">{mission.quote}</p>
                                            <cite className="reference">— {mission.ref}</cite>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                            className="relative h-[800px] w-full rounded-sm overflow-hidden"
                        >
                            {/* Background Image with Warm Tone Filter */}
                            <div
                                className="absolute inset-0 bg-center bg-cover"
                                style={{
                                    backgroundImage: "url('/pictures/Picture2.jpg')",
                                    filter: "sepia(0.12) brightness(0.92) contrast(1.05)"
                                }}
                            />

                            {/* Left Edge Dark Gradient Blend */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: "linear-gradient(to right, #0D0000 0%, transparent 30%)" }}
                            />

                            {/* Subtle Right Overlay to frame the image in the dark design better */}
                            <div className="absolute inset-0 bg-[var(--color-primary)]/5 mix-blend-multiply pointer-events-none" />
                        </motion.div>

                        {/* Extracted Bottom Info Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            className="mt-[20px] w-full bg-[rgba(10,0,0,0.75)] border border-[rgba(212,175,55,0.25)] rounded-[6px] py-[24px] px-[28px]"
                        >
                            <h4 className="font-serif font-semibold text-[clamp(1rem,2vw,1.25rem)] text-[#D4AF37] tracking-[0.05em] uppercase">
                                King&apos;s Revival Church International
                            </h4>
                            <br></br>
                            <p className="font-serif font-black text-[clamp(1rem,2vw,1.2rem)] text-[#D4AF37] mt-[8px] tracking-[0.04em] uppercase">
                                Pastor.Dil: UAE, UK
                            </p>
                            <p className="font-serif font-black italic text-[clamp(0.82rem,1.55vw,0.95rem)] text-[rgba(255,215,160,0.95)] leading-[1.2] mt-[14px] whitespace-nowrap tracking-tight">
                                Please join our KRCI Online Service - Every Sunday at 7:00 pm (UAE Time)
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Bottom seamless fade out */}
            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{
                    height: '160px',
                    background: 'linear-gradient(to bottom, transparent 0%, #0D0000 100%)',
                    zIndex: 9
                }}
            />
        </motion.section>
    );
}
