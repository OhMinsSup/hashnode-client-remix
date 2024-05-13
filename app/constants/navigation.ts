import type { LucideIcon } from 'lucide-react';

import { Icons } from '~/components/icons';
import { PAGE_ENDPOINTS } from './constant';

export type NavItem = {
  id:
    | 'myfeed'
    | 'discussions'
    | 'headless'
    | 'more'
    | 'bookmark'
    | 'search'
    | 'feed'
    | 'notifications'
    | 'sidebar';
  type: 'link' | 'dropdown' | 'external_link' | 'drawer';
  title: React.ReactNode;
  href?: string | ((...args: unknown[]) => string);
  relationHrefs?: string[];
  disabled?: boolean;
  icon?: LucideIcon;
  relationIcons?: Record<string, LucideIcon>;
};

export type NavTabItem = {
  id: 'personalized' | 'following' | 'featured';
  title: string;
  href: string | ((...args: unknown[]) => string);
  disabled?: boolean;
  icon?: LucideIcon;
};

export type ScrollNavItem = Pick<NavItem, 'id' | 'type' | 'title'> & {
  href: string;
};

export const NAV_CONFIG = {
  mainNav: [
    {
      id: 'myfeed',
      type: 'link',
      title: 'My Feed',
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.home,
      relationHrefs: [PAGE_ENDPOINTS.ROOT],
    },
    {
      id: 'discussions',
      type: 'link',
      title: 'Discussions',
      href: '/discussions',
    },
    {
      id: 'headless',
      type: 'external_link',
      title: 'Headless CMS',
      href: 'https://hashnode.com/headless?source=header',
    },
    {
      id: 'more',
      type: 'dropdown',
      title: 'More',
    },
  ] as NavItem[],
  mainFooter: [
    {
      id: 'feed',
      type: 'link',
      title: 'My Feed',
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.home,
      relationHrefs: [PAGE_ENDPOINTS.ROOT],
    },
    {
      id: 'bookmark',
      type: 'link',
      title: 'Bookmarks',
      href: PAGE_ENDPOINTS.BOOKMARKS.ROOT,
      icon: Icons.bookmark,
      relationHrefs: [PAGE_ENDPOINTS.BOOKMARKS.ROOT],
    },
    {
      id: 'search',
      type: 'link',
      title: 'Search',
      href: PAGE_ENDPOINTS.SEARCH.ROOT,
      icon: Icons.search,
      relationHrefs: [PAGE_ENDPOINTS.SEARCH.ROOT],
    },
    {
      id: 'notifications',
      type: 'link',
      title: 'Notifications',
      href: PAGE_ENDPOINTS.NOTIFICATIONS.ROOT,
      icon: Icons.bell,
      relationHrefs: [PAGE_ENDPOINTS.NOTIFICATIONS.ROOT],
    },
    {
      id: 'sidebar',
      type: 'drawer',
      title: 'Sidebar',
      icon: Icons.menu,
      relationHrefs: [PAGE_ENDPOINTS.ROOT],
    },
  ] as NavItem[],
  mainTabs: [
    {
      id: 'personalized',
      title: 'Personalized',
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.wandSparkles,
    },
    {
      id: 'following',
      title: 'Following',
      href: PAGE_ENDPOINTS.FOLLOWING,
      icon: Icons.users,
    },
    {
      id: 'featured',
      title: 'Featured',
      href: PAGE_ENDPOINTS.FEATURED,
      icon: Icons.award,
    },
  ] as NavTabItem[],
  searchDialogTabs: [
    {
      id: 'top',
      title: 'Top',
    },
    {
      id: 'latest',
      title: 'Latest',
    },
    {
      id: 'tags',
      title: 'Tags',
    },
    {
      id: 'people',
      title: 'People',
    },
    {
      id: 'posts',
      title: 'Posts',
    },
  ],
  notificationDialogTabs: [
    {
      id: 'all',
      title: 'All',
    },
    {
      id: 'comments',
      title: 'Comments',
    },
    {
      id: 'likes',
      title: 'Likes',
    },
    {
      id: 'mentions',
      title: 'Mentions',
    },
  ],
  blogTabs: [
    {
      id: 'home',
      title: 'Home',
    },
  ],
};
