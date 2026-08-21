import { computeStateDelta } from "lib/openjdk-jep/index.ts";

import { JepHistory } from "./types.ts";
import { SiteConfig } from "./config.ts";

export default function computeHistory(
  { index, index_stored, history_stored }: Lume.Data<JepPageData>,
): JepHistory {
  const delta = Array.from(computeStateDelta(index_stored.data, index));

  const history = [...delta, ...history_stored.data];

  return history.slice(0, SiteConfig.historyLength);
}
