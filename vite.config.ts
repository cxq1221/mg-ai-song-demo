import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // 使用相对路径，支持直接打开 HTML 文件
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // 生产环境启用单文件插件，将所有资源内联到 HTML
    mode === "production" && viteSingleFile(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 单文件模式下，确保资源内联
    assetsInlineLimit: 100000000, // 将所有资源内联（100MB 限制）
    cssCodeSplit: false, // 禁用 CSS 代码分割，合并到一个文件
  },
}));
