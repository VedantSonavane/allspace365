import React, { useState, useRef } from 'react';
import Letstalk from '../components/letstalk';
import curvedStaircase from "../assets/Ext. Cam A_Op 3.jpg";
import mainimage from "../assets/COVER.jpg";

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [gridColumns, setGridColumns] = useState(2);
  const mainRef = useRef(null);

  const projects = [
    { id: 1, title: "CURVED WOODEN STAIRCASE", category: "RESIDENCES", image: curvedStaircase },
    { id: 2, title: 'MODERN VILLA EXTERIOR', category: 'RESIDENCES', image: mainimage },
    { id: 3, title: 'TROPICAL MODERN HOUSE', category: 'RESIDENCES', image: 'https://cdn.yodezeen.com/extra_ARCH_28x_9cce867625.webp' },
    { id: 4, title: 'LUXURY INTERIOR LIVING', category: 'HOTELS & RESORTS', image: 'https://cdn.yodezeen.com/extra_ely_bsc_photography_Eleonora_Boscarelli_043_1_1_8867e1f0e6.webp' },
    { id: 5, title: 'MINIMALIST CONCRETE VILLA', category: 'RESIDENCES', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg' },
    { id: 6, title: 'NORDIC DINING SPACE', category: 'RESTAURANTS', image: 'https://images.pexels.com/photos/2736397/pexels-photo-2736397.jpeg' },
    { id: 7, title: 'GLASS PAVILION', category: 'PUBLIC SPACES', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' },
    { id: 8, title: 'SKYLINE PENTHOUSE', category: 'RESIDENCES', image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg' },
    { id: 9, title: 'AZURE YACHT INTERIOR', category: 'YACHTS', image: 'https://images.pexels.com/photos/1632361/pexels-photo-1632361.jpeg' },
    { id: 10, title: 'DESERT MIRAGE RETREAT', category: 'HOTELS & RESORTS', image: 'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg' },
    { id: 11, title: 'BRUTALIST MUSEUM WING', category: 'PUBLIC SPACES', image: 'https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg' },
    { id: 12, title: 'CELESTIAL PRIVATE JET', category: 'PRIVATE JETS', image: 'https://images.pexels.com/photos/1230157/pexels-photo-1230157.jpeg' },
    { id: 13, title: 'RIVERSIDE MODERNISM', category: 'RESIDENCES', image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg' },
    { id: 14, title: 'OBSIDIAN LOUNGE', category: 'RESTAURANTS', image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg' },
    { id: 15, title: 'MARBLE LUXE BATH', category: 'RESIDENCES', image: 'https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg' },
    { id: 16, title: 'ZEN GARDEN ATRIUM', category: 'PUBLIC SPACES', image: 'https://images.pexels.com/photos/707581/pexels-photo-707581.jpeg' },
    { id: 17, title: 'ALPINE BOUTIQUE HOTEL', category: 'HOTELS & RESORTS', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg' },
    { id: 18, title: 'CHROME EXTERIOR HUB', category: 'PUBLIC SPACES', image: 'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg' },
    { id: 19, title: 'VELVET BISTRO', category: 'RESTAURANTS', image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg' },
    { id: 20, title: 'GEOMETRIC STAIRS', category: 'PUBLIC SPACES', image: 'https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg' },
    { id: 21, title: 'TERRACE OVERLOOK', category: 'RESIDENCES', image: 'https://images.pexels.com/photos/1101124/pexels-photo-1101124.jpeg' },
    { id: 22, title: 'MONOCHROME SUITE', category: 'HOTELS & RESORTS', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg' },
    { id: 23, title: 'COPPER DISTILLERY BAR', category: 'RESTAURANTS', image: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg' },
    { id: 24, title: 'SILVER WING CABIN', category: 'PRIVATE JETS', image: 'https://images.pexels.com/photos/5411674/pexels-photo-5411674.jpeg' }
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#f2f0f0] text-[#1a1a1a] overflow-x-hidden">
      
      <header className="pt-32 pb-12 md:pt-48 md:pb-20 text-center px-6">
        <div className="overflow-hidden">
          <h2 className="text-3xl md:text-7xl font-light tracking-tighter uppercase leading-none mb-2">
            ALL PROJECTS
          </h2>
        </div>
        <div className="overflow-hidden">
          <h1 className="text-2xl md:text-7xl font-light tracking-tighter text-[#c9c7c7] uppercase leading-none">
            Architecture / Interior Design
          </h1>
        </div>
      </header>

      <div className="sticky top-0 bg-[#f2f0f0]/90 backdrop-blur-md z-30 border-t border-gray-300">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-6 pl-4 py-4 md:py-6">
            <div className="flex items-center gap-3">
              {[2, 4].map(num => (
                <button
                  key={num}
                  onClick={() => setGridColumns(num)}
                  className={`text-xs md:text-sm font-bold transition-all px-2 ${
                    gridColumns === num ? 'text-black scale-125' : 'text-gray-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-[1800px] mx-auto px-4 md:px-10 py-10 pb-32">
        <div
          className={`gap-2 transition-all duration-700 ease-in-out ${
            gridColumns === 2 ? 'columns-1 md:columns-2' : 'columns-2 md:columns-4'
          }`}
        >
          {filteredProjects.map((project) => (
            <div
              key={`${activeFilter}-${project.id}`} 
              className="project-card group cursor-pointer break-inside-avoid mb-2 relative overflow-hidden"
            >
              <div className="relative w-full overflow-hidden bg-[#e6e4e4]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-[2s] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-10 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/70 mb-1 uppercase">
                    {project.category}
                  </p>
                  <h3 className="text-sm md:text-lg font-light tracking-wide text-white uppercase leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex text-[9px] gap-4 mt-4 pt-4 border-t border-white/20">
                    <span className="text-white/50 tracking-widest uppercase">London / 2026</span>
                    <span className="text-white/50 tracking-widest uppercase">View Project</span>
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