"use client";

import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export default function FooterSection() {
  const year = new Date().getFullYear();
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
    <footer className="section-main section-alt">
      <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col items-center gap-6" style={{ fontFamily: "var(--font-oswald)" }}>
        <div className="flex items-center gap-4">
          <a href="https://github.com/GorkemKurtkaya" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link inline-flex h-11 w-11 items-center justify-center rounded-full">
            <GithubOutlined />
          </a>
          <a href="https://www.linkedin.com/in/gorkem-kurtkaya/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link inline-flex h-11 w-11 items-center justify-center rounded-full">
            <LinkedinOutlined />
          </a>
          <a href="mailto:gorkem.kurtkaya@yahoo.com" aria-label="Mail" className="icon-link inline-flex h-11 w-11 items-center justify-center rounded-full">
            <MailOutlined />
          </a>
        </div>
        <p className="muted text-center">{dict["footer.copyright"].replace("{year}", year)}</p>
      </div>
    </footer>
  );
}


