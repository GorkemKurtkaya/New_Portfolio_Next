"use client";
import { useEffect, useState, useRef } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import { OrbitPath, OrbitItem } from "react-orbit-component";
import { SiNodedotjs, SiNestjs, SiReact, SiNextdotjs, SiMongodb, SiPostgresql, SiApachekafka, SiRabbitmq, SiDocker, SiGooglecloud, SiJavascript, SiTypescript, SiFirebase, SiSupabase } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import React from 'react';




export default function StackSection() {
    const [lang, setLang] = useState("en");
    const dict = lang === "tr" ? tr : en;
    const [radiusPx, setRadiusPx] = useState(400); 
    const [paused, setPaused] = useState(false);
    const [isFreeze, setIsFreeze] = React.useState(false);
    const [isClient, setIsClient] = useState(false); 
    const wrapperRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    try {
      const initial = document.documentElement.getAttribute("data-lang") || window.localStorage.getItem("lang") || "en";
      setLang(initial);
    } catch {}
    const handler = (e) => {
      try {
        setLang(e.detail?.lang || "en");
      } catch {}
    };
    document.addEventListener("langchange", handler);
    return () => document.removeEventListener("langchange", handler);
  }, []);

useEffect(() => {
  if (!isClient) return; 
  
  const update = () => {
    if (typeof window === 'undefined') return;
    
    const width = wrapperRef.current ? wrapperRef.current.clientWidth : window.innerWidth;
    let desired;
    if (width < 320) {
      desired = 100;
    } else if (width < 480) {
      desired = 220;
    } else if (width < 768) {
      desired = 320;
    } else if (width < 1024) {
      desired = 500;
    } else {
      desired = 600;
    }
    const currentBadgeSize = width < 320 ? 50 : width < 480 ? 70 : width < 768 ? 100 : width < 1024 ? 120 : 140; // Büyük ekranlar için daha büyük badge
    const maxByWidth = Math.floor(width / 2 - (currentBadgeSize / 2) - 8);
    const clamped = Math.max(120, Math.min(desired, maxByWidth));
    setRadiusPx(clamped);
  };
  
  update();
  window.addEventListener("resize", update, { passive: true });
  return () => window.removeEventListener("resize", update);
}, [isClient]);

  const items = [
    { name: "JavaScript", Icon: SiJavascript },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Node.js", Icon: SiNodedotjs },
    { name: "NestJS", Icon: SiNestjs },
    { name: "React", Icon: SiReact },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "MongoDB", Icon: SiMongodb },
    { name: "PostgreSQL", Icon: SiPostgresql },
    { name: "Redis", Icon: DiRedis },
    { name: "RabbitMQ", Icon: SiRabbitmq },
    { name: "Apache Kafka", Icon: SiApachekafka },
    { name: "Firebase", Icon: SiFirebase },
    { name: "Supabase", Icon: SiSupabase },
    { name: "GCP", Icon: SiGooglecloud },
    { name: "Docker", Icon: SiDocker },
  ];

  const angleOffset = 180;
  const diameter = radiusPx * 2;
  const baseStep = 0.08;
  const step = (paused || isFreeze) ? 0 : baseStep;
  // Responsive badge size - SSR safe
  const width = isClient && wrapperRef.current ? wrapperRef.current.clientWidth : (isClient && typeof window !== 'undefined' ? window.innerWidth : 1024);
  const badgeSize = !isClient ? 100 : width < 320 ? 50 : width < 480 ? 70 : width < 768 ? 100 : width < 1024 ? 120 : 140;
  const orbitTopOffset = Math.round(badgeSize / 2);

return (
    <section id="stack" className="section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">{dict["stack.title"]}</h2>
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-4 sm:gap-6">
          <div ref={wrapperRef} className={`relative w-full ${!isClient ? 'max-w-[1000px]' : width < 320 ? 'max-w-[300px]' : width < 480 ? 'max-w-[400px]' : width < 768 ? 'max-w-[700px]' : width < 1024 ? 'max-w-[1100px]' : 'max-w-[1400px]'}`} style={{ height: `${radiusPx + orbitTopOffset}px`, overflow: "hidden" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <OrbitPath type="circle" className="absolute left-1/2 -translate-x-1/2" style={{ width: `${diameter}px`, height: `${diameter}px`, top: `${orbitTopOffset}px` }}>
              {items.map(({ name, Icon }, idx) => {
                const angle = ((idx / items.length) * 360) + angleOffset;
                return (
                  <OrbitItem key={`${name}-${paused ? 'paused' : 'run'}`} direction={paused ? undefined : "clockwise"} startAngle={angle} step={step} delay={0} >
                    <div className="group relative flex flex-col items-center cursor-pointer">
                      <div 
                        className="rounded-full bg-cyan-500/10 flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ 
                          width: `${badgeSize - 10}px`, 
                          height: `${badgeSize - 10}px` 
                        }}
                      >
                        <Icon 
                          className={`${!isClient ? 'text-[42px]' : width < 320 ? 'text-[18px]' : width < 480 ? 'text-[28px]' : width < 768 ? 'text-[42px]' : width < 1024 ? 'text-[56px]' : 'text-[64px]'}`} 
                          style={{ color: "var(--accent)" }} 
                        />
                      </div>
                      <div className={`absolute top-full mt-1 opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 ${!isClient ? 'text-xs md:text-sm' : width < 320 ? 'text-[9px]' : width < 480 ? 'text-[10px]' : width < 768 ? 'text-xs' : width < 1024 ? 'text-sm' : 'text-base'}`} style={{ color: "var(--text)" }}>
                        {name}
                      </div>
                    </div>
                  </OrbitItem>
                );
              })}
            </OrbitPath>
          </div>
        </div>
      </div>
    </section>
);

};
