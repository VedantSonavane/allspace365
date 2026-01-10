import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

const CareersSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const categories = [
    "View all", "Development", "Design", "Marketing", 
    "Customer Service", "Operations", "Finance", "Management"
  ];

  const jobs = [
    {
      title: "Product Designer",
      desc: "We're looking for a mid-level product designer to join our team.",
      tags: ["100% remote", "Full-time"],
    },
    {
      title: "Engineering Manager",
      desc: "We're looking for an experienced engineering manager to join our team.",
      tags: ["100% remote", "Full-time"],
    },
    {
      title: "Customer Success Manager",
      desc: "We're looking for a customer success manager to join our team.",
      tags: ["100% remote", "Full-time"],
    },
    {
      title: "Account Executive",
      desc: "We're looking for an account executive to join our team.",
      tags: ["100% remote", "Full-time"],
    },
    {
      title: "SEO Marketing Manager",
      desc: "We're looking for an experienced SEO marketing manager to join our team.",
      tags: ["100% remote", "Full-time"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header and Text Reveal
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Job Rows Reveal
      gsap.from(".job-row", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".jobs-list-container",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen  px-6 md:px-20 py-10 md:py-0"
      style={{ backgroundColor: "#f2f0f0", color: "#2e2a2a" }}
    >
      <div ref={containerRef} className="">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="reveal-item inline-block px-4 py-1.5 rounded-full border border-[#2e2a2a]/20 text-[10px] uppercase tracking-[0.2em] font-bold mb-8">
            We're hiring!
          </div>
          
          <h2 className="reveal-item text-5xl md:text-7xl font-bold  uppercase leading-[0.9] mb-8">
            Be part of <br /> our mission
          </h2>
          
          <p className="reveal-item text-lg md:text-xl font-medium max-w-2xl leading-relaxed opacity-80 mb-12">
            We’re looking for passionate people to join us on our mission. We value 
            flat hierarchies, clear communication, and full ownership.
          </p>

          {/* Category Pills - Matching the clean aesthetic */}
         
        </div>

        {/* Jobs List Container */}
        <div className="jobs-list-container border-t border-[#2e2a2a]/10">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="job-row group border-b border-[#2e2a2a]/10 py-12 flex flex-col md:flex-row md:items-center justify-between ] transition-colors px-4 -mx-4 cursor-pointer"
            >
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3  transition-opacity">
                  {job.title}
                </h3>
                <p className="text-sm md:text-base opacity-70 mb-6 max-w-xl font-medium">
                  {job.desc}
                </p>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-60">
                    <MapPin size={14} strokeWidth={2.5} /> {job.tags[0]}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-60">
                    <Clock size={14} strokeWidth={2.5} /> {job.tags[1]}
                  </span>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-5 transition-all duration-500">
                Apply Now <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Quote Section */}
        <div className="mt-12 text-center">
           <h4 className="reveal-item text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight  max-w-5xl mx-auto">
             "Untitled truly values work-life balance. We work hard and deliver, but at the end of the day you can switch off."
           </h4>
        </div>

      </div>
    </section>
  );
};

export default CareersSection;