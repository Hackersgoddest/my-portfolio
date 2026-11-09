// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://frankoppongkonadu.netlify.app",
  // Downloaded at build time and served from this site.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Ga Maamli",
      cssVariable: "--font-ga-maamli",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Impact", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Hanken Grotesk",
      cssVariable: "--font-hanken",
      weights: [400, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "DM Mono",
      cssVariable: "--font-dm-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  vite: {
    // Brand icons (Remix Icon set) are compiled into Astro components at build time.
    plugins: [tailwindcss(), Icons({ compiler: "astro" })],
  },
});
