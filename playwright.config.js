// playwright.config.ts
import { defineConfig } from "@playwright/test";
 
export default defineConfig({
  testDir: "./tests",
  timeout: 90_000,
  expect:{timeout:10_000},
  use: {
    baseURL : "https://www.goindigo.in/",
    browserName: "chromium",
    channel: "chrome",
    headless: false,
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "off",
    trace: "retain-on-failure",
    actionTimeout: 60000,
    viewport: null,
    launchOptions: {
          args: [
            "--start-maximized", // Launch Chrome maximized
            "--deny-permission-prompts",
            "--disable-device-discovery-notifications",
            "--disable-notifications",
            "--disable-infobars",
            "--disable-features=LocalNetworkAccessChecks",
            "--disable-features=LocalNetworkAccessPopups",
            "--disable-features=LocalNetworkAccessPermission",
            "--disable-print-preview",
            "--disable-popup-blocking",
            "--disable-blink-features=AutomationControlled",
            "--remote-allow-origins=*",
            "--disable-features=LocalNetworkAccess",
            "--incognito",
            "--disable-geolocation",
            "--disable-gpu",
            "--no-sandbox",
          ],
        },
  },
 
  // reporter: [
  //   ["list"],
  //   ["html", { open: "never", outputFolder: "playwright-report" }],
  //   ["junit", { outputFile: "reports/junit/results.xml" }],
  //   ["json", { outputFile: "reports/json/results.json" }],
  //   // Allure reporter
  //   ["allure-playwright", { resultsDir: "allure-results" }],
  // ],
 
  // Single Chrome project
  projects: [
    {
      name: "chrome",
    },
  ],
});
 