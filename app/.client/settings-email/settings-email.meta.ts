import { MetaFunction } from "@remix-run/cloudflare";
import { mergeMeta } from "~/utils/util";

export const settingsEmailMeta: MetaFunction = mergeMeta(() => {
  const title = "Change Email Preferences — Hashnode";
  return [
    {
      title,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:site_name",
      content: "Hashnode",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:site",
      content: "@hashnode",
    },
  ];
});
