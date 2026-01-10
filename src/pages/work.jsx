import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Columns2, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/product';
import Letstalk from '../components/letstalk';

const WorkPage = () => {
  const [gridColumns, setGridColumns] = useState(2);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2f0f0] text-[#1a1a1a] overflow-x-hidden selection:bg-black selection:text-white">
      <header className="pt-32 pb-12 md:pt-48 md:pb-20 text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-4xl md:text-8xl font-bold tracking-tighter leading-none mb-4">ALL PROJECTS</h2>
          <h1 className="text-xl md:text-7xl font-bold tracking-tighter text-[#c9c7c7] uppercase leading-none opacity-60">
            Architecture / Interior Design
          </h1>
        </motion.div>
      </header>

      <div className="sticky top-0 z-30 border-t border-gray-300 bg-[#f2f0f0]/80 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 flex items-center justify-between py-5">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 hidden md:block">
            Showing {projects.length} Works
          </span>
          <div className="flex items-center gap-4">
            <button onClick={() => setGridColumns(2)} className={`flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold transition-opacity ${gridColumns === 2 ? 'opacity-100' : 'opacity-30'}`}>
              <Columns2 size={16} /> <span className="hidden md:inline">Standard</span>
            </button>
            <button onClick={() => setGridColumns(4)} className={`flex items-center gap-2 text-[10px] tracking-widest uppercase font-bold transition-opacity ${gridColumns === 4 ? 'opacity-100' : 'opacity-30'}`}>
              <LayoutGrid size={16} /> <span className="hidden md:inline">Compact</span>
            </button>
          </div>
        </div>
      </div>

      <section className="w-full mx-auto px-2 md:px-4 py-10">
        <motion.div layout className={`gap-4 transition-all duration-700 ${gridColumns === 2 ? 'columns-1 md:columns-2' : 'columns-2 md:columns-4'}`}>
          <div mode='wait'>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={`card-${project.id}`} // Matching ID for the container
                onClick={() => navigate(`/project/${project.id}`)}
                className="project-card group cursor-pointer relative mb-4 break-inside-avoid overflow-hidden bg-white"
              >
                <div className="relative overflow-hidden aspect-[4/5] md:aspect-auto">
                  <motion.img
                    layoutId={`img-${project.id}`} // Matching ID for the image
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-full object-cover block filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />

                  {/* Hover Content */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 md:p-10 backdrop-blur-[2px]">
                    <div className="flex justify-between items-start">
                      <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-medium">{project.category} // {project.year}</p>
                      <ArrowUpRight className="text-white" size={20} />
                    </div>
                    <div className="space-y-4">
                      <p className="text-white/80 text-xs italic font-light leading-relaxed max-w-[250px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">"{project.quote}"</p>
                      <div className="overflow-hidden">
                        <h3 className="text-white text-3xl md:text-4xl uppercase font-bold tracking-tighter leading-none transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">{project.title}</h3>
                      </div>
                      <div className="flex gap-4 pt-2 border-t border-white/20 transform opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                        <div className="text-[9px] text-white/50 uppercase tracking-widest"><span className="block text-white/90">Location</span> {project.location}</div>
                        <div className="text-[9px] text-white/50 uppercase tracking-widest"><span className="block text-white/90">Status</span> {project.status}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <Letstalk />
    </div>
  );
};

export default WorkPage;