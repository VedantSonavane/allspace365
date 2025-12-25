import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  { city: "LOS ANGELES", tz: "America/Los_Angeles" },
  { city: "NEW YORK", tz: "America/New_York" },
  { city: "LONDON", tz: "Europe/London" },
  { city: "PARIS", tz: "Europe/Paris" },
  { city: "MUMBAI", tz: "Asia/Kolkata" },
  { city: "SINGAPORE", tz: "Asia/Singapore" },
  { city: "SYDNEY", tz: "Australia/Sydney" },
  
];

export default function EighthSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [minutesMap, setMinutesMap] = useState({});

  // ⏱ Time logic
  useEffect(() => {
    const updateTimes = () => {
      const map = {};
      LOCATIONS.forEach(({ city, tz }) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false,
        });
        const [hour, minute] = formatter.format(new Date()).split(":").map(Number);
        map[city] = hour * 60 + minute;
      });
      setMinutesMap(map);
    };
    updateTimes();
    const i = setInterval(updateTimes, 60000);
    return () => clearInterval(i);
  }, []);

  const formatTime = (totalMinutes) => {
    const hrs24 = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const period = hrs24 >= 12 ? "PM" : "AM";
    const hrs12 = hrs24 % 12 || 12;
    return `${hrs12}:${String(mins).padStart(2, "0")} ${period}`;
  };

  // 🎬 GSAP Animations
  useEffect(() => {
    const items = itemRefs.current;

    // 1. Initial Fade-in/Up Reveal
    gsap.fromTo(items, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // 2. Horizontal "Parallax" on Scroll
    // Alternates direction for every other city
    items.forEach((item, index) => {
      const direction = index % 2 === 0 ? -100 : 100;
      gsap.to(item, {
        x: direction,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smoothly ties animation to scroll position
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f5f3f1] min-h-screen overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="flex flex-col items-center gap-6"
      >
        {LOCATIONS.map((loc, i) => (
          <div
            key={loc.city}
            ref={(el) => (itemRefs.current[i] = el)}
            className="relative inline-block"
          >
            {/* 🌍 CITY NAME - Responsive font sizes */}
            <h2 className="text-[10vw] md:text-[4rem] lg:text-[6rem] leading-none font-black tracking-tighter text-gray-900 whitespace-nowrap">
              {loc.city}
            </h2>

            {/* ⏰ TIME - Positioned as Superscript */}
            <div className="absolute top-[10%] -right-4 translate-x-full text-sm font-bold text-gray-500 tabular-nums">
              {minutesMap[loc.city] !== undefined && (
                <CountUp
                  start={0}
                  end={minutesMap[loc.city]}
                  duration={2}
                  delay={0.5 + i * 0.1}
                  formattingFn={formatTime}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
    </section>

  );
}