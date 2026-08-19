import {
  computeStateDelta,
  JepIndexItemStateDelta,
} from "lib/openjdk-jep/index.ts";

export default function computeHistory(
  { index, index_stored, history_stored }: Lume.Data<JepPageData>,
): JepIndexItemStateDelta[] {
  const delta = Array.from(computeStateDelta(index_stored.data, index));

  const history = [...delta, ...history_stored.data];

  return history.slice(0, 50);
}
