import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/preview/preview.$id.loader';
import { BlogTemplate } from '~/components/blog/future/BlogTemplate';
import { BlockEditor } from '~/components/editor/future/BlockEditor';
import { ClientOnly } from '~/components/shared/future/ClientOnly';

export { meta } from '~/services/seo/preview/preview.meta';
export { loader } from '~/.server/routes/preview/preview.$id.loader';

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  console.log(data);

  return (
    <>
      <BlogTemplate.Headers />
      <BlogTemplate.ContentWrapper>
        <BlogTemplate.Writer
          title={data.result.title}
          createdAt={data.result.createdAt}
        />
        <BlogTemplate.Content>
          <ClientOnly>
            <BlockEditor
              editable={false}
              initialContent={data?.result.content}
            />
          </ClientOnly>
        </BlogTemplate.Content>
      </BlogTemplate.ContentWrapper>
      <BlogTemplate.Footer />
    </>
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
