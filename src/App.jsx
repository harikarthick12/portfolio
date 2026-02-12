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
              </div>
            </div>
          </div>
        </section>

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
        }
      `}</style>
    </div>
  );
}
