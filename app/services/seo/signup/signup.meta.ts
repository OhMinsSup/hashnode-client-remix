import type { MetaFunction } from "@remix-run/cloudflare";
import { mergeMeta } from "~/services/libs";

export const signupMeta: MetaFunction = mergeMeta(() => [
  {
    signup: "Sign up to Hashnode",
  },
  {
    name: "twitter:title",
    signup: "Sign up to Hashnode",
  },
  {
    name: "og:title",
    signup: "Sign up to Hashnode",
  },
]);
