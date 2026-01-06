"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  color: string;
}

const projects: Project[] = [
  { id: 1, title: "Proyecto Alpha", color: "bg-zinc-800" },
  { id: 2, title: "Proyecto Beta", color: "bg-zinc-700" },
  { id: 3, title: "Proyecto Gamma", color: "bg-zinc-600" },
  { id: 4, title: "Proyecto Delta", color: "bg-zinc-500" },
  { id: 5, title: "Proyecto Epsilon", color: "bg-zinc-800" },
  { id: 6, title: "Proyecto Zeta", color: "bg-zinc-700" },
];

export default function ProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 1000}`, 
          pin: true,
          scrub: 1,
        }
      });

      // Initialize states properly with GSAP to avoid CSS conflicts
      cards.forEach((card, i) => {
        if (i === 0) {
           gsap.set(card, { opacity: 1, y: 0, x: 0 }); // First card sits at origin
           return;
        }

        // Initial state: Hidden, pushed down significantly
        gsap.set(card, { opacity: 0, y: 150, zIndex: i + 1 });
        
        // Animation
        tl.to(card, {
          opacity: 1,
          y: i * 40, // Final diagonal vertical offset
          x: i * 40, // Final diagonal horizontal offset
          duration: 1,
          ease: "power2.out",
        }, `+=${0.5}`); // Hold time
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Container is fixed size or max-width to hold the stack */}
      <div className="relative w-full max-w-2xl aspect-video">
        {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${project.color}`}
              style={{
                 // We don't set top/left here, we let GSAP handle the transforms (x, y) relative to inset-0
                 zIndex: i + 1,
              }}
            >
               {/* INNER CONTENT */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 className="text-4xl md:text-6xl font-bold text-white/20 tracking-tighter select-none">
                  {project.title}
                </h3>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center cursor-pointer group">
                  <span className="text-white text-xl font-medium border border-white/50 px-6 py-2 rounded-full backdrop-blur-sm group-hover:scale-105 transition-transform">
                    Ver Proyecto
                  </span>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
