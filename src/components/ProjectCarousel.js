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
        <Carousel autoplay dots className="project-carousel">
          {images.map((src, i) => (
            <div key={i}>
                              <div className="relative group w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[520px] 2xl:h-[560px] max-h-[65vh] cursor-pointer" style={{ background: "var(--bg-alt)" }} onClick={() => { setCurrent(i); setPreviewOpen(true); }}>
                <Image
                  src={src}
                  alt={`Project screenshot ${i + 1}`}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, (max-width: 1536px) 60vw, 1200px"
                  priority={i === 0}
                />
                
                {/* Sağ üst köşede preview göz ikonu */}
                <div className="pointer-events-none absolute top-3 right-3">
                  <span
                    className="rounded-full p-2 text-sm opacity-70 transition-opacity group-hover:opacity-90"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                  >
                    <EyeOutlined />
                  </span>
                </div>
                
                {/* Desktop hover overlay (ortalanmış) */}
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


