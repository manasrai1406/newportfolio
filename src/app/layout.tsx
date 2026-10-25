import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const head = Unbounded({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-head", display: "swap" });
const body = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body", display: "swap" });

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
