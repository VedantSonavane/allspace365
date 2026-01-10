import React, { useEffect, useRef, useState } from "react";

const GlobalProjectsSection = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
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
    const maxTranslate = isMobile ? 60 : 150;

    let translate = 0;
    let opacity = 0;

    if (scrollProgress < phase.start) {
      translate = maxTranslate;
      opacity = 0;
    } else if (scrollProgress <= phase.mid) {
      const p = (scrollProgress - phase.start) / (phase.mid - phase.start);
      const eased = easeOutCubic(p);
      translate = maxTranslate - maxTranslate * eased;
      opacity = eased;
    } else if (scrollProgress <= phase.end) {
      const p = (scrollProgress - phase.mid) / (phase.end - phase.mid);
      const eased = easeInCubic(p);
      translate = -maxTranslate * eased;
      opacity = 1 - eased;
    } else {
      translate = -maxTranslate;
      opacity = 0;
    }

    return { translate, opacity };
  };

  const lines = [
    getLineTransform(0),
    getLineTransform(1),
    getLineTransform(2),
  ];

const text = [
  "WE ARE LOOKING FOR",
  "PEOPLE  TO JOIN",
  "OUR GROWING TEAM",
];



  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: isMobile ? "200vh" : "250vh",
        backgroundColor: "#f2f0f0",
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[1440px] px-5 md:px-8 lg:px-12 text-center space-y-6 sm:space-y-8">
          {text.map((line, i) => (
            <div
              key={i}
              style={{
                transform: `translate3d(${lines[i].translate}%,0,0)`,
                opacity: lines[i].opacity,
              }}
            >
              <h2
                className="
                  font-extrabold uppercase
                  leading-tight sm:leading-[0.95]
                  tracking-tight
                  break-words
                  md:whitespace-nowrap
                "
                style={{
                  fontSize:
                    "clamp(2.2rem, 8vw, 7rem)",
                  color: "#2e2a2a",
                }}
              >
                {line}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalProjectsSection;
