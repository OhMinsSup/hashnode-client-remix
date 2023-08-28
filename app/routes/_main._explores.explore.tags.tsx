// import React, { useCallback } from "react";
// import { json } from "@remix-run/cloudflare";

import ExploreLayout from "~/components/explore/future/ExploreLayout/ExploreLayout";
import { TrendingTag } from "~/components/explore/future/TrendingTag";

// // components
// import { useLoaderData, useSearchParams } from "@remix-run/react";
// import ExploreTagItem from "~/components/explore/ExploreTagItem";

// // api
// import { Icons } from "~/components/shared/Icons";

// // utils
// import { parseUrlParams } from "~/utils/util";

// // types
// import type { LoaderArgs, LinksFunction } from "@remix-run/cloudflare";

// // styles
// import homeExploreTagsStyle from "~/styles/routes/home-explore-tags.css";

// export const links: LinksFunction = () => {
//   return [
//     {
//       rel: "stylesheet",
//       href: homeExploreTagsStyle,
//     },
//   ];
// };

// export const loader = async ({ request, context }: LoaderArgs) => {
//   const { category } = parseUrlParams(request.url);
//   const data = await context.api.tag.getTagList(request, {
//     type: "trending",
//     category: category || "all",
//     limit: 50,
//   });
//   return json({
//     trendingTags: data.json.result,
//   });
// };

// export type Loader = typeof loader;

export default function Routes() {
  // const { trendingTags } = useLoaderData<ExploreTrendingTagsLoader>();

  // const [searchParams, setSearchParams] = useSearchParams();

  // const onChange = useCallback(
  //   (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSearchParams({
  //       ...searchParams,
  //       category: e.target.value,
  //     });
  //   },
  //   [searchParams, setSearchParams]
  // );

  // return (
  //   <div className="explore-trending-tags border-b-0">
  //     <div className="title-wrapper">
  //       <div>
  //         <h2>Trending Tags</h2>
  //         <p>Tags with most number of articles</p>
  //       </div>
  // <div className="select-filter">
  //   <select
  //     onChange={onChange}
  //     value={searchParams.get("category") || "all"}
  //   >
  //     <option value="week">This week</option>
  //     <option value="month">This month</option>
  //     <option value="year">This year</option>
  //     <option value="all">All time</option>
  //   </select>
  //   <span>
  //     <Icons.ArrowDown className="icon__sm fill-current" />
  //   </span>
  // </div>
  //     </div>
  //     <div className="content-wrapper">
  //       {trendingTags.list.map((item) => (
  //         <ExploreTagItem key={`ExploreTredingTagItem-${item.id}`} />
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <ExploreLayout
      title="Trending Tags"
      description="Tags with most number of articles"
    >
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
    </ExploreLayout>
  );
}
