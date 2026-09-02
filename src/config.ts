export const SiteConfig = {
  baseUrl: new URL("https://garciat.com/openjdk-jep-history/"),

  // TODO not exactly paths
  feedPath: "feed.xml",
  storedIndexPath: "index.json",
  storedHistoryPath: "history.json",

  historyLength: 250,
  historyAnomalyLength: 10,
} as const;
