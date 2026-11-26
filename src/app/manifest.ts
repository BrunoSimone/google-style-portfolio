import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bruno Simone · Video editor",
    short_name: "Bruno Simone",
    description: "Video editing for creators.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    // the B over the site's dither ground, rendered by scripts/brand/render-icons.mjs
    icons: [
      { src: "/icon2.png", sizes: "192x192", type: "image/png" },
      { src: "/icon3.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
