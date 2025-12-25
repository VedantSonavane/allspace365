import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wedo = () => {
  const sectionRef = useRef(null);
  const weRef = useRef(null);
  const doRef = useRef(null);
  const itemsWrapRef = useRef(null);
  const buttonRef = useRef(null); // ✅ BUTTON REF

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

      /* ---------------- WE / DO SPLIT + SOFT FADE ---------------- */

      tl.to(
        weRef.current,
        {
          x: -220,
          y: -40,
          opacity: 0.18,
          ease: "none",
        },
        0
      );

      tl.to(
        doRef.current,
        {
          x: 220,
          y: -40,
          opacity: 0.18,
          ease: "none",
        },
        0
      );

      /* ---------------- ITEMS MOVE AS ONE BLOCK ---------------- */

      tl.fromTo(
        itemsWrapRef.current,
        {
          y: window.innerHeight * 1.2, // OUTSIDE VIEW
        },
        {
          y: 0, // CENTER
          ease: "none",
        },
        0.25
      );

      /* ---------------- VIEW ALL PROJECTS BUTTON ---------------- */

      tl.fromTo(
        buttonRef.current,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
        },
        0.55 // 👈 premium timing
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    "RESIDENTIAL",
    "MIXED USE",
    "HOSPITALITY",
    "COMMERCIAL",
    "PUBLIC SPACES",
  ];

  return (
    <div className="bg-[#f3f3f3] text-[#2d2a2a]">
      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden z-[5]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* WE / DO */}
          <div className="absolute flex gap-8">
            <div
              ref={weRef}
              className="text-[24rem] font-bold leading-none"
            >
              WE
            </div>
            <div
              ref={doRef}
              className="text-[24rem] font-bold leading-none"
            >
              DO
            </div>
          </div>

          {/* ITEMS + BUTTON */}
          <div
            ref={itemsWrapRef}
            className="absolute flex flex-col items-center
                       text-[3rem] font-bold tracking-tight
                       gap-2 leading-[0.95]"
          >
            {items.map((item) => (
              <div key={item}>{item}</div>
            ))}

            {/* VIEW ALL PROJECTS */}
            <a
              ref={buttonRef}
              href="/projects"
              className="mt-8 px-12 py-4 rounded-full
                         bg-black text-white
                         text-xs tracking-[0.25em]
                         opacity-0 font-light "
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
