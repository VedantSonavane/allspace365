import React, { useRef, useState } from "react";
import { Box, Plus, X, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom"; // Change 1: Use useNavigate for cleaner routing

const NAV_DATA = [
  {
    title: "Base",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", 
    link: "/"
  },
  {
    title: "Work",
    image: "https://cdn.yodezeen.com/extra_Rectangle_1338_30f362d79f.webp",
    link: "/work"
  },
  {
    title: "Studio",
    image: "https://cdn.yodezeen.com/extra_magnific_YJY_Rzy_Tlr1_Am_B_Ct9akp_K_magnific_y_Uxk_U_Th_A_Ej_It_RC_1w_Yuo_U_Screenshot_2024_09_13_094738_scaled_1_7644c3cd33.webp",
    link: "/studio"
  },
  {
    title: "Journal",
    image: "https://cdn.yodezeen.com/extra_ARCH_28x_9cce867625.webp",
    link: "/journal"
  },
  {
    title: "Collab",
    image: "https://cdn.yodezeen.com/extra_ely_bsc_photography_Eleonora_Boscarelli_043_1_1_8867e1f0e6.webp",
    link: "/connect"
  }
];

export default function Header() {
  const navigate = useNavigate(); // Initialize navigation
  const circleRef = useRef(null);
  const menuContentRef = useRef(null);
  const bgImagesRef = useRef(null);
  const navItemsRef = useRef([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const openMenu = (e) => {
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
    });

    tl.set(bgImagesRef.current, { opacity: 1 });

    tl.to(circleRef.current, {
      scale: 60,
      duration: 1,
      ease: "expo.inOut",
    });

    tl.to(menuContentRef.current, {
      opacity: 1,
      duration: 0.1,
    }, "-=0.6");

    tl.fromTo(navItemsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" },
      "-=0.5"
    );
  };

  // Rectified: Added a callback 'onDone' to closeMenu
  const closeMenu = (onDone) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        setHoveredIndex(null);
        gsap.set(circleRef.current, { display: "none" });
        if (onDone) onDone(); // Execute navigation after animation
      }
    });

    tl.to(navItemsRef.current, { 
      opacity: 0, 
      y: 40, 
      duration: 0.4, 
      stagger: { each: 0.04, from: "end" },
      ease: "power2.in" 
    });

    tl.to(bgImagesRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, "-=0.3");

    tl.to(circleRef.current, { 
      scale: 0, 
      duration: 0.8, 
      ease: "expo.inOut" 
    }, "-=0.4");
  };

  // Rectified: Handle navigation logic
  const handleNavClick = (e, link) => {
    e.preventDefault(); // Prevent immediate jump
    closeMenu(() => {
      navigate(link); // Navigate only after menu animation finishes
      window.scrollTo(0, 0); // Reset scroll position for the new page
    });
  };

  return (
    <>
      {/* Reveal Circle */}
      <div
        ref={circleRef}
        className="fixed rounded-full pointer-events-none z-[60]"
        style={{ width: "100px", height: "100px", backgroundColor: "#e2e0e0", display: "none" }}
      />

      {/* Background Images Container */}
      <div ref={bgImagesRef} className="fixed inset-0 z-[61] pointer-events-none">
        {NAV_DATA.map((item, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: hoveredIndex === idx ? 1 : 0,
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: hoveredIndex !== null ? 1 : 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
          }}
        />
      </div>

      <header className="fixed top-4 right-4 sm:top-8 sm:right-8 flex items-center gap-2 z-[100]">
        {isMenuOpen ? (
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-all"
            onClick={() => closeMenu()}
          >
            <X className={`w-4 h-4 transition-colors duration-300 ${hoveredIndex !== null ? 'text-white' : 'text-[#2e2a2a]'}`} />
          </button>
        ) : (
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ backgroundColor: "rgba(46,42,42,0.08)" }}
            onClick={openMenu}
          >
            <Box className="w-4 h-4 text-[#2e2a2a]" />
          </button>
        )}

        <button
          className="pl-4 pr-1 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-widest flex items-center gap-3 transition-all duration-300"
          style={{
            backgroundColor: hoveredIndex !== null ? "rgba(255,255,255,0.15)" : "rgba(46,42,42,0.08)",
            color: hoveredIndex !== null ? "#fff" : "#2e2a2a",
            backdropFilter: hoveredIndex !== null ? "blur(4px)" : "none"
          }}
        >
          LET&apos;S TALK
          <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#bbb9b9]">
            <Plus className="w-3.5 h-3.5 text-white" />
          </span>
        </button>
      </header>

      <div
        ref={menuContentRef}
        className={`fixed inset-0 z-[70] flex flex-col justify-center px-6 sm:px-10 md:px-24 transition-opacity ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'}`}
      >
        <div className="space-y-4 sm:space-y-0">
          {NAV_DATA.map((item, index) => (
            <div
              key={item.title}
              ref={el => navItemsRef.current[index] = el}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleNavClick(e, item.link)} // Use the new handler
              className="py-1 w-fit"
            >
              {/* Note: We use a div or button style here because we handle the 'to' via useNavigate */}
              <div className="cursor-pointer group">
                <h1
                  className={`
                    text-[2.2rem] sm:text-[3.5rem] lg:text-[4rem]
                    font-bold leading-tight tracking-tighter
                    inline-flex items-center gap-2
                    transition-all duration-500 ease-out transform-gpu origin-left
                    ${hoveredIndex === null
                      ? 'text-[#322f2f] scale-100'
                      : hoveredIndex === index
                        ? 'text-white translate-x-6 scale-110'
                        : 'text-white/50 scale-95'
                    }
                  `}
                >
                  {item.title}
                  <ArrowUpRight
                    size={32}
                    className={`transition-all duration-500 transform-gpu ${hoveredIndex === index ? 'opacity-100 translate-x-1 -translate-y-1' : 'opacity-0'}`}
                  />
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}