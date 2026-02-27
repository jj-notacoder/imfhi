"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const links = [
        { name: "About Us", href: "#about" },
        { name: "Leadership", href: "#leadership" },
        { name: "Worship", href: "#worship" },
        { name: "Teachings", href: "#teachings" },
        { name: "Messages", href: "#messages" },
        { name: "Gather With Us", href: "#gather" },
        { name: "Gallery", href: "#gallery" },
        { name: "Prayer Requests", href: "#prayer" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section detection
            const sections = links.map(link => link.href.substring(1));
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = "#" + section;
                        break;
                    }
                }
            }
            if (current) setActiveSection(current);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [links]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-black border-b border-white/5 py-3 shadow-2xl">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative flex items-center justify-between w-full">

                {/* Logo (Left aligned, small) */}
                <Link href="#hero" onClick={(e) => scrollToSection(e, "#hero")} className="flex items-center group relative z-50">
                    <div className="relative w-[45px] h-[45px] transition-all duration-300 ease-in-out hover:scale-105">
                        <Image
                            src="/pictures/image-removebg-preview.png"
                            alt="In My Father's House Logo"
                            fill
                            className="object-contain drop-shadow-md"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu (Centered) */}
                <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6 z-40">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className={`text-[12px] font-medium font-sans tracking-widest uppercase transition-all duration-300 hover:text-[var(--color-accent)] relative group ${activeSection === link.href ? "text-[var(--color-accent)]" : "text-white/80"
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-px bg-[var(--color-accent)] transition-all duration-300 ${activeSection === link.href ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                        </a>
                    ))}
                </div>

                {/* Right aligned items */}
                <div className="hidden xl:flex items-center gap-6 z-50">
                    {/* Plan visit button removed as requested */}
                </div>

                {/* Mobile Menu Button */}
                <div className="xl:hidden flex items-center z-50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-[var(--color-accent)] focus:outline-none p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="xl:hidden absolute top-full left-0 w-full bg-[#7B0000]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-in slide-in-from-top-5 duration-300 h-screen">
                    <div className="px-6 py-8 space-y-6 flex flex-col items-center">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-xl font-serif font-bold text-white hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
