import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import svelte from "@astrojs/svelte";


export default defineConfig({
    site: "https://meme.sh/",
    experimental: {
      viewTransitions: true
     },
    integrations: [
      sitemap({
        customPages: [
          "https://app.meme.sh/#/",
          "https://app.meme.sh/",
        ],
      }),
  
      //  React
      react({ experimentalReactChildren: true }),
      //  Post-Build -> Compress
      //compress(),
      //  Prefetch
      prefetch({
        throttle: 3,
      }),
      tailwind(),
  
      partytown({
        // dataLayer.push as a forwarding-event.
        config: {
          forward: ["dataLayer.push"],
        },
      }),
      // Svelte
      svelte(),
    ],
    //  Vite
    vite: {
      plugins: [],
      ssr: {
        //external: ["@11ty/eleventy-img", "svgo"],
        //external: ["@11ty/eleventy-img"]
      },
      // build: {
      //   rollupOptions: {
      //     output: {
      //       entryFileNames: 'entry.[hash].js',
      //       chunkFileNames: 'chunks/chunk.[hash].js',
      //       assetFileNames: 'assets/asset.[hash][extname]',
      //     },
      //   },
      // },
    },
  });