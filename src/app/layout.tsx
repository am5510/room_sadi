import type { Metadata } from "next";
import { Inter, Manrope, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "ตารางจองห้อง สพต.",
  description: "Space as a premium commodity. An architectural approach to room management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable} ${notoThai.variable} antialiased selection:bg-primary-fixed-dim selection:text-primary`}>
        <Navbar />
        <main className="min-h-screen bg-surface p-8 pt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
