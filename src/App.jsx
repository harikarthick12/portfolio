import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Full "WOW" portfolio App.jsx
 * - Requires: framer-motion, TailwindCSS
 * - Replace your src/App.jsx with this file.
 */

export default function App() {
  // Cursor trail
  const trailCount = 8;
  const trailRefs = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  // small hovered state for magnetic effect
  const [hovering, setHovering] = useState(false);

  // Contact & projects
  const contactInfo = {
    email: "harikarthicksrini@gmail.com",
    phone: "+919003896459",
    github: "https://github.com/harikarthick12",
    linkedin: "https://www.linkedin.com/in/harikarthick12/",
    whatsapp: "https://wa.me/90038964590",
  };

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

  // Smooth scroll helper (accounts for fixed navbar)
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const offset = 96;
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  // Create trail DOM nodes once
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
        "w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 pointer-events-none";
      el.style.position = "absolute";
      el.style.left = "-100px";
      el.style.top = "-100px";
      el.style.background = "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.95), rgba(124,58,237,0.75))";
      el.style.boxShadow = "0 8px 30px rgba(99,102,241,0.15)";
      parent.appendChild(el);
      trailRefs.current.push(el);
    }

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // Animate trailing dots
    let lastPositions = Array.from({ length: trailCount }).map(() => ({ x: -100, y: -100 }));
    const tick = () => {
      // head follows mouse, others follow previous
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      lastPositions[0].x += (mx - lastPositions[0].x) * 0.35;
      lastPositions[0].y += (my - lastPositions[0].y) * 0.35;
      for (let i = 1; i < trailCount; i++) {
        lastPositions[i].x += (lastPositions[i - 1].x - lastPositions[i].x) * 0.35;
        lastPositions[i].y += (lastPositions[i - 1].y - lastPositions[i].y) * 0.35;
      }
      // apply positions & scale/fade based on index
      for (let i = 0; i < trailCount; i++) {
        const el = trailRefs.current[i];
        if (!el) continue;
        const pos = lastPositions[i];
        el.style.left = `${pos.x}px`;
        el.style.top = `${pos.y}px`;
        const s = 1 - i * (0.08);
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

  // Floating background blobs (pure CSS in JSX below)

  // Magnetic hover on cards: use mouse position relative to card
  const handleCardMove = (e, cardRef) => {
    const rect = cardRef.current.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const ry = (e.clientY - rect.top) / rect.height;
    const tx = (rx - 0.5) * 14; // tilt x
    const ty = (ry - 0.5) * 10; // tilt y
    cardRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
  };
  const resetCard = (cardRef) => {
    cardRef.current.style.transform = "";
  };

  return (
    <div className="min-h-screen relative bg-[#050816] text-white antialiased overflow-x-hidden">
      {/* Floating neon background blobs */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute left-[-8%] top-[6%] w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#7c3aed]/30 to-[#06b6d4]/25 blur-[120px] animate-blob" />
        <div className="absolute right-[-6%] bottom-[6%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#60a5fa]/20 to-[#7c3aed]/20 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute left-[10%] bottom-[30%] w-[260px] h-[260px] rounded-full bg-gradient-to-br from-[#06b6d4]/20 to-[#60a5fa]/12 blur-[60px] opacity-80 animate-blob animation-delay-3500" />
      </div>

      {/* Top glow/scan line */}
      <div className="fixed inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#06b6d4]/30 to-transparent -z-10" />

      {/* Navbar */}
      <header className="fixed w-full top-0 left-0 z-40 bg-[#050816]/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] flex items-center justify-center font-bold text-black">
              HK
            </div>
            <div className="text-sm font-semibold tracking-wide">Hari Karthick</div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm opacity-90">
            <button onClick={() => scrollToSection("about")} className="hover:opacity-100 transition-opacity">About</button>
            <button onClick={() => scrollToSection("projects")} className="hover:opacity-100 transition-opacity">Projects</button>
            <button onClick={() => scrollToSection("skills")} className="hover:opacity-100 transition-opacity">Skills</button>
            <button onClick={() => scrollToSection("contact")} className="hover:opacity-100 transition-opacity">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <a href={contactInfo.github} target="_blank" rel="noreferrer" className="text-sm opacity-80 hover:opacity-100">GitHub</a>
            <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-sm opacity-80 hover:opacity-100">LinkedIn</a>
          </div>
        </div>
      </header>

      {/* Page content - using snap to align sections */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-24">
        {/* Hero */}
        <section className="snap-start">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-extrabold leading-tight"
              >
                <span className="block text-white/80">Hi, I’m</span>
                <span className="block text-5xl md:text-6xl gradient-text">Hari Karthick</span>
                <span className="block mt-2 text-2xl md:text-3xl">I build <span className="text-cyan-300">futuristic</span> web experiences.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mt-6 text-lg text-white/80 max-w-xl"
              >
                Blending AI, animations and clean engineering to create interfaces that feel alive.
              </motion.p>

              <div className="mt-8 flex gap-4 items-center">
                <button onClick={() => scrollToSection("projects")} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-black font-medium shadow-lg transform transition hover:scale-105">
                  See my work
                </button>
                <button onClick={() => scrollToSection("contact")} className="px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm hover:scale-105 transition">
                  Get in touch
                </button>
              </div>
            </div>

            <div className="relative">
              {/* glass info card */}
              <div className="rounded-2xl p-6 glass-shadow border border-white/6">
                <div className="text-sm opacity-80">Featured Project</div>
                <div className="mt-3 font-semibold text-lg">AI Chat Assistant</div>
                <div className="mt-2 text-sm opacity-70">Realtime streaming chat with assistants, context memory and smart summaries.</div>

                <div className="mt-5 flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-white/6 flex items-center justify-center">⌘</div>
                  <div className="text-xs opacity-80">React · Node · WebSocket</div>
                  <a href="https://jolly-lamington-c59126.netlify.app/" target="_blank" rel="noreferrer" className="ml-auto text-sm opacity-80 hover:underline">Live demo →</a>
                </div>
              </div>

              {/* small floating badge */}
              <div className="absolute -right-8 -top-8 w-32 h-16 bg-gradient-to-r from-[#60a5fa]/20 to-[#7c3aed]/20 rounded-xl border border-white/6 flex items-center justify-center text-xs opacity-90">
                Futuristic UI
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="snap-start">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 gradient-text">About Me</h2>
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full mb-6" />
            <p className="text-base md:text-lg leading-relaxed text-white/90 tracking-wide">
              I’m <strong className="text-cyan-300">Hari Karthick</strong>, a developer who loves building things that <span className="text-purple-300">feel ahead of their time</span>.
              From AI-driven interfaces to smooth animated user experiences — I focus on making technology feel <span className="text-cyan-300">alive</span>.
            </p>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/80">
              My goal is to blend <span className="text-purple-300">creativity</span> with <span className="text-cyan-300">clean engineering</span>,
              turning bold ideas into real, working systems that inspire and delight.
            </p>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="snap-start">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => {
              const ref = React.createRef();
              return (
                <motion.a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group block rounded-2xl p-6 border border-white/6 backdrop-blur-sm bg-gradient-to-b from-white/2 to-transparent transform transition"
                >
                  <div
                    ref={ref}
                    onMouseMove={(e) => handleCardMove(e, ref)}
                    onMouseLeave={() => resetCard(ref)}
                    className="relative rounded-xl p-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/8 to-[#06b6d4]/8 blur-sm opacity-60 rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-300">{p.title}</h3>
                    <p className="text-sm opacity-80">{p.description}</p>
                    <div className="mt-4 text-xs opacity-60">View live →</div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="snap-start">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL", "Tailwind CSS"].map((s) => (
              <div key={s} className="p-4 rounded-lg border border-white/6 text-center text-sm opacity-90 bg-white/2">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="snap-start">
          <h2 className="text-3xl font-bold mb-4 gradient-text text-center">Contact</h2>
          <div className="max-w-xl mx-auto rounded-xl p-6 border border-white/6 backdrop-blur-sm space-y-3">
            <div><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="text-cyan-300 hover:underline">{contactInfo.email}</a></div>
            <div><strong>Phone:</strong> <a href={`tel:${contactInfo.phone}`} className="text-cyan-300 hover:underline">{contactInfo.phone}</a></div>
            <div><strong>GitHub:</strong> <a href={contactInfo.github} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{contactInfo.github}</a></div>
            <div><strong>LinkedIn:</strong> <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{contactInfo.linkedin}</a></div>
            <div><strong>WhatsApp:</strong> <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">Message on WhatsApp</a></div>
          </div>
        </section>

        <footer className="py-10 text-center opacity-80">
          Built with ❤️ using React © {new Date().getFullYear()} Hari Karthick
        </footer>
      </main>

      {/* Tailwind + small custom styles contained here */}
      <style>{`
        /* gradient animated text */
        .gradient-text {
          background: linear-gradient(90deg, #7c3aed, #06b6d4, #60a5fa);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-slide 6s linear infinite;
        }
        @keyframes gradient-slide {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }

        /* blob animation helpers */
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3500 { animation-delay: 3.5s; }

        @keyframes blob {
          0% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-12px) scale(1.02); }
          66% { transform: translateY(8px) scale(0.98); }
          100% { transform: translateY(0px) scale(1); }
        }

        /* glass-shadow helper */
        .glass-shadow {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 10px 40px rgba(2,6,23,0.6);
          backdrop-filter: blur(6px);
        }

        /* smooth scroll snap (works in modern browsers) */
        html { scroll-behavior: smooth; }
        main { scroll-snap-type: y proximity; }
        section { scroll-snap-align: start; padding-top: 20px; }

        /* small responsive tweaks */
        @media (max-width: 768px) {
          .gradient-text { font-size: 2rem; }
        }
      `}</style>
    </div>
  );
}
