"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Spark {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    dx: number;
    dy: number;
    duration: number;
}

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for the main cursor dot
    const springConfig = { damping: 20, stiffness: 800, mass: 0.5 };
    const cursorXSpring = useSpring(mouseX, springConfig);
    const cursorYSpring = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [sparks, setSparks] = useState<Spark[]>([]);
    const [isGoldCursor, setIsGoldCursor] = useState(true);

    const lastPos = useRef({ x: -100, y: -100 });
    const lastSparkTime = useRef(0);

    const createSpark = useCallback((x: number, y: number, speed: number) => {
        const id = Math.random() + Date.now();
        const angle = Math.random() * Math.PI * 2;
        const dist = 20 + Math.random() * 40 * (speed / 10);

        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;

        // Size: mostly tiny, occasionally bigger
        const size = Math.random() < 0.15 ? (3 + Math.random() * 3) : (1 + Math.random() * 2.5);

        // Color palette: white → ice blue → gold
        const palette = [
            "rgba(255,255,255,1)",
            "rgba(200,225,255,1)",
            "rgba(180,210,255,1)",
            "rgba(255,240,180,1)",
            "rgba(255,220,120,1)",
        ];
        const color = palette[Math.floor(Math.random() * palette.length)];
        const duration = (400 + Math.random() * 400) / 1000; // in seconds for framer motion

        return { id, x, y, size, color, dx, dy, duration };
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleScroll = () => {
            // Shift cursor glow to gold when within the dark hero, statement, or about sections
            const darkSections = ['hero', 'statement', 'about'];
            let inGold = false;
            for (const id of darkSections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Use center of screen as the intersection point
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        inGold = true;
                        break;
                    }
                }
            }
            setIsGoldCursor(inGold);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);

            const dx = clientX - lastPos.current.x;
            const dy = clientY - lastPos.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);
            const now = Date.now();

            // Emit sparks based on movement speed
            const interval = speed > 8 ? 20 : speed > 3 ? 40 : 80;

            if (now - lastSparkTime.current > interval) {
                const count = speed > 10 ? 4 : speed > 4 ? 2 : 1;
                const newSparks: Spark[] = [];
                for (let i = 0; i < count; i++) {
                    newSparks.push(createSpark(clientX, clientY, speed));
                }
                setSparks(prev => [...prev.slice(-30), ...newSparks]);
                lastSparkTime.current = now;
            }

            lastPos.current = { x: clientX, y: clientY };
        };

        const handleMouseDown = () => {
            setIsClicked(true);
            const burstSparks: Spark[] = [];
            for (let i = 0; i < 14; i++) {
                burstSparks.push(createSpark(mouseX.get(), mouseY.get(), 20));
            }
            setSparks(prev => [...prev.slice(-30), ...burstSparks]);
            setTimeout(() => setIsClicked(false), 120);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY, createSpark]);

    // Cleanup old sparks
    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            setSparks(prev => prev.filter(s => (now - s.id) < 1000));
        }, 100);
        return () => clearInterval(timer);
    }, []);

    if (isMobile) return null;

    return (
        <>
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>

            {/* Spark Trail */}
            <AnimatePresence>
                {sparks.map((spark) => (
                    <motion.div
                        key={spark.id}
                        initial={{ opacity: 1, scale: 1, x: spark.x, y: spark.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            x: spark.x + spark.dx,
                            y: spark.y + spark.dy,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: spark.duration, ease: "easeOut" }}
                        className="fixed pointer-events-none z-[9998] rounded-full"
                        style={{
                            width: spark.size,
                            height: spark.size,
                            backgroundColor: spark.color,
                            boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Main Cursor Dot */}
            <motion.div
                id="cursor"
                className="fixed pointer-events-none z-[9999] rounded-full bg-white"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    width: 8,
                    height: 8,
                    left: 0,
                    top: 0,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: isGoldCursor ? `
                        0 0 6px 2px rgba(212,175,55,0.9),
                        0 0 12px 4px rgba(212,175,55,0.6),
                        0 0 24px 8px rgba(212,175,55,0.3)
                    ` : `
                        0 0 6px 2px rgba(255,255,255,0.9),
                        0 0 12px 4px rgba(200,220,255,0.6),
                        0 0 24px 8px rgba(150,190,255,0.3)
                    `,
                }}
                animate={{
                    scale: isClicked ? 1.8 : (isHovering ? 1.5 : 1),
                }}
                transition={{ duration: 0.12 }}
            />
        </>
    );
}
