import * as zod from "@zod/zod";

import {
  JepIndexItemStateDeltaSchema,
  JepIndexSchema,
} from "lib/openjdk-jep/types.ts";

// History

export const JepHistorySchema = zod.array(JepIndexItemStateDeltaSchema);

export type JepHistory = zod.infer<typeof JepHistorySchema>;

export const JepHistoryJsonCodec = zod.codec(
  zod.string(),
  JepHistorySchema,
  {
    decode: (value) => JSON.parse(value),
    encode: (value) => JSON.stringify(value),
  },
);

// Index

export const JepIndexJsonCodec = zod.codec(
  zod.string(),
  JepIndexSchema,
  {
    decode: (value) => JSON.parse(value),
    encode: (value) => JSON.stringify(value),
  },
);
