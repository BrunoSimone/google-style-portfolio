import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Close } from "@/components/Close";
import { Backdrop } from "@/components/bg/Backdrop";
import { Loader } from "@/components/Loader";
import { SiteBar } from "@/components/SiteBar";
import "./globals.css";

const mona = localFont({
  src: "../fonts/MonaSans-var.woff2",
  variable: "--font-mona",
  weight: "400 800",
  display: "swap",
  preload: true,
});

const martian = localFont({
  src: "../fonts/MartianMono-var.woff2",
  variable: "--font-martian",
  weight: "400 600",
  display: "swap",
  preload: true,
});

const siteUrl = "https://www.brunosimone.dev";
const title = "Bruno Simone · Video editor";
const description =
  "Video editor. Every project gets a style of its own (grade, type, subtitles, sound), held in every piece, with the decisions behind it explained.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Bruno Simone" },
  description,
  alternates: { canonical: "/" },
  applicationName: "Bruno Simone",
  authors: [{ name: "Bruno Simone", url: siteUrl }],
  creator: "Bruno Simone",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Bruno Simone",
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mona.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bruno Simone",
              url: siteUrl,
              jobTitle: "Video editor",
              homeLocation: { "@type": "Place", name: "Mar del Plata, Argentina" },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Loader />
        <Backdrop />
        <SiteBar />
        <main id="main">{children}</main>
        <Close />
        {/* the line to /web (AlsoWeb) is hidden until /web is reworked (Bruno, 25/11) */}
      </body>
    </html>
  );
}
