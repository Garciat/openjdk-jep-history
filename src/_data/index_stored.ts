import { JepIndex } from "lib/openjdk-jep/types.ts";

import { SiteConfig } from "../_includes/config.ts";
import { JepIndexJsonCodec } from "../_includes/types.ts";

export default await (async () => {
  const res = await fetch(
    new URL(SiteConfig.storedIndexPath, SiteConfig.baseUrl),
  );

  if (!res.ok || !res.body) {
    console.log(`did not fetch stored index`);
    return { data: undefined };
  }

  const data = JepIndexJsonCodec.decode(await res.text());

  return { data };
})() satisfies JepPageData["index_stored"];

declare global {
  interface JepPageData {
    index_stored: {
      data: JepIndex | undefined;
    };
  }
}
