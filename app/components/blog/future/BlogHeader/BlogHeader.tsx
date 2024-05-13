import { useCallback } from 'react';
import { Link, NavLink, useNavigate } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { UserMenu } from '~/components/shared/future/UserMenu';
import { Button, buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { NAV_CONFIG } from '~/constants/navigation';
import { Theme, useTheme } from '~/context/useThemeContext';
import { useOptionalSession } from '~/libs/hooks/useSession';
import { cn } from '~/services/libs';

export default function BlogHeader() {
  const navigate = useNavigate();

  const session = useOptionalSession();

  const [theme, setTheme] = useTheme();

  const onToggleTheme = useCallback(() => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK,
    );
  }, [setTheme]);

  const onSigninPage = useCallback(() => {
    navigate(PAGE_ENDPOINTS.AUTH.SIGNIN);
  }, [navigate]);

  const onSignupPage = useCallback(() => {
    navigate(PAGE_ENDPOINTS.AUTH.SIGNUP);
  }, [navigate]);

  return (
    <div
      className={cn(
        'relative z-50 w-full border-b border-transparent bg-blue-600 md:border-none',
      )}
    >
      <div className="container mx-auto px-2 md:px-4 2xl:px-10">
        {/* desktop */}
        <div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:mb-4">
          <div className="flex flex-row items-center py-1">
            <div className="text-white md:hidden">
              <Button size="icon" variant="ghost">
                <Icons.menu />
              </Button>
            </div>
            <div className="hidden md:block">
              <h1 className="blog-title font-heading break-words text-left text-xl font-semibold leading-snug text-white md:text-2xl md:font-bold">
                <a
                  href="/"
                  className="focus-ring-base focus-ring-colors-dark-header flex flex-row items-center"
                  aria-label="OhMinSup's team blog home page"
                >{`OhMinSup's team blog`}</a>
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center text-white">
            <Button variant="ghost" aria-label="Open Blog searchbar">
              <Icons.search />
            </Button>
            <Button
              variant="ghost"
              aria-label="Toggle Theme"
              onClick={onToggleTheme}
            >
              {theme === Theme.DARK ? <Icons.sun /> : <Icons.moon />}
            </Button>
            {session ? (
              <UserMenu />
            ) : (
              <>
                <Button
                  className="block md:hidden"
                  data-href={PAGE_ENDPOINTS.AUTH.SIGNIN}
                  onClick={onSigninPage}
                >
                  Sign in
                </Button>
                <section className="hidden gap-3 md:flex">
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
        <div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
          <h1 className="blog-title font-heading break-words text-center text-2xl font-semibold leading-snug text-white md:font-bold">
            <a
              href="/"
              className="focus-ring-base focus-ring-colors-dark-header flex flex-row items-center"
              aria-label="OhMinSup's team blog home page"
            >
              {`OhMinSup's team blog`}
            </a>
          </h1>
        </div>
        {/* blog-sub-header */}
        <div className="blog-sub-header">
          <div className="mx-0 mb-2 hidden w-full flex-row items-center md:flex">
            <div className="mb-0 ml-auto flex flex-row items-center justify-center gap-x-3">
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
            </div>
          </div>
          <div className="mb-2 flex w-full flex-col items-center md:hidden">
            <div className="mb-6 flex flex-row items-center justify-center gap-x-3">
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
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}
