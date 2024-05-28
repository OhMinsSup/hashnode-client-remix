import {
  unstable_defineLoader as defineLoader,
  json,
} from '@remix-run/cloudflare';

export const loader = defineLoader(async ({ request, context }) => {
  return json({ hello: 'world' });
});

export type RoutesLoaderData = typeof loader;
