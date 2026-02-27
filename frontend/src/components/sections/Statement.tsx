"use client";

import { useEffect, useRef, useState } from "react";

export default function Statement() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [familiesReached, setFamiliesReached] = useState(0);
    const [yearsMinistry, setYearsMinistry] = useState(0);

    // Canvas Ember Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const embers = Array.from({ length: 65 }, () => ({
            x: Math.random(),
            y: 0.4 + Math.random() * 0.7,
            size: 1.0 + Math.random() * 2.5,
            speedY: 0.00022 + Math.random() * 0.00038,
            speedX: (Math.random() - 0.5) * 0.00014,
            phase: Math.random() * Math.PI * 2,
            freq: 0.25 + Math.random() * 0.55,
            gold: Math.random() > 0.35,
            alpha: 0.18 + Math.random() * 0.38,
        }));

        let animationFrameId: number;

        const drawEmbers = (ts: number) => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            embers.forEach((e) => {
                e.y -= e.speedY;
                e.x += e.speedX + Math.sin(ts * 0.00038 * e.freq + e.phase) * 0.00016;

                if (e.y < -0.05) {
                    e.y = 1.06;
                    e.x = Math.random();
                }
                if (e.x < 0) e.x = 1;
                if (e.x > 1) e.x = 0;

                const fadeTop = Math.min(e.y * 5.5, 1);
                const a = e.alpha * fadeTop;
                const r = e.size * 3.8;

                const g = ctx.createRadialGradient(e.x * W, e.y * H, 0, e.x * W, e.y * H, r);
                if (e.gold) {
                    g.addColorStop(0, `rgba(212,175,55,${a})`);
                    g.addColorStop(1, `rgba(212,175,55,0)`);
                } else {
                    g.addColorStop(0, `rgba(190,15,0,${a * 0.85})`);
                    g.addColorStop(1, `rgba(190,15,0,0)`);
                }
                ctx.beginPath();
                ctx.arc(e.x * W, e.y * H, r, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(drawEmbers);
        };
        animationFrameId = requestAnimationFrame(drawEmbers);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Intersection Observer & Counters
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let counted = false;

        const animateCounters = () => {
            const duration = 2400;
            const start = performance.now();

            const step = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                setFamiliesReached(Math.floor(eased * 500));
                setYearsMinistry(Math.floor(eased * 6));

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setFamiliesReached(500);
                    setYearsMinistry(6);
                }
            };
            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (!counted) {
                            counted = true;
                            setTimeout(animateCounters, 1050);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
                .statement-section {
                    position: relative;
                    width: 100%;
                    min-height: 580px;
                    background: linear-gradient(180deg, transparent 0%, #0D0000 18%, #160000 50%, #0D0000 85%, transparent 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 100px 24px 100px;
                    overflow: hidden;
                }

                #emberCanvas {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                }

                .statement-aura {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 75% 60% at 50% 50%, rgba(180,20,0,0.13) 0%, transparent 70%);
                    animation: heartbeat 4.5s ease-in-out infinite;
                    z-index: 1;
                    pointer-events: none;
                }

                @keyframes heartbeat {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50%      { opacity: 1.0; transform: scale(1.07); }
                }

                .col-line {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%) scaleY(0);
                    width: 1px;
                    height: 65%;
                    background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent);
                    transform-origin: center;
                    transition: transform 1.3s cubic-bezier(0.22, 1, 0.36, 1);
                    z-index: 2;
                }
                .col-line.left  { left: 5vw; }
                .col-line.right { right: 5vw; }
                
                .statement-section.visible .col-line {
                    transform: translateY(-50%) scaleY(1);
                }

                .statement-text {
                    position: relative;
                    z-index: 3;
                    text-align: center;
                    margin-bottom: 24px;
                }

                .line-1 {
                    display: block;
                    font-family: var(--font-sans); /* Cormorant Garamond from layout */
                    font-size: clamp(2rem, 5vw, 3.8rem);
                    font-weight: 700;
                    font-style: italic;
                    color: #CC1111;
                    letter-spacing: 0.02em;
                    line-height: 1.2;
                    opacity: 0;
                    transform: translateX(-80px);
                    transition: opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
                    text-shadow: 0 0 60px rgba(200,10,10,0.5), 0 2px 12px rgba(0,0,0,0.7);
                }

                .line-2 {
                    display: block;
                    font-family: var(--font-heading); /* Cinzel from layout */
                    font-size: clamp(2.6rem, 6.5vw, 4.8rem);
                    font-weight: 700;
                    color: #D4AF37;
                    letter-spacing: 0.1em;
                    line-height: 1.15;
                    margin-top: 10px;
                    opacity: 0;
                    transform: translateX(80px);
                    transition: opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
                    text-shadow: 0 0 50px rgba(212,175,55,0.55), 0 0 100px rgba(212,175,55,0.2), 0 2px 12px rgba(0,0,0,0.8);
                }

                .statement-section.visible .line-1 {
                    opacity: 1; 
                    transform: translateX(0);
                    transition-delay: 0.15s;
                }
                .statement-section.visible .line-2 {
                    opacity: 1; 
                    transform: translateX(0);
                    transition-delay: 0.38s;
                }

                .gold-underline {
                    width: 320px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #D4AF37 30%, #fff8c0 50%, #D4AF37 70%, transparent);
                    margin: 18px auto 0;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                    box-shadow: 0 0 12px rgba(212,175,55,0.6), 0 0 28px rgba(212,175,55,0.2);
                }
                .statement-section.visible .gold-underline {
                    transform: scaleX(1);
                    transition-delay: 0.85s;
                }

                .divider-line {
                    position: relative;
                    z-index: 3;
                    display: flex;
                    align-items: center;
                    width: 320px;
                    margin: 42px auto 52px;
                    opacity: 0;
                    transition: opacity 0.7s ease;
                }
                .statement-section.visible .divider-line {
                    opacity: 1;
                    transition-delay: 1.1s;
                }
                .divider-line::before,
                .divider-line::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                }
                .divider-line::before { background: linear-gradient(90deg, transparent, rgba(212,175,55,0.45)); }
                .divider-line::after  { background: linear-gradient(90deg, rgba(212,175,55,0.45), transparent); }
                
                .divider-dot {
                    width: 9px; height: 9px;
                    border-radius: 50%;
                    background: #D4AF37;
                    margin: 0 12px;
                    box-shadow: 0 0 12px rgba(212,175,55,1), 0 0 24px rgba(212,175,55,0.5);
                    animation: flicker 2.8s ease-in-out infinite;
                }
                @keyframes flicker {
                    0%,100% { opacity:1; box-shadow: 0 0 12px rgba(212,175,55,1), 0 0 24px rgba(212,175,55,0.5); }
                    22%     { opacity:0.3; box-shadow: 0 0 4px rgba(212,175,55,0.3); }
                    50%     { opacity:1; box-shadow: 0 0 16px rgba(212,175,55,1), 0 0 36px rgba(212,175,55,0.7); }
                    78%     { opacity:0.5; box-shadow: 0 0 7px rgba(212,175,55,0.5); }
                }

                .counters {
                    position: relative;
                    z-index: 3;
                    display: flex;
                    align-items: stretch;
                    width: 100%;
                    max-width: 880px;
                }

                .counter-item {
                    flex: 1;
                    text-align: center;
                    padding: 0 28px;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .statement-section.visible .counter-item:nth-child(1) { opacity:1; transform:translateY(0); transition-delay: 1.0s; }
                .statement-section.visible .counter-item:nth-child(3) { opacity:1; transform:translateY(0); transition-delay: 1.15s; }
                .statement-section.visible .counter-item:nth-child(5) { opacity:1; transform:translateY(0); transition-delay: 1.3s; }

                .counter-divider {
                    width: 1px;
                    background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent);
                    align-self: stretch;
                    min-height: 80px;
                    flex-shrink: 0;
                }

                .counter-value {
                    display: flex;
                    align-items: baseline;
                    justify-content: center;
                    gap: 2px;
                    line-height: 1;
                }

                .counter-number {
                    font-family: var(--font-heading);
                    font-size: clamp(2.6rem, 6vw, 4.2rem);
                    font-weight: 700;
                    color: #D4AF37;
                    text-shadow: 0 0 40px rgba(212,175,55,0.55), 0 0 80px rgba(212,175,55,0.2);
                    line-height: 1;
                    letter-spacing: -0.01em;
                }

                .counter-suffix {
                    font-family: var(--font-heading);
                    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
                    font-weight: 700;
                    color: #D4AF37;
                    opacity: 0.75;
                    line-height: 1;
                }

                .counter-infinite .counter-number {
                    font-size: clamp(3rem, 7vw, 5rem);
                    opacity: 0.9;
                    animation: glowPulse 3s ease-in-out infinite;
                }
                
                @keyframes glowPulse {
                    0%,100% { text-shadow: 0 0 40px rgba(212,175,55,0.55), 0 0 80px rgba(212,175,55,0.2); }
                    50%     { text-shadow: 0 0 60px rgba(212,175,55,0.9), 0 0 120px rgba(212,175,55,0.45), 0 0 200px rgba(212,175,55,0.15); }
                }

                .counter-label {
                    display: block;
                    margin-top: 12px;
                    font-family: var(--font-heading);
                    font-size: clamp(0.62rem, 1.3vw, 0.78rem);
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(255, 220, 150, 0.55);
                    font-weight: 600;
                    line-height: 1.5;
                }
            `}</style>

            <section
                id="statement"
                ref={sectionRef}
                className={`statement-section ${isVisible ? 'visible' : ''}`}
                style={{
                    borderTop: 'none',
                    marginTop: '-3px',
                    paddingTop: '0',
                    outline: 'none',
                    boxShadow: 'none'
                }}
            >
                <canvas ref={canvasRef} id="emberCanvas"></canvas>
                <div className="statement-aura"></div>
                <div className="col-line left"></div>
                <div className="col-line right"></div>

                {/* Main statement */}
                <div className="statement-text">
                    <span className="line-1">This is more than a church.</span>
                    <span className="line-2">This Is Family.</span>
                    <div className="gold-underline"></div>
                </div>

                {/* Divider */}
                <div className="divider-line">
                    <div className="divider-dot"></div>
                </div>

                {/* Counters */}
                <div className="counters">
                    <div className="counter-item">
                        <div className="counter-value">
                            <span className="counter-number">{familiesReached}</span>
                            <span className="counter-suffix">+</span>
                        </div>
                        <span className="counter-label">Families Reached</span>
                    </div>

                    <div className="counter-divider"></div>

                    <div className="counter-item">
                        <div className="counter-value">
                            <span className="counter-number">{yearsMinistry}</span>
                            <span className="counter-suffix">+</span>
                        </div>
                        <span className="counter-label">Years of Ministry</span>
                    </div>

                    <div className="counter-divider"></div>

                    <div className="counter-item counter-infinite">
                        <div className="counter-value">
                            <span className="counter-number">∞</span>
                        </div>
                        <span className="counter-label">Praises to the Lord</span>
                    </div>
                </div>
            </section>
        </>
    );
}
