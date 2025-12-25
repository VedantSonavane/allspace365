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

    // Initially hide second text
    gsap.set(text2Words, { opacity: 0, filter: "blur(10px)" });

    // Create timeline for the transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Fade out first text word by word
    tl.to(text1Words, {
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.05,
      duration: 0.5,
    }, 0);

    // Fade in second text word by word
    tl.to(text2Words, {
      opacity: 1,
      filter: "blur(0px)",
      stagger: 0.05,
      duration: 0.5,
    }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const splitIntoWords = (text) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="word inline-block mr-[0.3em]">
        {word}
      </span>
    ));
  };

  return (
    <div ref={sectionRef} className="min-h-[200vh] w-full bg-black text-gray-200 relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={containerRef} className="max-w-7xl w-full px-6 relative">
          {/* First Text */}
          <div className="text-1 absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
              {splitIntoWords("A PRACTICE SHAPED BY INTERNATIONAL DESIGN CULTURE")}
            </h2>
          </div>

          {/* Second Text */}
          <div className="text-2 absolute inset-0 flex items-center justify-center">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
              {splitIntoWords("EXPERIENCE-FOCUSED DESIGNS ACROSS ALL SCALES AND USES")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}