"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Worship() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    /* Subtle floating particle background */
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

        interface Particle { x: number; y: number; vy: number; size: number; alpha: number; symbol: string; }
        const symbols = ["♪", "♩", "·", "·", "·", "·"];
        const particles: Particle[] = Array.from({ length: 28 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vy: 0.15 + Math.random() * 0.3,
            size: 8 + Math.random() * 10,
            alpha: 0.04 + Math.random() * 0.1,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
        }));

        function draw() {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height);
            particles.forEach(p => {
                ctx.font = `${p.size}px serif`;
                ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
                ctx.fillText(p.symbol, p.x, p.y);
                p.y -= p.vy;
                if (p.y < -20) {
                    p.y = canvas!.height + 20;
                    p.x = Math.random() * canvas!.width;
                }
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
        <motion.section
            ref={sectionRef}
            id="worship"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="worship-section relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg,#0D0000 0%,#1a0a00 40%,#111111 100%)",
                marginTop: "-2px",
                paddingBottom: "160px",
            }}
        >
            {/* Particle canvas background */}
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

            {/* ═══════════════════════════════════════
          ZONE 1 — Text left / Spotify right
          ═══════════════════════════════════════ */}
            <div
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
                style={{ zIndex: 10, paddingTop: "140px", paddingBottom: "60px" }}
            >
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT — Heading + subheading + paragraph */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                    >
                        <h2
                            className="font-cinzel font-bold text-[#D4AF37] tracking-[0.08em] leading-[1.1]"
                            style={{ fontSize: "clamp(3.2rem,7vw,5.5rem)", textShadow: "0 0 60px rgba(212,175,55,0.25)" }}
                        >
                            WORSHIP
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
                                marginBottom: "20px"
                            }}
                        >
                            Spirit & Truth
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="font-serif"
                            style={{
                                fontSize: "clamp(1rem,1.8vw,1.2rem)",
                                color: "rgba(255,215,160,0.82)",
                                lineHeight: "1.85",
                                maxWidth: "500px"
                            }}
                        >
                            Worship is at the heart of everything we do — our response to God&apos;s overwhelming love.
                            We invite you to join us in lifting up the name of Jesus through songs of praise,
                            adoration and surrender.
                        </motion.p>

                        {/* Flickering divider */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8"
                        >
                            <motion.div
                                className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                                style={{ width: "200px" }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — Spotify iframe */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
                    >
                        {/* NOW PLAYING */}
                        <div className="flex items-center gap-2 mb-3">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-[#1DB954] flex-shrink-0"
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <span className="font-cinzel uppercase tracking-[0.3em]"
                                style={{ fontSize: "11px", color: "rgba(212,175,55,0.45)" }}>
                                Now Playing
                            </span>
                        </div>

                        <iframe
                            src="https://open.spotify.com/embed/playlist/37i9dQZF1DWVlWpJblBvap?utm_source=generator&theme=0"
                            width="100%"
                            height="360"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{
                                borderRadius: "12px",
                                boxShadow: "0 0 40px rgba(212,175,55,0.15),0 0 80px rgba(212,175,55,0.06)",
                                display: "block",
                            }}
                        />
                    </motion.div>

                </div>
            </div>

            {/* ═══════════════════════════════════════
          ZONE 2 — Full bleed choir image
          ═══════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="relative w-full"
                style={{ zIndex: 10 }}
            >
                {/* Full bleed image — no container padding */}
                <div className="relative w-full overflow-hidden">
                    <img
                        src="/pictures/worship.png"
                        alt="Our Worship Team"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            filter: "sepia(0.08) brightness(0.85) contrast(1.06)",
                        }}
                    />

                    {/* Top dark fade over image */}
                    <div
                        className="absolute top-0 left-0 w-full pointer-events-none"
                        style={{ height: "120px", background: "linear-gradient(to bottom,#0D0000 0%,transparent 100%)" }}
                    />
                    {/* Bottom dark fade under image */}
                    <div
                        className="absolute bottom-0 left-0 w-full pointer-events-none"
                        style={{ height: "160px", background: "linear-gradient(to top,#0D0000 0%,transparent 100%)" }}
                    />

                    {/* Centered caption overlay at bottom of image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute bottom-12 left-0 w-full text-center"
                        style={{ zIndex: 5 }}
                    >
                        <h4
                            className="font-cinzel font-semibold tracking-[0.06em]"
                            style={{
                                fontSize: "clamp(1.6rem,3.2vw,2.4rem)",
                                color: "rgba(212,175,55,0.90)",
                                textShadow: "0 0 40px rgba(0,0,0,0.8)",
                                marginBottom: "8px"
                            }}
                        >
                            Our Worship Team
                        </h4>
                        <p
                            className="font-serif italic"
                            style={{
                                fontSize: "clamp(0.95rem,1.7vw,1.1rem)",
                                color: "rgba(255,215,160,0.80)",
                                textShadow: "0 0 20px rgba(0,0,0,0.9)"
                            }}
                        >
                            Lifting His name in spirit and in truth, every week.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Worship bottom fade — bleeds into Teachings */}
            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{
                    height: "180px",
                    background: "linear-gradient(to bottom, transparent 0%, #0D0000 100%)",
                    zIndex: 15
                }}
            />

        </motion.section>
    );
}
