"use client";
import { useEffect, useState } from "react";
import projects from "./projectsData";
import Image from "next/image";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMdUp(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const baseCount = isMdUp ? 6 : 2;
  const visible = showAll ? projects : projects.slice(0, baseCount);
  return (
    <section id="projects" className="section-main section-gradient ">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">Projects</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <article key={p.id} className="project-card rounded-3xl overflow-hidden group">
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
                  <a href={`/projects/${p.slug}`} className="btn-hover inline-block rounded-md px-4 py-2 font-medium" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>View details</a>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-semibold text-center">{p.title}</h3>
                <p
                  className="mt-3 muted text-lg"
                  style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                  title={p.summary}
                >
                  {p.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t, i) => (
                    <span key={i} className="rounded-full px-3 py-1 text-xs" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>{t}</span>
                  ))}
                </div>
                <div className="mt-4 md:hidden">
                  <a href={`/projects/${p.slug}`} className="btn-hover inline-block rounded-md px-4 py-2 font-medium" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>
                    View details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => setShowAll((v) => !v)} className="btn-hover inline-block rounded-md px-5 py-2.5 font-medium" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>
            {showAll ? "Daha az göster" : "Tümüne göz at"}
          </button>
        </div>
      </div>
    </section>
  );
}


