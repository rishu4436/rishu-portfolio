import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rishu4436.vercel.app"),
  title: "Rishu Kumar Gupta — Blockchain Developer & AI Builder",
  description:
    "Blockchain developer & AI builder from Gopalganj, Bihar, India. Genesis ranked 2nd on Track 1 at BNB Hack: AI Trading Agent Edition (BNB Chain × CMC × Trust Wallet).",
  openGraph: {
    title: "Rishu Kumar Gupta — Blockchain Developer & AI Builder",
    description:
      "Genesis: 2nd place Track 1 — Autonomous Trading Agents. Official BNB Chain winners announcement.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/og.png",
        width: 1200,
        height: 630,
        alt: "Rishu Kumar Gupta — Genesis 2nd Track 1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishu Kumar Gupta — Blockchain Developer & AI Builder",
    description:
      "Genesis · 2nd Track 1 · BNB Hack AI Trading Agent Edition. LitVM · OPN · AI agents.",
    creator: "@rishabh4436",
    images: ["/og/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
