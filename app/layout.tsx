import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel, Merriweather } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dua Mata Dunia: Romawi vs Persia",
  description: "Sebuah perjalanan interaktif menelusuri 700 tahun persaingan, tragedi, dan kehancuran bersama di jantung Timur Tengah.",
  keywords: ["Romawi", "Persia", "Sejarah", "Web Story", "Interactive History", "Carrhae", "Valerian", "Sassanid", "Byzantine"],
  authors: [{ name: "Antigravity" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${merriweather.variable} h-full antialiased bg-neutral-950 text-neutral-100`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">{children}</body>
    </html>
  );
}
