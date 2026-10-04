import { defineConfig } from "vite";

/// <reference types="vitest/config" />
export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
