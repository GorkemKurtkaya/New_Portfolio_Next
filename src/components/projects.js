"use client";
import { useEffect, useState } from "react";
import enProjects from "./enData";
import trProjects from "./trData";
import Image from "next/image";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);
  const [lang, setLang] = useState("en");
  const dict = lang === "tr" ? tr : en;
  const projects = lang === "tr" ? trProjects : enProjects;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
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

  const baseCount = isMdUp ? 6 : 2;
  const visible = showAll ? projects : projects.slice(0, baseCount);
  
  return (
    <section id="projects" className="section-main section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center mb-2 sm:mb-4">{dict["projects.title"]}</h2>
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <article key={p.id} className="project-card rounded-2xl sm:rounded-3xl overflow-hidden group">
              <div className="relative aspect-[16/10] md:aspect-[16/9] section-alt">
                <Image
                  src={p.cover}
                  alt={`${p.title} cover`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                  priority={false}
                />
                <div className="absolute inset-0 hidden md:group-hover:grid md:place-content-center bg-gradient-to-t from-[rgba(6,182,212,0.35)] to-transparent">
                  <a href={`/projects/${p.id}`} className="btn-hover inline-block rounded-md px-3 sm:px-4 py-2 font-medium text-sm sm:text-base" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>{dict["projects.viewDetails"]}</a>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">{p.title}</h3>
                <p
                  className="mt-2 sm:mt-3 muted text-sm sm:text-base md:text-lg"
                  style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  title={p.summary}
                >
                  {p.summary}
                </p>
                <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {p.tags.slice(0, 4).map((t, i) => (
                    <span key={i} className="rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>{t}</span>
                  ))}
                  {p.tags.length > 4 && (
                    <span className="rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm" style={{ background: "rgba(6,182,212,0.08)", color: "var(--accent)", opacity: 0.7 }}>
                      +{p.tags.length - 4}
                    </span>
                  )}
                </div>
                <div className="mt-3 sm:mt-4 md:hidden text-center">
                  <a href={`/projects/${p.id}`} className="btn-hover inline-block rounded-md px-3 sm:px-4 py-2 font-medium text-sm sm:text-base" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>
                    {dict["projects.viewDetails"]}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 sm:mt-8 md:mt-10 text-center">
          <button onClick={() => setShowAll((v) => !v)} className="btn-hover inline-block rounded-md px-4 sm:px-5 py-2 sm:py-2.5 font-medium text-sm sm:text-base cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>
            {showAll ? dict["projects.showLess"] : dict["projects.showMore"]}
          </button>
        </div>
      </div>
    </section>
  );
}


