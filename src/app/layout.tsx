import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { LanguageProvider } from "@/i18n/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const siteUrl = "https://www.brunosimone.dev";
const title = "Bruno Simone";
const description = "Bruno Simone, Full-Stack Developer Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: title,
    title,
    description,
    locale: "es_AR",
    images: [
      { url: "/bruno.jpeg", width: 960, height: 1280, alt: "Bruno Simone" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/bruno.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
