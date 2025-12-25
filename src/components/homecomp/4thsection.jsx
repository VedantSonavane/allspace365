import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SquareDashedMousePointer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex  items-center justify-center w-full overflow-hidden"
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/16143469/pexels-photo-16143469.jpeg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* SCROLL REVEAL HEADING */}
        <h1
          className="text-white mb-12 text-5xl md:text-7xl font-semibold tracking-wide uppercase"
        >
          Featured Projects
        </h1>

        {/* BUTTON */}
        <div data-aos="fade-up " data-aos-delay="200">
          <button
            className="group inline-flex items-center gap-4
                       bg-white/90 text-black
                       px-8 py-4 rounded-full
                       uppercase text-sm tracking-widest
                       transition-all duration-300
                       hover:bg-black hover:text-white"
          >
            View Projects

            <span
              className="flex items-center justify-center
                      "
            >
              <SquareDashedMousePointer
                size={18}
                className="transition-colors duration-300
                           group-hover:text-white"
              />
            </span>
          </button>
        </div>

        {/* SCROLL REVEAL DESCRIPTION */}
        <div className="mt-14 max-w-2xl">
          <h1
          
            className="uppercase tracking-widest text-sm text-white/90 leading-relaxed"
          >
            A closer look at how the practice translates intent into built form,
            exploring projects shaped by clarity, context, and long-term thinking.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
