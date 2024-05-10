import { Separator } from '~/components/ui/separator';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import { Author } from '~/components/write/future/Author';
import { DrawerItemWrapper } from '~/components/write/future/DrawerItemWrapper';
import { InputAuthors } from '~/components/write/future/InputAuthors';
import { InputDate } from '~/components/write/future/InputDate';
import { InputSlug } from '~/components/write/future/InputSlug';
import { InputSwitch } from '~/components/write/future/InputSwitch';
import { InputTag } from '~/components/write/future/InputTag';
import { InputText } from '~/components/write/future/InputText';
import { InputTextarea } from '~/components/write/future/InputTextarea';
import { LabelWithDescription } from '~/components/write/future/LabelWithDescription';
import { LabelWithTooltip } from '~/components/write/future/LabelWithTooltip';
import { LabelWithTooltipWrapper } from '~/components/write/future/LabelWithTooltipWrapper';
import { LabelWrapper } from '~/components/write/future/LabelWrapper';

const ComponentHelperItem = {
  author: {
    id: 'author',
    text: 'Author',
    help: (
      <>
        Change of author will take effect once the article is published.
        <br />
        Your article will stay under your drafts until then.
        <br />
        Once published, the new author will be able to edit it.
      </>
    ),
  },
  coAuthors: {
    id: 'co-authors',
    text: 'Co-authors',
    help: (
      <>
        Select up to 4 co-authors from your team.
        <br />
        Co-authors will not be able to edit the article but are listed as
        <br /> collaborators in draft preview and article pages.
      </>
    ),
  },
  tableOfContents: {
    id: 'toc',
    text: 'Table of contents',
    help: 'Generate table of contents for your article',
  },
  disabledComments: {
    id: 'disabled-comments',
    text: 'Disable comments',
    help: 'This will hide the comments section below your article',
  },
  hiddenArticle: {
    id: 'hiddenArticle',
    text: 'Hide article from Hashnode feed',
    help: 'Hide this article from Hashnode feed and display it only on my blog',
  },
  draftArticle: {
    id: 'draftArticle',
    text: 'Draft article',
    help: 'Save your article as a draft',
  },
  publishOnBackdate: {
    id: 'publishOnBackdate',
    text: 'Publish on a backdate',
    help: (
      <>
        Once you publish your article, it will be visible to everyone.
        <br />
        You can still edit it after publishing.
      </>
    ),
  },
  seoTitle: {
    id: 'seoTitle',
    text: 'SEO title',
    help: (
      <>
        The &quot;SEO title&quot; will be shown in place of your Title on
        <br /> search engine results pages, such as a Google search. SEO
        <br /> titles between 40 and 50 characters with commonly <br />
        searched words have the best click-through-rates.
      </>
    ),
  },
  seoDescription: {
    id: 'seoDescription',
    text: 'SEO description',
    help: (
      <>
        The &quot;SEO description&quot; will be used in place of your Subtitle
        <br /> on search engine results pages. Good SEO descriptions
        <br /> utilize keywords, summarize the article and are between
        <br /> 140-156 characters long.
      </>
    ),
  },
  ogImage: {
    id: 'ogImage',
    text: 'Custom OG Image',
    help: (
      <>
        Upload an image to show when your article appears online or on social
        media. If there’s no image, the cover image will be used instead.
      </>
    ),
  },
  selectTags: {
    id: 'selectTags',
    text: 'Select tags',
    help: <></>,
  },
};

export default function DraftSettingDrawer() {
  const { control } = useWriteFormContext();
  return (
    <>
      <DrawerItemWrapper>
        <LabelWrapper
          label={<LabelWithTooltip {...ComponentHelperItem['author']} />}
        >
          <Author />
        </LabelWrapper>
        <LabelWrapper
          label={<LabelWithTooltip {...ComponentHelperItem['coAuthors']} />}
        >
          <InputAuthors />
        </LabelWrapper>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <InputSwitch
          control={control}
          name="config.hasTableOfContents"
          {...ComponentHelperItem['tableOfContents']}
        />
        <InputSlug />
        <LabelWithDescription {...ComponentHelperItem['selectTags']}>
          <InputTag />
        </LabelWithDescription>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <LabelWithDescription {...ComponentHelperItem['ogImage']}>
          <>asdasdsa</>
        </LabelWithDescription>
        <LabelWithTooltipWrapper
          isOptional
          label={<LabelWithTooltip {...ComponentHelperItem['seoTitle']} />}
        >
          <InputText control={control} name="seo.title" />
        </LabelWithTooltipWrapper>
        <LabelWithTooltipWrapper
          isOptional
          label={
            <LabelWithTooltip {...ComponentHelperItem['seoDescription']} />
          }
        >
          <InputTextarea control={control} name="seo.description" />
        </LabelWithTooltipWrapper>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <LabelWithDescription {...ComponentHelperItem['publishOnBackdate']}>
          <InputDate control={control} name="config.publishedAt" />
        </LabelWithDescription>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <InputSwitch
          control={control}
          name="config.disabledComment"
          {...ComponentHelperItem['disabledComments']}
        />
        <InputSwitch
          control={control}
          name="config.hiddenArticle"
          {...ComponentHelperItem['hiddenArticle']}
        />
        <InputSwitch
          control={control}
          name="config.isDraft"
          {...ComponentHelperItem['draftArticle']}
        />
      </DrawerItemWrapper>
    </>
  );
}
