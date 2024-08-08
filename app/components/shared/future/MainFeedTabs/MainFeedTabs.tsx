import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from '@remix-run/react';

import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { NAV_CONFIG } from '~/constants/navigation';

interface MainFeedTabsProps {
  children: React.ReactNode;
}

export default function MainFeedTabs({ children }: MainFeedTabsProps) {
  const params = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const onNavigation = useCallback(
    (pathname: string) => {
      navigate(pathname, {
        unstable_viewTransition: true,
      });
    },
    [navigate],
  );

  return (
    <Tabs
      defaultValue={PAGE_ENDPOINTS.ROOT}
      value={location.pathname}
      onValueChange={onNavigation}
    >
      <div className="pb-5 pt-1 lg:pt-0">
        <ScrollArea>
          <div className="relative">
            <TabsList>
              {NAV_CONFIG.mainTabs.map((item) => {
                return (
                  <TabsTrigger
                    key={`main-tabs-${item.id}`}
                    className="space-x-3"
                    value={
                      typeof item.href === 'function'
                        ? item.href(params)
                        : item.href
                    }
                  >
                    {item.icon ? <item.icon className="size-4" /> : null}
                    <span>{item.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {NAV_CONFIG.mainTabs.map((item) => {
        return (
          <TabsContent
            key={`main-tabs-content-${item.id}`}
            className="h-svh md:w-full"
            value={
              typeof item.href === 'function' ? item.href(params) : item.href
            }
          >
            {children}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

MainFeedTabs.displayName = 'MainFeedTabs';
