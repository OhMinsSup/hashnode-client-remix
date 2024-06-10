/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.server
 */

import type {
  AppLoadContext,
  EntryContext,
  HandleDataRequestFunction,
  // HandleErrorFunction,
} from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import { cors } from 'remix-utils/cors';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadContext: AppLoadContext,
) {
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  return cors(
    request,
    new Response(body, {
      headers: responseHeaders,
      status: responseStatusCode,
    }),
  );
}

export const handleDataRequest: HandleDataRequestFunction = async (
  response,
  { request },
) => {
  return await cors(request, response);
};

// export const handleError: HandleErrorFunction = (
//   error: unknown,
//   { context, request },
// ) => {
//   // Skip capturing if the request is aborted as Remix docs suggest
//   // Ref: https://remix.run/docs/en/main/file-conventions/entry.server#handleerror
//   if (request.signal.aborted) {
//     return;
//   }
//   // if (error instanceof Error) {
//   //   context.logger.error(error.stack);
//   //   Sentry.captureRemixServerException(error, 'remix.server', request);
//   // } else {
//   //   context.logger.error(error);
//   //   Sentry.captureException(error);
//   // }
// };
