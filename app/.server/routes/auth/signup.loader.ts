import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const email = url.searchParams.get('email') ?? undefined;
  return {
    email,
  };
};

export type RoutesLoaderData = typeof loader;
