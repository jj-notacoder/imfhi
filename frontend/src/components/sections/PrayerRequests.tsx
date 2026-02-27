"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PrayerRequests() {
    const [form, setForm] = useState({ name: "", email: "", request: "" });
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSent(true);
    }

    return (
        <motion.section
            id="prayer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prayer-section relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg,#0D0000 0%,#1a0a00 40%,#111111 100%)",
                marginTop: "-160px",
                paddingTop: "220px",
                paddingBottom: "0",
            }}
        >
            {/* Top fade */}
            <div className="absolute top-0 left-0 w-full pointer-events-none"
                style={{ height: "120px", background: "linear-gradient(to bottom,#0D0000 0%,transparent 100%)", zIndex: 10 }} />

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
                        PRAYER REQUESTS
                    </h2>
                    <h3
                        className="font-cinzel font-semibold tracking-[0.06em]"
                        style={{ fontSize: "clamp(1.3rem,2.8vw,2rem)", color: "rgba(212,175,55,0.80)", marginTop: "16px", marginBottom: "16px" }}
                    >
                        We Are Here For You
                    </h3>
                    <p
                        className="font-serif italic"
                        style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "rgba(255,215,160,0.82)", lineHeight: "1.85", maxWidth: "560px", marginBottom: "28px" }}
                    >
                        Whether you have a prayer request, a question, or just want to say hello — we are here to listen and serve.
                    </p>
                    <motion.div
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                        style={{ width: "200px" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* Two columns */}
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* LEFT — Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Email */}
                        <div
                            className="flex items-start gap-5 p-6 rounded-lg group transition-all duration-300"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
                        >
                            <div
                                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
                            >
                                <span style={{ fontSize: "20px" }}>✉</span>
                            </div>
                            <div>
                                <p className="font-cinzel font-bold tracking-[0.1em] mb-2"
                                    style={{ fontSize: "clamp(1rem,2vw,1.3rem)", color: "#D4AF37" }}>
                                    EMAIL US
                                </p>
                                <p className="font-cinzel"
                                    style={{ fontSize: "clamp(0.95rem,1.8vw,1.15rem)", color: "rgba(255,215,160,0.80)" }}>
                                    hello@inmyfathershouse.com
                                </p>
                            </div>
                        </div>

                        {/* Call Us */}
                        <div
                            className="p-6 rounded-lg transition-all duration-300"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
                        >
                            <div className="flex items-center gap-5 mb-6">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
                                >
                                    <span style={{ fontSize: "20px" }}>📞</span>
                                </div>
                                <p className="font-cinzel font-bold tracking-[0.1em]"
                                    style={{ fontSize: "clamp(1rem,2vw,1.3rem)", color: "#D4AF37" }}>
                                    CALL US
                                </p>
                            </div>

                            {/* Contact persons */}
                            <div className="space-y-5 pl-2">
                                {[
                                    { name: "Pastor John Moses", number: "+971 50 578 8519" },
                                    { name: "Bro. John Rasheed", number: "+971 55 123 XXXX" },
                                    { name: "Bro. Naveen", number: "+971 55 225 XXXX" },
                                ].map((contact, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="flex items-center justify-between py-4 px-2"
                                        style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
                                    >
                                        <div>
                                            <p className="font-cinzel font-semibold"
                                                style={{ fontSize: "clamp(0.95rem,1.8vw,1.2rem)", color: "rgba(212,175,55,0.85)", marginBottom: "4px" }}>
                                                {contact.name}
                                            </p>
                                            <p className="font-cinzel font-bold"
                                                style={{ fontSize: "clamp(1.1rem,2.2vw,1.5rem)", color: "#FFFFFF", letterSpacing: "0.06em" }}>
                                                {contact.number}
                                            </p>
                                        </div>

                                        <a href={`tel:${contact.number.replace(/\s/g, "")}`}
                                            className="flex items-center justify-center transition-all duration-200 hover:bg-[rgba(212,175,55,0.15)]"
                                            style={{
                                                width: "40px", height: "40px", borderRadius: "50%",
                                                border: "1px solid rgba(212,175,55,0.4)",
                                                color: "#D4AF37", textDecoration: "none", fontSize: "16px",
                                                flexShrink: 0,
                                            }}
                                        >
                                            →
                                        </a>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social links — below contacts */}
                            <div className="pt-6 mt-2">
                                <p className="font-cinzel uppercase tracking-[0.25em] mb-5"
                                    style={{ fontSize: "11px", color: "rgba(212,175,55,0.45)" }}>
                                    FIND US ONLINE
                                </p>
                                <div className="flex gap-4">

                                    {/* YouTube */}
                                    <a
                                        href="https://www.youtube.com/@imfhtamilchurchabudhabi"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 flex-1 transition-all duration-300 group"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(212,175,55,0.2)",
                                            borderRadius: "6px",
                                            padding: "14px 18px",
                                            textDecoration: "none",
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,0,0,0.08)";
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,80,80,0.5)";
                                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(255,0,0,0.1)";
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.2)";
                                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                                        }}
                                    >
                                        {/* YouTube SVG icon */}
                                        <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                                            <rect width="28" height="20" rx="5" fill="#FF0000" />
                                            <path d="M11.5 5.5L19.5 10L11.5 14.5V5.5Z" fill="white" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="font-cinzel font-bold whitespace-nowrap overflow-hidden text-ellipsis"
                                                style={{ fontSize: "clamp(0.8rem,1.5vw,0.95rem)", color: "#FFFFFF", letterSpacing: "0.05em" }}>
                                                YouTube
                                            </p>
                                            <p className="font-cinzel whitespace-nowrap overflow-hidden text-ellipsis"
                                                style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                                                IMFH Abu Dhabi
                                            </p>
                                        </div>
                                        <span className="ml-auto flex-shrink-0" style={{ color: "rgba(212,175,55,0.4)", fontSize: "16px" }}>→</span>
                                    </a>

                                    {/* Facebook */}
                                    <a
                                        href="https://www.facebook.com/imfhiabudhabi/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 flex-1 transition-all duration-300"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(212,175,55,0.2)",
                                            borderRadius: "6px",
                                            padding: "14px 18px",
                                            textDecoration: "none",
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(24,119,242,0.08)";
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(24,119,242,0.5)";
                                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(24,119,242,0.1)";
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.03)";
                                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.2)";
                                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                                        }}
                                    >
                                        {/* Facebook SVG icon */}
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                                            <rect width="24" height="24" rx="5" fill="#1877F2" />
                                            <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white" />
                                        </svg>
                                        <div className="flex-1">
                                            <p className="font-cinzel font-bold whitespace-nowrap overflow-hidden text-ellipsis"
                                                style={{ fontSize: "clamp(0.8rem,1.5vw,0.95rem)", color: "#FFFFFF", letterSpacing: "0.05em" }}>
                                                Facebook
                                            </p>
                                            <p className="font-cinzel whitespace-nowrap overflow-hidden text-ellipsis"
                                                style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                                                IMFH Abu Dhabi
                                            </p>
                                        </div>
                                        <span className="ml-auto flex-shrink-0" style={{ color: "rgba(212,175,55,0.4)", fontSize: "16px" }}>→</span>
                                    </a>

                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT — Prayer request form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div
                            className="p-8 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
                        >
                            <h4
                                className="font-cinzel font-bold tracking-[0.06em] mb-8"
                                style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: "#D4AF37", borderLeft: "3px solid #D4AF37", paddingLeft: "14px" }}
                            >
                                Send a Prayer Request
                            </h4>

                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="text-5xl mb-6" style={{ color: "rgba(212,175,55,0.4)" }}>✝</div>
                                    <p className="font-cinzel font-bold text-[#D4AF37] mb-3"
                                        style={{ fontSize: "clamp(1.2rem,2.5vw,1.6rem)" }}>
                                        Request Received
                                    </p>
                                    <p className="font-serif italic"
                                        style={{ fontSize: "clamp(0.95rem,1.7vw,1.1rem)", color: "rgba(255,215,160,0.75)" }}>
                                        We will be praying for you.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name + Email row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {[
                                            { label: "NAME", key: "name", type: "text", placeholder: "Your Name" },
                                            { label: "EMAIL", key: "email", type: "email", placeholder: "Your Email" },
                                        ].map(field => (
                                            <div key={field.key}>
                                                <label
                                                    className="font-cinzel uppercase tracking-[0.2em] block mb-2"
                                                    style={{ fontSize: "11px", color: "rgba(212,175,55,0.55)" }}
                                                >
                                                    {field.label}
                                                </label>
                                                <input
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={(form as any)[field.key]}
                                                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                                    required
                                                    className="w-full font-cinzel transition-all duration-200 outline-none"
                                                    style={{
                                                        background: "rgba(255,255,255,0.05)",
                                                        border: "1px solid rgba(212,175,55,0.2)",
                                                        borderRadius: "4px",
                                                        padding: "14px 16px",
                                                        color: "rgba(255,215,160,0.9)",
                                                        fontSize: "clamp(0.9rem,1.6vw,1rem)",
                                                    }}
                                                    onFocus={e => (e.target.style.borderColor = "rgba(212,175,55,0.6)")}
                                                    onBlur={e => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Prayer request textarea */}
                                    <div>
                                        <label
                                            className="font-cinzel uppercase tracking-[0.2em] block mb-2"
                                            style={{ fontSize: "11px", color: "rgba(212,175,55,0.55)" }}
                                        >
                                            YOUR PRAYER REQUEST
                                        </label>
                                        <textarea
                                            placeholder="How can we pray for you?"
                                            value={form.request}
                                            onChange={e => setForm(f => ({ ...f, request: e.target.value }))}
                                            required
                                            rows={6}
                                            className="w-full font-serif italic transition-all duration-200 resize-none outline-none"
                                            style={{
                                                background: "rgba(255,255,255,0.05)",
                                                border: "1px solid rgba(212,175,55,0.2)",
                                                borderRadius: "4px",
                                                padding: "14px 16px",
                                                color: "rgba(255,215,160,0.85)",
                                                fontSize: "clamp(0.95rem,1.6vw,1.05rem)",
                                                lineHeight: "1.75",
                                            }}
                                            onFocus={e => (e.target.style.borderColor = "rgba(212,175,55,0.6)")}
                                            onBlur={e => (e.target.style.borderColor = "rgba(212,175,55,0.2)")}
                                        />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full font-cinzel font-bold uppercase tracking-[0.25em] transition-all duration-300"
                                        style={{
                                            fontSize: "clamp(0.9rem,1.6vw,1.05rem)",
                                            color: "#0D0000",
                                            background: "linear-gradient(135deg,#D4AF37 0%,#f0d060 50%,#D4AF37 100%)",
                                            border: "none",
                                            borderRadius: "4px",
                                            padding: "18px 40px",
                                            cursor: "pointer",
                                            boxShadow: "0 0 30px rgba(212,175,55,0.3)",
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 50px rgba(212,175,55,0.5)")}
                                        onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(212,175,55,0.3)")}
                                    >
                                        SEND PRAYER REQUEST ✝
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}
