import styles from "./styles.module.css";
import {
  Link,
  NavLink,
  useNavigate,
  useParams,
  useSubmit,
} from "@remix-run/react";
import { NAV_CONFIG, NavItem } from "~/constants/navigation";
import { Icons } from "~/components/icons";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button, buttonVariants } from "~/components/ui/button";
import { SearchDialog } from "~/components/shared/future/SearchhDialog";
import { SearchDialogProvider } from "~/context/useSearchDialogContext";
import { Theme, useTheme } from "~/context/useThemeContext";
import { useCallback, useState } from "react";
import { useOptionalSession } from "~/libs/hooks/useSession";
import { cn } from "~/services/libs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getPath } from "~/routes/api.v1.auth.logout";

export default function MainHeader() {
  const navigate = useNavigate();

  const session = useOptionalSession();

  const submit = useSubmit();

  const [theme, setTheme] = useTheme();

  const onLogout = useCallback(() => {
    const formData = new FormData();
    submit(formData, {
      action: getPath(),
      method: "POST",
      navigate: false,
    });
  }, [submit]);

  const onToggleTheme = useCallback(() => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  }, [setTheme]);

  const onClickWritePage = useCallback(() => {
    navigate(PAGE_ENDPOINTS.WRITE.ROOT);
  }, [navigate]);

  const renderWriteButton = useCallback(
    (variant: "ghost" | "default") => {
      return (
        <Button
          aria-label="Go to Write Page"
          className="space-x-3"
          role="link"
          variant={variant}
          data-href={PAGE_ENDPOINTS.WRITE.ROOT}
          onClick={onClickWritePage}
        >
          <Icons.pen className="size-5" />
          <span className="hidden md:block">Write</span>
        </Button>
      );
    },
    [onClickWritePage]
  );

  const onSigninPage = useCallback(() => {
    navigate(PAGE_ENDPOINTS.AUTH.SIGNIN);
  }, [navigate]);

  const onSignupPage = useCallback(() => {
    navigate(PAGE_ENDPOINTS.AUTH.SIGNUP);
  }, [navigate]);

  return (
    <div
      className={cn(
        styles.header_container,
        "bg-slate-50 dark:text-white dark:bg-slate-800 dark:border-slate-800"
      )}
    >
      <div className={styles.header_layout}>
        <div className={styles.left}>
          <MainHeader.Menu />
          <Link
            to={PAGE_ENDPOINTS.ROOT}
            className="mr-6 flex items-center space-x-2"
            aria-label="Hashnode Logo"
          >
            <Icons.hashnodeTypeHeader className="w-36 fill-current hidden md:block" />
            <Icons.hashnodeTypeHeaderMobile className="w-8 fill-current text-blue-600 block md:hidden dark:text-transparent" />
            <span className="sr-only">Hashnode</span>
          </Link>
        </div>
        <div
          role="navigation"
          aria-label="hashnode service"
          className={styles.center}
        >
          <nav className="items-center justify-center space-x-2 w-full flex">
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
          <div className="relative z-20 md:inline hidden">
            <SearchDialogProvider>
              <SearchDialog />
            </SearchDialogProvider>
          </div>
          {session ? (
            <div className="hidden relative md:block">
              {renderWriteButton("default")}
            </div>
          ) : null}
          <div className="flex flex-row items-center justify-end gap-4">
            <div className="flex gap-2">
              {session ? (
                <div className="md:hidden">{renderWriteButton("ghost")}</div>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:opacity-80">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Icons.filetext className="mr-2 h-4 w-4" />
                      <span>My drafts</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icons.bookmark className="mr-2 h-4 w-4" />
                      <span>Bookmarks</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icons.user className="mr-2 h-4 w-4" />
                      <span>Account settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icons.history className="mr-2 h-4 w-4" />
                      <span>My reading history</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <Icons.logout className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  className="md:hidden block"
                  data-href={PAGE_ENDPOINTS.AUTH.SIGNIN}
                  onClick={onSigninPage}
                >
                  Sign in
                </Button>
                <section className="md:flex hidden gap-3">
                  <Button
                    variant="link"
                    role="link"
                    data-href={PAGE_ENDPOINTS.AUTH.SIGNIN}
                    onClick={onSigninPage}
                  >
                    Log in
                  </Button>
                  <Button
                    role="link"
                    data-href={PAGE_ENDPOINTS.AUTH.SIGNUP}
                    onClick={onSignupPage}
                  >
                    Sign up
                  </Button>
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
      <DrawerContent className="rounded-none inset-0 top-0 left-0 bottom-0 m-0 h-full w-[323px]">
        <DrawerHeader className="border-b border-slate-200 dark:border-slate-800">
          <DrawerTitle>
            <div className="flex flex-row justify-between">
              <Link
                aria-label="Hashnode Logo"
                className="block w-[168px] text-slate-900 dark:text-white"
                to={PAGE_ENDPOINTS.ROOT}
              >
                <Icons.hashnode className="w-full fill-current dark:hidden" />
                <Icons.hashnodeDark className="w-full fill-current hidden dark:block" />
              </Link>
              <Button variant="ghost" onClick={onClose}>
                <Icons.close />
              </Button>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <nav className="py-4 px-3 list-none p-0 m-0">
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
  renderType?: "default" | "drawer";
}

MainHeader.Navigation = function Item({ item, renderType }: ItemProps) {
  switch (item.type) {
    case "link": {
      return <MainHeader.Link item={item} renderType={renderType} />;
    }
    case "dropdown": {
      return <MainHeader.Dropdown item={item} renderType={renderType} />;
    }
    case "external_link": {
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
    typeof item.href === "function" ? item.href(params) : item.href ?? "#";
  return (
    <NavLink
      to={to}
      unstable_viewTransition
      className={({ isActive }) => {
        return cn(
          buttonVariants({
            variant: "ghost",
            size: "default",
          }),
          styles.btn_common,
          styles.link,
          isActive && styles.active,
          renderType === "drawer" ? styles.drawer_link : undefined
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
            "group",
            styles.btn_common,
            styles.link,
            renderType === "drawer" ? styles.drawer_dropdown : undefined
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
    typeof item.href === "function" ? item.href(params) : item.href ?? "#";
  return (
    <a
      href={to}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "default",
        }),
        styles.btn_common,
        styles.link,
        renderType === "drawer" ? styles.drawer_link : undefined
      )}
      target="_blank"
      rel="noreferrer"
    >
      {item.title}
    </a>
  );
};
