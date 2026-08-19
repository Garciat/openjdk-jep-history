import { JepIndex, readJepIndex } from "lib/openjdk-jep/index.ts";
import { timed } from "lib/timed.ts";

const index = await timed(readJepIndex());

console.log(
  `fetched OpenJDK JEP index in ${index.duration.total("milliseconds")}ms`,
);

export default index.value satisfies JepPageData["index"];

declare global {
  interface JepPageData {
    index: JepIndex;
  }
}
