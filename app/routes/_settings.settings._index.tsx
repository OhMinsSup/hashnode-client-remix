import { json } from "@remix-run/cloudflare";

import Input from "~/components/setting/Input";
import Textarea from "~/components/setting/Textarea";
import AvailableCount from "~/components/setting/AvailableCount";
import InputIdentity from "~/components/setting/InputIdentity";
import InputTechStack from "~/components/setting/InputTechStack";
import InputProfileImage from "~/components/setting/InputProfileImage";
import SettingFormLayout from "~/components/setting/SettingFormLayout";

// hooks
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import type { ActionArgs, V2_MetaFunction } from "@remix-run/cloudflare";

export const meta: V2_MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Change settings — Hashnode",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "description" &&
      meta.name !== "og:title" &&
      meta.name !== "og:description" &&
      meta.name !== "twitter:title" &&
      meta.name !== "twitter:description" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    {
      title: Seo.title,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
  ];
};

export const action = async ({ context, request }: ActionArgs) => {
  const response = await context.api.user.updateByUser(request);
  if (response instanceof Response) return response;
  return json(response);
};

export type Action = typeof action;

export default function Routes() {
  return (
    <SettingFormLayout>
      <div className="flex flex-row flex-wrap">
        <div className="w-full lg:w-1/2 lg:pr-10">
          <h4 className="mb-5 text-xl font-bold text-slate-900">Basic Info</h4>
          <div className="mb-6">
            <Input
              type="text"
              text="Full name"
              id="nameField"
              name="name"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              text="Profile Tagline"
              id="tagline"
              name="tagline"
              placeholder="Software Developer @ …"
            />
          </div>
          <div className="mb-6">
            <InputProfileImage />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              text="Location"
              id="location"
              name="location"
              placeholder="California, US"
            />
          </div>
          <h4 className="mb-5 mt-10 text-xl font-bold text-slate-900">
            About You
          </h4>
          <div className="mb-6">
            <Textarea
              id="moreAboutYou"
              name="bio"
              text="Profile Bio (About you)"
              placeholder="I am a developer from …"
            />
          </div>
          <div className="mb-6">
            <InputTechStack />
          </div>
          <div className="mb-6">
            <Textarea
              id="availableFor"
              text="Available for"
              name="availableText"
              placeholder="I am available for mentoring, …"
            />
            <AvailableCount />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h4 className="mb-5 text-xl font-bold text-slate-900">Social</h4>
          <div className="mb-6">
            <Input
              type="url"
              id="twitter"
              text="Twitter Profile"
              name="socials.twitter"
              placeholder="https://twitter.com/johndoe"
              pattern="(http|https)://twitter\.com\/(.+)|(http|https)://www\.twitter\.com\/(.+)"
            />
          </div>
          <div className="mb-6">
            <Input
              type="url"
              id="instagram"
              text="Instagram Profile"
              name="socials.instagram"
              placeholder="https://instagram.com/johndoe"
              pattern="(http|https)://instagram\.com\/(.+)|(http|https)://www\.instagram\.com\/(.+)"
            />
          </div>
          <div className="mb-6">
            <Input
              type="url"
              id="github"
              text="GitHub Profile"
              name="socials.github"
              placeholder="https://github.com/hashnode"
              pattern="(http|https)://github\.com\/(.+)|(http|https)://www\.github\.com\/(.+)"
            />
          </div>
          <div className="mb-6">
            <Input
              type="url"
              id="facebook"
              text="Facebook Profile"
              name="socials.facebook"
              placeholder="https://facebook.com/johndoe"
              pattern="(http|https)://facebook\.com\/(.+)|(http|https)://www\.facebook\.com\/(.+)|(http|https)://fb\.com\/(.+)|(http|https)://www\.fb\.com\/(.+)"
            />
          </div>
          <div className="mb-6">
            <Input
              type="url"
              id="website"
              text="Website URL"
              name="socials.website"
              placeholder="https://johndoe.com"
            />
          </div>
          <h4 className="mb-5 mt-10 text-xl font-bold text-slate-900">
            Profile Identity
          </h4>
          <div className="mb-6">
            <InputIdentity
              type="text"
              id="username"
              name="username"
              text="username"
              desc="You can change username once. This is the last chance."
            />
          </div>
          <div className="mb-6">
            <InputIdentity
              type="email"
              id="email"
              name="email"
              text="Email address"
              desc={`Changing your email address might break your OAuth sign-in if your
              social media accounts do not use the same email address. Please
              use magic link sign-in if you encounter such an issue.`}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4">
        <button className="btn-submit" type="submit">
          Update
        </button>
      </div>
    </SettingFormLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
