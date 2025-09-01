"use client";

import { useState, useEffect } from "react";
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

export default function ProjectDetailPage({ params }) {
  const [project, setProject] = useState(null);
  const [longdescContent, setLongdescContent] = useState("");
  const [lang, setLang] = useState("en");
  const dict = lang === "tr" ? tr : en;
  const projects = lang === "tr" ? trProjects : enProjects;

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
      const { slug } = params;
      const currentProjects = lang === "tr" ? trProjects : enProjects;
      const foundProject = currentProjects.find((p) => p.slug === slug);
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
  }, [params, lang]);

  if (!project) {
    return null;
  }

  return (
    <main className="section-main">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 md:py-16">
        <div className="mb-6">
          <a href="/" className="inline-flex items-center gap-2 underline">
            <LeftOutlined />
            {dict["projectDetail.back"]}
          </a>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2 order-1">
            <ProjectCarousel images={project.screenshots} />
            <article className="mt-4 sm:mt-6 leading-relaxed max-w-none">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold ">{project.title}</h1>
            </article>
          </div>

          <aside className="card-accent card-accent-bg rounded-2xl p-5 sm:p-6 order-0 lg:order-2">
            <h2 className="text-lg sm:text-xl font-semibold">{dict["projectDetail.summary"]}</h2>
            <p className="mt-2 muted">{project.summary}</p>
            <h3 className="mt-4 sm:mt-6 font-semibold">{dict["projectDetail.technologies"]}</h3>
            <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <span key={i} className="rounded-full px-3 py-1 text-xs" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>{t}</span>
              ))}
            </div>
            <div className="mt-5 sm:mt-6 px-0 sm:px-2">
              <a
                href={project.code}
                target="_blank"
                className="btn-hover block w-full rounded-lg px-5 sm:px-6 py-3 sm:py-3.5 text-base sm:text-lg font-semibold text-center"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}
              >
                {dict["projectDetail.detailedCode"]}
              </a>
            </div>
          </aside>
        </div>

        {longdescContent && (
          <div className="mt-10 prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{longdescContent}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  );
}


