import React, { useEffect, useRef } from "react";
import { Box, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const buttonsRef = useRef(null);
  const locationsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, locationsRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(buttonsRef.current, {
        opacity: 0,
        y: -20,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          locationsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      gsap.to(heroRef.current, {
        opacity: 0,
        scale: 0.96,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#f3f3f3" }}
    >
      {/* Action Buttons */}
      <div
        ref={buttonsRef}
        className="absolute top-8 right-8 flex items-center gap-3"
      >
        <button
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#2d2a2a" }}
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.1, duration: 0.3 })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
          }
        >
          <Box className="w-5 h-5 text-[#f3f3f3]" />
        </button>

        <button
          className="px-6 py-3 rounded-full font-medium flex items-center gap-2"
          style={{ backgroundColor: "#2d2a2a", color: "#f3f3f3" }}
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { scale: 1.08, duration: 0.3 })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
          }
        >
          Let&apos;s Talk
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div ref={logoRef} className="text-center max-w-4xl">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1
            className="text-7xl md:text-8xl font-light tracking-tight"
            style={{ color: "#2d2a2a" }}
          >
            Allspace
          </h1>

          <div className="relative">
            <span
              className="text-7xl md:text-8xl font-light tracking-tight"
              style={{ color: "#2d2a2a" }}
            >
              365
            </span>
            <span
              className="absolute -top-4 -right-6 text-sm"
              style={{ color: "#2d2a2a" }}
            >
              TM
            </span>
          </div>
        </div>

        <p
          className="text-lg tracking-wide"
          style={{ color: "#2d2a2a", opacity: 0.75 }}
        >
          Design for every space
        </p>
      </div>

      {/* Locations */}
      <div
        ref={locationsRef}
        className="absolute bottom-8 left-0 right-0 text-center text-sm md:text-base font-light tracking-wider space-y-1 px-4"
        style={{ color: "#2d2a2a", opacity: 0.8 }}
      >
        <div>
          LOS ANGELES | NEW YORK | MIAMI | TORONTO | LONDON | PARIS |
        </div>
        <div>
          MILAN | DUBAI | MUMBAI | DELHI | SINGAPORE | SYDNEY
        </div>
      </div>
    </div>
  );
}
