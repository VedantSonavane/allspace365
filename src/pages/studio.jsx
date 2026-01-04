import React, { useState } from 'react';

const ArchitecturePortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All projects');

  const projects = [
    { id: 1, title: 'JEEP HOUSE', type: 'exterior', image: 'exterior' },
    { id: 2, title: 'Modern Living', type: 'interior', image: 'interior' },
    { id: 3, title: 'Luxury Suite', type: 'interior', image: 'interior' },
    { id: 4, title: 'JEEP HOUSE', type: 'exterior', image: 'exterior' },
    { id: 5, title: 'JEEP HOUSE', type: 'exterior', image: 'exterior' },
    { id: 6, title: 'Contemporary Space', type: 'interior', image: 'interior' },
    { id: 7, title: 'Elegant Interior', type: 'interior', image: 'interior' },
    { id: 8, title: 'JEEP HOUSE', type: 'exterior', image: 'exterior' },
    { id: 9, title: 'JEEP HOUSE', type: 'exterior', image: 'exterior' },
    { id: 10, title: 'Designer Living', type: 'interior', image: 'interior' },
  ];

  const filters = ['All projects', 'Architecture', 'Interior design'];

  return (
    <div style={{ backgroundColor: "#f2f0f0", color: "#2e2a2a" }} className="min-h-screen">
      {/* Header */}
      <header className="py-16 text-center">
        <h1 className="text-5xl font-light mb-2">All projects</h1>
        <p className="text-xl opacity-70">Architecture / Interior design</p>
      </header>

      {/* Filter Navigation */}
      <nav className="flex justify-center gap-8 mb-12 flex-wrap px-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`text-sm uppercase tracking-wider pb-2 transition-all ${
              activeFilter === filter
                ? 'border-b-2 font-medium'
                : 'opacity-60 hover:opacity-100'
            }`}
            style={{ borderColor: activeFilter === filter ? "#2e2a2a" : "transparent" }}
          >
            {filter}
          </button>
        ))}
      </nav>

      {/* Project Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative overflow-hidden group cursor-pointer aspect-[4/3] bg-white"
            >
              <div 
                className={`w-full h-full flex items-center justify-center text-white text-2xl font-light transition-transform duration-500 group-hover:scale-110 ${
                  project.image === 'exterior' 
                    ? 'bg-gradient-to-br from-amber-200 via-green-300 to-blue-200' 
                    : 'bg-gradient-to-br from-stone-300 via-emerald-200 to-stone-200'
                }`}
              >
                {project.image === 'exterior' && (
                  <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-2xl font-light">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-20">
        <h2 className="text-6xl font-light mb-4 opacity-30">LET'S <span className="opacity-50">TALK</span></h2>
        <div className="flex justify-center gap-6 mb-8">
          <button className="px-6 py-2 uppercase text-sm tracking-wider hover:opacity-70 transition-opacity">
            About
          </button>
          <button className="px-6 py-2 uppercase text-sm tracking-wider hover:opacity-70 transition-opacity">
            Your Project
          </button>
        </div>
        <button 
          style={{ backgroundColor: "#2e2a2a" }}
          className="px-8 py-3 text-white uppercase text-sm tracking-wider hover:opacity-90 transition-opacity"
        >
          Contact
        </button>
      </div>

     
    </div>
  );
};

export default ArchitecturePortfolio;