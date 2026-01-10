import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cross, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Components
import SeventhSection from "../components/comoncomp/7thsection";
import LetsTalk from "../components/letstalk";
import JoinTeam from "../components/jointeam";
import Carrers from "../components/carrers";
// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const CollaboratePage = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const contactSectionRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactInfo = [
    { label: "General Inquiries", email: "info@yodezeen.com" },
    { label: "PR & Collaborations", email: "pr@yodezeen.com" },
    { label: "Careers", email: "hr@yodezeen.com" },
    { label: "Book Offline", email: "info@yodezeen.com" },
    { label: "Become a Supplier", email: "suppliers@yodezeen.com" },
    { label: "Development Partnership", email: "partners@yodezeen.com" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- HERO SECTION ANIMATIONS ---
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        textRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".animate-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      // --- CONTACT GRID REVEAL ANIMATION ---
      // We target the inner spans/links for a "reveal from bottom" effect
      const revealItems = gsap.utils.toArray(".reveal-text");
      
      gsap.fromTo(
        revealItems,
        { 
          y: "100%", 
          opacity: 0 
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: "top 80%", 
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = () => {
    if (loading || success) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <>
      {/* ================= SECTION 1 : HERO & FORM ================= */}
      <div
        id="contact"
        ref={containerRef}
        className="min-h-screen w-full flex flex-col"
        style={{ backgroundColor: "#f2f0f0", color: "#2e2a2a" }}
      >
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 md:px-10 py-10">
          <div className="flex flex-col justify-end pb-4 lg:pb-0">
            <h1
              ref={textRef}
              className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.85] uppercase tracking-tighter"
            >
              Let's <br /> Connect
            </h1>
          </div>

          <div className="flex flex-col max-w-2xl pt-6 lg:pt-24 h-full">
            <div>
              <h2 className="animate-item text-xl md:text-2xl lg:text-3xl font-medium leading-tight mb-10 lg:mb-16 tracking-wide">
                Tell us a little bit about yourself and we will get back to you
                as soon as we can
              </h2>

              <form className="space-y-8 lg:space-y-12">
                <div className="animate-item flex flex-col">
                  <label className="text-[10px] md:text-sm tracking-widest uppercase mb-2 opacity-70">
                    First Name*
                  </label>
                  <input
                    type="text"
                    className="bg-transparent border-b border-gray-400 outline-none py-2 focus:border-black transition-colors"
                  />
                </div>
                <div className="animate-item flex flex-col">
                  <label className="text-[10px] md:text-sm tracking-widest uppercase mb-2 opacity-70">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    className="bg-transparent border-b border-gray-400 outline-none py-2 focus:border-black transition-colors"
                  />
                </div>
                <div className="animate-item flex flex-col">
                  <label className="text-[10px] md:text-sm tracking-widest uppercase mb-2 opacity-70">
                    Email*
                  </label>
                  <input
                    type="email"
                    className="bg-transparent border-b border-gray-400 outline-none py-2 focus:border-black transition-colors"
                  />
                </div>
              </form>
            </div>

            <div className="mt-12 lg:mt-auto pt-8 flex flex-wrap items-center justify-between lg:justify-end gap-4 animate-item">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition"
                  aria-label="Close"
                >
                  <Cross size={18} strokeWidth={2} className="rotate-45" />
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading || success}
                  className="min-w-[140px] h-10 rounded-full bg-black text-white text-[10px] tracking-widest uppercase flex items-center justify-center disabled:opacity-50 transition-all active:scale-95"
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : success ? (
                    "Sent"
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
              {success && (
                <span className="w-full lg:w-auto text-xs tracking-widest text-green-600 font-medium italic">
                  Message sent successfully
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 : 7TH SECTION ================= */}
      <SeventhSection />

      {/* ================= SECTION 3 : CONTACT GRID (REVEAL ANIMATION) ================= */}
      <section
        ref={contactSectionRef}
        className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10"
        style={{ backgroundColor: "#f2f0f0", color: "#2e2a2a" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Overflow hidden container for the label reveal */}
              <div className="overflow-hidden mb-2">
                <span className="reveal-text block text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase opacity-60">
                  {item.label}
                </span>
              </div>
              
              {/* Overflow hidden container for the email reveal */}
              <div className="overflow-hidden">
                <a
                  href={`mailto:${item.email}`}
                  className="reveal-text block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light break-all sm:break-normal hover:opacity-40 transition-opacity duration-300"
                >
                  {item.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4 : JOIN TEAM ================= */}
      <JoinTeam />
      <Carrers />

      {/* ================= SECTION 5 : LETS TALK ================= */}
      <LetsTalk />
    </>
  );
};

export default CollaboratePage;