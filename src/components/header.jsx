import React, { useRef, useState } from "react";
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
  const navItemsRef = useRef([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    .to(circleRef.current, { scale: 60, duration: 1.2, ease: "expo.inOut" })
    .to(menuContentRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 }, "-=0.8")
    .fromTo(navItemsRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 
      "-=0.6"
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

    tl.to(navItemsRef.current, { opacity: 0, y: 20, duration: 0.3, stagger: { each: 0.03, from: "end" } })
      .to(circleRef.current, { scale: 0, duration: 0.8, ease: "expo.inOut" }, "-=0.2")
      .to(menuContentRef.current, { opacity: 0, duration: 0.3 }, "-=0.6");
  });

  return (
    <div ref={container} className="antialiased">
      {/* Reveal Circle Background - Switched to a darker tone for "Minimalist" feel */}
      <div 
        ref={circleRef} 
        className="fixed rounded-full pointer-events-none z-[60] bg-[#1a1a1a] w-[100px] h-[100px] hidden" 
      />

      {/* Hover Background Images */}
      <div 
        className="fixed inset-0 z-[61] pointer-events-none transition-opacity duration-1000" 
        style={{ opacity: hoveredIndex !== null ? 1 : 0 }}
      >
        {NAV_DATA.map((item, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center grayscale-[20%]"
            style={{ 
                opacity: hoveredIndex === idx ? 0.4 : 0, 
                backgroundImage: `url(${item.image})` 
            }}
          />
        ))}
      </div>

      {/* HEADER BAR */}
      <header className="fixed top-0 left-0 w-full px-10 py-8 flex justify-between items-center z-[100]">
        <div className={`text-sm font-medium tracking-widest transition-colors duration-500 ${isMenuOpen ? 'text-white/50' : 'text-black'}`}>
            
        </div>

        <div className="flex items-center gap-8">
            <button 
                onClick={isMenuOpen ? closeMenu : openMenu}
                className={`group flex items-center gap-2 transition-colors duration-500 ${isMenuOpen ? 'text-white' : 'text-black'}`}
            >
                <span className="text-[10px] tracking-[0.2em] font-bold">
                    {isMenuOpen ? 'CLOSE' : 'EXPLORE'}
                </span>
                {isMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Box size={18} strokeWidth={1.5} />}
            </button>
            
            {!isMenuOpen && (
                <button className="text-[10px] tracking-[0.2em] font-bold border-b border-black pb-1 hover:opacity-50 transition-opacity">
                    LET'S TALK
                </button>
            )}
        </div>
      </header>

      {/* Navigation Overlay */}
      <div 
        ref={menuContentRef} 
        className="fixed inset-0 z-[70] flex flex-col justify-center px-10 md:px-32 opacity-0 pointer-events-none"
      >
        <nav className="flex flex-col items-start">
          {NAV_DATA.map((item, index) => (
            <a
              key={item.title}
              href={item.link}
              onClick={closeMenu}
              ref={el => navItemsRef.current[index] = el}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                group relative py-2 w-full flex items-center justify-between border-b border-white/10 transition-all duration-700
                ${hoveredIndex === index ? 'translate-x-4' : 'translate-x-0'}
                ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-10' : 'opacity-100'}
              `}
            >
              <div className="flex items-baseline gap-6">
                <span className="text-xs font-mono text-white/30">0{index + 1}</span>
                <span className="text-[3.5rem] md:text-[4.5rem] font-bold tracking-wide text-white uppercase">
                    {item.title}
                </span>
              </div>
              
              <ArrowUpRight 
                size={32} 
                strokeWidth={1}
                className={`text-white transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'}`} 
              />
            </a>
          ))}
        </nav>

        {/* Footer info in menu */}
        <div className="absolute bottom-12 left-10 md:left-32 flex gap-12 text-[10px] tracking-widest text-white/40 uppercase">
            <div>© 2024 Base Studio</div>
            <div className="hover:text-white cursor-pointer transition-colors">Instagram</div>
            <div className="hover:text-white cursor-pointer transition-colors">LinkedIn</div>
        </div>
      </div>
    </div>
  );
}