import { unstable_defineLoader as defineLoader } from '@remix-run/cloudflare';

export const loader = defineLoader(({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email') ?? undefined;
  return {
    email,
  };
});

export type RoutesLoaderData = typeof loader;
