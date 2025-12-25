import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ArchitectureSection = () => {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const imageWrapRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: stickyRef.current,
        },
      });

      /* IMAGE SCALE (1.2 → 1) */
      tl.fromTo(
        imageWrapRef.current,
        { scale: 1.2 },
        { scale: 1, ease: "none" },
        0
      );

      /* IMAGE COLUMN WIDTH (0% → 29%) */
      tl.fromTo(
        imageWrapRef.current.parentElement,
        { flex: "0 0 30%" },
        { flex: "0 0 60%", ease: "none" },
        0
      );

      /* FIRST TEXT (Y 100% → 0) */
      tl.fromTo(
        text1Ref.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "none" },
        0
      );

      /* SECOND TEXT (X 425px → 0) */
      tl.fromTo(
        text2Ref.current,
        { yPercent: 100 },
        { yPercent: 0, ease: "none" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#e0e0e0]">
      {/* STICKY CONTAINER */}
      <div
        ref={stickyRef}
        className="sticky top-0 min-h-screen "
      >
        <div className="flex h-full">

          {/* IMAGE COLUMN */}
          <div className="flex items-center justify-center ">
            <div
              ref={imageWrapRef}
              className="w-full h-full"
            >
              <img
                src="https://plus.unsplash.com/premium_photo-1686064772597-c667cbbeebee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4fHx8ZW58MHx8fHx8"
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* TEXT COLUMN */}
         {/* TEXT COLUMN */}
<div className="flex-1 flex items-center px-24">
  <div className="relative max-w-2xl text-[#2d2a2a] space-y-16">

    {/* TEXT 1 */}
    <div className="">
      <p
        ref={text1Ref}
        className="text-3xl leading-tight uppercase"
      >
        Rooted in clarity, responsibility, and long-term thinking.
        Each project is approached with a focus
        on how spaces perform, adapt, and endure over
        time.
      </p>
    </div>

    {/* TEXT 2 */}
    <div className="overflow-hidden">
      <p
        ref={text2Ref}
        className="text-md font-light max-w-xl uppercase"
      >
        Whether close at hand or across continents, the
        design intent remains consistent.
        The aim is to create environments that feel
        natural to occupy, intuitive to use, and
        composed in their presence.
      </p>
    </div>

    {/* BUTTON */}
    <div className="overflow-hidden">
      <button
        className="inline-flex rounded-full items-center justify-center
                   bg-gray-200 text-gray-800
                   px-6 py-3 border border-gray-600
                   text-sm uppercase tracking-wider
                   transition-colors duration-300
                   hover:bg-gray-800 hover:text-white"
      >
        Read more
      </button>
    </div>

  </div>
</div>



        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
