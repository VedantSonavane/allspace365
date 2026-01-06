import React from "react";
import { Plus } from "lucide-react";

export default function FourthSection() {
  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-10 md:px-24 text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1562170973-125611988e78?q=80&w=2806&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
              className="
                mt-6 flex items-center gap-3
                px-1.5 py-1.5 pl-5 rounded-full
                bg-white/40 text-white
               text-xs sm:text-xs font-bold uppercase
                hover:bg-white/10 transition-all duration-300
                group
              "
            >
project atlas              {/* ARROW CIRCLE */}
              <span className="
                w-10 h-10 rounded-full
                bg-[#5a5a5a] flex items-center justify-center
                transition-all duration-300
                group-hover:bg-[#ffff] 
              ">
                <svg
                  className="w-5 h-5 text-white group-hover:rotate-45  transition-transform duration-300 group-hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
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
