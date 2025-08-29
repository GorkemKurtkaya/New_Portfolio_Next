"use client";

import { useState } from "react";
import { notification } from "antd";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                throw new Error("Request failed");
            }
            api.success({
                message: "Başarılı",
                description: "Mesaj gönderildi.",
                placement: "bottomRight",
            });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            api.error({
                message: "Hata",
                description: "Bir hata oluştu. Daha sonra tekrar deneyin.",
                placement: "bottomRight",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
    <section id="contact" className="section-alt">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <h2 className="text-3xl font-semibold">Contact</h2>
            {contextHolder}
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
                <input name="name" value={form.name} onChange={handleChange} className="rounded-md border p-3 bg-transparent" placeholder="Full name" style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <input name="email" value={form.email} onChange={handleChange} className="rounded-md border p-3 bg-transparent" placeholder="Email" type="email" style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <input name="subject" value={form.subject} onChange={handleChange} className="rounded-md border p-3 bg-transparent md:col-span-2" placeholder="Subject" style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <textarea name="message" value={form.message} onChange={handleChange} className="rounded-md border p-3 bg-transparent md:col-span-2 min-h-[140px]" placeholder="Message" style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <div className="md:col-span-2 flex items-center gap-3">
                    <button type="submit" disabled={submitting} className="btn-hover rounded-md px-4 py-2 font-medium shadow-sm cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>
                        {submitting ? "Gönderiliyor..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    </section>
    )

}