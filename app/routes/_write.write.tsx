import "~/styles/editor/index.css";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { WriteProvider } from "~/components/write/context/useWriteContext";
import { WriteLayout } from "~/components/write/future/WriteLayout";
import { LeftSidebar } from "~/components/write/future/LeftSidebar";
import { ActionFunctionArgs } from "@remix-run/cloudflare";

export { meta } from "~/services/seo/write/write-layout.meta";
export { loader } from "~/.server/routes/write/write-layout.loader";

export const action = async (args: ActionFunctionArgs) => {
  const body = await args.request.json();
  console.log("action", body);
  return {};
};

export default function Routes() {
  return (
    <WriteProvider>
      <div data-id="root">
        <WriteLayout sidebar={<LeftSidebar />}>
          <Outlet />
        </WriteLayout>
      </div>
    </WriteProvider>
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
