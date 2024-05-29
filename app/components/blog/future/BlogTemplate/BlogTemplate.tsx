import { useCallback } from 'react';
import { Link, NavLink } from '@remix-run/react';

import { BlogUserMenu } from '~/components/blog/future/BlogUserMenu';
import { Icons } from '~/components/icons';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { badgeVariants } from '~/components/ui/badge';
import { Button, buttonVariants } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { NAV_CONFIG } from '~/constants/navigation';
import { Theme, useTheme } from '~/context/useThemeContext';
import { distanceInWordsToNow, FORMAT, getDateFormat } from '~/libs/date';
import { useOptionalSession } from '~/libs/hooks/useSession';
import { cn } from '~/services/libs';
import styles from './styles.module.css';

interface BlogTemplateProps {
  children?: React.ReactNode;
}

export default function BlogTemplate() {
  return <div>BlogTemplate</div>;
}

BlogTemplate.Headers = function Item() {
  return (
    <header className="blog-header relative z-50 w-full transform-none border-b border-transparent md:sticky md:left-0 md:top-0 md:border-none md:backdrop-blur-lg">
      <div className="container mx-auto px-2 md:px-4 md:py-1 2xl:px-10">
        <BlogTemplate.Header />
        <BlogTemplate.SubHeader />
      </div>
    </header>
  );
};

BlogTemplate.Header = function Item() {
  return (
    <div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:py-4">
      <BlogTemplate.HeaderLeft />
      <BlogTemplate.HeaderRight />
    </div>
  );
};

BlogTemplate.HeaderLeft = function Item() {
  const session = useOptionalSession();

  return (
    <div className="mb-2 flex flex-row items-center md:mb-0">
      {session ? (
        <Link
          to={PAGE_ENDPOINTS.BLOG.ID(session.id)}
          unstable_viewTransition
          className={styles.header_left_btn_back}
          aria-label="Back to Blog Home"
        >
          <Icons.chevronLeft />
        </Link>
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          href="#"
          className={styles.header_left_btn_back}
          aria-label="Back to Blog Home"
        >
          <Icons.chevronLeft />
        </a>
      )}
      <div className="mr-2">
        <Button size="icon" variant="ghost">
          <Icons.menu />
        </Button>
      </div>
      <div className="hidden md:block">
        <h1 className="blog-title font-heading break-words text-left text-lg font-semibold leading-snug md:text-xl md:font-bold">
          {session ? (
            <Link
              to={PAGE_ENDPOINTS.BLOG.ID(session.id)}
              unstable_viewTransition
              className={styles.header_left_title_link}
              aria-label={session.Blog?.title}
            >
              {session.Blog?.title}
            </Link>
          ) : (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              href="#"
              className={styles.header_left_title_link}
              aria-label="Untitled"
            >
              Untitled
            </a>
          )}
        </h1>
      </div>
    </div>
  );
};

BlogTemplate.HeaderRight = function Item() {
  const session = useOptionalSession();

  const [theme, setTheme] = useTheme();

  const onToggleTheme = useCallback(() => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    );
  }, [setTheme]);

  return (
    <div className="flex flex-row items-center space-x-2">
      <Button variant="ghost" aria-label="Open Blog searchbar">
        <Icons.search />
      </Button>
      <Button variant="ghost" aria-label="Toggle Theme" onClick={onToggleTheme}>
        {theme === Theme.DARK ? <Icons.sun /> : <Icons.moon />}
      </Button>
      {session ? (
        <Link
          to="/"
          className={cn(
            buttonVariants({
              variant: 'secondary',
            }),
            'hidden space-x-2 md:flex',
          )}
          aria-label="hashnode.com, blog dashboard"
        >
          <Icons.settings />
          <span>Dashboard</span>
        </Link>
      ) : null}
      {session ? (
        <BlogUserMenu session={session} />
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
              unstable_viewTransition
              to={PAGE_ENDPOINTS.AUTH.SIGNIN}
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
  );
};

BlogTemplate.SubHeader = function Item({ children }: BlogTemplateProps) {
  const renderDashboardButton = useCallback(() => {
    return (
      <Link
        to="/"
        className={cn(
          buttonVariants({
            variant: 'secondary',
          }),
          'space-x-2',
        )}
        aria-label="hashnode.com, blog dashboard"
      >
        <Icons.settings />
        <span>Dashboard</span>
      </Link>
    );
  }, []);

  return (
    <div className="blog-sub-header mb-4 md:hidden">
      <div className="mx-0 mb-2 hidden w-full flex-row items-center md:flex">
        <div className="mb-0 ml-auto flex flex-row items-center justify-center gap-x-3">
          {renderDashboardButton()}
        </div>
      </div>
      <div className="mb-2 flex w-full flex-col items-center md:hidden">
        <div className="mb-6 flex flex-row items-center justify-center gap-x-3">
          {renderDashboardButton()}
        </div>
      </div>
      {children}
    </div>
  );
};

interface WriterProps {
  username: SerializeSchema.SerializePost<false>['User']['UserProfile']['username'];
  image?: SerializeSchema.SerializePost<false>['image'];
  title: SerializeSchema.SerializePost<false>['title'];
  subTitle: SerializeSchema.SerializePost<false>['subTitle'];
  createdAt: SerializeSchema.SerializePost<false>['createdAt'];
}

BlogTemplate.Writer = function Item({
  image,
  title,
  subTitle,
  createdAt,
  username,
}: WriterProps) {
  return (
    <div className="blog-article-page container relative mx-auto grid grid-cols-8">
      <div className="col-span-full lg:col-span-6 lg:col-start-2">
        <BlogTemplate.Cover image={image} title={title} />
        <BlogTemplate.Title title={title} />
        <BlogTemplate.Subtile subTitle={subTitle} />
        <BlogTemplate.WriterProfile createdAt={createdAt} username={username} />
        <BlogTemplate.WriterOther />
      </div>
    </div>
  );
};

BlogTemplate.WriterOther = function Item() {
  return (
    <div className="-mt-7 mb-8 flex flex-col items-center md:mb-14 md:flex-row md:justify-center">
      <Button
        type="button"
        className="group mb-2 ml-0 mt-4 flex flex-row items-center overflow-hidden rounded-full bg-slate-100 pl-2 pr-1 text-sm font-semibold leading-snug text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 hover:dark:bg-slate-700 md:mb-0 md:ml-4 md:mt-0"
      >
        <div className="mr-3 p-2">
          <Icons.doubleLikes className="h-6 w-6 stroke-current" />
        </div>
        <div className="border-1-1/2 [&amp;:not(:first-of-type)]:-ml-3 relative h-8 w-8 rounded-full border-slate-100 bg-white group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-600 group-hover:dark:border-slate-700">
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>{' '}
        <div
          className="border-1-1/2 relative h-8 w-8 rounded-full border-slate-100 bg-white group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-600 group-hover:dark:border-slate-700 [&:not(:first-of-type)]:-ml-3"
          style={{ zIndex: 1 }}
        >
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div
          className="border-1-1/2 relative h-8 w-8 rounded-full border-slate-100 bg-white group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-600 group-hover:dark:border-slate-700 [&:not(:first-of-type)]:-ml-3"
          style={{ zIndex: 2 }}
        >
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div
          className="border-1-1/2 relative h-8 w-8 rounded-full border-slate-100 bg-white group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-600 group-hover:dark:border-slate-700 [&:not(:first-of-type)]:-ml-3"
          style={{ zIndex: 3 }}
        >
          <Avatar className="size-full">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div
          className="border-1-1/2 relative -ml-3 flex h-8 items-center justify-center overflow-hidden rounded-full border-slate-100 bg-white px-1 group-hover:border-slate-200 dark:border-slate-800 dark:bg-slate-600 group-hover:dark:border-slate-700"
          style={{ zIndex: 4, minWidth: '2rem' }}
        >
          <p className="truncate text-xs font-normal">+3</p>
        </div>
      </Button>
    </div>
  );
};

BlogTemplate.WriterProfile = function Item({
  createdAt,
  username,
}: Pick<WriterProps, 'createdAt' | 'username'>) {
  return (
    <div className="relative z-20 mb-8 flex flex-row flex-wrap items-center justify-center px-4 md:-mt-7 md:mb-14 md:text-lg last:md:mb-10">
      <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:!w-auto md:justify-start">
        <div className="h-10 w-10  overflow-hidden  rounded-full bg-slate-200 dark:bg-white/20 md:mr-3 md:h-12 md:w-12">
          <Link to="/" className="relative block size-full">
            <Avatar className="cursor-pointer hover:opacity-80">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <Link
          to="/"
          className="ml-2 font-semibold text-slate-600 dark:text-white md:ml-0"
        >
          <span>{username}</span>
        </Link>
      </div>
      <div className="mb-5 flex w-full flex-row items-center justify-center md:mb-0 md:!w-auto md:justify-start">
        <span className="mx-3 hidden font-bold text-slate-500 md:block">·</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="text-slate-700 dark:text-slate-400">
                <span>{getDateFormat(createdAt)}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getDateFormat(createdAt, FORMAT.YYYYMMDD_HHMMSS)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="mx-3 block font-bold text-slate-500">·</span>
        <p className="flex flex-row items-center text-slate-700 dark:text-slate-400">
          <Icons.bookOpen className="mr-2 h-5 w-5 opacity-75" />
          <span>{distanceInWordsToNow(createdAt)} read</span>
        </p>
      </div>
    </div>
  );
};

BlogTemplate.Title = function Item({ title }: Pick<WriterProps, 'title'>) {
  return (
    <div className="font-heading mb-8 mt-6 break-words px-4 text-center text-3xl font-bold text-slate-900 dark:text-white md:mb-14 md:mt-10 md:px-5 md:text-4xl lg:px-8 xl:px-20 xl:text-5xl">
      <h1 className="leading-tight" data-query="post-title">
        {title}
      </h1>
    </div>
  );
};

BlogTemplate.Subtile = function Item({
  subTitle,
}: Pick<WriterProps, 'subTitle'>) {
  if (!subTitle) return null;
  return (
    <div className="font-heading mb-8 px-4 text-center md:mb-14 md:px-5 lg:px-8 xl:px-20">
      <h2 className="text-2xl leading-snug text-slate-700 dark:text-slate-400 md:text-3xl xl:text-3xl">
        {subTitle}
      </h2>
    </div>
  );
};

BlogTemplate.Cover = function Item({
  image,
  title,
}: Pick<WriterProps, 'title' | 'image'>) {
  if (!image) return null;

  return (
    <div className="relative">
      <AspectRatio ratio={16 / 9}>
        <img
          src={image}
          alt={`Cover for ${title}`}
          decoding="async"
          className="h-full w-full rounded object-cover"
        />
      </AspectRatio>
    </div>
  );
};

BlogTemplate.Navbar = function Item() {
  return (
    <div className="relative mt-8 hidden flex-row items-center justify-center overflow-hidden text-base md:flex">
      <div className="scrollbar-container overflow-hidden">
        <nav className="relative flex flex-row flex-nowrap items-end whitespace-nowrap px-2 pt-2">
          {NAV_CONFIG.blogTabs.map((item) => (
            <NavLink
              key={`blog-tab-${item.id}`}
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  size: 'lg',
                }),
                'group-focus:ring-offset-custom-header rounded-b-none font-semibold text-white text-opacity-100 ring-offset-2 transition-colors duration-150 hover:bg-white/20 group-focus:ring group-focus:ring-white/80 dark:text-opacity-100',
              )}
              to={'/'}
            >
              <span className="mb-2 px-2 py-1 text-lg">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

BlogTemplate.ContentWrapper = function Item({ children }: BlogTemplateProps) {
  return (
    <div className="relative z-40">
      <main className="mb-24">
        <article>{children}</article>
      </main>
    </div>
  );
};

interface BlogTemplateContentProps extends BlogTemplateProps {
  tags?: SerializeSchema.SerializePost<false>['PostTags'];
}

BlogTemplate.Content = function Item({
  children,
  tags,
}: BlogTemplateContentProps) {
  return (
    <div className="blog-content-wrapper article-main-wrapper container relative z-30 mx-auto grid grid-flow-row grid-cols-8 xl:gap-6 2xl:grid-cols-10">
      <div className="blog-content-main relative z-20 col-span-8 mb-10 px-4 md:z-10 lg:col-span-6 lg:col-start-2 lg:px-0 xl:col-span-6 xl:col-start-2 2xl:col-span-6 2xl:col-start-3">
        <div className="relative">
          <div id="post-content-parent" className="relative mb-10 pb-14">
            {children}
          </div>
          <BlogTemplate.Tags tags={tags} />
          <BlogTemplate.WriterInfo />
        </div>
      </div>
    </div>
  );
};

BlogTemplate.Tags = function Item({
  tags,
}: Pick<BlogTemplateContentProps, 'tags'>) {
  if (!tags) return null;

  if (tags.length === 0) return null;

  return (
    <div className="mb-5 flex w-full flex-row flex-wrap justify-center md:mb-0">
      {tags?.map((tag) => (
        <Link key={tag.id} to="/" className={cn(badgeVariants(), 'mb-3 mr-3')}>
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

BlogTemplate.WriterInfo = function Item() {
  return (
    <div className="mb-5 mt-10 flex flex-col gap-16">
      <div className="flex-1 px-2">
        <div className="flex flex-col flex-wrap items-start md:flex-nowrap">
          <h3 className="mb-4 w-full pb-2 text-base font-medium tracking-wider text-slate-500 dark:border-slate-800 dark:text-slate-400 ">
            <span>Written by</span>
            <Separator className="mt-4" orientation="horizontal" />
          </h3>
          <div className="flex w-full flex-col gap-12">
            <div className="flex w-full flex-1 flex-col md:!flex-row">
              <div className="mb-4 flex w-full flex-1 flex-row md:mb-0 ">
                <div className="mr-4 flex flex-row md:mb-0">
                  <Link
                    to="/"
                    className="block h-10 w-10 overflow-hidden rounded-full border dark:border-slate-800 md:h-14 md:w-14"
                  >
                    <Avatar className="size-full">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
                <div className="flex flex-1 flex-col justify-center md:justify-start">
                  <div className="flex flex-row items-center md:mb-1">
                    <h1 className="font-sans text-lg font-semibold text-slate-800 dark:text-slate-100">
                      <a href="https://hashnode.com/@k33g">
                        Philippe Charrière
                      </a>
                    </h1>
                  </div>
                  <div className="hidden pr-2 md:block">
                    <div className="prose dark:prose-dark text-slate-600 dark:text-slate-300">
                      <p>
                        {`I'm on BlueSky{' '}`}
                        <a href="https://bsky.app/profile/k33gorg.bsky.social">
                          https://bsky.app/profile/k33gorg.bsky.social
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4 block md:hidden ">
                <div className="prose dark:prose-dark text-slate-600 ">
                  <p>
                    {`I'm on BlueSky`}{' '}
                    <a href="https://bsky.app/profile/k33gorg.bsky.social">
                      https://bsky.app/profile/k33gorg.bsky.social
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start ">
                <Button variant="outline">Follow</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogTemplate.Footer = function Item() {
  const session = useOptionalSession();

  return (
    <footer className="blog-footer-area -mt-px border-t bg-slate-100 px-5 py-10 text-center text-slate-800 dark:border-slate-800 dark:bg-black dark:text-slate-500 md:px-10 md:py-12 lg:py-20">
      <div className="blog-footer-credits flex flex-col items-center justify-center">
        <div className="mb-12 flex flex-col flex-wrap items-center">
          <p className="mb-2 text-slate-600 dark:text-slate-300">
            {session?.Blog?.title}
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center text-slate-600 dark:text-slate-300">
            <a
              href="https://hashnode.com/privacy?source=blog-footer"
              className="mx-2 underline"
            >
              Privacy policy
            </a>
            <span className="font-extrabold text-black opacity-20 dark:text-white">
              .
            </span>
            <a
              className="mx-2 underline"
              href="https://hashnode.com/terms?source=blog-footer"
            >
              Terms
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Link
            aria-label="Publish with Hashnode"
            className="font-heading mb-4 flex flex-row items-center rounded-lg border border-slate-300 bg-white p-3 font-medium text-slate-600 transition-colors duration-75 hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:bg-black dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
            to={PAGE_ENDPOINTS.ROOT}
            unstable_viewTransition
          >
            <span className="mr-2 block text-blue-600">
              <Icons.hashnodeTypeHeaderMobile className=" w-8 fill-current" />
            </span>
            <span>Write on Hashnode</span>
          </Link>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Powered by{' '}
            <Link
              aria-label="Hashnode"
              to={PAGE_ENDPOINTS.ROOT}
              unstable_viewTransition
              className="underline"
            >
              Hashnode
            </Link>{' '}
            - Home for tech writers and readers
          </p>
        </div>
      </div>
    </footer>
  );
};

BlogTemplate.displayName = 'BlogTemplate';
