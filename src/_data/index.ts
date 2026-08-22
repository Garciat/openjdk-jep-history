import { fetchJepIndex, parseJepIndex } from "lib/openjdk-jep/index.ts";
import { JepIndex } from "lib/openjdk-jep/types.ts";
import { timed } from "lib/timed.ts";

const source = await timed(fetchJepIndex());

console.log(
  `fetched OpenJDK JEP index in ${source.duration.total("milliseconds")}ms`,
);

const index = parseJepIndex(source.value);

export default {
  source: source.value,
  parsed: index,
} satisfies JepPageData["index"];

declare global {
  interface JepPageData {
    index: {
      source: string;
      parsed: JepIndex;
    };
  }
}
