import { Separator } from "~/components/ui/separator";
import { DrawerItemWrapper } from "../DrawerItemWrapper";
import { LabelWithTooltip } from "../LabelWithTooltip";
import { LabelWrapper } from "../LabelWrapper";
import { InputSlug } from "../InputSlug";
import { LabelWithTooltipWrapper } from "../LabelWithTooltipWrapper";
import { InputDate } from "../InputDate";
import { InputSwitch } from "../InputSwitch";
import { Author } from "../Author";
import { InputText } from "../InputText";
import { InputTextarea } from "../InputTextarea";
import { LabelWithDescription } from "../LabelWithDescription";

const ComponentHelperItem = {
  author: {
    id: "author",
    text: "Author",
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
    id: "co-authors",
    text: "Co-authors",
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
    id: "toc",
    text: "Table of contents",
    help: "Generate table of contents for your article",
  },
  disabledComments: {
    id: "disabled-comments",
    text: "Disable comments",
    help: "This will hide the comments section below your article",
  },
  hiddenArticle: {
    id: "hiddenArticle",
    text: "Hide article from Hashnode feed",
    help: "Hide this article from Hashnode feed and display it only on my blog",
  },
  scheduleYourArticle: {
    id: "scheduleYourArticle",
    text: "Schedule your article",
    help: (
      <>
        Select a publishing date/time (Based on your local time zone).
        <br /> You can use natural language to pick your
        <br /> date/time, or enter a standard date format instead.
      </>
    ),
  },
  publishOnBackdate: {
    id: "publishOnBackdate",
    text: "Publish on a backdate",
    help: (
      <>
        Once you publish your article, it will be visible to everyone.
        <br />
        You can still edit it after publishing.
      </>
    ),
  },
  seoTitle: {
    id: "seoTitle",
    text: "SEO title",
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
    id: "seoDescription",
    text: "SEO description",
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
    id: "ogImage",
    text: "Custom OG Image",
    help: (
      <>
        Upload an image to show when your article appears online or on social
        media. If there’s no image, the cover image will be used instead.
      </>
    ),
  },
};

export default function DraftSettingDrawer() {
  return (
    <>
      <DrawerItemWrapper>
        <LabelWrapper
          label={<LabelWithTooltip {...ComponentHelperItem["author"]} />}
        >
          <Author />
        </LabelWrapper>
        <LabelWrapper
          label={<LabelWithTooltip {...ComponentHelperItem["coAuthors"]} />}
        >
          <></>
        </LabelWrapper>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <InputSwitch {...ComponentHelperItem["tableOfContents"]} />
        <InputSlug />
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <LabelWithDescription {...ComponentHelperItem["ogImage"]}>
          <>asdasdsa</>
        </LabelWithDescription>
        <LabelWithTooltipWrapper
          isOptional
          label={<LabelWithTooltip {...ComponentHelperItem["seoTitle"]} />}
        >
          <InputText />
        </LabelWithTooltipWrapper>
        <LabelWithTooltipWrapper
          isOptional
          label={
            <LabelWithTooltip {...ComponentHelperItem["seoDescription"]} />
          }
        >
          <InputTextarea />
        </LabelWithTooltipWrapper>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <LabelWithTooltipWrapper
          isOptional
          label={
            <LabelWithTooltip {...ComponentHelperItem["scheduleYourArticle"]} />
          }
        >
          <InputDate />
        </LabelWithTooltipWrapper>
        <LabelWithTooltipWrapper>
          <InputDate />
        </LabelWithTooltipWrapper>
      </DrawerItemWrapper>
      <Separator className="my-9" orientation="horizontal" />
      <DrawerItemWrapper>
        <InputSwitch {...ComponentHelperItem["disabledComments"]} />
        <InputSwitch {...ComponentHelperItem["hiddenArticle"]} />
      </DrawerItemWrapper>
    </>
  );
}
