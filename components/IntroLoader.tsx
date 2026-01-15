"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface IntroLoaderProps {
  children: React.ReactNode;
}

export default function IntroLoader({ children }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayGroupRef = useRef<SVGGElement>(null);
  const whiteLayerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%", 
            pin: true,
            scrub: 1, 
          },
        });

        // 1. Zoom the Masked Overlay
        tl.to(overlayGroupRef.current, {
          scale: isDesktop ? 150 : 80, // Smaller zoom needed for mobile screen ratio
          ease: "power2.inOut", 
          transformOrigin: "50% 45%", 
        })
        
        // 2. Fade out the White Layer
        .to(whiteLayerRef.current, {
          opacity: 0,
          ease: "power1.inOut", 
        }, "-=25%");
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      
      {/* 
        LAYER 3: TOP (Black Overlay with Cutout Text) 
      */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        {/* 
          Using responsive viewBox or conditional sizing to ensure text fits 
        */}
        <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="textMask">
              <rect x="0" y="0" width="300" height="150" fill="white" />
              
              <g className="text-hole">
                {/* Responsive font size and positioning via classes or inline */}
                <text 
                  x="150" 
                  y="65" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-[30px] md:text-[30px] font-bold"
                  letterSpacing="3" 
                  fill="black"
                  style={{ fontFamily: "var(--font-outfit)", fontSize: "30px" }}
                >
                OUTLIERS
                </text>

                <text 
                  x="150" 
                  y="92" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-[14px] md:text-[16px]"
                  fontWeight="normal" 
                  letterSpacing="4" 
                  fill="black"
                  style={{ fontFamily: "var(--font-outfit)", fontSize: "15px" }}
                >
                  DESIGN
                </text>
              </g>
            </mask>
          </defs>

          <g ref={overlayGroupRef}>
            <rect 
              x="-50%" y="-50%" width="200%" height="200%" 
              fill="black" 
              mask="url(#textMask)" 
            />
          </g>
        </svg>
      </div>

      {/* 
        LAYER 2: MIDDLE (White Background) 
      */}
      <div 
        ref={whiteLayerRef}
        className="absolute inset-0 z-40 bg-white"
      ></div>

      {/* 
        LAYER 1: BOTTOM (Hero Content) 
      */}
      <div className="relative z-0 w-full h-full">
        {children}
      </div>

    </div>
  );
}
