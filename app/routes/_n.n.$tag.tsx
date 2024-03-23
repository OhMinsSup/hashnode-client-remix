import {
  isRouteErrorResponse,
  Outlet,
  useRouteError,
  useLoaderData,
} from "@remix-run/react";
import { TagBoxWithHashnodeList } from "~/components/n/future/TagBoxWithHashnodeList";
import { HashnodeTagTabs } from "~/components/n/future/HashnodeTagTabs";
import {
  nLayoutLoader,
  type RoutesLoaderData,
} from "~/.server/routes/n-layout/n-layout-loader";
import { nLayoutAction } from "~/.server/routes/n-layout/n-layout-action";
import { nLayoutMeta } from "~/.client/n-layout/n-layout-meta";

export const loader = nLayoutLoader;

export const meta = nLayoutMeta;

export const action = nLayoutAction;

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <TagBoxWithHashnodeList>
      <HashnodeTagTabs slug={data?.result?.name}>
        <Outlet />
      </HashnodeTagTabs>
    </TagBoxWithHashnodeList>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
