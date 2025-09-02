"use client";

import { CodeOutlined, ApiOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export default function ServicesSection() {
  const [lang, setLang] = useState("en");
  const dict = lang === "tr" ? tr : en;

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

  return (
    <section id="services" className="section-main section-gradient ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">{dict["services.title"]}</h2>
        <div className="mt-8 sm:mt-10 grid gap-8 sm:gap-10 md:gap-12 xl:gap-16 md:grid-cols-2">
          <div className="card-accent card-accent-bg rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 lg:gap-8 w-full">
            <div className="mb-4 lg:mb-0 inline-flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-[22px] sm:text-[26px] lg:text-[28px]" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>
              <CodeOutlined />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{dict["services.frontend.title"]}</h3>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed muted cursor-default">{dict["services.frontend.description"]}</p>
          </div>
          <div className="card-accent card-accent-bg rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 lg:gap-8 w-full">
            <div className="mb-4 lg:mb-0 inline-flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-[22px] sm:text-[26px] lg:text-[28px]" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>
              <ApiOutlined />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{dict["services.backend.title"]}</h3>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed muted cursor-default">{dict["services.backend.description"]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


