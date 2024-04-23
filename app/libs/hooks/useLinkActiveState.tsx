import { useLocation, useParams } from "@remix-run/react";

import type { NavItem } from "~/constants/navigation";
import { useMemoizedFn } from "./useMemoizedFn";

interface UseLinkActiveStateOptions {
  item: NavItem;
}

export function useLinkActiveState({ item }: UseLinkActiveStateOptions) {
  const location = useLocation();
  const params = useParams();

  const rootHref = item.href;
  const relationHrefs = new Set<string>();

  if (rootHref) {
    relationHrefs.add(
      typeof rootHref === "string" ? rootHref : rootHref(params),
    );
  }

  if (item.relationHrefs) {
    item.relationHrefs.forEach((href) => relationHrefs.add(href));
  }

  const href =
    Array.from(relationHrefs).find((href) => href === location.pathname) ?? "#";

  const Icon = item.relationIcons?.[href] ?? item.icon;

  const isActive = relationHrefs.has(location.pathname);

  return {
    href: item.href ? item.href : "#",
    Icon,
    isActive,
  };
}

export function useLinkActiveStateHandler() {
  const location = useLocation();
  const params = useParams();

  const handler = ({ item }: UseLinkActiveStateOptions) => {
    const rootHref = item.href;
    const relationHrefs = new Set<string>();

    if (rootHref) {
      relationHrefs.add(
        typeof rootHref === "string" ? rootHref : rootHref(params),
      );
    }

    if (item.relationHrefs) {
      item.relationHrefs.forEach((href) => relationHrefs.add(href));
    }

    const href =
      Array.from(relationHrefs).find((href) => href === location.pathname) ??
      "#";

    const Icon = item.relationIcons?.[href] ?? item.icon;

    const isActive = relationHrefs.has(location.pathname);

    return {
      href: item.href ? item.href : "#",
      Icon,
      isActive,
    };
  };

  return {
    handler: useMemoizedFn(handler),
  };
}
