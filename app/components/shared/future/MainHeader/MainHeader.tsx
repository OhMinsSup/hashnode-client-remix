import styles from "./styles.module.css";
import { Link, NavLink, useNavigate, useParams } from "@remix-run/react";
import { NAV_CONFIG, NavItem } from "~/constants/navigation";
import { Icons } from "~/components/icons";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button, buttonVariants } from "~/components/ui/button";
import { SearchDialog } from "~/components/shared/future/SearchhDialog";
import { SearchDialogProvider } from "~/context/useSearchDialogContext";
import { Theme, useTheme } from "~/context/useThemeContext";
import { useCallback } from "react";
import { useOptionalSession } from "~/services/hooks/useSession";
import { cn } from "~/services/libs";
import {
  CreditCard,
  Keyboard,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function MainHeader() {
  const navigate = useNavigate();

  const session = useOptionalSession();

  const [theme, setTheme] = useTheme();

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
              <div className="hidden md:block">
                <Button variant="ghost" aria-label="">
                  <Icons.bell />
                </Button>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className=" cursor-pointer hover:opacity-80">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

MainHeader.Menu = function Item() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" variant="link" className="xl:hidden">
          <Icons.menu className="w-6 fill-current" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-none inset-0 top-0 left-0 bottom-0 m-0 h-full w-[323px]">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

interface ItemProps {
  item: NavItem;
}

MainHeader.Navigation = function Item({ item }: ItemProps) {
  switch (item.type) {
    case "link": {
      return <MainHeader.Link item={item} />;
    }
    case "dropdown": {
      return <MainHeader.Dropdown item={item} />;
    }
    case "external_link": {
      return <MainHeader.ExternalLink item={item} />;
    }
    default: {
      return null;
    }
  }
};

MainHeader.Link = function Item({ item }: ItemProps) {
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
          isActive && styles.active
        );
      }}
    >
      {item.title}
    </NavLink>
  );
};

MainHeader.Dropdown = function Item({ item }: ItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("group", styles.btn_common)}>
          {item.title}
          <span className={'group-data-[state="open"]:-rotate-180'}>
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

MainHeader.ExternalLink = function Item({ item }: ItemProps) {
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
        styles.link
      )}
      target="_blank"
      rel="noreferrer"
    >
      {item.title}
    </a>
  );
};
