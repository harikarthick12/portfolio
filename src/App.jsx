// src/App.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Single-file futuristic portfolio (dark glossy, blue–purple)
 * - Requires TailwindCSS + framer-motion
 * - Put resume at: public/HariKarthick_Resume.pdf
 */

export default function App() {
  // --- Cursor trail setup (kept)
  const trailCount = 8;
  const trailRefs = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const parent = document.createElement("div");
    parent.style.position = "fixed";
    parent.style.left = "0";
    parent.style.top = "0";
    parent.style.pointerEvents = "none";
    parent.style.width = "100%";
    parent.style.height = "100%";
    parent.style.zIndex = "9999";
    document.body.appendChild(parent);

    for (let i = 0; i < trailCount; i++) {
      const el = document.createElement("div");
      el.className =
        "trail-dot w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none";
      el.style.position = "absolute";
      el.style.left = "-100px";
      el.style.top = "-100px";
      parent.appendChild(el);
      trailRefs.current.push(el);
    }

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let lastPositions = Array.from({ length: trailCount }).map(() => ({ x: -100, y: -100 }));
    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      lastPositions[0].x += (mx - lastPositions[0].x) * 0.35;
      lastPositions[0].y += (my - lastPositions[0].y) * 0.35;
      for (let i = 1; i < trailCount; i++) {
        lastPositions[i].x += (lastPositions[i - 1].x - lastPositions[i].x) * 0.35;
        lastPositions[i].y += (lastPositions[i - 1].y - lastPositions[i].y) * 0.35;
      }
      for (let i = 0; i < trailCount; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const pos = lastPositions[i];
        el.style.left = `${pos.x}px`;
        el.style.top = `${pos.y}px`;
        const s = 1 - i * 0.08;
        el.style.transform = `translate(-50%, -50%) scale(${s})`;
        el.style.opacity = String(0.95 - i * 0.1);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      parent.remove();
    };
  }, []);

  // --- Project data (your real projects)
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

  // hover tilt for cards (native DOM transform)
  const handleCardMove = (e, ref) => {
    const rect = ref.current.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    const tx = (rx - 0.5) * 12;
    const ty = (ry - 0.5) * 8;
    ref.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
  };
  const resetCard = (ref) => {
    ref.current.style.transform = "";
  };

  // small scroll helper
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative bg-[#040414] text-white font-sans">
      {/* moving aurora blobs */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div
          style={{
            width: 760,
            height: 760,
            left: "-8%",
            top: "4%",
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(120px)",
            background: "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.18), transparent 20%)",
            animation: "bgMove 14s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: 560,
            height: 560,
            right: "-6%",
            bottom: "6%",
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(100px)",
            background: "radial-gradient(circle at 70% 70%, rgba(124,58,237,0.14), transparent 15%)",
            animation: "bgMove2 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* NAV */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold">
              HK
            </div>
            <div className="text-sm font-semibold tracking-wide">HARI KARTHICK</div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm opacity-90">
            <button onClick={() => scrollTo("home")} className="hover:text-cyan-300">Home</button>
            <button onClick={() => scrollTo("about")} className="hover:text-cyan-300">About</button>
            <button onClick={() => scrollTo("skills")} className="hover:text-cyan-300">Skills</button>
            <button onClick={() => scrollTo("projects")} className="hover:text-cyan-300">Projects</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-cyan-300">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/HariKarthick_Resume.pdf" download className="px-3 py-1 rounded-full bg-cyan-400 text-black text-sm font-medium shadow-sm hover:scale-105 transition">
              Download Resume
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-40 relative">
        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center gap-8 py-12">
          <div className="md:w-1/2 space-y-6">
            <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
              I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400">futuristic</span> web experiences.
            </motion.h1>
            <p className="text-gray-300 max-w-xl">
              Blending AI, smooth motion, and clean engineering to craft interfaces that feel alive. I value performance, clarity and subtle design details.
            </p>
            <div className="flex gap-4 mt-6">
              <button onClick={() => scrollTo("projects")} className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium shadow-lg hover:scale-105 transition">See Projects</button>
              <a href="/HariKarthick_Resume.pdf" download className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition">Resume</a>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="rounded-2xl p-6 glass-shadow border border-white/6" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" }}>
              <div className="text-sm text-gray-300">Featured Project</div>
              <div className="mt-3 font-semibold text-lg">AI Chat Assistant</div>
              <div className="mt-2 text-sm text-gray-400">Realtime streaming chat with assistants, context memory and smart summaries.</div>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center">⌘</div>
                <div className="text-xs text-gray-300">React · Node · WebSocket</div>
                <a href="https://jolly-lamington-c59126.netlify.app/" target="_blank" rel="noreferrer" className="ml-auto text-sm text-cyan-300 hover:underline">Live demo →</a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 gradient-text">About Me</h2>
            <p className="text-gray-300 leading-relaxed">
              I’m a developer focused on mixing AI, UX and modern frontend engineering to build polished products. I enjoy turning bold ideas into working systems.
            </p>
          </div>
        </section>

        {/* SKILLS (Frontend / Backend / Cloud) */}
        <section id="skills" className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Skills</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl glass-shadow border border-white/6">
                <div className="font-semibold text-cyan-300 mb-3">Frontend</div>
                <ul className="text-gray-300 space-y-2">
                  <li>React.js (Hooks, Vite)</li>
                  <li>HTML & CSS (Tailwind)</li>
                  <li>Framer Motion, Micro-interactions</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl glass-shadow border border-white/6">
                <div className="font-semibold text-cyan-300 mb-3">Backend</div>
                <ul className="text-gray-300 space-y-2">
                  <li>Node.js & Express</li>
                  <li>REST APIs, WebSockets</li>
                  <li>Auth, Encryption basics</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl glass-shadow border border-white/6">
                <div className="font-semibold text-cyan-300 mb-3">Cloud & Tools</div>
                <ul className="text-gray-300 space-y-2">
                  <li>Firebase, Netlify</li>
                  <li>Git & GitHub</li>
                  <li>Deployment & CI basics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS - vertical one-by-one reveal */}
        <section id="projects" className="py-16 flex flex-col items-center space-y-8">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl font-bold gradient-text">Projects</h2>
            <p className="text-gray-400 mt-2">My recent work — click to open live demos.</p>
          </div>

          <div className="w-full max-w-2xl flex flex-col gap-6">
            {projects.map((p, idx) => {
              const ref = React.createRef();
              return (
                <motion.a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  ref={ref}
                  onMouseMove={(e) => handleCardMove(e, ref)}
                  onMouseLeave={() => resetCard(ref)}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, delay: idx * 0.12 }}
                  className="group block rounded-2xl p-6 border border-white/6 backdrop-blur-md bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12), rgba(6,182,212,0.08))" }} />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/6 flex items-center justify-center">⌘</div>
                    <div className="flex-1">
                      <div className="text-sm text-cyan-300 font-semibold">{p.title}</div>
                      <p className="text-gray-300 mt-2">{p.description}</p>
                      <div className="mt-4 flex gap-3">
                        <a href={p.link} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-cyan-400 text-black">Live</a>
                        <a href={p.link} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border border-white/10">Open</a>
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold gradient-text text-center mb-6">Experience</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-xl glass-shadow border border-white/6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">Web Developer Intern — VDart</div>
                    <div className="text-sm text-gray-300">September 2025 - November 2025</div>
                  </div>
                  <div className="text-xs text-gray-400">Internship</div>
                </div>
                <ul className="mt-3 text-gray-300 list-disc list-inside space-y-1">
                  <li>Worked on frontend UIs and components using React and Tailwind.</li>
                  <li>Integrated APIs and assisted in optimizing client views.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold gradient-text mb-4">Certifications</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="p-4 rounded-lg border border-white/6 bg-white/3">
                <div className="font-semibold">Udemy</div>
                <div className="text-sm text-gray-300">Python Programming - Completed</div>
              </div>
              <div className="p-4 rounded-lg border border-white/6 bg-white/3">
                <div className="font-semibold">Coursera</div>
                <div className="text-sm text-gray-300">SQL & Cloud Fundamentals</div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold gradient-text mb-3">Contact</h2>
            <p className="text-gray-300 mb-4">Let’s collaborate — open to freelance and full-time opportunities.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="mailto:harikarthicksrini@gmail.com" className="p-4 rounded-lg border border-white/6 bg-white/3">📧 harikarthicksrini@gmail.com</a>
              <a href="tel:+919003896459" className="p-4 rounded-lg border border-white/6 bg-white/3">📱 +91 90038 96459</a>
              <a href="https://github.com/harikarthick12" target="_blank" rel="noreferrer" className="p-4 rounded-lg border border-white/6 bg-white/3">🧠 GitHub</a>
              <a href="https://www.linkedin.com/in/harikarthick12/" target="_blank" rel="noreferrer" className="p-4 rounded-lg border border-white/6 bg-white/3">💼 LinkedIn</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-gray-400">
          Built with ❤️ · © {new Date().getFullYear()} HARI KARTHICK
        </footer>
      </main>

      {/* Styles */}
      <style>{`
        .trail-dot {
          background: radial-gradient(circle at 30% 30%, rgba(96,165,250,0.95), rgba(124,58,237,0.75));
          box-shadow: 0 8px 30px rgba(99,102,241,0.15);
          z-index: 9999;
        }
        .gradient-text {
          background: linear-gradient(90deg, #06b6d4, #7c3aed, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-shadow {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 10px 40px rgba(2,6,23,0.6);
          backdrop-filter: blur(6px);
        }
        @keyframes bgMove {
          0% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-18px) translateX(10px) scale(1.02); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }
        @keyframes bgMove2 {
          0% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(16px) translateX(-10px) scale(1.01); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
