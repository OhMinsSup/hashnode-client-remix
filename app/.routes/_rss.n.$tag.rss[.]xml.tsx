import { Buffer } from "node:buffer";

// utils
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;
  const rssString = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
        <title>Hashnode</title>
        <link>${domain}</link>
        <description>Find posts from the Hashnode network</description>
        <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <item>
            <title>Example Post</title>
            <link>${domain}/example-post</link>
            <description>This is an example post</description>
            <pubDate>${new Date().toUTCString()}</pubDate>
        </item>
        </channel>
    </rss>
    `.trim();

  return new Response(rssString, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(rssString)),
    },
  });
};
