import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Plus, X, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_DATA = [
  { title: "Base", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", link: "/" },
  { title: "Work", image: "https://cdn.yodezeen.com/extra_Rectangle_1338_30f362d79f.webp", link: "/work" },
  { title: "Studio", image: "https://cdn.yodezeen.com/extra_magnific_YJY_Rzy_Tlr1_Am_B_Ct9akp_K_magnific_y_Uxk_U_Th_A_Ej_It_RC_1w_Yuo_U_Screenshot_2024_09_13_094738_scaled_1_7644c3cd33.webp", link: "/studio" },
  { title: "Journal", image: "https://cdn.yodezeen.com/extra_ARCH_28x_9cce867625.webp", link: "/journal" },
  { title: "Collab", image: "https://cdn.yodezeen.com/extra_ely_bsc_photography_Eleonora_Boscarelli_043_1_1_8867e1f0e6.webp", link: "/connect" }
];

export default function Header() {
  const container = useRef();
  const circleRef = useRef(null);
  const menuContentRef = useRef(null);
  const bgImagesRef = useRef(null);
  const navItemsRef = useRef([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Use contextSafe for events like clicks
  const { contextSafe } = useGSAP({ scope: container });

  const openMenu = contextSafe((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setIsMenuOpen(true);

    const tl = gsap.timeline();
    tl.set(circleRef.current, {
      left: centerX,
      top: centerY,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      display: "block",
    })
    .to(circleRef.current, { scale: 60, duration: 1, ease: "expo.inOut" })
    .to(menuContentRef.current, { opacity: 1, duration: 0.2 }, "-=0.6")
    .fromTo(navItemsRef.current, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }, 
      "-=0.5"
    );
  });

  const closeMenu = contextSafe(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        setHoveredIndex(null);
        gsap.set(circleRef.current, { display: "none" });
      }
    });

    tl.to(navItemsRef.current, { opacity: 0, y: 40, duration: 0.3, stagger: { each: 0.03, from: "end" } })
      .to(circleRef.current, { scale: 0, duration: 0.7, ease: "expo.inOut" }, "-=0.2");
  });

  return (
    <div ref={container}>
      {/* Reveal Circle */}
      <div ref={circleRef} className="fixed rounded-full pointer-events-none z-[60] bg-[#e2e0e0] w-[100px] h-[100px] hidden" />

      {/* Background Images */}
      <div ref={bgImagesRef} className="fixed inset-0 z-[61] pointer-events-none transition-opacity duration-500" style={{ opacity: isMenuOpen ? 1 : 0 }}>
        {NAV_DATA.map((item, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-700 bg-cover bg-center"
            style={{ 
                opacity: hoveredIndex === idx ? 1 : 0, 
                backgroundImage: `url(${item.image})` 
            }}
          />
        ))}
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <header className="fixed top-8 right-8 flex items-center gap-2 z-[100]">
        <button 
          onClick={isMenuOpen ? closeMenu : openMenu}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-all"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Box className="w-4 h-4" />}
        </button>
        
        <button className="pl-4 pr-1 py-1 rounded-full text-xs font-bold tracking-widest flex items-center gap-3 bg-black/5">
          LET'S TALK
          <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#bbb9b9]">
            <Plus className="w-3.5 h-3.5 text-white" />
          </span>
        </button>
      </header>

      {/* Navigation Overlay */}
      <div ref={menuContentRef} className={`fixed inset-0 z-[70] flex flex-col justify-center px-24 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}>
        <nav className="flex flex-col gap-4">
          {NAV_DATA.map((item, index) => (
            <NavLink
              key={item.title}
              to={item.link}
              viewTransition // Logic: Best practice for smooth React transitions
              onClick={closeMenu}
              ref={el => navItemsRef.current[index] = el}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={({ isActive }) => `
                group text-[4rem] font-bold tracking-tighter transition-all duration-500
                ${hoveredIndex === index ? 'text-white translate-x-6' : 'text-[#322f2f]'}
                ${isActive ? 'underline decoration-1 underline-offset-8' : ''}
              `}
            >
              <span className="inline-flex items-center gap-4">
                {item.title}
                <ArrowUpRight size={40} className={`transition-opacity ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}