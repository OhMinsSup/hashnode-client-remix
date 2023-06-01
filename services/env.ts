import { z } from "zod";

export const EnvSchema = z.object({
  COOKIE_SESSION_SECRET: z.string().min(1),
  API_BASE_URL: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;