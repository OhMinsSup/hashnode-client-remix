import React from 'react';
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/preview/preview.$id.loader';
import { BlogTemplate } from '~/components/blog/future/BlogTemplate';
import { ClientOnly } from '~/components/shared/future/ClientOnly';

export { meta } from '~/services/seo/preview/preview.meta';
export { loader } from '~/.server/routes/preview/preview.$id.loader';

const BlocknoteEditor = React.lazy(
  () => import('~/components/blocknote-editor/BlocknoteEditor'),
);

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <>
      <BlogTemplate.Headers />
      <BlogTemplate.ContentWrapper>
        <BlogTemplate.Writer
          username={data.result.User.UserProfile.username}
          image={data.result.image}
          title={data.result.title}
          createdAt={data.result.createdAt}
          subTitle={data.result.subTitle}
        />
        <BlogTemplate.Content
          tags={
            data.result
              .PostTags as SerializeSchema.SerializePost<false>['PostTags']
          }
        >
          <ClientOnly>
            <React.Suspense fallback={null}>
              <BlocknoteEditor
                blockType={
                  data.result.PostConfig.isMarkdown ? 'markdown' : 'html'
                }
                initialHTML={data.result.content}
                editable={false}
              />
            </React.Suspense>
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
