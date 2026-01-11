import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  { id: "01", title: "CONTACT", desc: "Initiate your journey by connecting with JVID to share your aspirations." },
  { id: "02", title: "CLIENT DISCOVERY", desc: "A deep dive into project nuances, exploring floor plans and defining strategic timelines." },
  { id: "03", title: "TOKEN OF INTENT", desc: "Formalize our partnership and secure your exclusive design window." },
  { id: "04", title: "CUSTOMIZE", desc: "Curating your preferences through our bespoke style quiz and technical checklist." },
  { id: "05", title: "DESIGN & STYLE", desc: "Experience a tailor-made presentation that mirrors your unique personality and aesthetic." },
  { id: "06", title: "FINALISE", desc: "Perfecting the blueprint—finalizing intricate floor plans and structural designs." },
  { id: "07", title: "VIRTUAL VIEW", desc: "Step into your future space with VR 3D renders and tactile material selections." },
  { id: "08", title: "PROCUREMENT", desc: "Strategic ordering of premium materials and bespoke interior elements." },
  { id: "09", title: "DETAIL REVIEW", desc: "Meticulous oversight of work progress through exhaustive technical drawings." },
  { id: "10", title: "REALIZATION", desc: "Witness the seamless transformation as we turn your architectural vision into reality." }
];

const Steps = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = sectionRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = scrollWidth - windowWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=5000", 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(sectionRef.current, {
        x: -amountToScroll,
        ease: "none",
      }, 0);

      tl.fromTo(lineRef.current, 
        { width: "0%" }, 
        { width: "100%", ease: "none" }, 
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={triggerRef} 
      className="relative overflow-hidden w-full" 
      style={{ backgroundColor: "#f2f0f0", color: "#2e2a2a" }}
    >
      <div className="h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Header Section - Refined with Hero Styling */}
        <div className="px-10 md:px-20 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="border border-[#2e2a2a]/20 px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.25em]  flex items-center gap-2">
              <span className="opacity-50">04</span>
              <span>How we work</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] ">
            Smooth Journey from <br/>
            <span className="opacity-40 italic">Idea to Launch.</span>
          </h2>
        </div>

        {/* Timeline Slider Area */}
        <div className="relative">
          {/* Static Background Line */}
          <div className="absolute top-[24px] left-0 w-full h-[1px] bg-[#2e2a2a]/10 z-0" />
          
          {/* Active Progress Line */}
          <div className="absolute top-[24px] left-0 w-full h-[1px] z-10">
            <div 
              ref={lineRef}
              className="h-full bg-[#2e2a2a] relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2e2a2a] rounded-full" />
            </div>
          </div>

          {/* Steps Horizontal Wrapper */}
          <div 
            ref={sectionRef} 
            className="flex relative z-20 will-change-transform"
          >
            {/* Initial spacer */}
            <div className="min-w-[40vw] md:min-w-[50vw]" />

            {timelineData.map((item, index) => (
              <div 
                key={index} 
                className="step-item min-w-[320px] md:min-w-[600px] pr-20 md:pr-40 flex flex-col gap-8"
              >
                {/* Minimalist Indicator */}
                <div className="w-12 h-12 rounded-full bg-[#f2f0f0] border border-[#2e2a2a]/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#2e2a2a] rounded-full" />
                </div>
                
                {/* Step Text Content */}
                <div className="space-y-4">
                  <div className="text-[10px] font-bold opacity-40 tracking-[0.3em] ">
                    STEP {item.id}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter  leading-none">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-bold leading-relaxed opacity-60 max-w-[350px] tracking-wide ">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* End spacer */}
            <div className="min-w-[50vw]" />
          </div>
        </div>

        {/* Bottom Decorative Element (Cities style) */}
        <div className="absolute bottom-10 left-10 md:left-20 text-[9px] font-bold tracking-[0.3em] opacity-30 ">
          Precision &middot; Craft &middot; Excellence
        </div>
      </div>
    </section>
  );
};

export default Steps;