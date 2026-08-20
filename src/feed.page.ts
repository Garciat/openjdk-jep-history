import * as XML from "@std/xml";

import { formatRssFeed, RssFeed, RssItem } from "lib/rss.ts";
import { JepIndexItem } from "lib/openjdk-jep/types.ts";

import computeHistory from "./_includes/history.ts";

export default function* (
  data: Lume.Data<JepPageData>,
): Generator<Partial<Lume.Data>> {
  const history = computeHistory(data);

  const feed = {
    channels: [{
      title: "OpenJDK JEP Updates",
      link: new URL("https://openjdk.org/jeps/0"),
      description: "Provided by https://github.com/Garciat/openjdk-jep-history",
      lastBuildDate: Temporal.Now.instant(),
      items: history.map((record) => ({
        title: formatTitle(record.item),
        link: record.item.url,
        pubDate: record.updated,
      } satisfies RssItem)),
    }],
  } satisfies RssFeed;

  yield {
    url: "./feed.xml",
    content: XML.stringify(formatRssFeed(feed), {
      declaration: true,
      indent: "  ",
    }),
  };
}

function formatTitle(item: JepIndexItem): string {
  return `JEP ${item.jep} ${formatState(item)}: ${item.title}`;
}

function formatState(item: JepIndexItem): string {
  switch (item.state) {
    case "draft":
      return "was drafted";
    case "submitted":
      return "was submitted";
    case "candidate":
      return "moved to candidate";
    case "proposed-to-target":
      return `proposed to target JDK ${item.release ?? "next"}`;
    case "targeted":
      return `updated to target JDK ${item.release ?? "next"}`;
    case "integrated":
      return `integrated to target JDK ${item.release ?? "??"}`;
    case "closed":
      return item.release
        ? `delivered to JDK ${item.release}`
        : `was withdrawn`;
    case "completed":
      return "is now complete";
    case "active":
      return "is now active";
  }
}
