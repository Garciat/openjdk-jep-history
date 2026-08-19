import { SiteConfig } from "./_includes/config.ts";

export default function* (
  { index }: Lume.Data<JepPageData>,
): Generator<Partial<Lume.Data>> {
  yield {
    url: SiteConfig.storedIndexPath,
    content: JSON.stringify(index),
  };
}
