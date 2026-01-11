import React from "react";
import LogoSVG from "../../assets/LOGO.svg";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "#f2f0f0" }}
    >
      {/* Hero Logo */}
      <div className="flex items-center justify-center flex-wrap z-10">
       <img
  src={LogoSVG}
  alt="Allspace365 Logo"
  className="
    w-[20rem]          /* Mobile / small screens */
    md:w-[40rem]       /* Normal screens */
    lg:w-[800px]       /* Fullscreen / large displays */
    max-w-full
    h-auto
    object-contain
  "
/>

      </div>

      {/* Footer Cities */}
      <div
        className="absolute bottom-8 left-0 right-0 text-center text-[9px] md:text-xs font-bold tracking-[0.25em] space-y-1 px-4 z-10 opacity-60"
        style={{ color: "#2e2a2a" }}
      >
        <div>LOS ANGELES | NEW YORK | MIAMI | TORONTO | LONDON | PARIS</div>
        <div>MILAN | DUBAI | MUMBAI | DELHI | SINGAPORE | SYDNEY</div>
      </div>
    </section>
  );
}