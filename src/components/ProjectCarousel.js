"use client";

import { useEffect, useState } from "react";
import { Carousel, Image as AntImage } from "antd";
import Image from "next/image";
import en from "../locales/en.json";
import tr from "../locales/tr.json";
import { EyeOutlined } from "@ant-design/icons";

export default function ProjectCarousel({ images }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState("en");
  const dict = lang === "tr" ? tr : en;
  const label = lang === "tr" ? "Ön İzleme" : "Preview";

  useEffect(() => {
    try {
      const initial = document.documentElement.getAttribute("data-lang") || window.localStorage.getItem("lang") || "en";
      setLang(initial);
    } catch { }
    const handler = (e) => {
      try {
        setLang(e.detail?.lang || "en");
      } catch { }
    };
    document.addEventListener("langchange", handler);
    return () => document.removeEventListener("langchange", handler);
  }, []);
  return (
    <div className="rounded-2xl overflow-hidden project-card w-full">
      <AntImage.PreviewGroup preview={{ visible: previewOpen, onVisibleChange: setPreviewOpen, current, onChange: (i) => setCurrent(i) }}>
        <Carousel autoplay dots>
          {images.map((src, i) => (
            <div key={i}>
              <div className="relative group w-full h-[160px] sm:h-[220px] md:h-[340px] lg:h-[420px] max-h-[60vh] cursor-pointer" style={{ background: "var(--bg-alt)" }} onClick={() => { setCurrent(i); setPreviewOpen(true); }}>
                <Image
                  src={src}
                  alt={`Project screenshot ${i + 1}`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 hidden group-hover:flex items-center justify-center">
                  <span
                    className="rounded-md px-3 py-1 text-xs sm:text-sm font-medium opacity-80"
                    style={{ background: "rgba(0,0,0,0.25)", color: "#fff" }}
                  >
                    <EyeOutlined /> {label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div style={{ display: "none" }}>
          {images.map((src, i) => (
            <AntImage key={`preview-${i}`} src={src} alt={`Project screenshot ${i + 1}`} />
          ))}
        </div>
      </AntImage.PreviewGroup>
    </div>
  );
}


