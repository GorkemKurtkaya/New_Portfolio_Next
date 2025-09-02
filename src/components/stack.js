"use client";
import { useEffect, useState } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import { SiNodedotjs, SiNestjs, SiReact, SiNextdotjs, SiMongodb, SiPostgresql, SiApachekafka, SiRabbitmq, SiDocker, SiGooglecloud, SiJavascript, SiTypescript, SiFirebase, SiSupabase } from "react-icons/si";
import { DiRedis } from "react-icons/di";


export default function StackSection() {
    const [lang, setLang] = useState("en");
    const dict = lang === "tr" ? tr : en;
    const [radiusPx, setRadiusPx] = useState(460);

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
    if (window.innerWidth < 768) setRadiusPx(340);
    else setRadiusPx(460);
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

return (
    <section id="stack" className="section-alt">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">{dict["stack.title"]}</h2>
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="stack-wheel" style={{ ['--radius']: `${radiusPx}px` }}>
            <div className="stack-orbit">
              {items.map(({ name, Icon }, idx) => {
                const angle = ((idx / items.length) * 360) + angleOffset;
                return (
                  <div key={name} className="stack-item group" style={{ ['--angle']: `${angle}deg`, ['--radius']: `${radiusPx}px` }}>
                    <div className="stack-rotor">
                      <div className="stack-badge" title={name}>
                        <Icon className="text-[42px] md:text-[52px]" style={{ color: "var(--accent)" }} />
                      </div>
                      <div className="stack-label">{name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
);

};
