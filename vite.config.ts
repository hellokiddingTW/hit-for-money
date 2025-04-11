import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";
import svgr from "vite-plugin-svgr";
import path from "node:path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    macrosPlugin(),
    react({
      babel: {
        plugins: [
          "babel-plugin-macros",
          [
            "@emotion/babel-plugin-jsx-pragmatic",
            {
              export: "jsx",
              import: "__cssprop",
              module: "@emotion/react",
            },
          ],
          [
            "@emotion/babel-plugin",
            {
              autoLabel: "dev-only", // 自動為組件添加 displayName（僅在開發環境）
              labelFormat: "[local]", // 設置 displayName 格式（[local] 表示使用組件名稱）
            },
          ],
          [
            "@babel/plugin-transform-react-jsx",
            { pragma: "__cssprop" },
            "twin.macro",
          ],
        ],
      },
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
