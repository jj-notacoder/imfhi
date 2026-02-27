"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const NAV_LINKS = [
    { label: "About Us", href: "#about" },
    { label: "Leadership", href: "#leadership" },
    { label: "Worship", href: "#worship" },
    { label: "Teachings", href: "#teachings" },
    { label: "Messages", href: "#messages" },
    { label: "Gather With Us", href: "#gather" },
    { label: "Gallery", href: "#gallery" },
    { label: "Prayer Requests", href: "#prayer" },
];

export default function Footer() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <footer
            style={{
                background: "linear-gradient(180deg,#0D0000 0%,#080000 100%)",
                marginTop: "0",
                boxShadow: "0 -40px 80px rgba(212,175,55,0.04)",
                position: "relative",
            }}
        >
            {/* ── Top gold divider with cross ── */}
            <div className="relative w-full" style={{ height: "2px", marginBottom: "0px", marginTop: "60px" }}>
                <div
                    className="w-full h-full"
                    style={{
                        background: "linear-gradient(to right,transparent 0%,rgba(212,175,55,0.2) 10%,#D4AF37 35%,rgba(255,235,100,1) 50%,#D4AF37 65%,rgba(212,175,55,0.2) 90%,transparent 100%)"
                    }}
                />
                {/* Cross on line */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 font-cinzel flex items-center justify-center"
                    style={{
                        top: "-14px",
                        fontSize: "1.1rem",
                        color: "rgba(212,175,55,0.75)",
                        background: "#0D0000",
                        padding: "0 20px",
                        lineHeight: 1,
                    }}
                >
                    ✝
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0" style={{ paddingTop: "70px" }}>
                <div
                    className="grid gap-16"
                    style={{ gridTemplateColumns: "1.4fr 1fr 1fr" }}
                >

                    {/* ── Column 1 — Identity ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Logo / name */}
                        <img
                            src="/pictures/image-removebg-preview.png"
                            alt="In My Father's House"
                            style={{ height: "60px", width: "auto", marginBottom: "20px", objectFit: "contain" }}
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                        <h3
                            className="font-cinzel font-bold text-[#D4AF37]"
                            style={{ fontSize: "clamp(1.2rem,2vw,1.6rem)", marginBottom: "10px", letterSpacing: "0.04em" }}
                        >
                            In My Father&apos;s House
                        </h3>
                        <p
                            className="font-serif italic"
                            style={{ fontSize: "clamp(1rem,1.6vw,1.1rem)", color: "rgba(255,215,160,0.70)", marginBottom: "6px", lineHeight: "1.7" }}
                        >
                            Loving God. Loving People.
                        </p>
                        <p
                            className="font-serif italic"
                            style={{ fontSize: "clamp(0.85rem,1.4vw,0.95rem)", color: "rgba(255,215,160,0.38)" }}
                        >
                            — John 14:2
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-8">
                            {/* YouTube */}
                            <a
                                href="https://www.youtube.com/@imfhtamilchurchabudhabi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center transition-all duration-250"
                                style={{
                                    width: "44px", height: "44px", borderRadius: "50%",
                                    border: "1px solid rgba(212,175,55,0.3)",
                                    background: "rgba(212,175,55,0.06)",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,0,0,0.12)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,80,80,0.6)";
                                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 18px rgba(255,0,0,0.2)";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.06)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.3)";
                                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                                }}
                            >
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                                    <rect width="22" height="16" rx="4" fill="#FF0000" />
                                    <path d="M9 4.5L15.5 8L9 11.5V4.5Z" fill="white" />
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/imfhiabudhabi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center transition-all duration-250"
                                style={{
                                    width: "44px", height: "44px", borderRadius: "50%",
                                    border: "1px solid rgba(212,175,55,0.3)",
                                    background: "rgba(212,175,55,0.06)",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(24,119,242,0.12)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(24,119,242,0.6)";
                                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 18px rgba(24,119,242,0.2)";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.06)";
                                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.3)";
                                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <rect width="24" height="24" rx="5" fill="#1877F2" />
                                    <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* ── Column 2 — Navigate ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <p
                            className="font-cinzel uppercase"
                            style={{ fontSize: "11px", letterSpacing: "0.35em", color: "rgba(212,175,55,0.50)", marginBottom: "24px" }}
                        >
                            NAVIGATE
                        </p>
                        <div>
                            {NAV_LINKS.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="block font-cinzel font-semibold transition-all duration-200"
                                    style={{
                                        fontSize: "clamp(0.85rem,1.5vw,1rem)",
                                        color: hoveredLink === link.label ? "#D4AF37" : "rgba(255,215,160,0.65)",
                                        letterSpacing: "0.08em",
                                        padding: hoveredLink === link.label ? "7px 0 7px 10px" : "7px 0",
                                        borderBottom: "1px solid rgba(212,175,55,0.07)",
                                        textDecoration: "none",
                                        borderLeft: hoveredLink === link.label ? "2px solid #D4AF37" : "2px solid transparent",
                                    }}
                                    onMouseEnter={() => setHoveredLink(link.label)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Column 3 — Reach Us ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <p
                            className="font-cinzel uppercase"
                            style={{ fontSize: "11px", letterSpacing: "0.35em", color: "rgba(212,175,55,0.50)", marginBottom: "24px" }}
                        >
                            REACH US
                        </p>

                        {[
                            {
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
                                label: "Email",
                                lines: ["hello@inmyfathershouse.com"],
                            },
                            {
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
                                label: "Pastor John Moses",
                                lines: ["+971 50 578 8519"],
                            },
                            {
                                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
                                label: "Location",
                                lines: ["F1 Hall, Bretheren Church,", "Mussafah, Abu Dhabi, UAE"],
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 py-4"
                                style={{ borderBottom: "1px solid rgba(212,175,55,0.07)" }}
                            >
                                <div
                                    className="flex-shrink-0 flex items-center justify-center"
                                    style={{
                                        width: "32px", height: "32px", borderRadius: "50%",
                                        border: "1px solid rgba(212,175,55,0.25)",
                                        background: "rgba(212,175,55,0.06)",
                                        color: "#D4AF37",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <p
                                        className="font-cinzel font-semibold mb-1"
                                        style={{ fontSize: "clamp(0.78rem,1.3vw,0.88rem)", color: "rgba(212,175,55,0.55)", letterSpacing: "0.12em", textTransform: "uppercase" }}
                                    >
                                        {item.label}
                                    </p>
                                    {item.lines.map((line, j) => (
                                        <p
                                            key={j}
                                            className="font-cinzel"
                                            style={{ fontSize: "clamp(0.82rem,1.4vw,0.95rem)", color: "rgba(255,215,160,0.70)", lineHeight: "1.6" }}
                                        >
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>

                {/* ── Bottom bar ── */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-between gap-3"
                    style={{
                        borderTop: "1px solid rgba(212,175,55,0.12)",
                        marginTop: "60px",
                        paddingTop: "28px",
                        paddingBottom: "32px",
                    }}
                >
                    <p
                        className="font-cinzel text-center sm:text-left"
                        style={{ fontSize: "11px", color: "rgba(255,215,160,0.30)", letterSpacing: "0.1em" }}
                    >
                        © 2026 In My Father&apos;s House International, Abu Dhabi. All rights reserved.
                    </p>
                    <p
                        className="font-serif italic text-center sm:text-right"
                        style={{ fontSize: "clamp(0.85rem,1.4vw,1rem)", color: "rgba(255,215,160,0.30)" }}
                    >
                        Made with <span style={{ color: "#D4AF37" }}>✝</span> for the Kingdom
                    </p>
                </div>

            </div>
        </footer>
    );
}
