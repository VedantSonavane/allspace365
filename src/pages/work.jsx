import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LayoutGrid, Columns2, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/product";
import Letstalk from "../components/letstalk";

const WorkPage = () => {
  const [gridColumns, setGridColumns] = useState(2);
  const navigate = useNavigate();

  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Cards stagger animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.2
      }
    );
  }, [gridColumns]);

  return (
    <div className="min-h-screen bg-[#f2f0f0] text-[#1a1a1a] overflow-x-hidden">
      
      {/* HEADER */}
      <header
        ref={headerRef}
        className="pt-32 pb-12 md:pt-48 md:pb-20 text-center px-6 opacity-0"
      >
        <h2 className="text-4xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
          ALL PROJECTS
        </h2>
        <h1 className="text-xl md:text-7xl font-bold tracking-tighter text-[#c9c7c7] uppercase leading-none opacity-60">
          Architecture / Interior Design
        </h1>
      </header>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-30 border-t border-gray-300 bg-[#f2f0f0]/80 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 flex items-center justify-between py-5">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 hidden md:block">
            Showing {projects.length} Works
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setGridColumns(2)}
              className={`flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold transition-opacity ${
                gridColumns === 2 ? "opacity-100" : "opacity-30"
              }`}
            >
              <Columns2 size={16} />
              <span className="hidden md:inline">Standard</span>
            </button>

            <button
              onClick={() => setGridColumns(4)}
              className={`flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold transition-opacity ${
                gridColumns === 4 ? "opacity-100" : "opacity-30"
              }`}
            >
              <LayoutGrid size={16} />
              <span className="hidden md:inline">Compact</span>
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="w-full mx-auto px-2 md:px-4 py-10">
        <div
          className={`gap-4 ${
            gridColumns === 2
              ? "columns-1 md:columns-2"
              : "columns-2 md:columns-4"
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => navigate(`/project/${project.id}`)}
              className="group cursor-pointer relative mb-4 break-inside-avoid overflow-hidden bg-white opacity-0"
            >
              <div className="relative overflow-hidden aspect-[4/5] md:aspect-auto">
                <img
                  src={project.mainImage}
                  alt={project.title}
                  className="w-full h-full object-cover block grayscale-[20%] group-hover:grayscale-0 transition duration-700"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-between p-6 md:p-10 backdrop-blur-[2px]">
                  <div className="flex justify-between items-start">
                    <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase">
                      {project.category} // {project.year}
                    </p>
                    <ArrowUpRight className="text-white" size={20} />
                  </div>

                  <div className="space-y-4">
                    <p className="text-white/80 text-xs italic max-w-[250px] translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">
                      "{project.quote}"
                    </p>

                    <h3 className="text-white text-3xl md:text-4xl uppercase font-bold tracking-tighter translate-y-full group-hover:translate-y-0 transition duration-500 delay-200">
                      {project.title}
                    </h3>

                    <div className="flex gap-4 pt-2 border-t border-white/20 opacity-0 group-hover:opacity-100 transition duration-700 delay-300">
                      <div className="text-[9px] text-white/50 uppercase tracking-widest">
                        <span className="block text-white/90">Location</span>
                        {project.location}
                      </div>
                      <div className="text-[9px] text-white/50 uppercase tracking-widest">
                        <span className="block text-white/90">Status</span>
                        {project.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Letstalk />
    </div>
  );
};

export default WorkPage;
