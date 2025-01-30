import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

/**
 * @type {import("vite").UserConfig}
 */
export default {
  base: "https://oliversalzburg.github.io/substrate/",
  build: {
    modulePreload: {
      polyfill: false,
    },
    outDir: "_site",
  },
  plugins: [createHtmlPlugin(), viteSingleFile()],
};
