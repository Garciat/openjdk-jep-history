import * as zod from "@zod/zod";

import { JepIndexItemStateDeltaSchema } from "@/lib/openjdk-jep/types.ts";

export const JepHistorySchema = zod.array(JepIndexItemStateDeltaSchema);

export type JepHistory = zod.infer<typeof JepHistorySchema>;
