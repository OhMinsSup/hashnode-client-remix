import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { AuthService } from "./services/auth";
import { EnvSchema } from "./services/env";

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    const env = EnvSchema.parse(context.env);
    return {
      ...context.env,
      services: {
        auth: new AuthService(context.env.auth, env),
      },
    };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
