"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-serif text-2xl text-droz-white tracking-wide"
        >
          Droz
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {["About", "Divisions", "Solutions", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-sans font-light text-droz-light hover:text-white transition-colors duration-300 tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Login Button */}
        <a
          href="#login"
          className="hidden md:block text-sm font-sans font-medium px-6 py-2.5 rounded-full border border-droz-muted text-droz-white hover:border-white transition-all duration-300"
        >
          Login
        </a>
      </div>
    </nav>
  );
}
