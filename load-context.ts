import { type AppLoadContext } from '@remix-run/cloudflare';
import { type ConsolaInstance } from 'consola';
import { type PlatformProxy } from 'wrangler';

import { HashnodeAgent } from './app/services/api/hashnode-agent';
import { logger } from './app/services/libs/logger';

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    env: Env;
    agent: HashnodeAgent;
    logger: ConsolaInstance;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare };
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const { cloudflare } = context;
  const bindings = cloudflare.env;

  const agent = new HashnodeAgent({
    service: bindings.API_BASE_URL,
    prefix: '/api/v1',
  });

  return {
    ...context,
    env: bindings,
    agent,
    logger,
  };
};
