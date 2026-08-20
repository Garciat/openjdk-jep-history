export default (
  _page: Lume.Data,
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
          and publishes a feed that contains individual JEP updates.
        </p>
        <ul>
          <li>
            <a href={h.url("/feed.xml")}>/feed.xml</a>
          </li>
        </ul>
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
