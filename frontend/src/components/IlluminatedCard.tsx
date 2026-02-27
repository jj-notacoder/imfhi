"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
    name: string;
    role: string;
    imageSrc: string;
    bioText?: string;
}

export default function IlluminatedCard({
    name,
    role,
    imageSrc,
    bioText = "A faithful servant leader committed to guiding our community in faith, love and purpose.",
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);
    const isHover = useRef(false);
    const [flipped, setFlipped] = useState(false);

    /* ── Canvas spark + glow system ─────────────────── */
    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext("2d")!;
        const PAD = 24; // canvas bleeds this many px outside card

        interface Spark {
            x: number; y: number;
            vx: number; vy: number;
            life: number; maxLife: number;
            size: number;
        }
        const sparks: Spark[] = [];

        function addSpark(x: number, y: number) {
            const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
            const s = 0.25 + Math.random() * 0.9;
            sparks.push({
                x, y,
                vx: Math.cos(a) * s * 0.5,
                vy: Math.sin(a) * s - 0.2,
                life: 1,
                maxLife: 55 + Math.random() * 55,
                size: 0.7 + Math.random() * 1.6,
            });
        }

        function syncSize() {
            const currentCanvas = canvasRef.current;
            const currentWrap = wrapRef.current;
            if (!currentCanvas || !currentWrap) return;
            currentCanvas.width = currentWrap.offsetWidth + PAD * 2;
            currentCanvas.height = currentWrap.offsetHeight + PAD * 2;
            currentCanvas.style.left = `-${PAD}px`;
            currentCanvas.style.top = `-${PAD}px`;
        }
        syncSize();
        const ro = new ResizeObserver(syncSize);
        ro.observe(wrap);

        function frame(ts: number) {
            const currentCanvas = canvasRef.current;
            if (!currentCanvas || !ctx) return;
            const W = currentCanvas.width;
            const H = currentCanvas.height;
            const hv = isHover.current;
            ctx.clearRect(0, 0, W, H);

            /* Breathing glow intensity */
            const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0008);
            const base = hv ? 0.18 : 0.08;
            const gAlpha = base + pulse * (hv ? 0.10 : 0.04);

            /* Card rect inside canvas */
            const cx = PAD, cy = PAD;
            const cw = W - PAD * 2;
            const ch = H - PAD * 2;

            /* Bottom glow — strongest */
            const bg = ctx.createLinearGradient(cx, cy + ch - 30, cx, cy + ch + PAD);
            bg.addColorStop(0, `rgba(212,175,55,0)`);
            bg.addColorStop(1, `rgba(212,175,55,${gAlpha * 1.6})`);
            ctx.fillStyle = bg; ctx.fillRect(cx, cy + ch - 30, cw, 30 + PAD);

            /* Left glow */
            const lg = ctx.createLinearGradient(cx - PAD, cy, cx + 20, cy);
            lg.addColorStop(0, `rgba(212,175,55,${gAlpha})`);
            lg.addColorStop(1, `rgba(212,175,55,0)`);
            ctx.fillStyle = lg; ctx.fillRect(cx - PAD, cy, PAD + 20, ch);

            /* Right glow */
            const rg = ctx.createLinearGradient(cx + cw + PAD, cy, cx + cw - 20, cy);
            rg.addColorStop(0, `rgba(212,175,55,${gAlpha})`);
            rg.addColorStop(1, `rgba(212,175,55,0)`);
            ctx.fillStyle = rg; ctx.fillRect(cx + cw - 20, cy, PAD + 20, ch);

            /* Top glow — faintest */
            const tg = ctx.createLinearGradient(cx, cy - PAD, cx, cy + 16);
            tg.addColorStop(0, `rgba(212,175,55,${gAlpha * 0.5})`);
            tg.addColorStop(1, `rgba(212,175,55,0)`);
            ctx.fillStyle = tg; ctx.fillRect(cx, cy - PAD, cw, PAD + 16);

            /* Corner glows */
            ([
                [cx, cy], [cx + cw, cy],
                [cx, cy + ch], [cx + cw, cy + ch]
            ] as [number, number][]).forEach(([qx, qy]) => {
                const r = hv ? 26 : 16;
                const cg = ctx.createRadialGradient(qx, qy, 0, qx, qy, r);
                cg.addColorStop(0, `rgba(255,220,80,${gAlpha * 2})`);
                cg.addColorStop(1, `rgba(212,175,55,0)`);
                ctx.fillStyle = cg;
                ctx.beginPath(); ctx.arc(qx, qy, r, 0, Math.PI * 2); ctx.fill();
                if (Math.random() < (hv ? 0.05 : 0.01)) addSpark(qx, qy);
            });

            /* Bottom edge spark spawns */
            const spawnRate = hv ? 0.22 : 0.06;
            if (Math.random() < spawnRate)
                addSpark(cx + Math.random() * cw, cy + ch);

            /* Side spark spawns */
            if (Math.random() < spawnRate * 0.3) {
                const sx = Math.random() < 0.5 ? cx : cx + cw;
                addSpark(sx, cy + ch * 0.4 + Math.random() * ch * 0.6);
            }

            /* Draw + update sparks */
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x += s.vx + (Math.random() - 0.5) * 0.06;
                s.y += s.vy;
                s.vy += 0.009;
                s.life--;
                if (s.life <= 0) { sparks.splice(i, 1); continue; }
                const a = (s.life / s.maxLife) * 0.9;
                const r = s.size * 2.8;
                const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
                sg.addColorStop(0, `rgba(255,248,160,${a})`);
                sg.addColorStop(0.5, `rgba(212,175,55,${a * 0.55})`);
                sg.addColorStop(1, `rgba(212,175,55,0)`);
                ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
                ctx.fillStyle = sg; ctx.fill();
            }

            /* ── REPLACE with: soft corner arcs only — no full border ── */
            const arcLen = 40; // how long each corner arc extends
            const arcAlpha = 0.35 + (hv ? 0.3 : 0) + pulse * 0.15;
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = `rgba(212,175,55,${arcAlpha})`;
            ctx.shadowColor = "#D4AF37";
            ctx.shadowBlur = hv ? 12 : 6;
            ctx.lineCap = "round";

            // Top-left corner
            ctx.beginPath(); ctx.moveTo(cx, cy + arcLen); ctx.lineTo(cx, cy); ctx.lineTo(cx + arcLen, cy); ctx.stroke();
            // Top-right corner
            ctx.beginPath(); ctx.moveTo(cx + cw - arcLen, cy); ctx.lineTo(cx + cw, cy); ctx.lineTo(cx + cw, cy + arcLen); ctx.stroke();
            // Bottom-left corner
            ctx.beginPath(); ctx.moveTo(cx, cy + ch - arcLen); ctx.lineTo(cx, cy + ch); ctx.lineTo(cx + arcLen, cy + ch); ctx.stroke();
            // Bottom-right corner
            ctx.beginPath(); ctx.moveTo(cx + cw - arcLen, cy + ch); ctx.lineTo(cx + cw, cy + ch); ctx.lineTo(cx + cw, cy + ch - arcLen); ctx.stroke();

            ctx.shadowBlur = 0; // reset shadow

            rafRef.current = requestAnimationFrame(frame);
        }

        rafRef.current = requestAnimationFrame(frame);

        const onEnter = () => { isHover.current = true; setFlipped(true); };
        const onLeave = () => { isHover.current = false; setFlipped(false); };
        wrap.addEventListener("mouseenter", onEnter);
        wrap.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            wrap.removeEventListener("mouseenter", onEnter);
            wrap.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <motion.div
            ref={wrapRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-[480px] cursor-pointer"
            style={{
                perspective: "1200px",
                filter: flipped
                    ? "drop-shadow(0 0 25px rgba(212,175,55,0.35)) drop-shadow(0 0 60px rgba(212,175,55,0.15))"
                    : "drop-shadow(0 0 12px rgba(212,175,55,0.18)) drop-shadow(0 0 30px rgba(212,175,55,0.08))",
                transition: "filter 0.5s ease"
            }}
        >
            {/* Canvas — bleeds outside card for sparks */}
            <canvas
                ref={canvasRef}
                className="absolute pointer-events-none"
                style={{ zIndex: 30 }}
            />

            {/* Flip card */}
            <div
                className="relative w-full"
                style={{
                    height: "520px",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* ── FRONT ── */}
                <div
                    className="absolute inset-0 overflow-hidden rounded-sm"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                >
                    <div
                        className="relative w-full h-[390px]"
                        style={{
                            backgroundImage: `url('${imageSrc}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                        }}
                    >
                        <div
                            className="absolute bottom-0 left-0 w-full h-[80px] pointer-events-none"
                            style={{
                                background: "linear-gradient(to bottom, transparent 0%, #0D0000 100%)"
                            }}
                        />
                    </div>
                    <div
                        className="w-full py-5 px-6 text-center"
                        style={{
                            background: "linear-gradient(180deg, #0D0000 0%, #1a0500 100%)",
                            borderTop: "none",
                        }}
                    >
                        <h4
                            className="font-cinzel font-semibold text-[#D4AF37] tracking-[0.05em]"
                            style={{ fontSize: "clamp(1.05rem,2vw,1.3rem)" }}
                        >
                            {name}
                        </h4>
                        <p className="font-cinzel uppercase tracking-[0.22em] mt-2"
                            style={{ fontSize: "11px", color: "rgba(212,175,55,0.5)" }}>
                            {role}
                        </p>
                        <p className="font-cinzel uppercase tracking-[0.15em] mt-3"
                            style={{ fontSize: "10px", color: "rgba(212,175,55,0.3)" }}>
                            Hover to find out more
                        </p>
                    </div>
                </div>

                {/* ── BACK ── */}
                <div
                    className="absolute inset-0 rounded-sm flex flex-col items-center justify-center px-10 text-center"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(160deg,#1a0500 0%,#0D0000 100%)",
                    }}
                >
                    <span className="text-[#D4AF37] text-5xl mb-5" style={{ opacity: 0.15 }}>✝</span>
                    <h4
                        className="font-cinzel font-bold text-[#D4AF37] tracking-[0.06em] mb-2"
                        style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)" }}
                    >
                        {name}
                    </h4>
                    <p className="font-cinzel uppercase tracking-[0.2em] mb-6"
                        style={{ fontSize: "11px", color: "rgba(212,175,55,0.5)" }}>
                        {role}
                    </p>
                    <p className="font-serif italic"
                        style={{ fontSize: "clamp(0.95rem,1.7vw,1.05rem)", color: "rgba(255,215,160,0.78)", lineHeight: "1.85" }}>
                        {bioText}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
