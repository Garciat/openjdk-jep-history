import { helpers } from "deno-static/mod.ts";

import { JepIndex } from "@/lib/openjdk-jep/types.ts";

import { SiteConfig } from "../config.ts";

export const HomePage = ({ index }: { index: JepIndex }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />

      <meta name="viewport" content="width=device-width,initial-scale=1" />

      <title>OpenJDK JEP History</title>
    </head>

    <body>
      <h1>OpenJDK JEP History</h1>
      <p>
        This site tracks the{" "}
        <a href="https://openjdk.org/jeps/0">OpenJDK JEP Index</a>{" "}
        and publishes a feed that contains individual JEP updates (up to{" "}
        {SiteConfig.historyLength} items).
      </p>
      <ul>
        <li>
          <a href={helpers.url(`/${SiteConfig.feedPath}`)}>/feed.xml</a>
        </li>
      </ul>
      <dl>
        <dt>Last JEP Index timestamp</dt>
        <dd>
          {formatTimestamp(index.metadata.updated)}
        </dd>
        <dt>Fetched on</dt>
        <dd>
          {formatTimestamp(Temporal.Now.instant())}
        </dd>
      </dl>
      <p>
        Suggestions? Go to{" "}
        <a href="https://github.com/Garciat/openjdk-jep-history">
          github.com/Garciat/openjdk-jep-history
        </a>
      </p>
    </body>
  </html>
);

function formatTimestamp(ts: Temporal.Instant) {
  return ts.toZonedDateTimeISO("utc")
    .toLocaleString(
      "en",
      { dateStyle: "medium", timeStyle: "long", hourCycle: "h24" },
    );
}
