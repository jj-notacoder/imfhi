"use client";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

const services = [
    {
        name: "ENGLISH SERVICE",
        day: "Every Sunday",
        time: "3:00 PM",
        location: "F1 Hall, Bretheren Church, Mussafah",
        extra: null,
        leader: null,
    },
    {
        name: "TAMIL SERVICE",
        day: "Every Saturday",
        time: "5:30 PM",
        location: "F2 Hall, Bretheren Church, Mussafah",
        extra: null,
        leader: null,
    },
    {
        name: "BIBLE STUDY",
        day: "Every Wednesday",
        time: "8:30 PM – 9:30 PM",
        location: "Online — Zoom / Live Stream",
        extra: "UAE Time",
        leader: "Led by Pastor Dr. Rajkumar",
    },
];

export default function ServicesLocation() {
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

        // Floating cross + dot particles
        interface Particle {
            x: number; y: number; vy: number; vx: number;
            size: number; alpha: number; symbol: string;
            rotation: number; rotSpeed: number;
        }
        const symbols = ["✝", "✦", "·", "·", "✝", "·", "✦", "·"];
        const particles: Particle[] = Array.from({ length: 35 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vy: 0.1 + Math.random() * 0.25,
            vx: (Math.random() - 0.5) * 0.15,
            size: 8 + Math.random() * 16,
            alpha: 0.04 + Math.random() * 0.1,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.008,
        }));

        // Spark bursts
        interface Spark {
            x: number; y: number; vx: number; vy: number;
            life: number; maxLife: number; size: number;
        }
        const sparks: Spark[] = [];

        function burstSparks(x: number, y: number, count = 12) {
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
                const speed = 0.5 + Math.random() * 2.5;
                const maxLife = 40 + Math.random() * 50;
                sparks.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1,
                    life: maxLife,
                    maxLife: maxLife,
                    size: 1 + Math.random() * 2.5,
                });
            }
        }

        // Pulse rings
        interface Ring {
            x: number; y: number; r: number; maxR: number; alpha: number;
        }
        const rings: Ring[] = [];

        function addRing(x: number, y: number) {
            rings.push({ x, y, r: 0, maxR: 120 + Math.random() * 80, alpha: 0.25 });
        }

        // Random burst timer
        let burstTimer = 0;
        let ringTimer = 0;

        function draw(ts: number) {
            const W = canvas!.width;
            const H = canvas!.height;
            ctx.clearRect(0, 0, W, H);

            burstTimer++;
            ringTimer++;

            // Random spark burst every ~4 seconds
            if (burstTimer > 240) {
                burstTimer = 0;
                burstSparks(
                    W * 0.15 + Math.random() * W * 0.7,
                    H * 0.2 + Math.random() * H * 0.6,
                    10
                );
            }

            // Random ring pulse every ~3 seconds
            if (ringTimer > 180) {
                ringTimer = 0;
                addRing(
                    W * 0.1 + Math.random() * W * 0.8,
                    H * 0.1 + Math.random() * H * 0.8
                );
            }

            // Draw floating particles
            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.size}px serif`;
                ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
                ctx.textAlign = "center";
                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();
                p.y -= p.vy;
                p.x += p.vx;
                p.rotation += p.rotSpeed;
                if (p.y < -30) { p.y = H + 30; p.x = Math.random() * W; }
                if (p.x < -30) p.x = W + 30;
                if (p.x > W + 30) p.x = -30;
            });

            // Draw pulse rings
            for (let i = rings.length - 1; i >= 0; i--) {
                const ring = rings[i];
                ring.r += 1.2;
                ring.alpha -= 0.003;
                if (ring.alpha <= 0) { rings.splice(i, 1); continue; }

                ctx.beginPath();
                ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(212,175,55,${ring.alpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Second inner ring slightly behind
                if (ring.r > 20) {
                    ctx.beginPath();
                    ctx.arc(ring.x, ring.y, ring.r - 18, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(212,175,55,${ring.alpha * 0.4})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Draw sparks
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.06;
                s.vx *= 0.98;
                s.life--;
                if (s.life <= 0) { sparks.splice(i, 1); continue; }

                const a = (s.life / s.maxLife) * 0.85;
                const r = s.size * 2.5;
                const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
                sg.addColorStop(0, `rgba(255,248,150,${a})`);
                sg.addColorStop(0.4, `rgba(212,175,55,${a * 0.6})`);
                sg.addColorStop(1, `rgba(212,175,55,0)`);
                ctx.beginPath();
                ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
                ctx.fillStyle = sg;
                ctx.fill();
            }

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
            id="gather"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="gather-section relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg,#0D0000 0%,#1a0a00 40%,#111111 100%)",
                marginTop: "-160px",
                paddingTop: "220px",
                paddingBottom: "160px",
            }}
        >
            {/* Top fade */}
            <div className="absolute top-0 left-0 w-full pointer-events-none"
                style={{ height: "120px", background: "linear-gradient(to bottom,#0D0000 0%,transparent 100%)", zIndex: 10 }} />

            {/* Creative particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 2 }}
            />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{ height: "120px", background: "linear-gradient(to top,#0D0000 0%,transparent 100%)", zIndex: 10 }} />
            {/* Decorative top line */}
            <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ top: "80px", zIndex: 11 }}>
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
                        GATHER WITH US
                    </h2>
                    <h3
                        className="font-cinzel font-semibold tracking-[0.06em]"
                        style={{ fontSize: "clamp(1.3rem,2.8vw,2rem)", color: "rgba(212,175,55,0.80)", marginTop: "16px", marginBottom: "20px" }}
                    >
                        Join Us in Worship
                    </h3>
                    <p
                        className="font-serif italic"
                        style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "rgba(255,215,160,0.82)", lineHeight: "1.85", maxWidth: "560px", marginBottom: "28px" }}
                    >
                        We gather weekly to worship Jesus, hear God&apos;s Word, and encourage one another.
                        There is a place for you here.
                    </p>
                    <motion.div
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                        style={{ width: "200px" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* Service cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
                    {services.map((svc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
                            className="relative group overflow-hidden rounded-lg cursor-default"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(212,175,55,0.18)",
                                padding: "36px 40px 36px 48px",
                                transition: "all 0.3s ease",
                            }}
                            whileHover={{
                                backgroundColor: "rgba(212,175,55,0.05)",
                            }}
                            onMouseEnter={() => {
                                // Handled by canvas glow naturally, but we maintain the hook just in case for futures
                            }}
                        >
                            {/* Left gold accent bar */}
                            <div
                                className="absolute left-0 top-6 bottom-6 w-1 rounded-r-sm"
                                style={{ background: "linear-gradient(to bottom,#D4AF37,rgba(212,175,55,0.2))" }}
                            />

                            {/* Top shimmer line on hover */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100"
                                style={{
                                    background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
                                    transition: "opacity 0.4s ease",
                                }}
                            />

                            {/* Inner glow at bottom on hover */}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-[60px] opacity-0 group-hover:opacity-100 pointer-events-none rounded-b-lg"
                                style={{
                                    background: "linear-gradient(to top, rgba(212,175,55,0.06), transparent)",
                                    transition: "opacity 0.4s ease",
                                }}
                            />

                            {/* Floating cross */}
                            <div
                                className="absolute top-6 right-6 font-cinzel"
                                style={{ fontSize: "2.5rem", color: "rgba(212,175,55,0.12)", lineHeight: 1 }}
                            >
                                ✝
                            </div>

                            {/* Service name */}
                            <p
                                className="font-cinzel font-bold tracking-[0.1em] mb-5"
                                style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#D4AF37", letterSpacing: "0.12em" }}
                            >
                                {svc.name}
                            </p>

                            {/* Day — very large */}
                            <p
                                className="font-cinzel font-bold text-white leading-tight"
                                style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "0.02em" }}
                            >
                                {svc.day}
                            </p>

                            {/* Time — very large */}
                            <p
                                className="font-cinzel font-bold text-white leading-tight mb-2"
                                style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "0.02em" }}
                            >
                                {svc.time}
                            </p>

                            {/* UAE time label */}
                            {svc.extra && (
                                <p className="font-cinzel uppercase tracking-[0.3em]"
                                    style={{ fontSize: "11px", color: "rgba(212,175,55,0.45)", marginTop: "4px" }}>
                                    {svc.extra}
                                </p>
                            )}

                            {/* Leader */}
                            {svc.leader && (
                                <p className="font-cinzel font-semibold"
                                    style={{ fontSize: "clamp(0.85rem,1.5vw,1rem)", color: "rgba(212,175,55,0.65)", marginTop: "12px", letterSpacing: "0.04em" }}>
                                    {svc.leader}
                                </p>
                            )}

                            {/* Location */}
                            <div className="flex items-start gap-3 mt-5">
                                <span style={{ color: "#D4AF37", fontSize: "18px", marginTop: "3px" }}>📍</span>
                                <p
                                    className="font-cinzel font-bold"
                                    style={{ fontSize: "clamp(1.05rem,2vw,1.35rem)", color: "#D4AF37", letterSpacing: "0.05em", lineHeight: "1.5" }}
                                >
                                    {svc.location}
                                </p>
                            </div>

                            {/* Hover bottom glow */}
                            <div
                                className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: "linear-gradient(to right,transparent,#D4AF37,transparent)" }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Find Us map section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h4
                        className="font-cinzel font-semibold tracking-[0.06em] mb-6"
                        style={{
                            fontSize: "clamp(1.1rem,2.2vw,1.5rem)",
                            color: "rgba(212,175,55,0.80)",
                            borderLeft: "3px solid #D4AF37",
                            paddingLeft: "12px",
                        }}
                    >
                        Find Us
                    </h4>

                    {/* Map embed */}
                    <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 0 40px rgba(212,175,55,0.1)" }}>
                        <iframe
                            src="https://maps.google.com/maps?q=Brethren+Church+Mussafah+Abu+Dhabi&output=embed"
                            width="100%"
                            height="420"
                            style={{
                                border: "none",
                                display: "block",
                                filter: "grayscale(0.2) contrast(1.05) brightness(0.95)",
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Address + directions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <p
                            className="font-cinzel font-bold text-[#D4AF37] tracking-[0.06em] mb-6"
                            style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)" }}
                        >
                            Bretheren Church, Mussafah, Abu Dhabi, UAE
                        </p>
                        <a
                            href="https://maps.app.goo.gl/r4j5R4Nzf8wXedgt5"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-cinzel font-bold uppercase tracking-[0.3em] inline-block transition-all duration-250"
                            style={{
                                fontSize: "clamp(1rem,1.8vw,1.3rem)",
                                color: "#D4AF37",
                                border: "2px solid #D4AF37",
                                padding: "20px 72px",
                                borderRadius: "2px",
                                textDecoration: "none",
                                letterSpacing: "0.3em",
                                boxShadow: "0 0 20px rgba(212,175,55,0.2), inset 0 0 20px rgba(212,175,55,0.05)",
                                background: "rgba(212,175,55,0.06)",
                                display: "inline-block",
                                marginTop: "40px",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.15)";
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(212,175,55,0.35), inset 0 0 30px rgba(212,175,55,0.1)";
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#D4AF37";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.06)";
                                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(212,175,55,0.2), inset 0 0 20px rgba(212,175,55,0.05)";
                                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#D4AF37";
                            }}
                        >
                            GET DIRECTIONS
                        </a>
                    </motion.div>
                </motion.div>

            </div>

            {/* Bottom fade into Gallery */}
            <div
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{ height: "160px", background: "linear-gradient(to bottom,transparent 0%,#0D0000 100%)", zIndex: 15 }}
            />
        </motion.section>
    );
}
