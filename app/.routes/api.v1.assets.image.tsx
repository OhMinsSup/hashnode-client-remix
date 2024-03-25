// @ts-expect-error - no types for this package
import mimeFromBuffer from "mime-tree";
import { MemoryCache } from "~/.server/utils/memory-cache.server";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

interface SearchParams {
  url: string;
}

const cache = new MemoryCache({
  maxSize: 5e7,
});

const fetchResolver = async (url: string) => {
  const request = new Request(url, {
    headers: {
      accept: "image/*",
    },
  });

  const response = await fetch(request);

  if (!response.ok) {
    const error = new Error();
    error.name = "AssetImageFetchError";
    error.message = "Failed to fetch image";
    throw error;
  }

  const arrBuff = await response.arrayBuffer();

  if (!arrBuff || arrBuff.byteLength < 2) {
    const error = new Error();
    error.name = "AssetImageFetchError";
    error.message = "Invalid image retrieved from resolver";
    throw error;
  }

  const buffer = new Uint8Array(arrBuff);
  const contentType = response.headers.get("content-type") as unknown as string;

  return {
    buffer,
    contentType,
  };
};

const imageResponse = (
  file: Uint8Array,
  status: number,
  contentType: string,
  cacheControl: string
): Response => {
  return new Response(file, {
    status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const defaultCacheControl = `public, max-age=${60 * 60 * 24 * 365}`;
  const defaultContentType = "image/png";

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (!url) {
      const error = new Error();
      error.name = "AssetImageFetchError";
      error.message = "Invalid query";
      throw error;
    }

    if (cache && cache.has(url)) {
      const cacheValue = cache.get(url);

      if (cacheValue) {
        const cacheImg = cacheValue;
        const inputContentType = mimeFromBuffer(cacheImg);
        // 이미지 타입이 아닌 경우 실패처리
        if (!inputContentType?.startsWith("image")) {
          const error = new Error();
          error.name = "AssetImageFetchError";
          error.message = "Invalid image retrieved from cache";
          throw error;
        }

        return imageResponse(
          cacheImg,
          200,
          inputContentType ?? defaultContentType,
          defaultCacheControl
        );
      }
    }

    const { buffer, contentType } = await fetchResolver(url);

    if (cache) {
      cache.set(url, buffer);
    }

    return imageResponse(buffer, 200, contentType, defaultCacheControl);
  } catch (error) {
    return imageResponse(
      new Uint8Array(0),
      500,
      defaultContentType,
      "no-store"
    );
  }
};

export type Loader = typeof loader;

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams();
    for (const key in searchParams) {
      query.append(key, searchParams[key as keyof SearchParams]);
    }
    if (query.toString()) {
      return `/api/v1/assets/image?${query.toString()}`;
    }
  }
  return "/api/v1/assets/image";
};
