import React from 'react';
import { useLoaderData, useLocation } from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/auth/auth-layout.loader';
import { Icons } from '~/components/icons';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { cn } from '~/services/libs';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const data = useLoaderData<RoutesLoaderData>();

  const location = useLocation();

  return (
    <>
      <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Icons.hashnode className="w-36 fill-current md:w-44" />
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p
                className={cn(
                  'text-lg',
                  `before:content-['"'] after:content-['"']`,
                )}
              >
                {data.result.description}
              </p>
              <footer className="text-sm">{data.result.username}</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">
                {
                  {
                    [PAGE_ENDPOINTS.AUTH.SIGNIN]: 'Login to Hashnode',
                    [PAGE_ENDPOINTS.AUTH.SIGNUP]: 'Join Hashnode',
                  }[location.pathname]
                }
              </h1>
              <p className="text-sm text-muted-foreground">
                {
                  {
                    [PAGE_ENDPOINTS.AUTH.SIGNIN]:
                      'Login to your Hashnode account',
                    [PAGE_ENDPOINTS.AUTH.SIGNUP]: 'Join the Hashnode community',
                  }[location.pathname]
                }
              </p>
            </div>
            {children}
            <div>
              <p className="mt-6 px-8 text-center text-sm text-muted-foreground">
                By clicking login, you agree to our{' '}
                <a
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
