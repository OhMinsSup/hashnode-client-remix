import { useCallback, useState } from 'react';
import { Link, NavLink, useParams } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { SearchDialog } from '~/components/shared/future/SearchhDialog';
import { UserMenu } from '~/components/shared/future/UserMenu';
import { Button, buttonVariants } from '~/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { NAV_CONFIG, NavItem } from '~/constants/navigation';
import { SearchDialogProvider } from '~/context/useSearchDialogContext';
import { Theme, useTheme } from '~/context/useThemeContext';
import { useOptionalSession } from '~/libs/hooks/useSession';
import { cn } from '~/services/libs';
import styles from './styles.module.css';

export default function MainHeader() {
  const session = useOptionalSession();

  const [theme, setTheme] = useTheme();

  const onToggleTheme = useCallback(() => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    );
  }, [setTheme]);

  const renderWriteButton = useCallback((variant: 'ghost' | 'default') => {
    return (
      <Link
        aria-label="Go to Write Page"
        className={cn(
          buttonVariants({
            variant,
          }),
          'space-x-3',
        )}
        unstable_viewTransition
        to={PAGE_ENDPOINTS.WRITE.ROOT}
      >
        <Icons.pen className="size-5" />
        <span className="hidden md:block">Write</span>
      </Link>
    );
  }, []);

  return (
    <div
      className={cn(
        styles.header_container,
        'bg-slate-50 dark:border-slate-950 dark:bg-slate-950 dark:text-white',
      )}
    >
      <div className={styles.header_layout}>
        <div className={styles.left}>
          <MainHeader.Menu />
          <Link
            to={PAGE_ENDPOINTS.ROOT}
            unstable_viewTransition
            className="mr-6 flex items-center space-x-2"
            aria-label="Hashnode Logo"
          >
            <Icons.hashnodeTypeHeader className="hidden w-36 fill-current md:block" />
            <Icons.hashnodeTypeHeaderMobile className="block w-8 fill-current text-blue-600 dark:text-transparent md:hidden" />
            <span className="sr-only">Hashnode</span>
          </Link>
        </div>
        <div
          role="navigation"
          aria-label="hashnode service"
          className={styles.center}
        >
          <nav className="flex w-full items-center justify-center space-x-2">
            {NAV_CONFIG.mainNav.map((item) => {
              return (
                <MainHeader.Navigation
                  key={`header-navigation-${item.id}`}
                  item={item}
                />
              );
            })}
          </nav>
        </div>
        <div className={styles.right}>
          <div className="relative z-20 hidden md:inline">
            <SearchDialogProvider>
              <SearchDialog />
            </SearchDialogProvider>
          </div>
          {session ? (
            <div className="relative hidden md:block">
              {renderWriteButton('default')}
            </div>
          ) : null}
          <div className="flex flex-row items-center justify-end gap-4">
            <div className="flex gap-2">
              {session ? (
                <div className="md:hidden">{renderWriteButton('ghost')}</div>
              ) : null}
              <Button
                variant="ghost"
                aria-label="Toggle Theme"
                onClick={onToggleTheme}
              >
                {theme === Theme.DARK ? <Icons.sun /> : <Icons.moon />}
              </Button>
              {session ? (
                <div className="hidden md:block">
                  <Button variant="ghost" aria-label="">
                    <Icons.bell />
                  </Button>
                </div>
              ) : null}
            </div>
            {session ? (
              <UserMenu session={session} />
            ) : (
              <>
                <Link
                  className={cn(buttonVariants(), 'block md:hidden')}
                  to={PAGE_ENDPOINTS.AUTH.SIGNIN}
                  unstable_viewTransition
                >
                  Sign in
                </Link>
                <section className="hidden gap-3 md:flex">
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: 'link',
                      }),
                    )}
                    to={PAGE_ENDPOINTS.AUTH.SIGNIN}
                    unstable_viewTransition
                  >
                    Log in
                  </Link>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: 'link',
                      }),
                    )}
                    to={PAGE_ENDPOINTS.AUTH.SIGNUP}
                    unstable_viewTransition
                  >
                    Sign up
                  </Link>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MainHeader.Menu = function Item() {
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Drawer direction="left" open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button size="sm" variant="link" className="xl:hidden">
          <Icons.menu className="w-6 fill-current" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="inset-0 bottom-0 left-0 top-0 m-0 h-full w-[323px] rounded-none">
        <DrawerHeader className="border-b border-slate-200 dark:border-slate-800">
          <DrawerTitle>
            <div className="flex flex-row justify-between">
              <Link
                aria-label="Hashnode Logo"
                unstable_viewTransition
                className="block w-[168px] text-slate-900 dark:text-white"
                to={PAGE_ENDPOINTS.ROOT}
              >
                <Icons.hashnode className="w-full fill-current dark:hidden" />
                <Icons.hashnodeDark className="hidden w-full fill-current dark:block" />
              </Link>
              <Button variant="ghost" onClick={onClose}>
                <Icons.close />
              </Button>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <nav className="m-0 list-none p-0 px-3 py-4">
          {NAV_CONFIG.mainNav.map((item) => {
            return (
              <li key={`drawer-mneu-navigation-${item.id}`}>
                <MainHeader.Navigation item={item} renderType="drawer" />
              </li>
            );
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

interface ItemProps {
  item: NavItem;
  renderType?: 'default' | 'drawer';
}

MainHeader.Navigation = function Item({ item, renderType }: ItemProps) {
  switch (item.type) {
    case 'link': {
      return <MainHeader.Link item={item} renderType={renderType} />;
    }
    case 'dropdown': {
      return <MainHeader.Dropdown item={item} renderType={renderType} />;
    }
    case 'external_link': {
      return <MainHeader.ExternalLink item={item} renderType={renderType} />;
    }
    default: {
      return null;
    }
  }
};

MainHeader.Link = function Item({ item, renderType }: ItemProps) {
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
          styles.btn_common,
          styles.link,
          isActive && styles.active,
          renderType === 'drawer' ? styles.drawer_link : undefined,
        );
      }}
    >
      {item.title}
    </NavLink>
  );
};

MainHeader.Dropdown = function Item({ item, renderType }: ItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'group',
            styles.btn_common,
            styles.link,
            renderType === 'drawer' ? styles.drawer_dropdown : undefined,
          )}
        >
          <span>{item.title}</span>
          <span className={cn(`group-data-[state="open"]:-rotate-180`)}>
            <Icons.chevronLeft className="-rotate-90" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Explore</DropdownMenuItem>
        <DropdownMenuItem>Hackathons</DropdownMenuItem>
        <DropdownMenuItem>Changelogs</DropdownMenuItem>
        <DropdownMenuItem>The Commit Podcast</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

MainHeader.ExternalLink = function Item({ item, renderType }: ItemProps) {
  const params = useParams();
  const to =
    typeof item.href === 'function' ? item.href(params) : item.href ?? '#';
  return (
    <a
      href={to}
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'default',
        }),
        styles.btn_common,
        styles.link,
        renderType === 'drawer' ? styles.drawer_link : undefined,
      )}
      target="_blank"
      rel="noreferrer"
    >
      {item.title}
    </a>
  );
};

MainHeader.displayName = 'MainHeader';
