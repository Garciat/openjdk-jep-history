export const SiteConfig = {
  baseUrl: new URL("https://garciat.com/openjdk-jep-history/"),

  storedIndexPath: "./index.json",
  debugIndexSourcePath: "./debug/index.html",

  storedHistoryPath: "./history.json",

  historyLength: 250,
  historyAnomalyLength: 10,
} as const;
