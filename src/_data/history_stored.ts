import { JepIndexItemStateDelta } from "lib/openjdk-jep/types.ts";

import { SiteConfig } from "../_includes/config.ts";
import { JepHistoryJsonCodec } from "../_includes/types.ts";

const override: JepIndexItemStateDelta[] | undefined = [
  {
    "item": {
      "category": "???",
      "type": "process",
      "state": "draft",
      "jep": "8390768",
      "title": "Integrate BSD port into OpenJDK Mainline",
      "url": new URL("https://openjdk.org/jeps/8390768"),
    },
    "updated": Temporal.Instant.from("2026-08-20T12:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "closed",
      "release": "27",
      "jep": "523",
      area: "hotspot",
      component: "gc",
      "title": "Make G1 the Default Garbage Collector in All Environments",
      "url": new URL("https://openjdk.org/jeps/523"),
    },
    "updated": Temporal.Instant.from("2026-08-19T13:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "closed",
      "release": "27",
      "jep": "531",
      area: "core",
      component: "lang",
      "title": "Lazy Constants (Third Preview)",
      "url": new URL("https://openjdk.org/jeps/531"),
    },
    "updated": Temporal.Instant.from("2026-08-19T07:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "closed",
      "release": "27",
      "jep": "533",
      area: "core",
      "title": "Structured Concurrency (Seventh Preview)",
      "url": new URL("https://openjdk.org/jeps/533"),
    },
    "updated": Temporal.Instant.from("2026-08-19T06:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "proposed-to-target",
      "release": "28",
      "jep": "542",
      area: "security",
      component: "security",
      "title": "PEM Encodings of Cryptographic Objects",
      "url": new URL("https://openjdk.org/jeps/542"),
    },
    "updated": Temporal.Instant.from("2026-08-19T05:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "closed",
      "release": "27",
      "jep": "537",
      area: "core",
      "title": "Vector API (Twelfth Incubator)",
      "url": new URL("https://openjdk.org/jeps/537"),
    },
    "updated": Temporal.Instant.from("2026-08-19T02:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "closed",
      "release": "27",
      "jep": "536",
      area: "hotspot",
      component: "jfr",
      "title": "JFR In-Process Data Redaction",
      "url": new URL("https://openjdk.org/jeps/536"),
    },
    "updated": Temporal.Instant.from("2026-08-18T21:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "targeted",
      "release": "28",
      "jep": "540",
      area: "core",
      "title": "Simple JSON API (Incubator)",
      "url": new URL("https://openjdk.org/jeps/540"),
    },
    "updated": Temporal.Instant.from("2026-08-17T20:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "proposed-to-target",
      "release": "28",
      "jep": "541",
      "title": "Deprecate the macOS/x64 Port for Removal",
      "url": new URL("https://openjdk.org/jeps/541"),
    },
    "updated": Temporal.Instant.from("2026-08-13T23:32:00Z"),
  },
  {
    "item": {
      "category": "???",
      "type": "feature",
      "state": "closed",
      "release": "27",
      "jep": "534",
      area: "hotspot",
      component: "runtime",
      "title": "Compact Object Headers by Default",
      "url": new URL("https://openjdk.org/jeps/534"),
    },
    "updated": Temporal.Instant.from("2026-08-11T19:32:00Z"),
  },
];

export default await (async () => {
  if (override !== undefined) {
    return { data: override };
  }

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
