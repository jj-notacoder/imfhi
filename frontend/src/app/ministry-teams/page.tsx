"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const teams = [
    {
        name: "WOMEN'S MINISTRY",
        members: [
            { name: "Sr Ruby", role: "WOMEN'S MINISTRY", bio: "Committed to serving the church and community." },
            { name: "Sr Deepa", role: "WOMEN'S MINISTRY", bio: "Committed to serving the church and community." }
        ]
    },
    {
        name: "MEN'S MINISTRY",
        members: [
            { name: "Bro Suresh", role: "MEN'S MINISTRY", bio: "Committed to serving the church and community." },
            { name: "Bro Babu", role: "MEN'S MINISTRY", bio: "Committed to serving the church and community." }
        ]
    },
    {
        name: "MEDIA & SOUND",
        members: [
            { name: "Bro Joy", role: "MEDIA & SOUND", bio: "Committed to serving the church and community." },
            { name: "Bro Sampath", role: "MEDIA & SOUND", bio: "Committed to serving the church and community." },
            { name: "Bro Gladson", role: "MEDIA & SOUND", bio: "Committed to serving the church and community." },
            { name: "Bro Franklin", role: "MEDIA & SOUND", bio: "Committed to serving the church and community." }
        ]
    },
    {
        name: "MUSIC & CHOIR TEAM",
        members: [
            { name: "Bro Joy", role: "MUSIC & CHOIR TEAM", bio: "Committed to serving the church and community." },
            { name: "Bro Gerald", role: "MUSIC & CHOIR TEAM", bio: "Committed to serving the church and community." },
            { name: "Jeffrin", role: "MUSIC & CHOIR TEAM", bio: "Committed to serving the church and community." },
            { name: "Jerwin", role: "MUSIC & CHOIR TEAM", bio: "Committed to serving the church and community." }
        ]
    },
    {
        name: "CAMP MINISTRY",
        members: [
            { name: "Bro Rajan", role: "CAMP MINISTRY", bio: "Committed to serving the church and community." },
            { name: "Bro Vasanth", role: "CAMP MINISTRY", bio: "Committed to serving the church and community." },
            { name: "Bro Suresh", role: "CAMP MINISTRY", bio: "Committed to serving the church and community." }
        ]
    },
    {
        name: "KID'S MINISTRY",
        members: [
            { name: "Sr Kernap", role: "KID'S MINISTRY", bio: "Committed to serving the church and community." },
            { name: "Abigail", role: "KID'S MINISTRY", bio: "Committed to serving the church and community." }
        ]
    },
    {
        name: "TRANSPORT, FOOD & ADMIN",
        members: [
            { name: "Bro Rajan", role: "TRANSPORT, FOOD & ADMIN", bio: "Committed to serving the church and community." },
            { name: "Bro Emmanuel", role: "TRANSPORT, FOOD & ADMIN", bio: "Committed to serving the church and community." },
            { name: "Bro Raghu", role: "TRANSPORT, FOOD & ADMIN", bio: "Committed to serving the church and community." }
        ]
    }
];

export default function MinistryTeamsPage() {
    const [flippedIndex, setFlippedIndex] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0D0000] via-[#1a0a00] to-[#111111] pt-[120px] pb-[80px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1
                        className="font-cinzel font-bold text-[#D4AF37] tracking-[0.08em]"
                        style={{
                            fontSize: 'clamp(3.2rem, 7vw, 5.5rem)',
                            textShadow: '0 0 60px rgba(212,175,55,0.25)'
                        }}
                    >
                        OUR MINISTRY TEAMS
                    </h1>
                    <h2
                        className="font-cinzel font-semibold tracking-[0.06em]"
                        style={{
                            fontSize: 'clamp(1.3rem, 2.8vw, 2rem)',
                            color: 'rgba(212,175,55,0.80)',
                            marginTop: '16px',
                            marginBottom: '48px'
                        }}
                    >
                        Serving Together in Faith
                    </h2>

                    <motion.div
                        className="mx-auto h-[1px] w-[280px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-[80px]"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* Teams */}
                <div className="space-y-[80px]">
                    {teams.map((team, tIdx) => (
                        <div key={team.name} className="team-section">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-center mb-[24px]"
                            >
                                <h3
                                    className="font-cinzel font-bold text-[#D4AF37] tracking-[0.1em]"
                                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
                                >
                                    {team.name}
                                </h3>
                                <div className="mx-auto h-[1px] w-[120px] bg-[#D4AF37] mt-[12px]" />
                            </motion.div>

                            <div className="flex flex-wrap justify-center gap-[48px] max-w-5xl mx-auto pt-[24px]">
                                {team.members.map((member, mIdx) => {
                                    const flipId = `${tIdx}-${mIdx}`;
                                    return (
                                        <motion.div
                                            key={member.name}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.7, delay: mIdx * 0.1 }}
                                            className="relative h-[450px] w-full max-w-[480px] rounded-sm cursor-pointer group [perspective:1000px]"
                                            onMouseEnter={() => setFlippedIndex(flipId)}
                                            onMouseLeave={() => setFlippedIndex(null)}
                                            onClick={() => setFlippedIndex(flippedIndex === flipId ? null : flipId)}
                                        >
                                            <motion.div
                                                className="w-full h-full absolute top-0 left-0 transition-all duration-700 [transform-style:preserve-3d]"
                                                animate={{ rotateY: flippedIndex === flipId ? 180 : 0 }}
                                            >
                                                {/* Front of Card */}
                                                <div className="absolute inset-0 w-full h-full bg-white shadow-lg overflow-hidden border border-transparent group-hover:border-[var(--color-accent)]/30 [backface-visibility:hidden]">
                                                    <div className="h-2/3 relative overflow-hidden">
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-center"
                                                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop')` }}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    </div>
                                                    <div className="h-1/3 bg-white p-6 text-center flex flex-col justify-center items-center">
                                                        <h3 className="font-serif text-[clamp(1.1rem,2.2vw,1.5rem)] font-semibold text-[#8B0000] line-clamp-1">
                                                            {member.name}
                                                        </h3>
                                                        <p className="text-[var(--color-accent)] font-medium uppercase text-xs tracking-widest mt-2 mb-4 whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                                            {member.role}
                                                        </p>
                                                        <div className="flex items-center text-xs text-stone-400 uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors">
                                                            <span>Read Bio</span>
                                                            <ChevronRight className="w-3 h-3 ml-1" />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Back of Card */}
                                                <div className="absolute inset-0 w-full h-full bg-[#1a0505] text-white shadow-2xl p-8 pt-12 text-center flex flex-col items-center justify-start border border-[var(--color-accent)]/50 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
                                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-accent)] mb-6 shrink-0">
                                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop')` }} />
                                                    </div>
                                                    <h3 className="font-serif text-[clamp(1.1rem,2.2vw,1.5rem)] font-semibold text-white mb-2 line-clamp-1">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-[var(--color-accent)] font-medium uppercase text-[10px] tracking-widest mb-6 border-b border-[var(--color-accent)]/20 pb-4 inline-block px-4">
                                                        {member.role}
                                                    </p>
                                                    <p className="font-sans text-[clamp(0.9rem,1.6vw,1.05rem)] text-[rgba(255,220,180,0.75)] leading-relaxed">
                                                        {member.bio}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-center mt-[80px]"
                >
                    <motion.div
                        className="mx-auto h-[1px] w-[280px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-[24px]"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <p
                        className="font-serif italic"
                        style={{
                            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                            color: 'rgba(255,215,160,0.82)'
                        }}
                    >
                        Every member serves with purpose, passion and the love of Christ.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
