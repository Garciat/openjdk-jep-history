import { SiteConfig } from "./_includes/config.ts";
import computeHistory from "./_includes/history.ts";
import { JepHistoryJsonCodec } from "./_includes/types.ts";

export default function* (
  data: Lume.Data<JepPageData>,
): Generator<Partial<Lume.Data>> {
  const history = computeHistory(data);

  yield {
    url: SiteConfig.storedHistoryPath,
    content: JepHistoryJsonCodec.encode(history),
  };
}
