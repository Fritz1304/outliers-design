"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: "Alpha Architect", image: "/projects/alpha.png" },
  { id: 2, title: "Beta Branding", image: "/projects/beta.png" },
  { id: 3, title: "Gamma Interface", image: "/projects/gamma.png" },
  { id: 4, title: "Delta Motion", image: "/projects/delta.png" },
  { id: 5, title: "Epsilon Editorial", image: "/projects/epsilon.png" },
  { id: 6, title: "Zeta Product", image: "/projects/zeta.png" },
];

export default function ProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      
      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        
        // --- MODIFICA ESTE VALOR PARA SUBIR O BAJAR LA PILA ---
        const VERTICAL_SHIFT = -100; 
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * (isDesktop ? 1200 : 800)}`, 
            pin: true,
            scrub: 1,
          }
        });

        // Initialize states
        cards.forEach((card, i) => {
          if (i === 0) {
             gsap.set(card, { 
               opacity: 1, 
               y: VERTICAL_SHIFT, 
               x: isDesktop ? -100 : 0 
             });
          } else {
             gsap.set(card, { 
               opacity: 0, 
               y: 200, 
               zIndex: i + 1 
             });
          }
        });

        // Animation Sequence for cards
        cards.forEach((card, i) => {
          if (i === 0) return;

          tl.to(card, {
            opacity: 1,
            y: (i * (isDesktop ? 35 : 25)) + VERTICAL_SHIFT, 
            x: isDesktop ? (i * 40) - 100 : 0, 
            duration: 1.5,
            ease: "power2.out",
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen flex items-center justify-center bg-black relative overflow-hidden">
      
      {/* Main Stack */}
      <div className="relative w-full max-w-4xl aspect-video px-4">
        {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group`}
              style={{
                 zIndex: i + 1,
              }}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Title Overlay: Bottom placement as requested */}
              <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-linear-to-t from-black via-black/60 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-zinc-500 font-mono text-sm mb-2 block tracking-widest">PROYECTO 0{project.id}</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                      {project.title}
                    </h3>
                  </div>
                  <div className="hidden md:block">
                     <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all">
                       ↗
                     </div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
