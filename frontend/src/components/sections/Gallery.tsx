"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const IMAGES = [
    { src: "/pictures/g1.png", caption: "Sunday Service" },
    { src: "/pictures/g2.png", caption: "Worship Night" },
    { src: "/pictures/g3.png", caption: "Fellowship" },
    { src: "/pictures/g4.png", caption: "Youth" },
    { src: "/pictures/g5.png", caption: "Prayer" },
    { src: "/pictures/g6.png", caption: "Miracle Moments" },
];

export default function Gallery() {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    // Keyboard navigation
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (lightboxIdx === null) return;
            if (e.key === "ArrowRight") setLightboxIdx(i => i !== null ? (i + 1) % IMAGES.length : null);
            if (e.key === "ArrowLeft") setLightboxIdx(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null);
            if (e.key === "Escape") setLightboxIdx(null);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [lightboxIdx]);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        function resize() { canvas!.width = canvas!.offsetWidth; canvas!.height = canvas!.offsetHeight; }
        resize();
        window.addEventListener("resize", resize);
        const particles = Array.from({ length: 30 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vy: 0.1 + Math.random() * 0.22,
            vx: (Math.random() - 0.5) * 0.12,
            size: 7 + Math.random() * 14,
            alpha: 0.03 + Math.random() * 0.07,
            symbol: ["✝", "·", "✦", "·", "·"][Math.floor(Math.random() * 5)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.006,
        }));
        function draw() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.size}px serif`;
                ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
                ctx.textAlign = "center";
                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();
                p.y -= p.vy; p.x += p.vx; p.rotation += p.rotSpeed;
                if (p.y < -30) { p.y = canvas!.height + 30; p.x = Math.random() * canvas!.width; }
            });
            rafRef.current = requestAnimationFrame(draw);
        }
        rafRef.current = requestAnimationFrame(draw);
        return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
    }, []);

    return (
        <>
            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.95)", zIndex: 1000 }}
                        onClick={() => setLightboxIdx(null)}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setLightboxIdx(null)}
                            className="absolute font-cinzel font-bold text-[#D4AF37] hover:text-white transition-colors"
                            style={{ top: "24px", right: "32px", fontSize: "20px", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", zIndex: 10 }}
                        >
                            ✕
                        </button>

                        {/* Prev */}
                        <button
                            onClick={e => { e.stopPropagation(); setLightboxIdx(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null); }}
                            className="absolute flex items-center justify-center transition-all duration-200 hover:bg-[rgba(212,175,55,0.15)]"
                            style={{ left: "32px", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", border: "2px solid rgba(212,175,55,0.6)", background: "rgba(0,0,0,0.5)", cursor: "pointer", zIndex: 10 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M12 3L6 9L12 15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Next */}
                        <button
                            onClick={e => { e.stopPropagation(); setLightboxIdx(i => i !== null ? (i + 1) % IMAGES.length : null); }}
                            className="absolute flex items-center justify-center transition-all duration-200 hover:bg-[rgba(212,175,55,0.15)]"
                            style={{ right: "32px", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", border: "2px solid rgba(212,175,55,0.6)", background: "rgba(0,0,0,0.5)", cursor: "pointer", zIndex: 10 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M6 3L12 9L6 15" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxIdx}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            onClick={e => e.stopPropagation()}
                            style={{ position: "relative" }}
                        >
                            <img
                                src={IMAGES[lightboxIdx].src}
                                alt={IMAGES[lightboxIdx].caption}
                                style={{
                                    maxWidth: "90vw", maxHeight: "85vh",
                                    objectFit: "contain", borderRadius: "6px",
                                    boxShadow: "0 0 80px rgba(212,175,55,0.2)",
                                    display: "block",
                                }}
                            />
                            <p className="font-cinzel uppercase tracking-[0.3em] text-center mt-4"
                                style={{ fontSize: "12px", color: "rgba(212,175,55,0.6)" }}>
                                {IMAGES[lightboxIdx].caption}
                            </p>

                            {/* Counter */}
                            <p className="font-cinzel text-center mt-2"
                                style={{ fontSize: "10px", color: "rgba(212,175,55,0.35)", letterSpacing: "0.2em" }}>
                                {lightboxIdx + 1} / {IMAGES.length}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section */}
            <motion.section
                id="gallery"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="gallery-section relative overflow-hidden"
                style={{
                    background: "linear-gradient(180deg,#0D0000 0%,#1a0a00 40%,#111111 100%)",
                    marginTop: "-160px",
                    paddingTop: "220px",
                    paddingBottom: "160px",
                }}
            >
                {/* Particle canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />

                {/* Center radial glow */}
                <div className="absolute pointer-events-none" style={{
                    top: "35%", left: "50%", transform: "translate(-50%,-50%)",
                    width: "700px", height: "700px",
                    background: "radial-gradient(circle,rgba(212,175,55,0.04) 0%,transparent 70%)",
                    zIndex: 2,
                }} />

                {/* Top fade */}
                <div className="absolute top-0 left-0 w-full pointer-events-none"
                    style={{ height: "120px", background: "linear-gradient(to bottom,#0D0000 0%,transparent 100%)", zIndex: 10 }} />
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 20 }}>

                    {/* Heading */}
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
                            GALLERY
                        </h2>
                        <h3
                            className="font-cinzel font-semibold tracking-[0.06em]"
                            style={{ fontSize: "clamp(1.3rem,2.8vw,2rem)", color: "rgba(212,175,55,0.80)", marginTop: "16px", marginBottom: "16px" }}
                        >
                            Moments of Grace
                        </h3>
                        <p
                            className="font-serif italic"
                            style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "rgba(255,215,160,0.82)", lineHeight: "1.85", maxWidth: "560px", marginBottom: "28px" }}
                        >
                            Glimpses of God&apos;s presence among us — captured in worship, fellowship and praise.
                        </p>
                        <motion.div
                            className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                            style={{ width: "200px" }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* ── Asymmetric masonry grid ── */}

                    {/* Row 1 — large feature left + two stacked right */}
                    <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "2fr 1fr" }}>

                        {/* Large feature */}
                        <motion.div
                            className="relative overflow-hidden cursor-pointer group"
                            style={{ borderRadius: "6px", height: "520px" }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            onClick={() => setLightboxIdx(0)}
                        >
                            <img
                                src="/pictures/g1.png"
                                alt="gallery 1"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.7)", borderRadius: "6px" }} />
                        </motion.div>

                        {/* Two stacked */}
                        <div className="flex flex-col gap-3">
                            {[1, 2].map((imgIdx, i) => (
                                <motion.div
                                    key={imgIdx}
                                    className="relative overflow-hidden cursor-pointer group"
                                    style={{ borderRadius: "6px", height: "252px" }}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.75, ease: "easeOut", delay: i * 0.15 }}
                                    onClick={() => setLightboxIdx(imgIdx)}
                                >
                                    <img
                                        src={`/pictures/g${imgIdx + 1}.png`}
                                        alt={`gallery ${imgIdx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                    />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.7)", borderRadius: "6px" }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 — three equal */}
                    <div className="grid grid-cols-3 gap-3">
                        {[3, 4, 5].map((imgIdx, i) => (
                            <motion.div
                                key={imgIdx}
                                className="relative overflow-hidden cursor-pointer group"
                                style={{ borderRadius: "6px", height: "300px" }}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.65, ease: "easeOut", delay: i * 0.1 }}
                                onClick={() => setLightboxIdx(imgIdx)}
                            >
                                <img
                                    src={`/pictures/g${imgIdx + 1}.png`}
                                    alt={`gallery ${imgIdx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                                />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ boxShadow: "inset 0 0 0 2px rgba(212,175,55,0.7)", borderRadius: "6px" }} />
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Bottom fade into PrayerRequests */}
                <div
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{ height: "160px", background: "linear-gradient(to bottom,transparent 0%,#0D0000 100%)", zIndex: 15 }}
                />
            </motion.section>
        </>
    );
}
