import React from "react";
import { Plus } from "lucide-react";

export default function FourthSection() {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-10 md:px-24 text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1693335624607-dfe2428b361b?q=80&w=3360&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-white flex flex-col items-center">
        {/* Title */}
        <h1
          className="text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem]
                     font-bold leading-[1.1] tracking-tight"
        >
          Featured Projects
        </h1>
 <button
          className="mt-10 pl-4 pr-1 py-1 rounded-full
                     text-[10px] sm:text-xs font-bold tracking-widest
                     flex items-center gap-3
                     transition-all duration-300
                     hover:scale-[1.05]"
          style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
        >
          PROJECTS ATLAS
          <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white/80">
            <Plus className="w-3 h-3 text-black" />
          </span>
        </button>
        {/* Subtitle */}
        <p
          className="mt-6 text-sm md:text-base max-w-xl
                     leading-relaxed tracking-wide text-white/75"
        >
          A closer look at how the practice translates intent into built form,
          exploring projects shaped by clarity, context, and long-term thinking.
        </p>

        {/* Button */}
       
      </div>
    </section>
  );
}
