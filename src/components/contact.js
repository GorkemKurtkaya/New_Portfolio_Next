export default function ContactSection() {
    return (
    <section id="contact" className="section-alt">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <h2 className="text-3xl font-semibold">Contact</h2>
            <form className="mt-8 grid gap-4 md:grid-cols-2">
                <input className="rounded-md border p-3 bg-transparent" placeholder="Full name" style={{ borderColor: "rgba(0,0,0,0.15)" }} />
                <input className="rounded-md border p-3 bg-transparent" placeholder="Email" type="email" style={{ borderColor: "rgba(0,0,0,0.15)" }} />
                <input className="rounded-md border p-3 bg-transparent md:col-span-2" placeholder="Subject" style={{ borderColor: "rgba(0,0,0,0.15)" }} />
                <textarea className="rounded-md border p-3 bg-transparent md:col-span-2 min-h-[140px]" placeholder="Message" style={{ borderColor: "rgba(0,0,0,0.15)" }} />
                <div className="md:col-span-2">
                    <button className="rounded-md px-4 py-2 font-medium shadow-sm" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>Send</button>
                </div>
            </form>
        </div>
    </section>
    )

}