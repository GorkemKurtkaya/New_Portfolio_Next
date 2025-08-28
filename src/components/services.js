import { CodeOutlined, ApiOutlined } from "@ant-design/icons";

export default function ServicesSection() {
  return (
    <section id="services" className="section-alt ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">Services</h2>
        <div className="mt-8 sm:mt-10 grid gap-8 sm:gap-10 md:gap-12 xl:gap-16 md:grid-cols-2">
          <div className="card-accent card-accent-bg rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 lg:gap-8 w-full">
            <div className="mb-4 lg:mb-0 inline-flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-[22px] sm:text-[26px] lg:text-[28px]" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>
              <CodeOutlined />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Frontend Development</h3>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed muted">I have experience in frontend development with React.js, creating dynamic and responsive user interfaces. I’m skilled in HTML5, CSS3, and JavaScript (TypeScript), ensuring compatibility across devices and browsers. I've worked with state management tools like Redux and React Context and integrated APIs for efficient data handling. My focus is on building clean, maintainable, and user-friendly interfaces that boost application performance.</p>
          </div>
          <div className="card-accent card-accent-bg rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center gap-5 lg:gap-8 w-full">
            <div className="mb-4 lg:mb-0 inline-flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full text-[22px] sm:text-[26px] lg:text-[28px]" style={{ background: "rgba(6,182,212,0.12)", color: "var(--accent)" }}>
              <ApiOutlined />
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Backend Development</h3>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed muted">I specialize in backend development, using technologies like Node.js, Django, and Express to build robust and scalable applications. I have experience in designing RESTful APIs, managing databases such as MongoDB and PostgreSQL, and implementing caching and message queues with Redis and Kafka. My focus is on creating high-performance, secure, and maintainable systems that integrate seamlessly with frontend components and scale efficiently with user growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


