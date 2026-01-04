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
  const itemRefs = useRef([]);
  const [minutesMap, setMinutesMap] = useState({});

  // ⏱ Time logic
  useEffect(() => {
    const updateTimes = () => {
      const map = {};
      LOCATIONS.forEach(({ city, tz }) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const [hour, minute] = formatter
          .format(new Date())
          .split(":")
          .map(Number);
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

  // 🎬 GSAP – replay animation on every entry
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#f2f0f0" }}
    >
      <div className="flex flex-col items-center py-24 gap-2">
        {LOCATIONS.map((loc, i) => (
          <div
            key={loc.city}
            ref={(el) => (itemRefs.current[i] = el)}
            className="relative inline-block"
          >
            {/* 🌍 CITY */}
            <h2
              className="
                text-[10vw] md:text-[4rem] lg:text-[6rem]
                font-bold tracking-tighter leading-none
                whitespace-nowrap
              "
              style={{ color: "#2e2a2a" }}
            >
              {loc.city}
            </h2>

            {/* ⏰ TIME */}
            <div
              className="
                absolute top-[10%] -right-4 translate-x-full
                text-sm sm:text-md font-bold
              "
              style={{ color: "rgba(46,42,42)" }}
            >
              {minutesMap[loc.city] !== undefined && (
                <CountUp
                  start={0}
                  end={minutesMap[loc.city]}
                  duration={3}
                  delay={0.6 + i * 0.1}
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
