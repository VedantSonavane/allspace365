import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wedo = () => {
  const sectionRef = useRef(null);
  const weRef = useRef(null);
  const doRef = useRef(null);
  const itemsWrapRef = useRef(null);
  const buttonRef = useRef(null);

  const items = ["Residential", "Mixed Use", "Hospitality", "Commercial", "Public Spaces"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
        },
      });

      // ---------------- WE / DO SPLIT + SOFT FADE ----------------
      tl.to(
        weRef.current,
        { x: -500, y: -40, opacity: 0.18, ease: "none" },
        0
      );
      tl.to(
        doRef.current,
        { x: 500, y: -40, opacity: 0.18, ease: "none" },
        0
      );

      // ---------------- ITEMS MOVE AS ONE BLOCK ----------------
      tl.fromTo(
        itemsWrapRef.current,
        { y: window.innerHeight * 1.2 },
        { y: 0, ease: "none" },
        0.25
      );

      // ✅ BUTTON ANIMATION REMOVED
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#f2f0f0] text-[#2e2a2a]">
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden z-[5]"
      >
        <div className="absolute inset-0 flex items-center justify-center">

          {/* WE / DO */}
          <div className="absolute flex flex-wrap justify-center gap-4 md:gap-8">
            <div
              ref={weRef}
              className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none text-[#2e2a2a] select-none"
            >
              WE
            </div>
            <div
              ref={doRef}
              className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none text-[#2e2a2a] select-none"
            >
              DO
            </div>
          </div>

          {/* ITEMS + BUTTON */}
          <div
            ref={itemsWrapRef}
            className="absolute flex flex-col items-center gap-2 text-[2.5rem] sm:text-[4rem] md:text-[4rem] font-bold tracking-wide leading-[0.95] select-none"
          >
            {items.map((item) => (
              <div key={item} className="text-center text-[#2e2a2a]">
                {item}
              </div>
            ))}

            {/* VIEW ALL PROJECTS */}
            <a
              ref={buttonRef}
              href="/projects"
              className="mt-8 px-8 py-3 rounded-full bg-zinc-300 text-zinc-600 text-xs sm:text-sm tracking-[0.25em] font-bold hover:bg-zinc-400 transition-all duration-300"
            >
              VIEW ALL PROJECTS
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Wedo;
