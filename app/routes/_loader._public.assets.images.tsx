import { json } from "@remix-run/cloudflare";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  context.services.images.imagesLoader(request);
  return json({ message: "Hello World" });
};

export type Loader = typeof loader;

export const getPath = () => `/assets/images`;
