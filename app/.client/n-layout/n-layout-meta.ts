import { MetaFunction } from "@remix-run/cloudflare";
import { mergeMeta } from "~/utils/util";
import type { RoutesLoaderData } from "~/.server/routes/n-layout/n-layout-loader";

export const nLayoutMeta: MetaFunction<RoutesLoaderData> = mergeMeta(
  ({ data }) => {
    const tagInfo = data?.result;
    const name = tagInfo?.name;
    const title = `#${name} on Hashnode`;
    const description = `${name} (${tagInfo?.followCount ?? 0} followers · ${tagInfo?.postCount ?? 0} articles) `;
    return [
      {
        title,
      },
      {
        name: "description",
        content: description,
      },
      {
        name: "og:title",
        content: title,
      },
      {
        name: "og:description",
        content: description,
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
        name: "twitter:description",
        content: description,
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
  }
);
