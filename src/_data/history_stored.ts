import { JepIndexItemStateDelta } from "lib/openjdk-jep/index.ts";

import { SiteConfig } from "../_includes/config.ts";

export default await (async () => {
  const res = await fetch(
    new URL(SiteConfig.storedHistoryPath, SiteConfig.baseUrl),
  );

  if (!res.ok || !res.body) {
    console.log(`did not fetch stored history`);
    return { data: [] };
  }

  // TODO parse from schema
  const data = await res.json() as JepIndexItemStateDelta[];

  return { data };
})() satisfies JepPageData["history_stored"];

declare global {
  interface JepPageData {
    history_stored: {
      data: JepIndexItemStateDelta[];
    };
  }
}
