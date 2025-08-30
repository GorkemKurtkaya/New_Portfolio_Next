import Image from "next/image";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";

export default function HomeSection() {
  return (
    <section id="home" className="section-main section-gradient">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-7xl font-bold">
            <span >Hi, I'm </span>
            <span style={{ color: "var(--accent)" }}>Görkem</span> Kurtkaya
            <div className="text-5xl md:text-3xl mt-3 font-lar">
              I'm a <span style={{ color: "var(--accent)" }}>Software Developer</span>
            </div>
          </h1>
          <p className="mt-6 leading-relaxed text-lg">
            I am a backend-focused software developer with strong fullstack experience. While my main
            interest lies in building scalable backend systems using technologies such as NestJS, Node.js,
            Redis, Kafka, RabbitMQ, and PostgreSQL, I have also developed fullstack projects with React,
            Next.js, MongoDB, Supabase, Firebase, and Docker. Having worked on microservices, real-time
            communication, and cloud-based deployments (GCP), I am eager to bring my knowledge and
            passion to large-scale projects while continuously improving myself.
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
            <a href="#contact" className="btn-hover rounded-md px-4 py-2 font-medium shadow-sm" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>Contact me</a>
            <a href="/Gorkem_Kurtkaya_CV.pdf" className="btn-hover rounded-md px-4 py-2 font-medium border" style={{ borderColor: "rgba(0,0,0,0.15)" }}>Download CV</a>
          </div>
        </div>

        <div
          className="relative aspect-square w-full max-w-[550px] justify-self-center overflow-hidden rounded-full accent-glow"
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


