import type { LucideIcon } from "lucide-react";
import { Icons } from "~/components/icons";
import { PAGE_ENDPOINTS } from "./constant";

export type NavItem = {
  id: "myfeed" | "discussions" | "headless" | "more";
  type: "link" | "dropdown" | "external_link";
  title: React.ReactNode;
  href?: string | ((...args: unknown[]) => string);
  relationHrefs?: string[];
  disabled?: boolean;
  icon?: LucideIcon;
  relationIcons?: Record<string, LucideIcon>;
};

export type ScrollNavItem = Pick<NavItem, "id" | "type" | "title"> & {
  href: string;
};

export const NAV_CONFIG = {
  mainNav: [
    {
      id: "myfeed",
      type: "link",
      title: "My Feed",
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.home,
      relationHrefs: [PAGE_ENDPOINTS.ROOT],
    },
    {
      id: "discussions",
      type: "link",
      title: "Discussions",
      href: "/discussions",
    },
    {
      id: "headless",
      type: "external_link",
      title: "Headless CMS",
      href: "https://hashnode.com/headless?source=header",
    },
    {
      id: "more",
      type: "dropdown",
      title: "More",
    },
  ] as NavItem[],
  searchDialogTabs: [
    {
      id: "top",
      title: "Top",
    },
    {
      id: "latest",
      title: "Latest",
    },
    {
      id: "tags",
      title: "Tags",
    },
    {
      id: "people",
      title: "People",
    },
    {
      id: "posts",
      title: "Posts",
    },
  ],
  notificationDialogTabs: [
    {
      id: "all",
      title: "All",
    },
    {
      id: "comments",
      title: "Comments",
    },
    {
      id: "likes",
      title: "Likes",
    },
    {
      id: "mentions",
      title: "Mentions",
    },
  ],
};
