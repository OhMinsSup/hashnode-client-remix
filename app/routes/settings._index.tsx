import React from "react";
import { Icons } from "~/components/shared/Icons";
import { useOptionalSession } from "~/api/user/hooks/useSession";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = (args: ActionArgs) => { }

export default function Profile() {
  const session = useOptionalSession()
  console.log(session)
  return (
    <div className="content">
      <div className="flex flex-row flex-wrap">
        <div className="w-full lg:w-1/2 lg:pr-10">
          <h4 className="mb-5 text-xl font-bold text-slate-900">Basic Info</h4>
          <div className="mb-6">
            <label htmlFor="nameField" className="input-label">
              Full name
            </label>
            <input
              type="text"
              className="input-text "
              id="nameField"
              placeholder="Enter your full name"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="tagline" className="input-label">
              Profile Tagline
            </label>
            <input
              type="text"
              className="input-text"
              id="tagline"
              placeholder="Software Developer @ …"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="nameField" className="input-label">
              Profile Photo
            </label>
            <label className="input-upload" id="customFile">
              <Icons.Cloud className="h-10 w-10 fill-current" />
              <span className="mt-2 text-xs font-semibold leading-normal">
                Upload Photo
              </span>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                className="hidden"
                id="customFile"
              ></input>
            </label>
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="input-label">
              Location
            </label>
            <input
              type="text"
              className="input-text"
              id="location"
              placeholder="California, US"
              value=""
            />
          </div>
          <h4 className="mb-5 mt-10 text-xl font-bold text-slate-900">
            About You
          </h4>
          <div className="mb-6">
            <label htmlFor="moreAboutYou" className="input-label">
              Profile Bio (About you)
            </label>
            <textarea
              className="input-text min-h-30"
              id="moreAboutYou"
              placeholder="I am a developer from …"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="skills" className="input-label">
              Tech Stack
            </label>
            <textarea
              className="input-text min-h-30"
              id="skills"
              placeholder="Search technologies, topics, more…"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="availableFor" className="input-label">
              Available for
            </label>
            <textarea
              className="input-text min-h-30"
              id="availableFor"
              placeholder="I am available for mentoring, …"
              value=""
            />
            <small className="ml-2 mt-1 block leading-tight text-slate-600">
              140/140
            </small>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h4 className="mb-5 text-xl font-bold text-slate-900">Social</h4>
          <div className="mb-6">
            <label htmlFor="url" className="input-label">
              Twitter Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://twitter\.com\/(.+)|(http|https)://www\.twitter\.com\/(.+)"
              className="input-text"
              id="twitter"
              placeholder="https://twitter.com/johndoe"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="instagram" className="input-label">
              Instagram Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://instagram\.com\/(.+)|(http|https)://www\.instagram\.com\/(.+)"
              className="input-text"
              id="instagram"
              placeholder="https://instagram.com/johndoe"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="github" className="input-label">
              GitHub Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://github\.com\/(.+)|(http|https)://www\.github\.com\/(.+)"
              className="input-text"
              id="github"
              placeholder="https://github.com/hashnode"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="facebook" className="input-label">
              Facebook Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://facebook\.com\/(.+)|(http|https)://www\.facebook\.com\/(.+)|(http|https)://fb\.com\/(.+)|(http|https)://www\.fb\.com\/(.+)"
              className="input-text"
              id="facebook"
              placeholder="https://facebook.com/johndoe"
              value=""
            />
          </div>
          <div className="mb-6">
            <label htmlFor="website" className="input-label">
              Website URL
            </label>
            <input
              type="url"
              className="input-text"
              id="website"
              placeholder="https://johndoe.com"
              value=""
            />
          </div>
          <h4 className="mb-5 mt-10 text-xl font-bold text-slate-900">
            Profile Identity
          </h4>
          <div className="mb-6">
            <label htmlFor="username" className="input-label">
              username
            </label>
            <small className="input-help">
              You can change username once. This is the last chance.
            </small>
            <div className="relative">
              <input
                type="text"
                className="input-text "
                id="username"
                placeholder=""
                value="veloss990"
              />
              <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="input-label">
              Email address
            </label>
            <small className="input-help">
              Changing your email address might break your OAuth sign-in if your
              social media accounts do not use the same email address. Please
              use magic link sign-in if you encounter such an issue.
            </small>
            <div className="relative">
              <input
                type="email"
                className="input-text"
                id="email"
                placeholder=""
                value=""
              />
              <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4">
        <button className="btn-submit">Update</button>
      </div>
    </div>
  );
}
