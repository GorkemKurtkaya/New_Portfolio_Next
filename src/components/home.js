"use client"

import Image from "next/image";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export default function HomeSection() {
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
    <section id="home" className="section-main section-gradient">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center" style={{ fontFamily: "var(--font-oswald)" }}>
        <div>
          <h1 className="text-7xl font-bold" >
            <span>{dict["home.greeting"]} <br /></span>
            <span style={{ color: "var(--accent)" }}>{dict["home.name"]}</span> {dict["home.surname"]}
            <div className="text-5xl md:text-3xl mt-3 font-lar">
              {dict["home.role"]} <span style={{ color: "var(--accent)" }}>{dict["home.role.title"]}</span>
            </div>
          </h1>
          <p className="mt-6 leading-relaxed text-lg" style={{ fontFamily: "var(--font-roboto)", fontWeight: "400" }}>
            {dict["home.description"]}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="https://github.com/GorkemKurtkaya" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link inline-flex h-10 w-10 items-center justify-center rounded-full transition">
              <GithubOutlined />
            </a>
            <a href="https://www.linkedin.com/in/gorkem-kurtkaya/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link inline-flex h-10 w-10 items-center justify-center rounded-full transition">
              <LinkedinOutlined />
            </a>
            <a href="mailto:gorkem.kurtkaya@yahoo.com" aria-label="Mail" className="icon-link inline-flex h-10 w-10 items-center justify-center rounded-full transition">
              <MailOutlined />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-hover rounded-md px-4 py-2 font-medium shadow-sm" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>{dict["home.cta.contact"]}</a>
            <a href="/Gorkem_Kurtkaya_CV.pdf" className="btn-hover rounded-md px-4 py-2 font-medium border" style={{ borderColor: "rgba(0,0,0,0.15)" }}>{dict["home.cta.download"]}</a>
          </div>
        </div>

        <div
          className="relative aspect-square w-full max-w-[570px] justify-self-center overflow-hidden rounded-full accent-glow"
          style={{ background: "transparent" }}
        >
          <Image
            src="/pp.jpeg"
            alt="Görkem Kurtkaya"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 240px, 320px"
            priority
          />
        </div>
      </div>
    </section>
  );
}


