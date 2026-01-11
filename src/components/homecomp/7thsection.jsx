"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import * as d3 from "d3";
import { feature } from "topojson-client";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  { city: "LOS ANGELES", tz: "America/Los_Angeles" },
  { city: "NEW YORK", tz: "America/New_York" },
  { city: "LONDON", tz: "Europe/London" },
  { city: "PARIS", tz: "Europe/Paris" },
  { city: "SYDNEY", tz: "Australia/Sydney" },
  { city: "DELHI", tz: "Asia/Kolkata" },
  { city: "SINGAPORE", tz: "Asia/Singapore" },
];

function interpolateProjection(raw0, raw1) {
  const mutate = d3.geoProjectionMutator((t) => (x, y) => {
    const [x0, y0] = raw0(x, y);
    const [x1, y1] = raw1(x, y);
    return [x0 + t * (x1 - x0), y0 + t * (y1 - y0)];
  });
  let t = 0;
  return Object.assign(mutate(t), {
    alpha(_) {
      return arguments.length ? mutate((t = +_)) : t;
    },
  });
}

export default function EighthSection() {
  const sectionRef = useRef(null);
  const textItemsRef = useRef([]);
  const [minutesMap, setMinutesMap] = useState({});

  // Globe State
  const svgRef = useRef(null);
  const [progress] = useState([0]); 
  const [worldData, setWorldData] = useState([]);
  const [rotation, setRotation] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState([0, 0]);

  const width = 800;
  const height = 800;

  useEffect(() => {
    const updateTimes = () => {
      const map = {};
      LOCATIONS.forEach(({ city, tz }) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const [hour, minute] = formatter.format(new Date()).split(":").map(Number);
        map[city] = hour * 60 + minute;
      });
      setMinutesMap(map);
    };
    updateTimes();
    const i = setInterval(updateTimes, 60000);
    return () => clearInterval(i);
  }, []);

  const formatTime = (totalMinutes) => {
    const hrs24 = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const period = hrs24 >= 12 ? "PM" : "AM";
    const hrs12 = hrs24 % 12 || 12;
    return `${hrs12}:${String(mins).padStart(2, "0")} ${period}`;
  };

  // Globe Rotation Animation
  useEffect(() => {
    let requestRef;
    const animate = () => {
      if (!isDragging) {
        setRotation((prev) => [prev[0] + 0.25, prev[1]]); 
      }
      requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [isDragging]);

  // REPEATABLE TEXT ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textItemsRef.current,
        { 
          opacity: 0, 
          x: -100, // Slides from left
          filter: "blur(10px)" 
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            // "restart none none none" makes it replay every time you scroll down into it
            // "restart none restart none" makes it replay from both directions
            toggleActions: "restart none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // D3 Globe Data & Rendering
  useEffect(() => {
    const loadWorldData = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        const world = await response.json();
        const countries = feature(world, world.objects.countries).features;
        setWorldData(countries);
      } catch (error) {
        console.error("Globe data error:", error);
      }
    };
    loadWorldData();
  }, []);

  useEffect(() => {
    if (!svgRef.current || worldData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const t = progress[0] / 100;
    const alpha = Math.pow(t, 0.5);

    const scale = d3.scaleLinear().domain([0, 1]).range([360, 150]);
    
    const projection = interpolateProjection(d3.geoOrthographicRaw, d3.geoEquirectangularRaw)
      .scale(scale(alpha))
      .translate([width / 2, height / 2])
      .rotate([rotation[0], rotation[1]])
      .precision(0.1);

    projection.alpha(alpha);
    const path = d3.geoPath(projection);

    const graticule = d3.geoGraticule();
    svg.append("path")
      .datum(graticule())
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#2e2a2a")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.1);

    svg.selectAll(".country")
      .data(worldData)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#2e2a2a")
      .attr("stroke-width", 0.8)
      .attr("opacity", 0.6);

    svg.append("path")
      .datum({ type: "Sphere" })
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#2e2a2a")
      .attr("stroke-width", 1)
      .attr("opacity", 0.3);
  }, [worldData, progress, rotation]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMouse([e.clientX, e.clientY]);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse[0];
    const dy = e.clientY - lastMouse[1];
    setRotation(prev => [prev[0] + dx * 0.5, prev[1] - dy * 0.5]);
    setLastMouse([e.clientX, e.clientY]);
  };

  return (
    <section
      ref={sectionRef}
      // Mobile: Flex-col (text on top, globe on bottom), Desktop: Flex-row
      className="w-full min-h-screen overflow-hidden flex flex-col md:flex-row items-center px-6 md:px-20 py-10 md:py-0"
      style={{ backgroundColor: "#f2f0f0" }}
    >
      {/* LEFT SIDE: TEXT - Mobile: Center aligned, Desktop: Left aligned */}
      <div className="w-full md:w-[45%] flex flex-col justify-center items-center md:items-start text-center md:text-left z-10">
        {LOCATIONS.map((loc, i) => (
          <div
            key={loc.city}
            ref={(el) => (textItemsRef.current[i] = el)}
            className="group relative flex flex-col md:flex-row items-center md:items-start mb-6 md:mb-4 cursor-default"
          >
            <h2
              className="text-[10vw] md:text-[3.5rem] lg:text-[5.2rem] font-bold tracking-tighter leading-[0.85] uppercase transition-colors duration-300 hover:text-neutral-400"
              style={{ color: "#2e2a2a" }}
            >
              {loc.city}
            </h2>

            <div 
              className="md:ml-2 mt-1 text-xs md:text-sm font-mono font-bold whitespace-nowrap"
              style={{ color: "#2e2a2a", opacity: 0.8 }}
            >
              {minutesMap[loc.city] !== undefined && (
                <CountUp
                  start={0}
                  end={minutesMap[loc.city]}
                  duration={2.5}
                  delay={0.5 + i * 0.1}
                  formattingFn={formatTime}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE: GLOBE */}
      <div className="w-full md:w-[55%] h-[50vh] md:h-screen flex items-center justify-center relative mt-10 md:mt-0">
        <div className="w-full max-w-[350px] md:max-w-[850px] aspect-square relative flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => {
               const touch = e.touches[0];
               handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
            }}
            onTouchMove={(e) => {
               const touch = e.touches[0];
               handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
            }}
            onTouchEnd={() => setIsDragging(false)}
          />
        </div>
      </div>
    </section>
  );
}