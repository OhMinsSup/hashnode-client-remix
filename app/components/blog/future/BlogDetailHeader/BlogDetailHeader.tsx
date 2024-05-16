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

export default function BlogDetailHeader() {
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
    <header
      style={{
        backgroundColor: 'rgb(41, 98, 255)',
        transform: 'translateY(0px)',
      }}
      className={cn(
        'blog-header relative z-50 w-full transform-none border-b border-transparent md:sticky md:left-0 md:top-0 md:border-none md:backdrop-blur-lg',
      )}
    >
      <div className="container mx-auto px-2 md:px-4 md:py-1 2xl:px-10">
        <div className="relative z-40 flex flex-row items-center justify-between pb-2 pt-8 md:py-4">
          <div className="mb-2 flex flex-row items-center text-white md:mb-0">
            <a
              href="/"
              className="blog-back-to-home-button focus-ring-base focus-ring-colors-dark-header mr-2 flex flex-row items-center rounded-full p-3 font-medium transition duration-100 ease-in-out hover:bg-white/20"
              aria-label="Back to blog home"
            >
              <Icons.chevronLeft />
            </a>
            <div className="mr-2">
              <Button size="icon" variant="ghost">
                <Icons.menu />
              </Button>
            </div>
            <div className="hidden md:block">
              <h1 className="blog-title font-heading break-words text-left text-lg font-semibold leading-snug text-white md:text-xl md:font-bold">
                <a
                  href="/"
                  className="focus-ring-base focus-ring-colors-dark-header flex flex-row items-center"
                  aria-label="OhMinSup's team blog home page"
                >{`OhMinSup's team blog`}</a>
              </h1>
            </div>
          </div>
          <div className="flex flex-row items-center text-white">
            asdasdsadsa
          </div>
        </div>
        <div className="mx-auto my-5 flex w-2/3 flex-row items-center justify-center md:hidden">
          2
        </div>
        <div className="blog-sub-header mb-4 md:hidden">3</div>
      </div>
    </header>
  );
}
