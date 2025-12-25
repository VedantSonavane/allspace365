import React, { useEffect, useRef, useState } from "react";

const GlobalProjectsSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      let progress = 0;
      if (rect.top < windowHeight && rect.bottom > 0) {
        progress =
          (windowHeight - rect.top) / (windowHeight + sectionHeight);
        progress = Math.max(0, Math.min(1, progress));
      }

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInCubic = (t) => t * t * t;

  const getLineTransform = (index) => {
    const phases = [
      { start: 0, mid: 0.35, end: 0.7 },
      { start: 0.175, mid: 0.525, end: 0.85 },
      { start: 0.2625, mid: 0.6125, end: 0.925 },
    ];

    const phase = phases[index];
    let translate = 0;
    let opacity = 0;

    if (scrollProgress < phase.start) {
      translate = 150;
      opacity = 0;
    } else if (scrollProgress <= phase.mid) {
      const p = (scrollProgress - phase.start) / (phase.mid - phase.start);
      const eased = easeOutCubic(p);
      translate = 150 - 150 * eased;
      opacity = eased;
    } else if (scrollProgress <= phase.end) {
      const p = (scrollProgress - phase.mid) / (phase.end - phase.mid);
      const eased = easeInCubic(p);
      translate = -150 * eased;
      opacity = 1 - eased;
    } else {
      translate = -150;
      opacity = 0;
    }

    return { translate, opacity };
  };

  const line1 = getLineTransform(0);
  const line2 = getLineTransform(1);
  const line3 = getLineTransform(2);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "250vh", backgroundColor: "#f3f3f3" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Centered content */}
        <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-12 uppercase text-center space-y-8">
          
          <div
            style={{
              transform: `translate3d(${line1.translate}%,0,0)`,
              opacity: line1.opacity,
            }}
          >
            <h2
              className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[7rem] font-bold leading-[0.9] whitespace-nowrap"
              style={{ color: "#2d2a2a" }}
            >
              Projects shaped
            </h2>
          </div>

          <div
            style={{
              transform: `translate3d(${line2.translate}%,0,0)`,
              opacity: line2.opacity,
            }}
          >
            <h2
              className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[7rem] font-bold leading-[0.9] whitespace-nowrap"
              style={{ color: "#2d2a2a" }}
            >
              across geographies
            </h2>
          </div>

          <div
            style={{
              transform: `translate3d(${line3.translate}%,0,0)`,
              opacity: line3.opacity,
            }}
          >
            <h2
              className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[7rem] font-bold leading-[0.9] whitespace-nowrap"
              style={{ color: "#2d2a2a" }}
            >
              worldwide
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalProjectsSection;
