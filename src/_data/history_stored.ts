import { JepIndexItemStateDelta } from "lib/openjdk-jep/types.ts";

import { SiteConfig } from "../_includes/config.ts";
import { JepHistoryJsonCodec } from "../_includes/types.ts";

export default await (async () => {
  const res = await fetch(
    new URL(SiteConfig.storedHistoryPath, SiteConfig.baseUrl),
  );

  if (!res.ok || !res.body) {
    console.log(`did not fetch stored history`);
    return { data: [] };
  }

  const data = JepHistoryJsonCodec.decode(await res.text());

  return { data };
})() satisfies JepPageData["history_stored"];

declare global {
  interface JepPageData {
    history_stored: {
      data: JepIndexItemStateDelta[];
    };
  }
}
