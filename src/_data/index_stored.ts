import { JepIndex } from "lib/openjdk-jep/index.ts";

import { SiteConfig } from "../_includes/config.ts";

export default await (async () => {
  const res = await fetch(
    new URL(SiteConfig.storedIndexPath, SiteConfig.baseUrl),
  );

  if (!res.ok || !res.body) {
    console.log(`did not fetch stored index`);
    return { data: undefined };
  }

  // TODO parse from schema
  const data = await res.json() as JepIndex;

  return { data };
})() satisfies JepPageData["index_stored"];

declare global {
  interface JepPageData {
    index_stored: {
      data: JepIndex | undefined;
    };
  }
}
