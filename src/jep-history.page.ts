import { SiteConfig } from "./_includes/config.ts";
import computeHistory from "./_includes/history.ts";

export default function* (
  data: Lume.Data<JepPageData>,
): Generator<Partial<Lume.Data>> {
  const history = computeHistory(data);

  yield {
    url: SiteConfig.storedHistoryPath,
    content: JSON.stringify(history),
  };
}
