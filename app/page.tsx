"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroLoader from "../components/IntroLoader";
import ProjectStack from "../components/ProjectStack";
import ServicesSection from "../components/ServicesSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1
      })
      .from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5")
      .from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Sections Animation
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Service Cards Animation
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#services",
          start: "top 75%"
        }
      });

      // Portfolio Items Animation
      gsap.from(".portfolio-item", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#portfolio",
          start: "top 75%"
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="flex min-h-screen flex-col items-center justify-between">
      
      <IntroLoader>
        {/* Hero Section */}
        <section className="w-full h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-black to-zinc-900 border-b border-white/5">
          <div className="overflow-hidden">
            <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              OUTLIERS DESIGN
            </h1>
          </div>
          <p className="hero-text text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
            Transformamos ideas complejas en experiencias digitales memorables.
          </p>
          <a 
            href="#contact"
            className="hero-btn bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors inline-block"
          >
            Inicia tu Proyecto
          </a>
        </section>
      </IntroLoader>

      {/* About Section */}
      <section id="about" className="reveal-section w-full py-24 px-4 bg-black border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Quiénes Somos</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-400 text-lg">
              <p>
                En Outliers Design, no seguimos tendencias; las creamos. Somos un colectivo de diseñadores y desarrolladores apasionados por la excelencia digital.
              </p>
              <p>
                Creemos que cada marca tiene una historia única que contar, y nuestra misión es amplificar esa voz a través de diseño visualmente impactante y tecnología de vanguardia.
              </p>
            </div>
            <div className="h-64 md:h-80 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/10">
              <span className="text-gray-600 font-mono">[Espacio para Imagen de Equipo]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio Section */}
      <section id="portfolio" className="relative w-full py-24 px-4 bg-black border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-24 text-center tracking-tight">Portafolio Reciente</h2>
          
          {/* Stacking Projects Component */}
          <ProjectStack />
          
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="reveal-section w-full py-24 px-4 bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Contáctanos</h2>
          <p className="text-xl text-gray-400 mb-12">
            ¿Listo para llevar tu proyecto al siguiente nivel? Hablemos.
          </p>
          <div className="space-y-4">
             <div className="inline-block p-8 bg-black border border-white/10 rounded-2xl w-full">
                <p className="text-gray-300 mb-2">Email</p>
                <a href="mailto:hola@outliers.design" className="text-2xl font-bold hover:text-white transition-colors">
                  hola@outliers.design
                </a>
             </div>
          </div>
        </div>
      </section>

    </main>
  );
}
