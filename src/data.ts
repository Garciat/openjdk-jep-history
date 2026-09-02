import { JepIndexSchema } from "@/lib/openjdk-jep/types.ts";
import {
  computeStateDelta,
  fetchJepIndex,
  parseJepIndex,
} from "@/lib/openjdk-jep/index.ts";
import { timeLogged } from "@/lib/timed.ts";

import { SiteConfig } from "./config.ts";
import { JepHistorySchema } from "./types.ts";

export async function fetchAll() {
  const currentIndex = parseJepIndex(
    await timeLogged(
      "fetch OpenJDK JEP index",
      fetchJepIndex(),
    ),
  );

  const storedIndex = await timeLogged(
    "fetch stored index",
    fetchStoredIndex(),
  );

  const storedHistory = await timeLogged(
    "fetch stored history",
    fetchStoredHistory(),
  );

  const delta = Array.from(computeStateDelta(storedIndex, currentIndex));

  if (delta.length > SiteConfig.historyAnomalyLength) {
    throw new Error(
      `history anomaly detected: delta bigger than ${SiteConfig.historyAnomalyLength} items`,
    );
  }

  const history = [...delta, ...storedHistory];

  return {
    currentIndex,
    history,
  };
}

async function fetchStoredHistory() {
  const res = await fetch(
    new URL(SiteConfig.storedHistoryPath, SiteConfig.baseUrl),
  );

  if (!res.ok || !res.body) {
    console.log(`did not fetch stored history`);
    return [];
  }

  return JepHistorySchema.decode(await res.json());
}

async function fetchStoredIndex() {
  const res = await fetch(
    new URL(SiteConfig.storedIndexPath, SiteConfig.baseUrl),
  );

  if (!res.ok || !res.body) {
    console.log(`did not fetch stored index`);
    return undefined;
  }

  return JepIndexSchema.decode(await res.json());
}
