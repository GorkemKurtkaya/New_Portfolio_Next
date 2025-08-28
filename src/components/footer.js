import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";

export default function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-main section-gradient" style={{ borderTop: "1px solid rgba(6,182,212,0.18)" }}>
      <div className="mx-auto max-w-6xl px-4 py-12 flex flex-col items-center gap-6">
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
        <p className="muted text-center">© {year} Görkem Kurtkaya — Tarafından Geliştirildi.</p>
      </div>
    </footer>
  );
}


