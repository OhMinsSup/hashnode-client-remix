import styles from "./styles.module.css";
import { SettingInput } from "~/components/setting/future/SettingInput";
import { SettingTextarea } from "~/components/setting/future/SettingTextarea";
import { SettingInputIdentity } from "~/components/setting/future/SettingInputIdentity";
import { SettingInputTechStack } from "~/components/setting/future/SettingInputTechStack";
import { SettingProfileImage } from "~/components/setting/future/SettingProfileImage";
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
  const form = useFormMetadata<FormFieldValues>(FORM_ID);
  const fields = form.getFieldset();

  const session = useSession();

  const initialTags = useMemo(() => {
    return (session?.userTags ?? []).map((tag) => tag.name);
  }, [session]);

  const socialsFieldset = fields.socials.getFieldset();

  const [nickname] = useField(fields.nickname.name);

  const [tagline] = useField(fields.tagline.name);

  const [location] = useField(fields.location.name);

  const [bio] = useField(fields.bio.name);

  const [twitter] = useField(socialsFieldset.twitter.name);

  const [instagram] = useField(socialsFieldset.instagram.name);

  const [github] = useField(socialsFieldset.github.name);

  const [facebook] = useField(socialsFieldset.facebook.name);

  const [website] = useField(socialsFieldset.website.name);

  const [availableText] = useField(fields.availableText.name);

  const [username] = useField(fields.username.name);

  const [email] = useField(fields.email.name);

  const textLength = form.value?.availableText?.length ?? 0;

  return (
    <div className={styles.root}>
      <div>
        <div className="flex flex-row flex-wrap">
          <div className="w-full lg:w-1/2 lg:pr-10">
            <h4 className={styles.title}>Basic Info</h4>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: nickname.id,
                }}
                inputProps={{
                  placeholder: "Enter your full name",
                  ...getInputProps(nickname, {
                    type: "text",
                  }),
                }}
                errors={nickname.errors}
                errorId={nickname.errorId}
                text="Full name"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: tagline.id,
                }}
                inputProps={{
                  placeholder: "Software Developer @ …",
                  ...getInputProps(tagline, {
                    type: "text",
                  }),
                }}
                errors={tagline.errors}
                errorId={tagline.errorId}
                text="Profile Tagline"
              />
            </div>
            <div className="mb-6">
              <SettingProfileImage />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: location.id,
                }}
                inputProps={{
                  placeholder: "California, US",
                  ...getInputProps(location, {
                    type: "text",
                  }),
                }}
                errors={location.errors}
                errorId={location.errorId}
                text="Location"
              />
            </div>
            <h4 className={styles.title}>About You</h4>
            <div className="mb-6">
              <SettingTextarea
                labelProps={{
                  htmlFor: bio.id,
                }}
                textareaProps={{
                  placeholder: "I am a developer from …",
                  ...getTextareaProps(bio),
                }}
                errors={bio.errors}
                errorId={bio.errorId}
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
                  htmlFor: availableText.id,
                }}
                textareaProps={{
                  placeholder: "I am available for mentoring, …",
                  ...getTextareaProps(availableText),
                }}
                errors={availableText.errors}
                errorId={availableText.errorId}
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
                  htmlFor: twitter.id,
                }}
                inputProps={{
                  placeholder: "https://twitter.com/johndoe",
                  pattern:
                    "(http|https)://twitter.com/(.+)|(http|https)://www.twitter.com/(.+)",
                  ...getInputProps(twitter, {
                    type: "url",
                  }),
                }}
                errors={twitter.errors}
                errorId={twitter.errorId}
                text="Twitter Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: instagram.id,
                }}
                inputProps={{
                  placeholder: "https://instagram.com/johndoe",
                  pattern:
                    "(http|https)://instagram.com/(.+)|(http|https)://www.instagram.com/(.+)",
                  ...getInputProps(instagram, {
                    type: "url",
                  }),
                }}
                errors={instagram.errors}
                errorId={instagram.errorId}
                text="Instagram Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: github.id,
                }}
                inputProps={{
                  placeholder: "https://github.com/johndoe",
                  pattern:
                    "(http|https)://github.com/(.+)|(http|https)://www.github.com/(.+)",
                  ...getInputProps(github, {
                    type: "url",
                  }),
                }}
                errors={github.errors}
                errorId={github.errorId}
                text="GitHub Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: facebook.id,
                }}
                inputProps={{
                  placeholder: "https://facebook.com/johndoe",
                  pattern:
                    "(http|https)://facebook.com/(.+)|(http|https)://www.facebook.com/(.+)|(http|https)://fb.com/(.+)|(http|https)://www.fb.com/(.+)",
                  ...getInputProps(facebook, {
                    type: "url",
                  }),
                }}
                errors={facebook.errors}
                errorId={facebook.errorId}
                text="Facebook Profile"
              />
            </div>
            <div className="mb-6">
              <SettingInput
                labelProps={{
                  htmlFor: website.id,
                }}
                inputProps={{
                  placeholder: "https://johndoe.com",
                  ...getInputProps(website, {
                    type: "url",
                  }),
                }}
                errors={website.errors}
                errorId={website.errorId}
                text="Website URL"
              />
            </div>
            <h4 className={cn("mt-10", styles.title)}>Profile Identity</h4>
            <div className="mb-6">
              <SettingInputIdentity
                labelProps={{
                  htmlFor: username.id,
                }}
                inputProps={{
                  ...getInputProps(username, {
                    type: "text",
                  }),
                }}
                errors={username.errors}
                errorId={username.errorId}
                text="username"
                desc="You can change username once. This is the last chance."
              />
            </div>
            <div className="mb-6">
              <SettingInputIdentity
                labelProps={{
                  htmlFor: email.id,
                }}
                inputProps={{
                  ...getInputProps(email, {
                    type: "email",
                  }),
                }}
                errors={email.errors}
                errorId={email.errorId}
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
