import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
      env: { node: true },
      parserOptions: { ecmaVersion: "latest" }
    },
    ignorePatterns: ["node_modules/", "dist/", "coverage/"]
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }
  }
]); 