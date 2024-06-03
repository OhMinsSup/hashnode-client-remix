import { useCallback, useState } from 'react';
import { NavLink, useParams } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Aside } from '~/components/shared/future/Aside';
import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { Button, buttonVariants } from '~/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { ScrollArea } from '~/components/ui/scroll-area';
import { NAV_CONFIG, NavItem } from '~/constants/navigation';
import { useLinkActiveStateHandler } from '~/libs/hooks/useLinkActiveState';
import { cn } from '~/services/libs';
import styles from './styles.module.css';

export default function MainFooter() {
  return (
    <>
      {NAV_CONFIG.mainFooter.map((item) => {
        return (
          <div className="relative w-max" key={`footer-${item.id}`}>
            <MainFooter.Navigation item={item} />
          </div>
        );
      })}
    </>
  );
}

interface ItemProps {
  item: NavItem;
}

MainFooter.Navigation = function Item({ item }: ItemProps) {
  const { handler } = useLinkActiveStateHandler();

  switch (item.type) {
    case 'link': {
      return <MainFooter.Link item={item} />;
    }
    case 'drawer': {
      const { isActive } = handler({ item });
      return isActive ? (
        <ClientOnly>
          <MainFooter.Dropdown item={item} />
        </ClientOnly>
      ) : null;
    }
    default: {
      return null;
    }
  }
};

MainFooter.Link = function Item({ item }: ItemProps) {
  const params = useParams();
  const to =
    typeof item.href === 'function' ? item.href(params) : item.href ?? '#';

  return (
    <NavLink
      to={to}
      unstable_viewTransition
      className={({ isActive }) => {
        return cn(
          buttonVariants({
            variant: 'ghost',
            size: 'default',
          }),
          styles.link,
          isActive && styles.active,
        );
      }}
    >
      {item.icon ? <item.icon /> : null}
      <span className="sr-only">{item.title}</span>
    </NavLink>
  );
};

MainFooter.Dropdown = function Item({ item }: ItemProps) {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button size="default" variant="ghost" className={cn(styles.link)}>
          {item.icon ? <item.icon /> : null}
          <span className="sr-only">{item.title}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="inset-0 bottom-0 left-0 top-0 m-0 h-full w-full rounded-none">
        <ScrollArea>
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex flex-row justify-start">
                <Button variant="ghost" onClick={onClose}>
                  <Icons.close />
                </Button>
              </div>
            </DrawerTitle>
            <div className="mb-5 flex w-fit flex-col gap-6">
              <Aside.Content />
            </div>
          </DrawerHeader>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
