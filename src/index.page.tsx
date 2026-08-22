import { SiteConfig } from "./_includes/config.ts";

const formatTimestamp = (ts: Temporal.Instant) =>
  ts.toZonedDateTimeISO("utc")
    .toLocaleString(
      "en",
      { dateStyle: "medium", timeStyle: "long", hourCycle: "h24" },
    );

export default (
  data: Lume.Data<JepPageData>,
  h: Lume.Helpers,
) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />

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
            <a href={h.url("/feed.xml")}>/feed.xml</a>
          </li>
        </ul>
        <dl>
          <dt>Last JEP Index timestamp</dt>
          <dd>
            {formatTimestamp(data.index.parsed.metadata.updated)}
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
};
