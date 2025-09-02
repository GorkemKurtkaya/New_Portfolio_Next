import { Geist, Geist_Mono, Roboto, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import "antd/dist/reset.css";
import Script from "next/script";



const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"]
});

export const metadata = {
  metadataBase: new URL("https://gorkemkurtkaya.up.railway.app"),
  title: {
    default: "Görkem Kurtkaya | Software Engineer",
    template: "%s | Görkem Kurtkaya",
  },
  description:
    "Backend ağırlıklı fullstack yazılım geliştirici. Node.js, NestJS, Redis, Kafka, PostgreSQL, React, Next.js, Docker ve mikroservisler.",
  applicationName: "Görkem Kurtkaya Portfolio",
  generator: "Next.js",
  keywords: [
    "Görkem Kurtkaya",
    "Software Engineer",
    "Backend Developer",
    "Fullstack",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "Redis",
    "Kafka",
    "React",
    "Next.js",
    "Docker",
    "Microservices",
  ],
  authors: [{ name: "Görkem Kurtkaya", url: "https://github.com/GorkemKurtkaya" }],
  creator: "Görkem Kurtkaya",
  publisher: "Görkem Kurtkaya",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Görkem Kurtkaya",
    title: "Görkem Kurtkaya | Software Engineer",
    description:
      "Backend odaklı fullstack geliştirici: Node.js, NestJS, Redis, Kafka, PostgreSQL, React, Next.js, Docker, mikroservisler.",
    images: [
      {
        url: "/pp.jpeg",
        width: 1200,
        height: 630,
        alt: "Görkem Kurtkaya",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxVideoPreview: -1,
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.ico", rel: "icon" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/icons/favicon.ico" },
      { rel: "android-chrome", url: "/icons/android-chrome-192x192.png" },
      { rel: "android-chrome", url: "/icons/android-chrome-512x512.png" },
    ],
    shortcut: ["/icons/favicon.ico"],
  },
  manifest: "/icons/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1724" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Görkem Kurtkaya",
            jobTitle: "Software Engineer",
            description:
              "Backend odaklı fullstack geliştirici. Node.js, NestJS, Redis, Kafka, PostgreSQL, React, Next.js, Docker ve mikroservisler.",
            url: "https://gorkemkurtkaya.up.railway.app",
            email: "mailto:gorkem.kurtkaya@yahoo.com",
            telephone: "+90-543-232-1715",
            sameAs: [
              "https://www.linkedin.com/in/gorkem-kurtkaya/",
              "https://github.com/GorkemKurtkaya",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "İzmir",
              addressCountry: "TR",
            },
            image: "/pp.jpeg",
          })}
        </Script>
      </head>
      <body
        className={` ${oswald.className} ${oswald.variable} antialiased font-medium`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
