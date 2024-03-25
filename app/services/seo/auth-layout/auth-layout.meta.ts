import { MetaFunction } from "@remix-run/cloudflare";
import { RoutesLoaderData } from "~/.server/routes/auth-layout/auth-layout.loader";
import { mergeMeta } from "~/utils/utils";

export const authLayoutMeta: MetaFunction<RoutesLoaderData> = mergeMeta(() => {
  const content =
    "Start your programming blog. Share your knowledge and build your own brand";
  return [
    {
      name: "description",
      content,
    },
    {
      name: "og:description",
      content,
    },
    {
      name: "twitter:description",
      content,
    },
  ];
});
