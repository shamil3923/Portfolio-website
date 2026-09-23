import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Mohamed Shamil - AI/ML Engineer building agentic systems and LLM applications, and researching hybrid LLM–HRM reasoning for interpretable mathematical problem solving.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.domain),
  title: {
    default: `${profile.name} - AI/ML Engineer`,
    template: `%s - ${profile.name}`,
  },
  description,
  keywords: [
    "AI/ML Engineer",
    "Agentic AI",
    "LLM",
    "Multi-agent systems",
    "Hierarchical Reasoning Model",
    "Machine Learning",
    "Mohamed Shamil",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.domain,
    title: `${profile.name} - AI/ML Engineer`,
    description,
    siteName: `${profile.name} · Portfolio`,
    // TODO: add a real 1200x630 OG image at /public/og.png
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - AI/ML Engineer`,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
