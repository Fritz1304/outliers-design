"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveal mask animation
      gsap.fromTo(textRef.current, 
        { 
          y: 100, 
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)"
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );

      // 2. Parallax and Floating for images
      imagesRef.current.forEach((img, i) => {
        if (!img) return;

        // Random floating movement
        gsap.to(img, {
          y: "+=30",
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 2 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Scroll parallax
        gsap.to(img, {
          y: (i + 1) * -100,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const floatingImages = [
    { src: "/projects/alpha.png", pos: "top-10 left-[5%]", size: "w-48 h-64" },
    { src: "/projects/gamma.png", pos: "bottom-10 right-[10%]", size: "w-64 h-48" },
    { src: "/projects/zeta.png", pos: "top-20 right-[5%]", size: "w-40 h-56" },
  ];

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-black overflow-hidden flex items-center justify-center border-y border-white/5">
      {/* From Uiverse.io by Javierrocadev 
      <div
        className="w-64 h-64 bg-neutral-800 group relative rounded-xl flex justify-center items-center overflow-hidden"
      >
        <div className="w-24 h-24 bottom-8 absolute bg-red-300">
          <div
            className="w-24 h-24 absolute bg-neutral-50 duration-500 shadow-2xl [box-shadow:0px_-75px_55px_-30px_#262626] group-hover:[box-shadow:0px_-75px_95px_0px_#FDE047]"
          >
            <div className="w-24 h-24 bg-neutral-50 shadow-inner shadow-yellow-200"></div>
            <div
              className="w-24 h-24 bg-neutral-50 absolute -bottom-12 rounded-full [transform:_rotateX(80deg)]"
            ></div>
            <div
              className="w-24 h-24 bg-yellow-400 border-4 border-yellow-300 absolute -top-12 rounded-full [transform:_rotateX(80deg)]"
            ></div>
          </div>
          <svg
            className="group-hover:-skew-x-2 duration-500 absolute rounded-full shadow-yellow-200 -top-12 left-4 fill-yellow-300 w-16 h-16"
            height="100"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 100 100"
            width="100"
            x="0"
            xmlns="http://www.w3.org/2000/svg"
            y="0"
          >
            <path
              className=""
              d="M59.5,20.5a3.9,3.9,0,0,0-2.5-2,4.3,4.3,0,0,0-3.3.5,11.9,11.9,0,0,0-3.2,3.5,26,26,0,0,0-2.3,4.4,76.2,76.2,0,0,0-3.3,10.8,120.4,120.4,0,0,0-2.4,14.2,11.4,11.4,0,0,1-3.8-4.2c-1.3-2.7-1.5-6.1-1.5-10.5a4,4,0,0,0-2.5-3.7,3.8,3.8,0,0,0-4.3.9,27.7,27.7,0,1,0,39.2,0,62.4,62.4,0,0,1-5.3-5.8A42.9,42.9,0,0,1,59.5,20.5ZM58.4,70.3a11.9,11.9,0,0,1-20.3-8.4s3.5,2,9.9,2c0-4,2-15.9,5-17.9a21.7,21.7,0,0,0,5.4,7.5,11.8,11.8,0,0,1,3.5,8.4A12,12,0,0,1,58.4,70.3Z"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div> */}

      {/* Background Subtle Elements */}

      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Floating Images Layer */}
      {floatingImages.map((img, i) => (
        <div
          key={i}
          ref={(el) => { imagesRef.current[i] = el; }}
          className={`absolute ${img.pos} ${img.size} rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-0 hidden md:block opacity-60 grayscale hover:grayscale-0 transition-all duration-700`}
        >
          <img src={img.src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Central Statement */}
      <div className="relative z-10 text-center px-4">
        <span className="text-zinc-500 font-mono tracking-[0.3em] uppercase text-sm mb-4 block">Manifesto</span>
        <h2 
          ref={textRef}
          className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
        >
          DISEÑAMOS EL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">FUTURO DIGITAL</span>
        </h2>
      </div>
      
    </section>
  );
}
