export async function timed<T>(promise: Promise<T>) {
  const start = performance.now();
  const value = await promise;
  const end = performance.now();
  return {
    value,
    duration: Temporal.Duration.from({
      microseconds: Math.round(1_000 * (end - start)),
    }),
  };
}
