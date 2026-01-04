import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  ExternalLink,
  Music2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
            toggleActions: "restart none restart none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      className="
        relative w-full overflow-hidden
        px-5 sm:px-10 md:px-24 
        py-20 sm:py-28 md:py-32
      "
      style={{ backgroundColor: "#f2f0f0" }}
    >
      {/* BACKGROUND TITLE */}
      <h1
        ref={titleRef}
        className="
          text-center italic font-bold tracking-tighter leading-none select-none
          mb-16 sm:mb-20
        "
        style={{
          fontSize: "clamp(3.5rem, 14vw, 14rem)",
          color: "rgba(46,42,42,0.22)",
        }}
      >
        All Space 365
      </h1>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* LEFT TEXT */}
        <p
          className="
            text-sm sm:text-base leading-relaxed
            text-center md:text-left
            max-w-md mx-auto md:mx-0
          "
          style={{ color: "rgba(46,42,42,0.85)" }}
        >
          Your global productivity partner delivering tech-smart workforce
          solutions tailored for your AEC business, ensuring seamless expansion
          and efficiency.
        </p>

        {/* RIGHT CONTACT */}
        <div
          className="
            text-sm sm:text-base leading-relaxed
            text-center md:text-right
          "
          style={{ color: "rgba(46,42,42,0.85)" }}
        >
          <p className="mb-2 font-medium">
            <span className="underline underline-offset-4">
              Call — +91 95991 97669
            </span>
          </p>

          <p>
            1755 Broadway, FRNT 3 #1165
            <br />
            New York, NY 10019
            <br />
            United States
          </p>
        </div>
      </div>

      {/* LEGAL */}
      <div className="max-w-4xl mx-auto text-center mb-14 px-4">
        <p
          className="text-xs sm:text-sm leading-relaxed"
          style={{ color: "rgba(46,42,42,0.7)" }}
        >
          Please be informed that the intellectual property rights to all the
          photos, designs and other materials on this site belong to
          <strong> “YODEZEEN GROUP” LLC</strong>. You may request permission to use
          them by contacting us at:
        </p>

        <a
          href="mailto:contact@yodezeen.com"
          className="block mt-3 font-medium hover:underline"
          style={{ color: "#2e2a2a" }}
        >
          contact@yodezeen.com
        </a>
      </div>

      {/* SOCIAL ICONS */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {[
          Instagram,
          Youtube,
          Facebook,
       
          Linkedin,
          Music2,
        ].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="
              w-11 h-11
              flex items-center justify-center
              rounded-full
              transition-all duration-300
              hover:scale-110
            "
            style={{
              backgroundColor: "#2e2a2a",
              color: "#f2f0f0",
            }}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      {/* COPYRIGHT */}
      <div className="text-center">
        <p
          className="text-xs sm:text-sm"
          style={{ color: "rgba(46,42,42,0.6)" }}
        >
          © {new Date().getFullYear()} All Space 365. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
