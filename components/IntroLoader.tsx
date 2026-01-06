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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", 
          pin: true,
          scrub: 1, 
        },
      });

      // ---------------------------------------------------------
      // ANIMATION SEQUENCE
      // ---------------------------------------------------------

      // 1. Zoom the Masked Overlay
      tl.to(overlayGroupRef.current, {
        scale: 150, 
        ease: "power2.inOut", 
        // ORIGIN CALCULATION:
        // We merged the text back to a single "OUTLIERS" string for perfect kerning.
        // Center of "OUTLIERS" is x=150.
        // "T" is the 3rd letter, slightly left of center.
        // Calculated position is approx 37% of the total ViewBox width (300).
        transformOrigin: "50% 45%", 
      })
      
      // 2. Fade out the White Layer
      .to(whiteLayerRef.current, {
        opacity: 0,
        ease: "power1.inOut", 
      }, "-=25%")
      
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
          ViewBox Height Increased to 150 to fit two lines 
        */}
        <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="textMask">
              <rect x="0" y="0" width="300" height="150" fill="white" />
              
              {/* 
                Text Holes 
              */}
              <g className="text-hole">
                {/* Line 1: OUTLIERS (Unified for spacing) */}
                <text 
                  x="150" 
                  y="65" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fontSize="30" 
                  fontWeight="bold" 
                  letterSpacing="3" 
                  fill="black"
                >
                OUTLIERS
                </text>

                {/* Line 2: DESIGN at y=110 */}
                <text 
                  x="150" 
                  y="90" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fontSize="16" 
                  fontWeight="normal" 
                  letterSpacing="3" 
                  fill="black"
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
