import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        success: resolve(__dirname, "src/checkout/success.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        contact: resolve(__dirname, "src/contact/index.html"),
        thanks: resolve(__dirname, "src/thanks/index.html"),
        product_list: resolve(__dirname, "src/product-list/index.html"),
      },
    },
  },
});
