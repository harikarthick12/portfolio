import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  // ===== Cursor Animation =====
  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMouse({ x, y });
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${x - 18}px, ${
          y - 18
        }px, 0)`;
    };
    const down = () => setHovering(true);
    const up = () => setHovering(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // ===== Projects =====
  const projects = [
    {
      title: "Portfolio Website",
      description: "My personal portfolio built using React and Tailwind.",
      link: "https://jolly-lamington-c59126.netlify.app/",
    },
    {
      title: "MediBot - AI Chat Assistant",
      description: "An AI-based medical chatbot using Gemini + Node.js.",
      link: "https://medibot-q2dy.onrender.com/",
    },
    {
      title: "FileCrypto",
      description: "File encryption and decryption app built with React + Node.",
      link: "https://filecrypto.vercel.app/",
    },
  ];

  // ===== Contact Info =====
  const contactInfo = {
    email: "harikarthicksrini@gmail.com",
    phone: "+919003896459",
    github: "https://github.com/harikarthick12",
    linkedin: "https://www.linkedin.com/in/harikarthick12/",
    whatsapp: "https://wa.me/90038964590",
  };

  // ===== Smooth Scroll Function =====
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 90; // Adjust for navbar height
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#07102a] to-[#051025] text-white antialiased overflow-x-hidden">
      {/* Cursor */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 w-10 h-10 rounded-full border border-white/20 transform transition-transform duration-150 ease-out z-50 ${
          hovering ? "scale-125 opacity-90" : "opacity-60"
        }`}
        style={{ mixBlendMode: "screen" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 rounded-full bg-white z-50 shadow-[0_0_12px_rgba(99,102,241,0.9)]"
        style={{ transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0)` }}
      />

      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full bg-[#050816]/70 backdrop-blur-md border-b border-white/5 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold tracking-wide">
            Hari Karthick
          </div>
          <nav className="space-x-6 text-sm opacity-80">
            <button
              onClick={() => scrollToSection("about")}
              className="hover:opacity-100 transition-opacity"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:opacity-100 transition-opacity"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="hover:opacity-100 transition-opacity"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:opacity-100 transition-opacity"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Hi, I’m <span className="text-[#06b6d4]">Hari Karthick</span> <br />
            I build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#06b6d4] to-[#60a5fa]">
              futuristic
            </span>{" "}
            web experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-lg opacity-85 max-w-xl"
          >
            Blending AI, animations, and clean engineering to create interfaces
            that feel alive.
          </motion.p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-sm hover:scale-[1.02] transform transition-all"
            >
              See my work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7c3aed]/40 via-[#06b6d4]/30 to-[#60a5fa]/30 border border-transparent hover:scale-[1.02] transform transition-all"
            >
              Get in touch
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">About me</h2>
          <p className="text-sm opacity-85">
            I love building things that feel futuristic — from AI chatbots to
            virtual systems. Every project I make starts as an idea and ends as
            something that actually works. I focus on performance, accessibility
            and delightful interactions.
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group relative rounded-2xl p-6 border border-white/6 backdrop-blur-sm hover:scale-[1.03] hover:border-white/10 transition-transform cursor-pointer block"
              >
                <div className="text-sm opacity-80">Project</div>
                <div className="mt-2 font-semibold text-lg">{p.title}</div>
                <div className="mt-3 text-sm opacity-70">{p.description}</div>
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  ↗
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Node.js",
              "Python",
              "SQL",
              "Tailwind CSS",
            ].map((s) => (
              <div
                key={s}
                className="p-4 rounded-lg border border-white/6 text-center text-sm opacity-90 hover:scale-[1.03] transition-transform"
              >
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div className="max-w-xl rounded-xl p-6 border border-white/6 backdrop-blur-sm space-y-3">
            <div>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-blue-400 hover:underline"
              >
                {contactInfo.email}
              </a>
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-blue-400 hover:underline"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div>
              <strong>GitHub:</strong>{" "}
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {contactInfo.github}
              </a>
            </div>
            <div>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {contactInfo.linkedin}
              </a>
            </div>
            <div>
              <strong>WhatsApp:</strong>{" "}
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {contactInfo.whatsapp}
              </a>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center opacity-80">
          Built with ❤️ using React + Tailwind <br /> © 2025 Hari Karthick
        </footer>
      </main>

      {/* Styles */}
      <style>{`
        html { scroll-behavior: smooth; }
        :root { --glass: rgba(255,255,255,0.04); }
        .glass-shadow { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.04); box-shadow: 0 6px 30px rgba(2,6,23,0.6); }
      `}</style>
    </div>
  );
}
