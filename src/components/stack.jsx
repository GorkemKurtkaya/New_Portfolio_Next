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
    const [radiusPx, setRadiusPx] = useState(460);
    const [paused, setPaused] = useState(false);
    const [isFreeze, setIsFreeze] = React.useState(false);
    const wrapperRef = useRef(null);

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
  const update = () => {
    const width = wrapperRef.current ? wrapperRef.current.clientWidth : window.innerWidth;
    const desired = width < 768 ? 340 : 460;
    const maxByWidth = Math.floor(width / 2 - (badgeSize / 2) - 8);
    const clamped = Math.max(160, Math.min(desired, maxByWidth));
    setRadiusPx(clamped);
  };
  update();
  window.addEventListener("resize", update, { passive: true });
  return () => window.removeEventListener("resize", update);
}, []);

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
  const badgeSize = 100;
  const orbitTopOffset = Math.round(badgeSize / 2);

return (
    <section id="stack" className="section-alt">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">{dict["stack.title"]}</h2>
        <div className="mt-12 flex flex-col items-center gap-6">
          <div ref={wrapperRef} className="relative w-full max-w-[1000px]" style={{ height: `${radiusPx + orbitTopOffset}px`, overflow: "hidden" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <OrbitPath type="circle" className="absolute left-1/2 -translate-x-1/2" style={{ width: `${diameter}px`, height: `${diameter}px`, top: `${orbitTopOffset}px` }}>
              {items.map(({ name, Icon }, idx) => {
                const angle = ((idx / items.length) * 360) + angleOffset;
                return (
                  <OrbitItem key={`${name}-${paused ? 'paused' : 'run'}`} direction={paused ? undefined : "clockwise"} startAngle={angle} step={step} delay={0} >
                    <div className="group relative flex flex-col items-center">
                      <div className="w-[90px] h-[90px] rounded-full bg-cyan-500/10 flex items-center justify-center transition-transform group-hover:scale-110">
                        <Icon className="text-[42px] md:text-[52px]" style={{ color: "var(--accent)" }} />
                      </div>
                      <div className="absolute top-full mt-1 text-xs md:text-sm opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0" style={{ color: "var(--text)" }}>
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
