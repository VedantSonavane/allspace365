import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SecondSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const text1Words = container.querySelectorAll(".text-1 .word");
    const text2Words = container.querySelectorAll(".text-2 .word");

    let ctx = gsap.context(() => {
      gsap.set(text2Words, { opacity: 0, filter: "blur(10px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // REDUCED DISTANCE: Changing from 150% to 80% makes it much faster
          end: "+=80%",
          // FASTER RESPONSE: 0.5s catch-up instead of 1s
          scrub: 0.5,
          pin: true,
        },
      });

      tl.to(text1Words, {
        opacity: 0,
        filter: "blur(8px)", // Reduced blur slightly for performance
        stagger: 0.03,       // Faster stagger between words
        duration: 0.4,
      })
        .to(text2Words, {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.03,       // Faster stagger between words
          duration: 0.4,
        }, "-=0.2");
    }, section);

    return () => ctx.revert();
  }, []);

  const splitIntoWords = (text) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word inline-block mr-[0.25em] whitespace-nowrap">
        {word}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="w-full bg-black text-white overflow-hidden">
      {/* Container height is handled by GSAP Pinning now */}
      <div className="min-h-screen flex items-center justify-center relative px-4 md:px-10">
        <div ref={containerRef} className="max-w-7xl w-full relative h-[60vh] flex items-center justify-center">

          {/* First Text */}
          <div className="text-1 absolute w-full">
            <h2 className="text-[clamp(1.75rem,5vw,5rem)] font-bold text-center leading-[1.1] tracking-tight">
              {splitIntoWords("A practice shaped by international design culture")}
            </h2>

          </div>

          {/* Second Text */}
          {/* Second Text */}
          <div className="text-2 absolute w-full">
            <h2 className="text-[clamp(1.75rem,5vw,5rem)] font-bold text-center leading-[1.1] tracking-tight">
              {splitIntoWords("Experience-focused designs across all scales and uses")}
            </h2>
          </div>


        </div>
      </div>
    </section>
  );
}