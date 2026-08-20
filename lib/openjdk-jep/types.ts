import * as zod from "@zod/zod";

// JEP Type

const JepTypeShorthandValues = [
  "P",
  "I",
  "F",
  "S",
] as const;

const JepTypeValues = [
  "process",
  "informational",
  "feature",
  "infrastructure",
] as const;

{
  // assert that both lists have the same length
  const _: typeof JepTypeShorthandValues.length = JepTypeValues.length;
}

const JepTypeShorthandSchema = zod.literal(JepTypeShorthandValues);

type JepTypeShorthand = (typeof JepTypeShorthandValues)[number];

export const JepTypeSchema = zod.literal(JepTypeValues);

export type JepType = (typeof JepTypeValues)[number];

export const JepTypeShorthandCodec = zod.codec(
  JepTypeShorthandSchema,
  JepTypeSchema,
  {
    decode: (value) => JepTypeValues[JepTypeShorthandValues.indexOf(value)],
    encode: (value) => JepTypeShorthandValues[JepTypeValues.indexOf(value)],
  },
);

// JEP State

const JepStateShorthandValues = [
  "Dra",
  "Sub",
  "Can",
  "Pro",
  "Tar",
  "Int",
  "Clo",
  "Com",
  "Act",
] as const;

const JepStateValues = [
  "draft",
  "submitted",
  "candidate",
  "proposed-to-target",
  "targeted",
  "integrated",
  "closed",
  "completed",
  "active",
] as const;

{
  const _: typeof JepStateShorthandValues.length = JepStateValues.length;
}

const JepStateShorthandSchema = zod.literal(JepStateShorthandValues);

type JepStateShorthand = (typeof JepStateShorthandValues)[number];

export const JepStateSchema = zod.literal(JepStateValues);

export type JepState = (typeof JepStateValues)[number];

export const JepStateShorthandCodec = zod.codec(
  JepStateShorthandSchema,
  JepStateSchema,
  {
    decode: (value) => JepStateValues[JepStateShorthandValues.indexOf(value)],
    encode: (value) => JepStateShorthandValues[JepStateValues.indexOf(value)],
  },
);

// Generic

const TemporalInstantIso8601Codec = zod.codec(
  zod.string(),
  zod.instanceof(Temporal.Instant),
  {
    decode: (value) => Temporal.Instant.from(value),
    encode: (instant) => instant.toString(),
  },
);

const UrlCodec = zod.codec(
  zod.string(),
  zod.instanceof(URL),
  {
    decode: (value) => new URL(value),
    encode: (url) => url.toString(),
  },
);

// JEP

export const JepIndexMetadataSchema = zod.object({
  created: TemporalInstantIso8601Codec,
  updated: TemporalInstantIso8601Codec,
});

export type JepIndexMetadata = zod.infer<typeof JepIndexMetadataSchema>;

export const JepIndexItemSchema = zod.object({
  category: zod.string(),
  type: JepTypeSchema,
  state: JepStateSchema,
  area: zod.optional(zod.string()),
  component: zod.optional(zod.string()),
  release: zod.optional(zod.string()),
  jep: zod.string(),
  title: zod.string(),
  url: UrlCodec,
});

export type JepIndexItem = zod.infer<typeof JepIndexItemSchema>;

export const JepIndexSchema = zod.object({
  metadata: JepIndexMetadataSchema,
  items: zod.array(JepIndexItemSchema),
});

export type JepIndex = zod.infer<typeof JepIndexSchema>;

export const JepIndexItemStateDeltaSchema = zod.object({
  // undefined if new item
  previousState: zod.optional(JepStateSchema),

  item: JepIndexItemSchema,

  // actually just a guess
  updated: TemporalInstantIso8601Codec,
});

export type JepIndexItemStateDelta = zod.infer<
  typeof JepIndexItemStateDeltaSchema
>;
