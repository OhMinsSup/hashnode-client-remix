import { decode } from 'turbo-stream';

export function decodeViaTurboStream(body: ReadableStream<Uint8Array>) {
  return decode(body);
}

export async function fetchAndDecode(url: URL | string, init?: RequestInit) {
  const res = await fetch(url, init);
  // Don't do a hard check against the header here.  We'll get `text/x-turbo`
  // when we have a running server, but if folks want to prerender `.data` files
  // and serve them from a CDN we should let them come back with whatever
  // Content-Type their CDN provides and not force them to make sure `.data`
  // files are served as `text/x-turbo`.  We'll throw if we can't decode anyway.
  if (!res.body) {
    throw new Error(`No response body to decode from URL: ${url.toString()}`);
  }

  try {
    const decoded = await decodeViaTurboStream(res.body);
    return { status: res.status, data: decoded.value };
  } catch (e) {
    console.error(e);
    throw new Error(
      `Unable to decode turbo-stream response from URL: ${url.toString()}`,
    );
  }
}
