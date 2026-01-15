"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroLoader from "../components/IntroLoader";
import ProjectStack from "../components/ProjectStack";
import ServicesSection from "../components/ServicesSection";
import FloatingGallery from "../components/FloatingGallery";

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
        <section className="w-full h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/projects/alpha.png" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-zinc-900" />
          </div>

          <div className="relative z-10">
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
          </div>
        </section>
      </IntroLoader>

      {/* About Section */}
      <section id="about" className="reveal-section w-full pt-12 pb-24 px-4 bg-black border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Quiénes Somos</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-400 text-lg">
            <p>
              Somos aliados creativos de marcas una chimba, que saben lo que valen y quieren dejar huella.
              Si tu marca va con toda, este equipo es para ti.
              Outliers Design nace en el corazón de Casanare con un sueño claro: usar el diseño como herramienta de transformación.
              Somos una agencia de diseño gráfico, branding y marketing con enfoque social, que combina estrategia, tecnología e innovación para crear marcas auténticas.
            </p>
            </div>
            <div className="h-64 md:h-80 bg-zinc-900 rounded-lg overflow-hidden border border-white/10 group">
              <img 
                src="/projects/beta.png" 
                alt="Outliers Team" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Interstitial Section */}
      <FloatingGallery />

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
