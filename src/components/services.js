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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-center mb-2 sm:mb-4">{dict["services.title"]}</h2>
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 grid-cols-1 md:grid-cols-2">
          <div className="card-accent card-accent-bg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full">
            <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px]" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>
              <CodeOutlined />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">{dict["services.frontend.title"]}</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed muted cursor-default">{dict["services.frontend.description"]}</p>
          </div>
          <div className="card-accent card-accent-bg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full">
            <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px]" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>
              <ApiOutlined />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">{dict["services.backend.title"]}</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed muted cursor-default">{dict["services.backend.description"]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


