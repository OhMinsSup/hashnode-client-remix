import React from 'react';
import { useLocation } from '@remix-run/react';

import { SidebarNav } from '~/components/settings/future/SidebarNav';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';
import { NAV_CONFIG } from '~/constants/navigation';

interface SettingLayoutProps {
  children: React.ReactNode;
}

export default function SettingLayout({ children }: SettingLayoutProps) {
  const location = useLocation();

  const currentPath = location.pathname;
  const title =
    NAV_CONFIG.settingsSidebar.find((item) => item.href === currentPath)
      ?.title || 'Settings';

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <ScrollArea>
            <SidebarNav />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
