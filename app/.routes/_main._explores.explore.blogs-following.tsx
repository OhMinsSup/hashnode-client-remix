import ExploreLayout from "~/components/explore/future/ExploreLayout/ExploreLayout";
import { TrendingBlog } from "~/components/explore/future/TrendingBlog";

export default function Routes() {
  return (
    <ExploreLayout title="Blogs You Follow" hiddenSelect>
      <TrendingBlog />
      <TrendingBlog />
      <TrendingBlog />
      <TrendingBlog />
    </ExploreLayout>
  );
}
