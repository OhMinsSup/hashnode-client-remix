import { z } from "zod";

export const EnvSchema = z.object({
  COOKIE_SESSION_SECRET: z.string().min(1),
  CSRF_SECRET: z.string().min(1),
  HONEYPOT_SECRET: z.string().min(1),
  TOAST_SECRET: z.string().min(1),
  API_BASE_URL: z.string().min(1),
  CF_ID: z.string().min(1),
  CF_API_TOKEN: z.string().min(1),
});

export type Env = z.infer<typeof EnvSchema>;

export interface RuntimeEnv {
  API_BASE_URL: Env["API_BASE_URL"];
  COOKIE_SESSION_SECRET: Env["COOKIE_SESSION_SECRET"];
  TOAST_SECRET: Env["TOAST_SECRET"];
  CSRF_SECRET: Env["CSRF_SECRET"];
  HONEYPOT_SECRET: Env["HONEYPOT_SECRET"];
  CF_ID: Env["CF_ID"];
  CF_API_TOKEN: Env["CF_API_TOKEN"];
  [key: string]: unknown;
}
