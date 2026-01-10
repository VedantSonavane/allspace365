import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { projects } from '../data/product';
import Letstalk from '../components/letstalk';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitPullRequestClosed } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));
  
  const containerRef = useRef(null);
  const conceptRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Reveal text animation for the Narrative/Concept section
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: conceptRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!project) return <div className="h-screen flex items-center justify-center font-light bg-[#f2f0f0] text-[#2e2a2a]">Project not found</div>;

  return (
    <AnimatePresence>
      <div ref={containerRef} className="min-h-screen bg-[#f2f0f0] text-[#2e2a2a] selection:bg-[#2e2a2a] selection:text-[#f2f0f0] overflow-x-hidden">

        {/* TOP LEFT BACK BUTTON */}
      <motion.button
  onClick={() => navigate(-1)}
  initial={{ opacity: 0, x: -12 }}
  animate={{ opacity: 1, x: 0 }}
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="
    fixed top-5 left-5 md:top-8 md:left-8 z-[110]
    flex items-center gap-2
    px-3.5 py-1.5 md:px-4 md:py-2
    rounded-full
    text-[9px] md:text-[10px]
    font-semibold tracking-[0.18em] uppercase
    text-[#2e2a2a]
    bg-white/60 backdrop-blur-md
    border border-white/40
    shadow-[0_4px_20px_rgba(0,0,0,0.06)]
    transition-all duration-300
    hover:bg-white/75
  "
>
  <GitPullRequestClosed size={12} />
  Close
</motion.button>


        {/* 1. HERO SECTION - FULL SCREEN & FIXED */}
        <section className="relative min-h-screen w-full overflow-hidden">
  <motion.img 
    layoutId={`img-${project.id}`} // This MUST match the WorkPage layoutId exactly
    src={project.mainImage}
    style={{ scale, opacity }}
    className="w-full h-full absolute inset-0 object-cover opacity-60"
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
  />
          
          <div className="relative h-screen w-full flex flex-col justify-end p-8 md:p-20 pointer-events-none">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-5xl md:text-[8rem] font-semibold tracking-tight text-white leading-[0.85] mb-4"
              >
                {project.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/60 text-[10px] md:text-xs tracking-[0.5em] uppercase"
              >
                {project.category} — {project.year}
              </motion.p>
            </div>
          </div>
        </section>

        {/* 2. SPECIFICATIONS - CONTENT RESTORED & ENHANCED */}
        <section className="py-24 md:py-40 px-8 md:px-16">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-black/10 pt-12">
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-3">Architectural Style</p>
              <p className="text-sm md:text-base font-medium leading-relaxed">
                {project.designStyle || "Minimalist Brutalism"} <br/>
                <span className="opacity-60 text-xs">Focused on raw material honesty and spatial fluidity.</span>
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-3">Location & Environment</p>
              <p className="text-sm md:text-base font-medium leading-relaxed">
                {project.location || "Surrey Hills"}, United Kingdom <br/>
                <span className="opacity-60 text-xs italic">51.2385° N, 0.5562° W</span>
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-3">Project Dimensions</p>
              <p className="text-sm md:text-base font-medium leading-relaxed">
                {project.size || "4,200 SQ FT"} Total Area <br/>
                <span className="opacity-60 text-xs">Spread across three cantilevered levels.</span>
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-3">Timeline & Status</p>
              <p className="text-sm md:text-base font-medium leading-relaxed">
                {project.status || "Completed"} <br/>
                <span className="opacity-60 text-xs">Q4 2025 Completion Date</span>
              </p>
            </motion.div>

          </div>
        </section>

        {/* 3. GALLERY - FIXED ATTACHMENT EFFECT */}
        <section className="px-4 md:px-12 space-y-12">
          {project.gallery && project.gallery.slice(0, 2).map((img, idx) => (
            <div 
              key={idx}
              className={`relative overflow-hidden w-full ${idx === 0 ? 'h-[60vh] md:h-[90vh]' : 'h-[70vh] md:h-[110vh]'} bg-no-repeat bg-center bg-cover`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-700" />
            </div>
          ))}
        </section>

        {/* 4. CONCEPT - NARRATIVE */}
        <section ref={conceptRef} className="py-32 md:py-56 px-8 md:px-16">
          <div className="max-w-5xl mx-auto text-center">
            <p className="reveal-text text-[10px] tracking-[0.6em] mb-8 font-bold uppercase opacity-50">The Narrative</p>
            <h2 className="reveal-text text-4xl md:text-8xl font-bold leading-[1.1] mb-12 tracking-tight">
              Architecture <br className="hidden md:block"/> Guided by Light
            </h2>
            <p className="reveal-text text-sm md:text-lg leading-relaxed max-w-2xl mx-auto opacity-70">
              {project.conceptDescription || "The project was conceived as a silent dialogue between the built environment and the shifting cycles of natural light. By utilizing deep overhangs and floor-to-ceiling glass, the structure serves as a canvas for the landscape, evolving in character from dawn until dusk."}
            </p>
          </div>
        </section>

        {/* 5. FOOTER */}
        <Letstalk />
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailPage;