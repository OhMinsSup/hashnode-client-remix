import styles from "./styles.module.css";
import { SettingInput } from "~/components/setting/future/SettingInput";
import { SettingTextarea } from "~/components/setting/future/SettingTextarea";
import { SettingInputIdentity } from "~/components/setting/future/SettingInputIdentity";
import { SettingInputTechStack } from "~/components/setting/future/SettingInputTechStack";
// import { SettingProfileImage } from "~/components/setting/future/SettingProfileImage";
import { SettingTagsProvider } from "~/components/setting/context/setting-tag";
import { useSession } from "~/services/hooks/useSession";
import { cn } from "~/utils/util";
import {
  getInputProps,
  getTextareaProps,
  useField,
  useFormMetadata,
} from "@conform-to/react";
import { FormFieldValues } from "~/services/validate/user-update-api.validate";
import { FORM_ID } from "~/components/setting/context/form";
import { useMemo } from "react";

export default function SettingUserArea() {
  const formMetadata = useFormMetadata<FormFieldValues>(FORM_ID);
  const fields = formMetadata.getFieldset();

  const session = useSession();

  const initialTags = useMemo(() => {
    return (session?.userTags ?? []).map((tag) => tag.name);
  }, [session]);

  const socialsFieldset = fields.socials.getFieldset();

  const [metaNickname] = useField(fields.nickname.name);

  const [metaTagline] = useField(fields.tagline.name);

  const [metaLocation] = useField(fields.location.name);

  const [metaBio] = useField(fields.bio.name);

  const [metaTwitter] = useField(socialsFieldset.twitter.name);

  const [metaInstagram] = useField(socialsFieldset.instagram.name);

  const [metaGithub] = useField(socialsFieldset.github.name);

  const [metaFacebook] = useField(socialsFieldset.facebook.name);

  const [metaWebsite] = useField(socialsFieldset.website.name);

  const [metaAvailableText] = useField(fields.availableText.name);

  const [metaUsername] = useField(fields.username.name);

  const [metaEmail] = useField(fields.email.name);

  const textLength = formMetadata.value?.availableText?.length ?? 0;

  return (
    <div className={styles.root}>
      <div>
        <div className="flex flex-row flex-wrap">
          <div className="w-full lg:w-1/2 lg:pr-10">
            <h4 className={styles.title}>Basic Info</h4>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaNickname.id,
                }}
                inputProps={{
                  placeholder: "Enter your full name",
                  ...getInputProps(metaNickname, {
                    type: "text",
                  }),
                }}
                errors={metaNickname.errors}
                errorId={metaNickname.errorId}
                text="Full name"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaTagline.id,
                }}
                inputProps={{
                  placeholder: "Software Developer @ …",
                  ...getInputProps(metaTagline, {
                    type: "text",
                  }),
                }}
                errors={metaTagline.errors}
                errorId={metaTagline.errorId}
                text="Profile Tagline"
              />
            </div>
            <div className="mb-6">{/* <SettingProfileImage /> */}</div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaLocation.id,
                }}
                inputProps={{
                  placeholder: "California, US",
                  ...getInputProps(metaLocation, {
                    type: "text",
                  }),
                }}
                errors={metaLocation.errors}
                errorId={metaLocation.errorId}
                text="Location"
              />
            </div>
            <h4 className={styles.title}>About You</h4>
            <div className="mb-6">
              <SettingTextarea
                labelProps={{
                  htmlFor: metaBio.id,
                }}
                textareaProps={{
                  placeholder: "I am a developer from …",
                  ...getTextareaProps(metaBio),
                }}
                errors={metaBio.errors}
                errorId={metaBio.errorId}
                text="Profile Bio (About you)"
              />
            </div>
            <div className="mb-6">
              <SettingTagsProvider initialValue={initialTags}>
                <SettingInputTechStack />
              </SettingTagsProvider>
            </div>
            <div className="mb-6">
              <SettingTextarea
                labelProps={{
                  htmlFor: metaAvailableText.id,
                }}
                textareaProps={{
                  placeholder: "I am available for mentoring, …",
                  ...getTextareaProps(metaAvailableText),
                }}
                errors={metaAvailableText.errors}
                errorId={metaAvailableText.errorId}
                text="Available for"
                count={textLength}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h4 className={styles.title}>Social</h4>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaTwitter.id,
                }}
                inputProps={{
                  placeholder: "https://twitter.com/johndoe",
                  pattern:
                    "(http|https)://twitter.com/(.+)|(http|https)://www.twitter.com/(.+)",
                  ...getInputProps(metaTwitter, {
                    type: "url",
                  }),
                }}
                errors={metaTwitter.errors}
                errorId={metaTwitter.errorId}
                text="Twitter Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaInstagram.id,
                }}
                inputProps={{
                  placeholder: "https://instagram.com/johndoe",
                  pattern:
                    "(http|https)://instagram.com/(.+)|(http|https)://www.instagram.com/(.+)",
                  ...getInputProps(metaInstagram, {
                    type: "url",
                  }),
                }}
                errors={metaInstagram.errors}
                errorId={metaInstagram.errorId}
                text="Instagram Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaGithub.id,
                }}
                inputProps={{
                  placeholder: "https://github.com/johndoe",
                  pattern:
                    "(http|https)://github.com/(.+)|(http|https)://www.github.com/(.+)",
                  ...getInputProps(metaGithub, {
                    type: "url",
                  }),
                }}
                errors={metaGithub.errors}
                errorId={metaGithub.errorId}
                text="GitHub Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaFacebook.id,
                }}
                inputProps={{
                  placeholder: "https://facebook.com/johndoe",
                  pattern:
                    "(http|https)://facebook.com/(.+)|(http|https)://www.facebook.com/(.+)|(http|https)://fb.com/(.+)|(http|https)://www.fb.com/(.+)",
                  ...getInputProps(metaFacebook, {
                    type: "url",
                  }),
                }}
                errors={metaFacebook.errors}
                errorId={metaFacebook.errorId}
                text="Facebook Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: metaWebsite.id,
                }}
                inputProps={{
                  placeholder: "https://johndoe.com",
                  ...getInputProps(metaWebsite, {
                    type: "url",
                  }),
                }}
                errors={metaWebsite.errors}
                errorId={metaWebsite.errorId}
                text="Website URL"
              />
            </div>
            <h4 className={cn("mt-10", styles.title)}>Profile Identity</h4>
            <div className="mb-6">
              <SettingInputIdentity
                labelProps={{
                  htmlFor: metaUsername.id,
                }}
                inputProps={{
                  ...getInputProps(metaUsername, {
                    type: "text",
                  }),
                }}
                errors={metaUsername.errors}
                errorId={metaUsername.errorId}
                text="username"
                desc="You can change username once. This is the last chance."
              />
            </div>
            <div className="mb-6">
              <SettingInputIdentity
                labelProps={{
                  htmlFor: metaEmail.id,
                }}
                inputProps={{
                  ...getInputProps(metaEmail, {
                    type: "email",
                  }),
                }}
                errors={metaEmail.errors}
                errorId={metaEmail.errorId}
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
