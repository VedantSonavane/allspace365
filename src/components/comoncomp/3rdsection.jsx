import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ArchitectureSection = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const imageWrapRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
       const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    // LOWERING THIS VALUE MAKES IT FASTER
    // "+=100%" means it finishes after scrolling exactly 1 screen height
    // "+=200%" (old) meant it took 2 screen heights to finish
    end: "+=100%", 
    scrub: 1, // You can change this to 0.5 for a "snappier" feel with less lag
    pin: true,
  },
});

        /* IMAGE SCALE */
        tl.fromTo(
          imageWrapRef.current,
          { scale: 1.3 },
          { scale: 1, ease: "none" },
          0
        );

        /* IMAGE COLUMN WIDTH */
        // We grow to 100% instead of 120% to prevent pushing text into oblivion
        tl.fromTo(
          imageWrapRef.current.parentElement,
          { flex: "0 0 20%" }, 
          { flex: "0 0 105%", ease: "none" },
          0
        );
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen overflow-hidden" 
      style={{ backgroundColor: "#f2f0f0" }}
    >
      <div ref={stickyRef} className="h-screen w-full flex flex-col md:flex-row">
        
        {/* IMAGE COLUMN */}
        <div className="hidden md:flex items-center justify-center overflow-hidden h-full bg-[#e5e3e3] z-10">
          <div ref={imageWrapRef} className="w-full h-full">
            <img
              src="https://images.pexels.com/photos/12428480/pexels-photo-12428480.jpeg"
              alt="Architecture"
              className="w-full h-full object-cover grayscale-[20%]"
              draggable={false}
            />
          </div>
        </div>

        {/* TEXT COLUMN - Added min-w-[50%] and z-0 */}
        <div className="flex-1 min-w-[50%] flex items-center px-6 sm:px-12 md:px-20 py-20 md:py-0 bg-[#f2f0f0] z-0">
          <div className="w-full max-w-xl space-y-12 md:space-y-16">
            
            <div className="overflow">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-[#2e2a2a]  whitespace-nowrap">
                Rooted in clarity, <br />
                responsibility, and <br />
                long-term thinking.
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="text-sm md:text-base font-light leading-relaxed tracking-widest text-[#2e2a2a]/80 max-w-md">
                Whether close at hand or across continents, the design intent 
                remains consistent. The aim is to create environments that 
                feel natural to occupy and composed in their presence.
              </p>
            </div>

            <div className="pt-4">
              <button className="group relative px-8 py-3 rounded-full border border-[#2e2a2a]/20 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#2e2a2a] overflow-hidden transition-all duration-500 hover:bg-[#2e2a2a] hover:text-white">
                View Philosophy
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArchitectureSection;