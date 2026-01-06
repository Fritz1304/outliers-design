"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Diseño UI/UX",
    description: "Creación de interfaces que no solo se ven bien, sino que se sienten naturales e intuitivas. Diseñamos sistemas completos que escalan con tu producto.",
    imageColor: "bg-blue-900", // Placeholder for image
  },
  {
    id: "02",
    title: "Desarrollo Web",
    description: "Ingeniería robusta con Next.js y React. Construimos sitios veloces, seguros y optimizados para SEO que convierten visitantes en clientes.",
    imageColor: "bg-indigo-900",
  },
  {
    id: "03",
    title: "Estrategia de Marca",
    description: "Identidades visuales cohesivas que narran la historia única de tu negocio. Desde el logotipo hasta la voz de marca en cada punto de contacto.",
    imageColor: "bg-purple-900",
  },
  {
    id: "04",
    title: "Marketing Digital",
    description: "Estrategias orientadas a datos. Maximizamos tu ROI mediante campañas precisas en redes sociales, SEM y posicionamiento orgánico.",
    imageColor: "bg-fuchsia-900",
  },
  {
    id: "05",
    title: "Consultoría Tech",
    description: "Auditoría experta de tu infraestructura digital. Optimizamos procesos, elegimos el stack tecnológico ideal y preparamos tu equipo para el éxito.",
    imageColor: "bg-rose-900",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logic: As each text section enters the viewport, fade in the corresponding image
      // and fade out the others.
      
      const images = imagesRef.current;
      
      // Initialize: First image visible, others hidden
      images.forEach((img, i) => {
        if (img) gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.1 });
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".services-images", // Pin the right side container
      });

      // Text triggers
      const textSections = gsap.utils.toArray<HTMLElement>(".service-text");
      
      textSections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center", // When text hits center of screen
          end: "bottom center",
          onEnter: () => {
            // Animate IN current image
            gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
            // Animate OUT previous images (ensure cleanup)
            images.forEach((img, idx) => {
               if (idx !== i) gsap.to(img, { opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.out" });
            });
          },
          onEnterBack: () => {
            // Same logic when scrolling back up
            gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
            images.forEach((img, idx) => {
               if (idx !== i) gsap.to(img, { opacity: 0, scale: 1.1, duration: 0.8, ease: "power2.out" });
            });
          }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black text-white">
      <div className="flex flex-col md:flex-row">
        
        {/* LEFT: Scrolling Text Content */}
        <div className="w-full md:w-1/2 relative z-10">
          {services.map((service, i) => (
            <div 
              key={service.id} 
              className="service-text min-h-screen flex flex-col justify-center p-8 md:p-20 border-r border-white/10 bg-black/50 backdrop-blur-sm"
            >
              <span className="text-5xl md:text-7xl font-mono text-white/10 font-bold mb-8 block">
                {service.id}
              </span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-500">
                {service.title}
              </h3>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md">
                {service.description}
              </p>
              <div className="mt-12">
                  <button className="text-sm uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                      Explorar Servicio
                  </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Sticky Images Container */}
        <div className="services-images hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center overflow-hidden border-b border-white/5 bg-zinc-900">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { imagesRef.current[i] = el; }}
              className={`absolute inset-0 w-full h-full flex items-center justify-center ${service.imageColor}`}
            >
               {/* Placeholder for actual image */}
               <div className="text-center p-12">
                  <div className="w-32 h-32 rounded-full bg-white/10 mx-auto mb-6 flex items-center justify-center backdrop-blur-md border border-white/20">
                     <span className="text-3xl">✦</span>
                  </div>
                  <span className="text-2xl font-mono text-white/50 tracking-widest block">IMG {service.id}</span>
               </div>
               
               {/* Gradient Overlay for texture */}
               <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
