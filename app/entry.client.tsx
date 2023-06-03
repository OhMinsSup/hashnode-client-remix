/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// window.requestIdleCallback =
//     window.requestIdleCallback ||
//     function(cb) {
//         var start = Date.now();
//         return setTimeout(function() {
//             cb({
//                 didTimeout: false,
//                 timeRemaining: function() {
//                     return Math.max(0, 50 - (Date.now() - start));
//                 },
//             });
//         }, 1);
//     };

// window.cancelIdleCallback =
//     window.cancelIdleCallback ||
//     function(id) {
//         clearTimeout(id);
//     };

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
