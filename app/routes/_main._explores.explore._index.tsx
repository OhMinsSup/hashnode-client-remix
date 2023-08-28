// import React from "react";
// import { Link, useLoaderData } from "@remix-run/react";
// import ExploreTagItem from "~/components/explore/ExploreTagItem";
// import NewlyAddedTagItem from "~/components/explore/NewlyAddedTagItem";
// import ExploreBlogItem from "~/components/explore/ExploreBlogItem";
// import { PAGE_ENDPOINTS } from "~/constants/constant";

// styles
// import homeExploreTrendingsStyle from "~/styles/routes/home-explore-trendings.css";

// import type { LinksFunction, LoaderArgs } from "@remix-run/cloudflare";
// import { json } from "@remix-run/cloudflare";

// export const links: LinksFunction = () => {
//   return [
//     {
//       rel: "stylesheet",
//       href: homeExploreTrendingsStyle,
//     },
//   ];
// };

// export const loader = async ({ request, context }: LoaderArgs) => {
//   const [blogs_data, tags_data, newTags_data] = await Promise.all([
//     context.api.user.getExploreBlogs(request, {
//       category: "all",
//       limit: 10,
//     }),
//     context.api.tag.getTagList(request, {
//       type: "trending",
//       category: "all",
//       limit: 6,
//     }),
//     context.api.tag.getTagList(request, {
//       type: "new",
//       category: "all",
//       limit: 6,
//     }),
//   ]);
//   return json({
//     trendingBlogs: blogs_data.json.result,
//     trendingTags: tags_data.json.result,
//     newTags: newTags_data.json.result,
//   });
// };

// export type Loader = typeof loader;

export default function Routes() {
  // const { trendingBlogs, trendingTags, newTags } =
  //   useLoaderData<ExploreTrendingLoader>();

  return null;
  // return (
  //   <>
  //     <div className="explore-trendings">
  //       <div className="title-wrapper">
  //         <h2>Trending Tags</h2>
  //         <Link to={PAGE_ENDPOINTS.EXPLORE.TAGS} className="see-all-link">
  //           See all tags
  //         </Link>
  //       </div>
  //       <div className="content-wrapper">
  //         {trendingTags.list.map((item) => (
  //           <ExploreTagItem key={`ExploreTredingTagItem-${item.id}`} />
  //         ))}
  //       </div>
  //       <div className="newly-added-tags-title">
  //         <h2>Newly Added Tags</h2>
  //       </div>
  //       <div className="newly-added-tags-content">
  //         {newTags.list.map((item) => (
  //           <NewlyAddedTagItem key={`NewlyAddedTagItem-${item.id}`} />
  //         ))}
  //       </div>
  //     </div>
  //     <div className="explore-trendings mt-4">
  //       <div className="title-wrapper">
  //         <h2>Trending Tech Blogs</h2>
  //         <Link to={PAGE_ENDPOINTS.EXPLORE.BLOGS} className="see-all-link">
  //           See all blogs
  //         </Link>
  //       </div>
  //       <div className="content-wrapper">
  //         {trendingBlogs.map((item) => (
  //           <ExploreBlogItem key={`ExploreBlogItem-${item.id}`} />
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );
}
