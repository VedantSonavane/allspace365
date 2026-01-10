import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Music2,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_DATA = [
  { title: "Base", link: "/" },
  { title: "Work", link: "/work" },
  { title: "Studio", link: "/studio" },
  { title: "Journal", link: "/journal" },
  { title: "Collab", link: "/connect" },
];

const Footer = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      className="relative w-full overflow-hidden px-6 py-14 md:px-24"
      style={{ backgroundColor: "rgba(46,42,42,0.09)" }}
    >
      {/* BACKGROUND TITLE */}
      <h1
        ref={titleRef}
        className="text-center font-semibold tracking-tight leading-none
                   select-none pointer-events-none"
        style={{
          fontSize: "clamp(4rem, 18vw, 16rem)",
          color: "rgba(46,42,42,0.06)", // subtle dark imprint
        }}
      >
        AllSpace365
      </h1>

      {/* BOTTOM CONTENT */}
      <div className="mt-20 flex flex-col md:flex-row items-center md:items-end justify-between gap-12">

        {/* NAV LINKS */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-5">
          {NAV_DATA.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="relative group text-base font-medium
                         transition-colors"
              style={{ color: "rgba(46,42,42,0.75)" }}
            >
              {item.title}

              {/* Hover Arrow */}
              <span
                className="absolute -top-2 -right-4 opacity-0 scale-75
                           group-hover:opacity-100 group-hover:scale-100
                           group-hover:-translate-y-1 group-hover:translate-x-1
                           transition-all duration-300 ease-out"
                style={{ color: "#2e2a2a" }}
              >
                <ArrowUpRight size={14} />
              </span>

              {/* Underline */}
              <span
                className="absolute left-0 -bottom-1 h-[1px] w-0
                           group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: "#2e2a2a" }}
              />
            </a>
          ))}
        </nav>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4">
          {[Instagram, Youtube, Facebook, Linkedin, Music2].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-11 h-11 flex items-center justify-center rounded-full
                         transition-all duration-300 active:scale-95"
              style={{
                backgroundColor: "rgba(46,42,42,0.08)",
                color: "#2e2a2a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2e2a2a";
                e.currentTarget.style.color = "#f2f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(46,42,42,0.08)";
                e.currentTarget.style.color = "#2e2a2a";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-12 text-center">
        <p
          className="text-xs"
          style={{ color: "rgba(46,42,42,0.55)" }}
        >
          © {new Date().getFullYear()} All Space 365. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
