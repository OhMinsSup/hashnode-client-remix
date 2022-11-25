import type { LoaderFunction } from "@remix-run/cloudflare";
import type { Resolver } from "remix-image/serverPure";
import {
  imageLoader,
  MemoryCache,
  kvResolver,
  fetchResolver,
  mB,
} from "remix-image/serverPure";
import { wasmTransformer } from "remix-image-wasm";

const SELF_URL = "http://localhost:8787";

// const whitelistedDomains = new Set([SELF_URL, "i.imgur.com"]);

export const resolver: Resolver = async (asset, url, options, basePath) => {
  if (asset.startsWith("/") && (asset.length === 1 || asset[1] !== "/")) {
    return kvResolver(asset, url, options, basePath);
  } else {
    console.log("fetchResolver", new URL(url).host);

    return fetchResolver(asset, url, options, basePath);
  }
};

const config = {
  selfUrl: SELF_URL,
  cache: new MemoryCache({
    maxSize: mB(50),
  }),
  resolver: resolver,
  transformer: wasmTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  console.log("loader", request.url);
  return imageLoader(config, request);
};
