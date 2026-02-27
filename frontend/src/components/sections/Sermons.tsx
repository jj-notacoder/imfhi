"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SERMONS = [
    {
        id: "HDndhcCax8o",
        title: "Miracle Life Healing English Service",
        pastor: "Pastor. ELJOSEN LYIMO",
        date: "18 JAN 2026",
        featured: true,
    },
    {
        id: "76ZCV9tyMBU",
        title: "Miracle Life Healing Tamil Service",
        pastor: "Pastor.Dr Rajkumar",
        date: "17 JAN 2026",
        featured: false,
    },
    {
        id: "5bx0LxxETIY",
        title: "Miracle Life Healing English Service",
        pastor: "Pastor. BRITE",
        date: "11 JAN 2026",
        featured: false,
    },
    {
        id: "l56ZIBSJE6U",
        title: "Miracle Life Healing Tamil Service",
        pastor: "BRO.JASPER",
        date: "10 JAN 2026",
        featured: false,
    },
    {
        id: "dCx7SM_yXk0",
        title: "Miracle Life Healing English Service",
        pastor: "Pastor. John Moses Raj",
        date: "04 JAN 2026",
        featured: false,
    },
    {
        id: "-basY26V0fI",
        title: "Miracle Life Healing Tamil Service",
        pastor: "Pastor. John Moses Raj",
        date: "03 JAN 2026",
        featured: false,
    },
];

const featured = SERMONS[0];
const previous = SERMONS.slice(1);

function thumb(id: string) {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
function embedUrl(id: string) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

export default function Teachings() {
    const [modalId, setModalId] = useState<string | null>(null);

    return (
        <>
            {/* ── Modal overlay ── */}
            <AnimatePresence>
                {modalId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.92)", zIndex: 1000 }}
                        onClick={() => setModalId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "min(900px,90vw)", position: "relative" }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setModalId(null)}
                                className="absolute font-cinzel font-bold text-[#D4AF37] hover:text-white transition-colors duration-200"
                                style={{
                                    top: "-44px", right: "0",
                                    fontSize: "22px", background: "none",
                                    border: "none", cursor: "pointer",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                ✕ CLOSE
                            </button>

                            <iframe
                                src={embedUrl(modalId)}
                                width="100%"
                                height="506"
                                frameBorder="0"
                                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                                allowFullScreen
                                style={{ borderRadius: "8px", display: "block" }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Section ── */}
            <motion.section
                id="teachings"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="teachings-section relative overflow-hidden"
                style={{
                    background: "linear-gradient(180deg,#0D0000 0%,#1a0a00 40%,#111111 100%)",
                    marginTop: "-160px",
                    paddingTop: "220px",
                    paddingBottom: "160px",
                }}
            >
                {/* Top fade */}
                <div className="absolute top-0 left-0 w-full pointer-events-none"
                    style={{ height: "200px", background: "linear-gradient(to bottom, #0D0000 0%, #0D0000 30%, transparent 100%)", zIndex: 10 }} />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{ height: "120px", background: "linear-gradient(to top,#0D0000 0%,transparent 100%)", zIndex: 10 }} />
                {/* Decorative line */}
                <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ top: "80px", zIndex: 11 }}>
                    <motion.div
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                        style={{ width: "280px" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 12 }}>

                    {/* Section heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2
                            className="font-cinzel font-bold text-[#D4AF37] tracking-[0.08em] leading-[1.1]"
                            style={{ fontSize: "clamp(3.2rem,7vw,5.5rem)", textShadow: "0 0 60px rgba(212,175,55,0.25)" }}
                        >
                            MESSAGES
                        </h2>
                        <h3
                            className="font-cinzel font-semibold tracking-[0.06em]"
                            style={{
                                fontSize: "clamp(1.3rem,2.8vw,2rem)",
                                color: "rgba(212,175,55,0.80)",
                                marginTop: "16px",
                                marginBottom: "28px"
                            }}
                        >
                            Latest Teachings
                        </h3>
                    </motion.div>

                    {/* ── Featured sermon ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="mb-20"
                    >
                        {/* Badge + meta */}
                        <div className="mb-5">
                            <span
                                className="font-cinzel uppercase tracking-[0.3em] inline-block mb-4"
                                style={{
                                    fontSize: "10px", color: "#D4AF37",
                                    border: "1px solid rgba(212,175,55,0.4)",
                                    padding: "4px 14px", borderRadius: "20px"
                                }}
                            >
                                Latest Sermon
                            </span>
                            <h3
                                className="font-cinzel font-bold text-[#D4AF37] tracking-[0.04em]"
                                style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", textShadow: "0 0 40px rgba(212,175,55,0.2)" }}
                            >
                                {featured.title}
                            </h3>
                            <p
                                className="font-cinzel font-semibold mt-2 tracking-[0.1em]"
                                style={{ fontSize: "clamp(1rem,2vw,1.3rem)", color: "rgba(212,175,55,0.75)" }}
                            >
                                {featured.pastor}
                            </p>
                            <p
                                className="font-serif italic mt-1"
                                style={{ fontSize: "clamp(0.9rem,1.6vw,1.05rem)", color: "rgba(255,215,160,0.7)" }}
                            >
                                {featured.date}
                            </p>
                        </div>

                        {/* Featured iframe */}
                        <div
                            className="relative w-full overflow-hidden"
                            style={{ borderRadius: "8px", boxShadow: "0 0 60px rgba(212,175,55,0.12), 0 0 120px rgba(212,175,55,0.06)" }}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${featured.id}?rel=0`}
                                width="100%"
                                height="560"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: "block", borderRadius: "8px" }}
                            />
                        </div>
                    </motion.div>

                    {/* ── Previous sermons ── */}
                    <div className="mb-10">
                        <h4
                            className="font-cinzel font-semibold tracking-[0.06em]"
                            style={{
                                fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
                                color: "rgba(212,175,55,0.80)",
                                borderLeft: "3px solid #D4AF37",
                                paddingLeft: "12px",
                                marginBottom: "32px"
                            }}
                        >
                            Previous Sermons
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {previous.map((sermon, i) => (
                                <motion.div
                                    key={sermon.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => setModalId(sermon.id)}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="relative overflow-hidden"
                                        style={{ height: "200px", borderRadius: "6px 6px 0 0" }}
                                    >
                                        <img
                                            src={thumb(sermon.id)}
                                            alt={sermon.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            onError={e => {
                                                (e.target as HTMLImageElement).src =
                                                    `https://img.youtube.com/vi/${sermon.id}/hqdefault.jpg`;
                                            }}
                                        />
                                        {/* Dark overlay */}
                                        <div
                                            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                                            style={{ background: "rgba(0,0,0,0.35)", opacity: 0.2 }}
                                        />
                                        {/* Play button — appears on hover */}
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        >
                                            <div
                                                className="flex items-center justify-center"
                                                style={{
                                                    width: "52px", height: "52px",
                                                    borderRadius: "50%",
                                                    border: "2px solid rgba(212,175,55,0.85)",
                                                    background: "rgba(0,0,0,0.55)",
                                                    backdropFilter: "blur(4px)",
                                                }}
                                            >
                                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                                                    <path d="M0 0L18 10L0 20V0Z" fill="#D4AF37" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name plate */}
                                    <div
                                        style={{
                                            background: "#0D0000",
                                            border: "1px solid rgba(212,175,55,0.12)",
                                            borderTop: "none",
                                            borderRadius: "0 0 6px 6px",
                                            padding: "16px",
                                        }}
                                    >
                                        <p
                                            className="font-cinzel font-semibold text-[#D4AF37] leading-snug mb-2"
                                            style={{ fontSize: "clamp(0.85rem,1.6vw,1rem)" }}
                                        >
                                            {sermon.title}
                                        </p>
                                        <p
                                            className="font-cinzel uppercase tracking-[0.15em] mb-1"
                                            style={{ fontSize: "11px", color: "rgba(212,175,55,0.55)" }}
                                        >
                                            {sermon.pastor}
                                        </p>
                                        <p
                                            className="font-serif italic"
                                            style={{ fontSize: "11px", color: "rgba(255,215,160,0.5)" }}
                                        >
                                            {sermon.date}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Teachings bottom fade — blends into Messages */}
                <div
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{
                        height: "160px",
                        background: "linear-gradient(to bottom,transparent 0%,#0D0000 100%)",
                        zIndex: 15
                    }}
                />
            </motion.section>
        </>
    );
}
