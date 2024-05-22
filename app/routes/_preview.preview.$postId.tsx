import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/preview/preview.$id.loader';
import { BlocknoteEditor } from '~/components/blocknote-editor';
import { BlogTemplate } from '~/components/blog/future/BlogTemplate';
import { ClientOnly } from '~/components/shared/future/ClientOnly';

export { meta } from '~/services/seo/preview/preview.meta';
export { loader } from '~/.server/routes/preview/preview.$id.loader';

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <>
      <BlogTemplate.Headers />
      <BlogTemplate.ContentWrapper>
        <BlogTemplate.Writer
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
            <BlocknoteEditor
              blockType={
                data.result.PostConfig.isMarkdown ? 'markdown' : 'html'
              }
              initialHTML={data.result.content}
              editable={false}
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
