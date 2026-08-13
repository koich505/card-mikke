import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "/private/tmp/card-mikke-playwright-results",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3103",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"], channel: "chrome" },
    },
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3103",
    url: "http://127.0.0.1:3103/cards/everyday-plus",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
