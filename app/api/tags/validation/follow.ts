import { z } from "zod";

export const tagFollowSchema = z.object({
  tag: z.string(),
});

export type TagFollowBody = z.infer<typeof tagFollowSchema>;
