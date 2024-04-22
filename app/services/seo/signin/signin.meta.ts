import type { MetaFunction } from "@remix-run/cloudflare";
import { mergeMeta } from "~/services/libs";

export const signinmeta: MetaFunction = mergeMeta(() => [
  {
    title: "Sign in to Hashnode",
  },
  {
    name: "twitter:title",
    content: "Sign in to Hashnode",
  },
  {
    name: "og:title",
    content: "Sign in to Hashnode",
  },
]);
