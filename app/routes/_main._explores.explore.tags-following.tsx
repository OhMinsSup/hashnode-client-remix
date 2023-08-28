import ExploreLayout from "~/components/explore/future/ExploreLayout/ExploreLayout";
import { TrendingTag } from "~/components/explore/future/TrendingTag";

export default function Routes() {
  return (
    <ExploreLayout title="Tags You Follow" hiddenSelect>
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
      <TrendingTag />
    </ExploreLayout>
  );
}
