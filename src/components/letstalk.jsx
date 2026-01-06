import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Letstalk = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const contentWrapRef = useRef(null);

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

      // ---------------- LET'S / TALK SPLIT ----------------
      tl.to(leftTextRef.current, {
        x: -350,
        y: -40,
        opacity: 0.18,
        ease: "none",
      }, 0);

      tl.to(rightTextRef.current, {
        x: 350,
        y: -40,
        opacity: 0.18,
        ease: "none",
      }, 0);

      // ---------------- CONTENT MOVES UP ----------------
      tl.fromTo(
        contentWrapRef.current,
        { y: window.innerHeight * 1.2 },
        { y: 0, ease: "none" },
        0.25
      );
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

          {/* LET'S / TALK */}
          <div className="absolute flex flex-wrap justify-center gap-4 md:gap-8">
            <div
              ref={leftTextRef}
              className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none text-[#2e2a2a] select-none"
            >
              LET&apos;S
            </div>
            <div
              ref={rightTextRef}
              className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-bold leading-none text-[#2e2a2a] select-none"
            >
              TALK
            </div>
          </div>

          {/* CONTENT */}
{/* CONTENT */}
          <div
            ref={contentWrapRef}
            className="absolute flex flex-col items-center px-4 select-none"
          >
            <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[4rem] font-bold leading-[0.9] tracking-tight text-center">
              About
              <br />
              Your Project!
            </h2>

            {/* SEND REQUEST BUTTON */}
            <button
              className="
                mt-12 flex items-center gap-3
                px-1.5 py-1.5 pl-5 rounded-full
                bg-[#3a3a3a] text-white
               text-xs sm:text-xs font-bold uppercase
                hover:bg-[#2a2a2a] transition-all duration-300
                group
              "
            >
              SEND REQUEST

              {/* ARROW CIRCLE */}
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

            {/* DECORATIVE CIRCLE */}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Letstalk;
