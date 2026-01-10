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

import Logo from "../assets/LOGO.svg";

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
      className="relative w-full overflow-hidden px-6 py-12 md:px-24 border border-t-2"
      style={{ backgroundColor: "#f2f0f0" }}
    >
      {/* BACKGROUND LOGO */}
      <div
        ref={titleRef}
        className="flex justify-start pointer-events-none select-none"
      >
        <img
          src={Logo}
          alt="AllSpace365"
          className="w-[75%] md:w-[80%]"
        />
      </div>

      {/* BOTTOM CONTENT */}
      <div className="mt-24 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

        {/* NAV LINKS */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-5">
          {NAV_DATA.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="relative group text-lg font-medium"
              style={{ color: "rgba(46,42,42,0.75)" }}
            >
              {item.title}

              {/* Arrow Hover */}
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
        <div className="flex gap-3">
          {[Instagram, Youtube, Facebook, Linkedin, Music2].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full
                         transition-transform duration-300 hover:scale-110"
              style={{
                backgroundColor: "#2e2a2a",
                color: "#f2f0f0",
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 text-center">
        <p
          className="text-xs"
          style={{ color: "rgba(46,42,42,0.6)" }}
        >
          © {new Date().getFullYear()} All Space 365. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
