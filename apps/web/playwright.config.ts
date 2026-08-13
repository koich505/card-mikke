import { defineConfig, devices } from "@playwright/test";

const testPort = process.env.CARD_MIKKE_TEST_PORT ?? "3000";
const testBaseUrl = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests",
  outputDir: "/private/tmp/card-mikke-playwright-results",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: testBaseUrl,
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
    command: `npm run dev -- --hostname 127.0.0.1 --port ${testPort}`,
    url: `${testBaseUrl}/cards/everyday-plus`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
