// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://frankoppongkonadu.netlify.app",
  integrations: [vue()],
  vite: {
    // Brand icons (Remix Icon set) are compiled into plain Vue components at
    // build time - no icon font or runtime icon library ships to the browser.
    plugins: [tailwindcss(), Icons({ compiler: "vue3" })],
  },
});
