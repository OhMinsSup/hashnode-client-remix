import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.tag.getTags(request);
  return json(response);
};

/**
 * @deprecated
 */
export type RoutesLoader = typeof loader;

/**
 * @deprecated
 */
export const getPath = (params?: Record<string, any>) => {
  const _base = "/loader/tags.json";
  if (params) {
    const _params = new URLSearchParams(params);
    return `${_base}?${_params.toString()}`;
  }
  return _base;
};
