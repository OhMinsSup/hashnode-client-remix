import React from "react";
import styles from "./styles.module.css";
import { SettingInput } from "~/components/setting/future/SettingInput";
import { SettingTextarea } from "~/components/setting/future/SettingTextarea";
import { SettingInputIdentity } from "~/components/setting/future/SettingInputIdentity";
import { SettingInputTechStack } from "~/components/setting/future/SettingInputTechStack";
import { SettingProfileImage } from "~/components/setting/future/SettingProfileImage";

export default function SettingUserArea() {
  return (
    <div className={styles.root}>
      <div>
        <div className="flex flex-row flex-wrap">
          <div className="w-full lg:w-1/2 lg:pr-10">
            <h4 className={styles.title}>Basic Info</h4>
            <div className="mb-6">
              <SettingInput
                type="text"
                text="Full name"
                id="nameField"
                name="name"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                type="text"
                text="Profile Tagline"
                id="tagline"
                name="tagline"
                placeholder="Software Developer @ …"
              />
            </div>
            <div className="mb-6">
              <SettingProfileImage />
            </div>
            <div className="mb-6">
              <SettingInput
                type="text"
                text="Location"
                id="location"
                name="location"
                placeholder="California, US"
              />
            </div>
            <h4 className={styles.title}>About You</h4>
            <div className="mb-6">
              <SettingTextarea
                id="moreAboutYou"
                name="bio"
                text="Profile Bio (About you)"
                placeholder="I am a developer from …"
              />
            </div>
            <div className="mb-6">
              <SettingInputTechStack />
            </div>
            <div className="mb-6">
              <SettingTextarea
                id="availableFor"
                text="Available for"
                name="availableText"
                placeholder="I am available for mentoring, …"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h4 className={styles.title}>Social</h4>
            <div className="mb-6">
              <SettingInput
                type="url"
                id="twitter"
                text="Twitter Profile"
                name="socials.twitter"
                placeholder="https://twitter.com/johndoe"
                pattern="(http|https)://twitter\.com\/(.+)|(http|https)://www\.twitter\.com\/(.+)"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                type="url"
                id="instagram"
                text="Instagram Profile"
                name="socials.instagram"
                placeholder="https://instagram.com/johndoe"
                pattern="(http|https)://instagram\.com\/(.+)|(http|https)://www\.instagram\.com\/(.+)"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                type="url"
                id="github"
                text="GitHub Profile"
                name="socials.github"
                placeholder="https://github.com/hashnode"
                pattern="(http|https)://github\.com\/(.+)|(http|https)://www\.github\.com\/(.+)"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                type="url"
                id="facebook"
                text="Facebook Profile"
                name="socials.facebook"
                placeholder="https://facebook.com/johndoe"
                pattern="(http|https)://facebook\.com\/(.+)|(http|https)://www\.facebook\.com\/(.+)|(http|https)://fb\.com\/(.+)|(http|https)://www\.fb\.com\/(.+)"
              />
            </div>
            <div className="mb-6">
              <SettingInput
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
              <SettingInputIdentity
                type="text"
                id="username"
                name="username"
                text="username"
                desc="You can change username once. This is the last chance."
              />
            </div>
            <div className="mb-6">
              <SettingInputIdentity
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
      </div>
      <div className="mt-5 pt-4">
        <button className="button-primary big" type="submit">
          Update
        </button>
      </div>
    </div>
  );
}
