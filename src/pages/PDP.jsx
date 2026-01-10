import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/product";
import Letstalk from "../components/letstalk";
import { GitPullRequestClosed } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  const containerRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroMetaRef = useRef(null);
  const conceptRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      /* HERO INTRO */
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1, opacity: 1 },
        {
          scale: 1.05,
          opacity: 0,
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from(heroTitleRef.current, {
        y: 120,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(heroMetaRef.current, {
        opacity: 0,
        delay: 0.4,
        duration: 1,
      });

      /* CONCEPT TEXT REVEAL */
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: conceptRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f2f0f0] text-[#2e2a2a]">
        Project not found
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f2f0f0] text-[#2e2a2a] overflow-x-hidden"
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => navigate(-1)}
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
          hover:bg-white/80
        "
      >
        <GitPullRequestClosed size={12} />
        Close
      </button>

      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <img
          ref={heroImageRef}
          src={project.mainImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="relative h-screen w-full flex flex-col justify-end p-8 md:p-20 pointer-events-none">
          <h1
            ref={heroTitleRef}
            className="text-5xl md:text-[8rem] font-semibold tracking-tight text-white leading-[0.85] mb-4"
          >
            {project.title}
          </h1>

          <p
            ref={heroMetaRef}
            className="text-white/60 text-[10px] md:text-xs tracking-[0.5em] uppercase"
          >
            {project.category} — {project.year}
          </p>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="py-24 md:py-40 px-8 md:px-16">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-black/10 pt-12">
          <Spec label="Architectural Style" value={project.designStyle || "Minimalist Brutalism"} />
          <Spec label="Location & Environment" value={project.location || "Surrey Hills, UK"} />
          <Spec label="Project Dimensions" value={project.size || "4,200 SQ FT"} />
          <Spec label="Timeline & Status" value={project.status || "Completed"} />
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-4 md:px-12 space-y-12">
        {project.gallery?.slice(0, 2).map((img, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden w-full ${
              idx === 0 ? "h-[60vh] md:h-[90vh]" : "h-[70vh] md:h-[110vh]"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/5 transition duration-700" />
          </div>
        ))}
      </section>

      {/* CONCEPT */}
      <section ref={conceptRef} className="py-32 md:py-56 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="reveal-text text-[10px] tracking-[0.6em] mb-8 font-bold uppercase opacity-50">
            The Narrative
          </p>

          <h2 className="reveal-text text-4xl md:text-8xl font-bold leading-[1.1] mb-12 tracking-tight">
            Architecture <br className="hidden md:block" /> Guided by Light
          </h2>

          <p className="reveal-text text-sm md:text-lg leading-relaxed max-w-2xl mx-auto opacity-70">
            {project.conceptDescription}
          </p>
        </div>
      </section>

      <Letstalk />
    </div>
  );
};

const Spec = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-3">
      {label}
    </p>
    <p className="text-sm md:text-base font-medium leading-relaxed">
      {value}
    </p>
  </div>
);

export default ProjectDetailPage;
