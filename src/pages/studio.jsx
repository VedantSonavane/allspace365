import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Steps from "../components/steps";
import Letstalk from "../components/letstalk";
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Architecture",
    img: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=900&auto=format&fit=crop&q=60",
  },
  {
    title: "Interior",
    img: "https://images.unsplash.com/photo-1538261721559-0d2787c41678?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "BIM",
    img: "https://www.shutterstock.com/image-photo/curve-pattern-modern-building-architecture-600nw-2520042983.jpg",
  },
  {
    title: "3D Visualization",
    img: "https://images.unsplash.com/photo-1707567019592-a05a41cc0b52?q=80&w=3264&auto=format&fit=crop",
  },
  {
    title: "IT",
    img: "https://images.unsplash.com/photo-1675334758735-5f989ff8237f?q=80&w=3264&auto=format&fit=crop",
  },
  {
    title: "Marketing",
    img: "https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?q=80&w=3264&auto=format&fit=crop",
  },
  {
    title: "Admin",
    img: "https://images.unsplash.com/photo-1656084656791-8988307df010?q=80&w=2370&auto=format&fit=crop",
  },
];


export default function ServicesPage() {
  const sectionsRef = useRef([]);
  const serviceRefs = useRef([]);

  /* Scroll reveal */
  useEffect(() => {
    sectionsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  /* Hover animations */
  useEffect(() => {
    serviceRefs.current.forEach((el) => {
      const img = el.querySelector("img");
      const rotatingText = el.querySelector(".rotating-text");

      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          height: 500,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(img, {
          scale: 1.05,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(rotatingText, {
          rotate: 360,
          duration: 8,
          repeat: -1,
          ease: "linear",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          height: 250,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.to(img, {
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.killTweensOf(rotatingText);
        gsap.set(rotatingText, { rotate: 0 });
      });
    });
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#f2f0f0", color: "#2e2a2a" }}
    >
      {/* HERO */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="pt-32 pb-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
          Our Company
          <br />
          Service!
        </h1>

        <p className="text-sm max-w-md opacity-70 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </section>

      {/* SERVICES */}
      <section className="w-full">
        {services.map((service, i) => (
          <div
            key={i}
            ref={(el) => (serviceRefs.current[i] = el)}
            className="relative overflow-hidden flex items-center group"
            style={{ height: 250 }}
          >
            {/* IMAGE */}
            <img
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* BASE GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* HOVER GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />

            {/* TITLE */}
            <h2 className="relative z-10 text-white text-5xl md:text-6xl font-bold px-10 tracking-wide capitalize lowercase">
              {service.title}
            </h2>

            {/* HOVER CTA */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 opacity-0 scale-75 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
              <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center">
                {/* ROTATING TEXT */}
                <svg
                  className="absolute inset-0 rotating-text"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id={`circlePath-${i}`}
                      d="
                        M 50,50
                        m -35,0
                        a 35,35 0 1,1 70,0
                        a 35,35 0 1,1 -70,0
                      "
                    />
                  </defs>
                  <text fontSize="8" fill="#000" letterSpacing="4">
                    <textPath href={`#circlePath-${i}`}>
                      VIEW SERVICE • VIEW SERVICE •
                    </textPath>
                  </text>
                </svg>

                {/* ARROW */}
                <ArrowRight className="w-6 h-6 text-black relative z-10" />
              </div>
            </div>
          </div>
        ))}
      </section>

<section>
        <Steps />
</section>
<section>
        <Letstalk />
</section>
    </div>
  );
}
