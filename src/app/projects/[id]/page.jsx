"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import enProjects from "../../../components/enData";
import trProjects from "../../../components/trData";
import { notFound } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
import ProjectCarousel from "../../../components/ProjectCarousel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import en from "../../../locales/en.json";
import tr from "../../../locales/tr.json";

export default function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const [longdescContent, setLongdescContent] = useState("");
  const [lang, setLang] = useState("en");
  const dict = lang === "tr" ? tr : en;
  const projects = lang === "tr" ? trProjects : enProjects;
  const { id } = useParams();

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
    const loadProject = async () => {
      if (!id) return;
      const currentProjects = lang === "tr" ? trProjects : enProjects;
      const foundProject = currentProjects.find((p) => Number(p.id) === Number(id));
      if (!foundProject) {
        notFound();
        return;
      }
      setProject(foundProject);

      // Load markdown content via fetch instead of fs
      if (foundProject.longdescPath) {
        try {
          const response = await fetch(foundProject.longdescPath);
          if (response.ok) {
            const content = await response.text();
            setLongdescContent(content);
          } else {
            setLongdescContent(foundProject.longdesc || "");
          }
        } catch (err) {
          setLongdescContent(foundProject.longdesc || "");
        }
      } else {
        setLongdescContent(foundProject.longdesc || "");
      }
    };

    loadProject();
  }, [id, lang]);

  if (!project) {
    return null;
  }

  return (
    <main className="section-main">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Geri dönüş linki */}
        <div className="mb-4 sm:mb-6">
          <a href="/" className="inline-flex items-center gap-1.5 sm:gap-2 underline text-sm sm:text-base">
            <LeftOutlined className="text-xs sm:text-sm" />
            {dict["projectDetail.back"]}
          </a>
        </div>

        {/* Ana grid layout - mobile-first responsive tasarım */}
        <div className="flex flex-col gap-6 sm:gap-8 xl:grid xl:grid-cols-3 xl:gap-10">
          
          {/* Proje bilgileri kartı - mobilde üstte, navbar'dan uzak */}
          <aside className="card-accent card-accent-bg rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 mt-4 sm:mt-0 xl:order-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold">{dict["projectDetail.summary"]}</h2>
            <p className="mt-2 sm:mt-3 muted text-sm sm:text-base leading-relaxed">{project.summary}</p>
            
            <h3 className="mt-4 sm:mt-5 lg:mt-6 font-semibold text-sm sm:text-base">{dict["projectDetail.technologies"]}</h3>
            <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map((t, i) => (
                <span 
                  key={i} 
                  className="rounded-full px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium" 
                  style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}
                >
                  {t}
                </span>
              ))}
            </div>
            
            <div className="mt-4 sm:mt-5 lg:mt-6">
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover block w-full rounded-lg sm:rounded-xl px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-3.5 text-sm sm:text-base lg:text-lg font-semibold text-center transition-all duration-200"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}
              >
                {dict["projectDetail.detailedCode"]}
              </a>
            </div>
          </aside>

          {/* Proje içeriği - mobilde altta */}
          <div className="xl:col-span-2 xl:order-1">
            <ProjectCarousel images={project.screenshots} />
            <article className="mt-3 sm:mt-4 lg:mt-6 leading-relaxed max-w-none">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold break-words">
                {project.title}
              </h1>
            </article>
          </div>
        </div>

        {/* Detaylı açıklama - markdown içeriği */}
        {longdescContent && (
          <div className="mt-8 sm:mt-10 lg:mt-12 prose prose-slate prose-sm sm:prose-base lg:prose-lg max-w-none 
                         prose-headings:break-words prose-p:break-words prose-li:break-words
                         prose-img:rounded-lg prose-img:shadow-sm
                         prose-code:text-sm prose-pre:text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {longdescContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  );
}


