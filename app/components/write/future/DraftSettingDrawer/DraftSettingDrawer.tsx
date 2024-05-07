import React from "react";
import { Icons } from "~/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useSession } from "~/libs/hooks/useSession";
import { Switch } from "~/components/ui/switch";
// import { Input } from "~/components/ui/input";
import styles from "./styles.module.css";
import { cn } from "~/services/libs";

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
};

export default function DraftSettingDrawer() {
  return (
    <>
      <Item>
        <ItemContainer
          label={<LabelWithTooltip {...ComponentHelperItem["author"]} />}
        >
          <AuthorItem />
        </ItemContainer>
        <ItemContainer
          label={<LabelWithTooltip {...ComponentHelperItem["coAuthors"]} />}
        >
          <></>
        </ItemContainer>
      </Item>
      <Separator className="my-9" orientation="horizontal" />
      <Item>
        <SwitchItem {...ComponentHelperItem["tableOfContents"]} />
        <InputSlugItem />
      </Item>
      <Separator className="my-9" orientation="horizontal" />
      <Item>DraftSettingDrawer</Item>
      <Separator className="my-9" orientation="horizontal" />
      <Item>
        <>asdsd</>
      </Item>
      <Separator className="my-9" orientation="horizontal" />
      <Item>
        <SwitchItem {...ComponentHelperItem["disabledComments"]} />
        <SwitchItem {...ComponentHelperItem["hiddenArticle"]} />
      </Item>
    </>
  );
}

interface ItemProps {
  children: React.ReactNode;
}

function Item({ children }: ItemProps) {
  return <div className="flex flex-col gap-8">{children}</div>;
}

interface ItemContainerProps extends ItemProps {
  label?: React.ReactNode;
}

function ItemContainer({ children, label }: ItemContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <div className="flex flex-row items-center gap-[0.375rem]">{label}</div>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

interface LabelWithTooltipProps {
  id: string;
  text: string;
  help: React.ReactNode;
}

function LabelWithTooltip({ text, help, id }: LabelWithTooltipProps) {
  return (
    <>
      <Label className="text-base" htmlFor={id}>
        {text}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Change of author info tooltip"
            >
              <Icons.info />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{help}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

function AuthorItem() {
  const sesion = useSession();
  return (
    <div className="overflow-hidden border rounded-xl dark:border-slate-700">
      <div className="flex flex-row items-center justify-between py-2 px-4">
        <div className="flex">
          <div className="relative block">
            <Avatar className="cursor-pointer hover:opacity-80 size-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 flex flex-col gap-1">
            <div className="flex flex-row items-center">
              <h4
                title={sesion.UserProfile.username}
                className="scroll-m-20 text-lg font-semibold tracking-tight"
              >
                {sesion.UserProfile.username}
              </h4>
            </div>
            <Badge variant="outline" color="primary">
              Owner
            </Badge>
          </div>
        </div>
        <div>{/* TODO: Change Author */}</div>
      </div>
    </div>
  );
}

interface SwitchItemProps {
  id: string;
  text: string;
  help: string;
}

function SwitchItem({ id, text, help }: SwitchItemProps) {
  return (
    <Label
      htmlFor={id}
      className="flex relative items-center justify-between gap-20 sm:gap-24 text-xl font-semibold"
    >
      <div className="flex flex-col gap-1 flex-[3_1_0%]">
        <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
        <p className="text-base text-muted-foreground">{help}</p>
      </div>
      <Switch id={id} />
    </Label>
  );
}

function InputSlugItem() {
  //   const editInputMode = () => (
  //     <div className="flex flex-row space-x-2">
  //       <Input id="slug" placeholder="enter-slug" />
  //       <Button variant="ghost" className="space-x-2">
  //         <Icons.save />
  //         <span>Save</span>
  //       </Button>
  //     </div>
  //   );

  const readInputMode = () => {
    return (
      <div className="border-slate-300 bg-transparent dark:border-slate-700 dark:text-slate-300 outline-none w-full py-3 pr-2 pl-4 items-center flex justify-between border rounded-xl">
        <span
          className={cn(
            "truncate max-w-[250px]",
            styles.input_slug_by_readonly
          )}
        >
          /asdsd
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" aria-label="Edit slug">
                <Icons.pen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit slug</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="slug" className="text-xl font-semibold">
          Article slug
        </Label>
        {/* {editInputMode()} */}
        {readInputMode()}
      </div>
    </div>
  );
}
