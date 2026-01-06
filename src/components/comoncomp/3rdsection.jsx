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
                         <button
              className="
                mt-6 flex items-center gap-3
                px-1.5 py-1.5 pl-5 rounded-full
                bg-[#3a3a3a] text-white
               text-xs sm:text-xs font-bold uppercase
                hover:bg-[#2a2a2a] transition-all duration-300
                group
              "
            >
view philosophy              {/* ARROW CIRCLE */}
              <span className="
                w-10 h-10 rounded-full
                bg-[#5a5a5a] flex items-center justify-center
                transition-all duration-300
                group-hover:bg-[#ffff] 
              ">
                <svg
                  className="w-5 h-5 text-white group-hover:rotate-45  transition-transform duration-300 group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </span>
            </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArchitectureSection;