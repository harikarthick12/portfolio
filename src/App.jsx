<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import Lenis from "lenis";
import GooeyNav from "./components/GooeyNav/GooeyNav";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * VIBRANT PORTFOLIO - SIMPLE WORDING
 */

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", project: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "inquiries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", project: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Something went wrong. Please check your Firebase configuration.");
    }
    setIsSubmitting(false);
  };

  // Mouse parallax for 3D effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  };

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const projects = [
    { title: "Portfolio Website", description: "My personal portfolio built with React and Tailwind.", tech: ["React", "Motion", "Tailwind"], link: "https://jolly-lamington-c59126.netlify.app/" },
    { title: "MediBot AI", description: "An AI medical chatbot using Gemini and Node.js.", tech: ["Node.js", "AI", "Socket.io"], link: "https://medibot-q2dy.onrender.com/" },
    { title: "FileCrypto", description: "A simple app for encrypting and decrypting files.", tech: ["React", "Crypto", "Node"], link: "https://filecrypto.vercel.app/" },
    { title: "LocoTrack", description: "A real-time bus tracking app using live GPS data.", tech: ["Geoloc", "Live", "Node"], link: "https://locotrack.onrender.com/" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div onMouseMove={handleMouseMove} className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">

      {/* 3D Grid Background */}
      <div className="perspective-grid">
        <div className="grid-lines"
          style={{
            transform: `rotateX(60deg) translateY(${mousePos.y}px) translateX(${mousePos.x}px)`,
          }}
        />
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
      </div>

      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-violet-500/10 blur-[150px] rounded-full"
        />
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 origin-left z-50" style={{ scaleX }} />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center font-bold text-black shadow-lg">HK</div>
          <span className="font-bold tracking-tight text-xl hidden sm:block">HARI <span className="text-cyan-400 uppercase tracking-widest text-xs">Developer</span></span>
        </div>

        <GooeyNav
          items={[
            { label: "Home", href: "#home", onClick: () => scrollTo("home") },
            { label: "About", href: "#about", onClick: () => scrollTo("about") },
            { label: "Skills", href: "#skills", onClick: () => scrollTo("skills") },
            { label: "Projects", href: "#projects", onClick: () => scrollTo("projects") },
          ]}
        />

        <a href="/HariKarthick_Resume.pdf" download className="px-5 py-2 rounded-full bg-white text-black text-xs font-black hover:scale-105 active:scale-95 transition-all">
          RESUME
        </a>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 pt-32 space-y-32">

        {/* HERO SECTION */}
        <section id="home" className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-3/5 space-y-6 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
              Available for projects
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1]">
              Hello, I'm <br />
              <span className="electric-text">Hari Karthick.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed mx-auto md:mx-0">
              I am a <span className="text-white font-bold">Full Stack Developer</span> from India. I enjoy building websites that look good and work well.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button onClick={() => scrollTo("projects")} className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-black uppercase tracking-wider hover:scale-105 transition-all">
                My Projects →
              </button>
              <div className="text-sm text-gray-400 font-medium">Real-time projects completed successfully</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-2/5 flex justify-center md:justify-end"
          >
            <div className="relative group w-full max-w-sm aspect-[4/5]">
              {/* Soft Background Glow */}
              <div className="absolute inset-0 bg-cyan-400/5 blur-[80px] rounded-full group-hover:bg-cyan-400/10 transition-colors duration-700" />

              {/* Professional Glass Frame */}
              <div className="relative z-10 w-full h-full glass-card p-2 overflow-hidden border-white/5 group-hover:border-white/20 group-hover:-translate-y-2 transition-all duration-500 shadow-2xl">
                <div className="w-full h-full rounded-[20px] overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src="/me.jpg"
                    alt="Hari Karthick"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Subtle Professional Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="text-[10px] font-bold text-cyan-400 tracking-[0.3em] uppercase mb-1">Full-Stack Engineer</div>
                    <div className="text-white font-bold text-lg tracking-tight">Hari Karthick</div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Accents (Subtle) */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400/20 rounded-tl-2xl group-hover:border-cyan-400/40 transition-colors" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-violet-500/20 rounded-br-2xl group-hover:border-violet-500/40 transition-colors" />
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-6 italic">About <br /> <span className="text-violet-400 underline decoration-cyan-400">Me.</span></h2>
          </div>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
            <p>
              I am a developer who likes to combine design and technology. I build websites using modern tools like <span className="text-white font-bold underline decoration-indigo-500">React and Node.js</span>.
            </p>
            <p>
              I focus on making things fast, easy to use, and visually attractive. Whether it's a simple landing page or a complex app, I always aim for the best quality.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass-card p-6 text-center">
                <div className="text-cyan-400 font-black text-3xl italic">2+</div>
                <div className="text-[10px] uppercase font-bold tracking-widest mt-1 text-gray-500">Years Experience</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-violet-400 font-black text-3xl italic">100%</div>
                <div className="text-[10px] uppercase font-bold tracking-widest mt-1 text-gray-500">Commitment</div>
=======
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
     {
      title: "LocoTrack",
      description: "LOCOTrack is a real-time bus tracking web application that helps users locate buses instantly using live GPS data",
      link: "https://locotrack.onrender.com/",
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
>>>>>>> 1394745a22f8ba4749c8d82010240899916cdb1d
              </div>
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* PROJECTS SECTION */}
        <section id="projects" className="py-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <h2 className="text-6xl font-black uppercase italic">My <br /> <span className="electric-text underline decoration-white/20">Projects.</span></h2>
            <p className="text-gray-500 max-w-xs text-right hidden md:block text-sm">A few things I've built recently using different technologies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, idx) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -10 }}
                className="group relative h-[400px] glass-card overflow-hidden block"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 h-full flex flex-col justify-end relative z-20">
                  <div className="flex gap-2 mb-4">
                    {p.tech.map(t => (
                      <span key={t} className="px-2 py-1 rounded bg-white/10 text-[9px] uppercase font-bold tracking-[0.2em]">{t}</span>
                    ))}
                  </div>
                  <h3 className="text-4xl font-black mb-2 group-hover:text-cyan-400 transition-colors uppercase italic leading-none">{p.title}</h3>
                  <p className="text-gray-400 text-sm font-medium line-clamp-2">{p.description}</p>

                  <div className="mt-6 flex items-center text-xs font-black tracking-widest text-cyan-400 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    LIVE PREVIEW →
                  </div>
                </div>

                <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.03] group-hover:text-white/[0.05] transition-colors leading-none">
                  0{idx + 1}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-10 glass-card p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-cyan-400/5 blur-[80px] rounded-full" />
          <h2 className="text-4xl font-black mb-12 text-center uppercase italic tracking-wider">My <span className="text-cyan-400">Skills.</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { category: "Frontend", techs: ["React", "HTML/CSS", "Tailwind", "Motion"] },
              { category: "Backend", techs: ["Node.js", "Express", "SQL", "MongoDB"] },
              { category: "Tools", techs: ["Git", "Postman", "Figma", "Firebase"] },
              { category: "AI", techs: ["Gemini", "OpenAI", "Chatbots", "Automation"] }
            ].map((s) => (
              <div key={s.category} className="space-y-4">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.category}</div>
                <ul className="space-y-3">
                  {s.techs.map(t => (
                    <li key={t} className="flex items-center gap-2 text-gray-300 font-medium group cursor-default">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:scale-[2] transition-transform" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 flex flex-col items-center space-y-12">
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic leading-none">
              Get in <span className="electric-text">Touch.</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-6 text-lg font-light">
              Have a project in mind? Fill out the form below or reach out directly!
            </p>
          </div>

          <div className="w-full max-w-2xl glass-card p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-[50px] rounded-full -mr-16 -mt-16" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Project Details</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Tell me about your project..."
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors resize-none"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all text-black disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : submitted ? "Success! I'll contact you soon" : "Send Inquiry"}
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:harikarthicksrini@gmail.com" className="p-5 glass-card hover:border-cyan-400/50 flex items-center gap-3">
              <span className="font-bold uppercase text-xs tracking-widest">Email</span>
            </a>
            <a href="https://wa.me/919003896459" target="_blank" className="p-5 glass-card hover:border-green-400/50 flex items-center gap-3 text-green-400">
              <span className="font-bold uppercase text-xs tracking-widest">WhatsApp</span>
            </a>
            <a href="https://www.linkedin.com/in/harikarthick12/" target="_blank" className="p-5 glass-card hover:border-violet-400/50 flex items-center gap-3">
              <span className="font-bold uppercase text-xs tracking-widest">LinkedIn</span>
            </a>
            <a href="https://www.github.com/harikarthick12" target="_blank" className="p-5 glass-card hover:border-violet-400/50 flex items-center gap-3">
              <span className="font-bold uppercase text-xs tracking-widest">GitHub</span>
            </a>
          </div>
        </section>

        <footer className="border-t border-white/5 py-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 text-xs font-bold uppercase tracking-[0.2em]">
          <div>Hari Karthick © {new Date().getFullYear()}</div>
          <div className="flex gap-8">
            <span>Built with React</span>
            <span>Motion Design</span>
          </div>
        </footer>

      </main>

      <style>{`
        .perspective-grid {
          perspective: 1000px;
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }

        .grid-lines {
          position: absolute;
          width: 200vw;
          height: 200vh;
          top: -50vh;
          left: -50vw;
          background-image: 
            linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          transition: transform 0.2s ease-out;
        }

        .electric-text {
          @apply text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#8b5cf6] to-[#ff00e5];
        }

        .glass-card {
           @apply bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-300;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-float {
          animation: floating 8s ease-in-out infinite;
=======
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
                        {/* <a href={p.link} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border border-white/10">Open</a> */}
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
>>>>>>> 1394745a22f8ba4749c8d82010240899916cdb1d
        }
      `}</style>
    </div>
  );
}
