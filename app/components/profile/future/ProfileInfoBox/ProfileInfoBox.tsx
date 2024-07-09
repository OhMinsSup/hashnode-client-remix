import { Link, useLoaderData } from '@remix-run/react';
import { AvatarImage } from '@radix-ui/react-avatar';

import type { RoutesLoaderData } from '~/.server/routes/profile/profile.$username.loader';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { PAGE_ENDPOINTS } from '~/constants/constant';

export default function ProfileInfoBox() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <>
      <div>
        <div className="mb-4 mt-6 flex w-full flex-row flex-wrap items-start py-5">
          <Link
            to={PAGE_ENDPOINTS.PROFILE.USERNAME(
              data.result.UserProfile.username,
            )}
            className="relative mb-5 block size-24 rounded-full md:mb-0 lg:size-40"
            aria-label={`Go to ${data.result.UserProfile.username}'s profile page`}
          >
            <Avatar className="relative size-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>
                {data.result.UserProfile.username}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col items-start md:flex-1 md:pl-5 lg:pl-10">
            <div className="flex w-full flex-wrap items-start justify-between">
              <div className="mb-5 w-full pr-5 md:mb-0 md:flex-1">
                <div className="flex flex-row items-center">
                  <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    <Link
                      itemProp="url"
                      to={PAGE_ENDPOINTS.PROFILE.USERNAME(
                        data.result.UserProfile.username,
                      )}
                      aria-label={`Go to ${data.result.UserProfile.username}'s profile page`}
                    >
                      <span itemProp="name">
                        {data.result.UserProfile.username}
                      </span>
                    </Link>
                  </h1>
                </div>
                {data.result.UserProfile.tagline ? (
                  <p itemProp="description" className="mt-2 leading-7">
                    {data.result.UserProfile.tagline}
                  </p>
                ) : null}
              </div>
              <div>Right</div>
            </div>
            <div className="mt-5 flex flex-wrap items-center md:justify-center">
              <Link
                to={PAGE_ENDPOINTS.PROFILE.FOLLOWERS(
                  data.result.UserProfile.username,
                )}
                aria-label={`Go to ${data.result.UserProfile.username}'s profile followers page`}
                className="mr-5 leading-loose"
              >
                <span className="font-bold">3</span>
                &nbsp; Followers
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 flex flex-col flex-wrap rounded-md border px-2 py-5">
        ProfileInfoBox
      </div>
    </>
  );
}
