import { type PlatformProxy } from "wrangler";
import { type AppLoadContext } from "@remix-run/cloudflare";
import { HashnodeAgent } from "./app/services/agent";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    env: Env;
    api: HashnodeAgent;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare };
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const api = new HashnodeAgent({
    service: context.cloudflare.env.API_BASE_URL,
    prefix: "/v1",
  });

  return {
    ...context,
    env: context.cloudflare.env,
    api,
  };
};
