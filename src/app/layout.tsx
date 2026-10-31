import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

// Both fonts are stored in the project: next/font/google failed under Turbopack in dev,
// and local files also keep builds independent of Google Fonts being reachable.
const head = localFont({ src: "./fonts/unbounded-latin.woff2", weight: "200 900", variable: "--font-head", display: "swap" });
const body = localFont({ src: "./fonts/space-grotesk-latin.woff2", weight: "300 700", variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: "/",
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#020817", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
