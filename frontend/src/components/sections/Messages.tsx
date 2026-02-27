"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const MESSAGES = [
    {
        id: "OxLzHiPyXQg",
        title: "இயேசு கிறிஸ்து, நமக்காக பாவமானார்..",
        pastor: "Ps. John Moses Raj",
        date: "27 Feb 2026",
        featured: true,
    },
    {
        id: "LAQRNyKk4mE",
        title: "நம் ஓட்டத்தில், பொறுமையாய் ஓடுவோம்..",
        pastor: "Ps. John Moses Raj",
        date: "26 Feb 2026",
        featured: false,
    },
    {
        id: "XXt6WFvzGuw",
        title: "கர்த்தர், பெரிய காரியங்களைச் செய்வார்..",
        pastor: "Ps. John Moses Raj",
        date: "25 Feb 2026",
        featured: false,
    },
    {
        id: "2mkwaVFaExo",
        title: "என் ஜனங்கள் ஒருபோதும் வெட்கப்படுவதில்லை..",
        pastor: "Ps. John Moses Raj",
        date: "24 Feb 2026",
        featured: false,
    },
    {
        id: "ydPeYUc4AFk",
        title: "கர்த்தர் சொன்ன நல்வார்த்தையை, நிட்சயம் நிறைவேற்றுவார்..",
        pastor: "Ps. John Moses Raj",
        date: "23 Feb 2026",
        featured: false,
    },
    {
        id: "zC50hOVUa-o",
        title: "கர்த்தரே, நமக்கு துணை..",
        pastor: "Ps. John Moses Raj",
        date: "22 Feb 2026",
        featured: false,
    },
    {
        id: "wT6jIdciL94",
        title: "கூப்பிடுகிற எளியவனையும், சிறுமையானவனையும், இயேசு விடுவிப்பார்..",
        pastor: "Ps. John Moses Raj",
        date: "21 Feb 2026",
        featured: false,
    },
    {
        id: "ing8o-q_qh4",
        title: "உண்மையான மனுஷன், பரிபூரண ஆசீர்வாதங்களைப் பெறுவான்..",
        pastor: "Ps. John Moses Raj",
        date: "20 Feb 2026",
        featured: false,
    },
    {
        id: "_VnBNQG8bWI",
        title: "கர்த்தர் உங்களை நேசிக்கிறார்..",
        pastor: "Ps. John Moses Raj",
        date: "19 Feb 2026",
        featured: false,
    },
    {
        id: "vuJ5c6zd9N4",
        title: "தேவன் உங்கள் வாழ்வை மாற்றுவார்..",
        pastor: "Ps. John Moses Raj",
        date: "18 Feb 2026",
        featured: false,
    },
    {
        id: "-ov2Gf0dg1s",
        title: "இயேசுவை நம்புவோர் வெட்கப்படமாட்டார்கள்..",
        pastor: "Ps. John Moses Raj",
        date: "17 Feb 2026",
        featured: false,
    },
    {
        id: "Oac6BxP6-4c",
        title: "கர்த்தர் உங்கள் ஜெபத்தை கேட்கிறார்..",
        pastor: "Ps. John Moses Raj",
        date: "16 Feb 2026",
        featured: false,
    },
];

const featured = MESSAGES[0];
const gridItems = MESSAGES.slice(1);

function thumb(id: string) {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function Messages() {
    const [modalId, setModalId] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            canvas!.width = canvas!.offsetWidth;
            canvas!.height = canvas!.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: 22 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vy: 0.12 + Math.random() * 0.25,
            size: 7 + Math.random() * 9,
            alpha: 0.03 + Math.random() * 0.07,
            symbol: ["✦", "·", "·", "·", "✦", "·"][Math.floor(Math.random() * 6)],
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
            particles.forEach(p => {
                ctx.font = `${p.size}px serif`;
                ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
                ctx.fillText(p.symbol, p.x, p.y);
                p.y -= p.vy;
                if (p.y < -20) { p.y = canvas!.height + 20; p.x = Math.random() * canvas!.width; }
            });
            rafRef.current = requestAnimationFrame(draw);
        }
        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {modalId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.93)", zIndex: 1000 }}
                        onClick={() => setModalId(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={e => e.stopPropagation()}
                            style={{ width: "min(900px,90vw)", position: "relative" }}
                        >
                            <button
                                onClick={() => setModalId(null)}
                                className="absolute font-cinzel font-bold text-[#D4AF37] hover:text-white transition-colors duration-200"
                                style={{ top: "-44px", right: "0", fontSize: "20px", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}
                            >
                                ✕ CLOSE
                            </button>
                            <iframe
                                src={`https://www.youtube.com/embed/${modalId}?autoplay=1&rel=0`}
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

            {/* Section */}
            <motion.section
                id="messages"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="messages-section relative overflow-hidden"
                style={{
                    background: "linear-gradient(180deg,#0D0000 0%,#1a0a00 40%,#111111 100%)",
                    marginTop: "-2px",
                    paddingTop: "160px",
                    paddingBottom: "160px",
                }}
            >
                {/* Ambient particle canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                />

                {/* Top fade */}
                <div className="absolute top-0 left-0 w-full pointer-events-none"
                    style={{ height: "120px", background: "linear-gradient(to bottom,#0D0000 0%,transparent 100%)", zIndex: 12 }} />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{ height: "120px", background: "linear-gradient(to top,#0D0000 0%,transparent 100%)", zIndex: 12 }} />

                {/* Decorative top line */}
                <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ top: "60px", zIndex: 13 }}>
                    <motion.div
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                        style={{ width: "280px" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 20 }}>

                    {/* Heading block */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="mb-16"
                    >
                        <h2
                            className="font-cinzel font-bold text-[#D4AF37] tracking-[0.08em] leading-[1.1]"
                            style={{ fontSize: "clamp(3.2rem,7vw,5.5rem)", textShadow: "0 0 60px rgba(212,175,55,0.25)" }}
                        >
                            MESSAGES
                        </h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="font-cinzel font-semibold tracking-[0.06em]"
                            style={{
                                fontSize: "clamp(1.3rem,2.8vw,2rem)",
                                color: "rgba(212,175,55,0.80)",
                                marginTop: "16px",
                                marginBottom: "16px",
                            }}
                        >
                            Kaalai Manna
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="font-serif italic"
                            style={{
                                fontSize: "clamp(1rem,1.8vw,1.2rem)",
                                color: "rgba(255,215,160,0.82)",
                                lineHeight: "1.85",
                                maxWidth: "580px",
                                marginBottom: "28px",
                            }}
                        >
                            Daily devotional messages from Pastor John Moses Raj — a word of strength for every morning.
                        </motion.p>
                        <motion.div
                            className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                            style={{ width: "200px" }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Featured message */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="mb-20"
                    >
                        <div className="mb-5">
                            <span
                                className="font-cinzel uppercase tracking-[0.3em] inline-block mb-4"
                                style={{
                                    fontSize: "10px", color: "#D4AF37",
                                    border: "1px solid rgba(212,175,55,0.4)",
                                    padding: "4px 14px", borderRadius: "20px",
                                }}
                            >
                                Latest Message
                            </span>
                            <h3
                                className="font-cinzel font-bold text-[#D4AF37] tracking-[0.03em] leading-snug"
                                style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", textShadow: "0 0 40px rgba(212,175,55,0.2)", maxWidth: "720px" }}
                            >
                                {featured.title}
                            </h3>
                            <p className="font-cinzel font-semibold mt-2 tracking-[0.1em]"
                                style={{ fontSize: "clamp(0.9rem,1.8vw,1.1rem)", color: "rgba(212,175,55,0.75)" }}>
                                {featured.pastor}
                            </p>
                            <p className="font-serif italic mt-1"
                                style={{ fontSize: "clamp(0.85rem,1.5vw,1rem)", color: "rgba(255,215,160,0.65)" }}>
                                {featured.date}
                            </p>
                        </div>

                        <div style={{ borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 60px rgba(212,175,55,0.12),0 0 120px rgba(212,175,55,0.05)" }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${featured.id}?rel=0`}
                                width="100%"
                                height="520"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: "block" }}
                            />
                        </div>
                    </motion.div>

                    {/* Previous messages grid */}
                    <div>
                        <h4
                            className="font-cinzel font-semibold tracking-[0.06em]"
                            style={{
                                fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
                                color: "rgba(212,175,55,0.80)",
                                borderLeft: "3px solid #D4AF37",
                                paddingLeft: "12px",
                                marginBottom: "32px",
                            }}
                        >
                            Previous Messages
                        </h4>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            {gridItems.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
                                    className="group cursor-pointer"
                                    onClick={() => setModalId(msg.id)}
                                    style={{
                                        transition: "box-shadow 0.3s ease",
                                    }}
                                    whileHover={{ y: -4 }}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="relative overflow-hidden"
                                        style={{ height: "160px", borderRadius: "6px 6px 0 0" }}
                                    >
                                        <img
                                            src={thumb(msg.id)}
                                            alt={msg.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                                            onError={e => {
                                                (e.target as HTMLImageElement).src =
                                                    `https://img.youtube.com/vi/${msg.id}/hqdefault.jpg`;
                                            }}
                                        />
                                        {/* Overlay */}
                                        <div
                                            className="absolute inset-0 transition-opacity duration-300"
                                            style={{ background: "rgba(0,0,0,0.25)", opacity: 0 }}
                                        />
                                        {/* Hover overlay darkens */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{ background: "rgba(0,0,0,0.35)" }}
                                        />
                                        {/* Play button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <div
                                                className="flex items-center justify-center"
                                                style={{
                                                    width: "44px", height: "44px",
                                                    borderRadius: "50%",
                                                    border: "2px solid rgba(212,175,55,0.85)",
                                                    background: "rgba(0,0,0,0.6)",
                                                    backdropFilter: "blur(4px)",
                                                }}
                                            >
                                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" style={{ marginLeft: "2px" }}>
                                                    <path d="M0 0L14 8L0 16V0Z" fill="#D4AF37" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Duration-style badge — episode number */}
                                        <div
                                            className="absolute bottom-2 right-2 font-cinzel uppercase tracking-[0.1em]"
                                            style={{
                                                fontSize: "9px",
                                                color: "rgba(212,175,55,0.9)",
                                                background: "rgba(0,0,0,0.7)",
                                                padding: "2px 7px",
                                                borderRadius: "3px",
                                                backdropFilter: "blur(4px)",
                                            }}
                                        >
                                            {msg.date}
                                        </div>
                                    </div>

                                    {/* Name plate */}
                                    <div
                                        className="transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.12)]"
                                        style={{
                                            background: "#0D0000",
                                            border: "1px solid rgba(212,175,55,0.12)",
                                            borderTop: "none",
                                            borderRadius: "0 0 6px 6px",
                                            padding: "12px",
                                        }}
                                    >
                                        <p
                                            className="font-cinzel font-semibold text-[#D4AF37] leading-snug mb-1"
                                            style={{
                                                fontSize: "clamp(0.72rem,1.3vw,0.85rem)",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {msg.title}
                                        </p>
                                        <p
                                            className="font-cinzel uppercase tracking-[0.12em]"
                                            style={{ fontSize: "10px", color: "rgba(212,175,55,0.45)", marginTop: "4px" }}
                                        >
                                            {msg.pastor}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Messages bottom fade */}
                <div
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{ height: "160px", background: "linear-gradient(to bottom,transparent 0%,#0D0000 100%)", zIndex: 15 }}
                />
            </motion.section>
        </>
    );
}
