"use client";

import { useEffect, useRef } from "react";

export default function WaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0;
        let H = 0;
        let t = 0;
        let animationFrameId: number;

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // -- Colour palette matched to church theme --
        const COLORS = {
            deepRed: '#7B0000',     // Theme primary
            crimson: '#5c0000',     // Darker red
            ruby: '#400000',        // Even darker red
            scarlet: '#900000',     // Lighter red/border color
            goldDark: '#8a7122',    // Dark gold
            gold: '#D4AF37',        // Theme accent metallic gold
            goldMid: '#e6c86a',     // Mid gold
            goldLight: '#f5d67a',   // Light gold
            goldShine: '#FCFBF9',   // Theme ivory/white for highlights
            bg: '#1a0505',          // Very dark red/black for base background
        };

        // Utility: hex colour + alpha
        const hexAlpha = (hex: string, a: number) => {
            // Basic hex to rgb
            let r = 0, g = 0, b = 0;
            if (hex.length === 7) {
                r = parseInt(hex.slice(1, 3), 16);
                g = parseInt(hex.slice(3, 5), 16);
                b = parseInt(hex.slice(5, 7), 16);
            }
            return `rgba(${r},${g},${b},${a})`;
        };

        // Each layer: { amp, freq, speed, yBase, color, alpha, blur, phase }
        const layers = [
            // Deep background pulse — slow, wide
            { amp: 0.18, freq: 0.6, speed: 0.15, yBase: 0.5, color: COLORS.crimson, alpha: 0.35, phase: 0 },
            { amp: 0.15, freq: 0.8, speed: 0.18, yBase: 0.52, color: COLORS.ruby, alpha: 0.30, phase: 0 },

            // Mid waves — gold over red
            { amp: 0.12, freq: 1.1, speed: 0.28, yBase: 0.48, color: COLORS.goldDark, alpha: 0.45, phase: 0 },
            { amp: 0.10, freq: 1.4, speed: 0.32, yBase: 0.50, color: COLORS.gold, alpha: 0.40, phase: 0 },
            { amp: 0.08, freq: 1.8, speed: 0.40, yBase: 0.51, color: COLORS.goldMid, alpha: 0.35, phase: 0 },

            // Bright accent threads — thin, fast, shimmering
            { amp: 0.05, freq: 2.4, speed: 0.55, yBase: 0.47, color: COLORS.goldLight, alpha: 0.55, phase: 0 },
            { amp: 0.04, freq: 3.0, speed: 0.65, yBase: 0.53, color: COLORS.goldShine, alpha: 0.45, phase: 0 },

            // Bottom glow — deeper reds anchoring the composition
            { amp: 0.20, freq: 0.5, speed: 0.12, yBase: 0.72, color: COLORS.crimson, alpha: 0.28, phase: 0 },
            { amp: 0.14, freq: 0.75, speed: 0.20, yBase: 0.75, color: COLORS.ruby, alpha: 0.22, phase: 0 },

            // Top glow — subtle gold crown
            { amp: 0.14, freq: 0.55, speed: 0.14, yBase: 0.28, color: COLORS.gold, alpha: 0.28, phase: 0 },
            { amp: 0.09, freq: 0.85, speed: 0.22, yBase: 0.25, color: COLORS.goldMid, alpha: 0.22, phase: 0 },
        ];

        // Phase offsets so waves start varied
        layers.forEach((l, i) => { l.phase = (i * 0.71) * Math.PI; });

        const drawWave = (layer: typeof layers[0], time: number) => {
            const { amp, freq, speed, yBase, color, alpha, phase } = layer;
            const yCenter = yBase * H;
            const amplitude = amp * H;

            ctx.beginPath();
            ctx.moveTo(0, H);

            for (let x = 0; x <= W; x += 3) {
                const nx = x / W;
                const y = yCenter
                    + Math.sin(nx * freq * Math.PI * 2 + time * speed + phase) * amplitude
                    + Math.sin(nx * freq * 1.7 * Math.PI * 2 - time * speed * 0.6 + phase * 1.3) * amplitude * 0.45
                    + Math.sin(nx * freq * 2.9 * Math.PI * 2 + time * speed * 0.4 + phase * 0.7) * amplitude * 0.20;
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }

            ctx.lineTo(W, H);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, yCenter - amplitude, 0, yCenter + amplitude * 1.5);
            grad.addColorStop(0, hexAlpha(color, alpha));
            grad.addColorStop(0.5, hexAlpha(color, alpha * 0.6));
            grad.addColorStop(1, hexAlpha(color, 0));
            ctx.fillStyle = grad;
            ctx.fill();
        };

        const drawCrestLine = (layer: typeof layers[0], time: number) => {
            const { amp, freq, speed, yBase, color, alpha, phase } = layer;
            const yCenter = yBase * H;
            const amplitude = amp * H;

            ctx.beginPath();
            for (let x = 0; x <= W; x += 3) {
                const nx = x / W;
                const y = yCenter
                    + Math.sin(nx * freq * Math.PI * 2 + time * speed + phase) * amplitude
                    + Math.sin(nx * freq * 1.7 * Math.PI * 2 - time * speed * 0.6 + phase * 1.3) * amplitude * 0.45
                    + Math.sin(nx * freq * 2.9 * Math.PI * 2 + time * speed * 0.4 + phase * 0.7) * amplitude * 0.20;
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }

            ctx.strokeStyle = hexAlpha(color, Math.min(alpha + 0.3, 1.0));
            ctx.lineWidth = color.includes('ff') || color.includes('f5') || color === COLORS.goldShine || color === COLORS.goldLight ? 1.5 : 1;
            ctx.shadowColor = color;
            ctx.shadowBlur = 18;
            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const drawCentreGlow = (time: number) => {
            const pulse = 0.75 + 0.25 * Math.sin(time * 0.4);
            const cx = W * 0.5, cy = H * 0.5;
            const r = Math.min(W, H) * 0.55 * pulse;

            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            g.addColorStop(0, hexAlpha(COLORS.deepRed, 0.2));
            g.addColorStop(0.4, hexAlpha(COLORS.deepRed, 0.1));
            g.addColorStop(1, hexAlpha(COLORS.bg, 0));

            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);

            // Gold centre shimmer
            const gs = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.4 * pulse);
            gs.addColorStop(0, hexAlpha(COLORS.gold, 0.15));
            gs.addColorStop(0.6, hexAlpha(COLORS.gold, 0.05));
            gs.addColorStop(1, hexAlpha(COLORS.gold, 0));
            ctx.fillStyle = gs;
            ctx.fillRect(0, 0, W, H);
        };

        const drawVignette = () => {
            const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.85);
            g.addColorStop(0, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(0,0,0,0.65)'); // slightly darker vignette
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        };

        const render = () => {
            t += 0.012;

            // Base background
            ctx.fillStyle = COLORS.bg;
            ctx.fillRect(0, 0, W, H);

            drawCentreGlow(t);

            // Draw filled waves back-to-front
            layers.forEach(l => drawWave(l, t));

            // Draw glowing crest lines on the "bright" layers only
            layers.filter(l => l.alpha >= 0.35).forEach(l => drawCrestLine(l, t));

            drawVignette();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ display: "block", zIndex: 0 }}
        />
    );
}
