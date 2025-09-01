"use client";

import { useState, useEffect } from "react";
import { notification } from "antd";
import en from "../locales/en.json";
import tr from "../locales/tr.json";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [api, contextHolder] = notification.useNotification();
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
                message: dict["contact.success.title"],
                description: dict["contact.success.message"],
                placement: "bottomRight",
            });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            api.error({
                message: dict["contact.error.title"],
                description: dict["contact.error.message"],
                placement: "bottomRight",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
    <section id="contact" className="section-alt">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24" style={{ fontFamily: "var(--font-oswald)" }}>
            <h2 className="text-3xl font-semibold">{dict["contact.title"]}</h2>
            {contextHolder}
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
                <input name="name" value={form.name} onChange={handleChange} className="rounded-md border p-3 bg-transparent" placeholder={dict["contact.form.name"]} style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <input name="email" value={form.email} onChange={handleChange} className="rounded-md border p-3 bg-transparent" placeholder={dict["contact.form.email"]} type="email" style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <input name="subject" value={form.subject} onChange={handleChange} className="rounded-md border p-3 bg-transparent md:col-span-2" placeholder={dict["contact.form.subject"]} style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <textarea name="message" value={form.message} onChange={handleChange} className="rounded-md border p-3 bg-transparent md:col-span-2 min-h-[140px]" placeholder={dict["contact.form.message"]} style={{ borderColor: "rgba(0,0,0,0.15)" }} required />
                <div className="md:col-span-2 flex items-center gap-3">
                    <button type="submit" disabled={submitting} className="btn-hover rounded-md px-4 py-2 font-medium shadow-sm cursor-pointer" style={{ backgroundColor: "var(--accent)", color: "var(--bg-main)" }}>
                        {submitting ? dict["contact.form.sending"] : dict["contact.form.submit"]}
                    </button>
                </div>
            </form>
        </div>
    </section>
    )

}