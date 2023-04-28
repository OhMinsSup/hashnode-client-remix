import React, { useCallback, useState } from "react";
import { json } from "@remix-run/cloudflare";

import Json from "superjson";

// api
import {
  userUpdateHTTPErrorWrapper,
  userUpdateSchema,
  userUpdateValidationErrorWrapper,
} from "~/api/user/validation/update";
import { putUserUpdateApi } from "~/api/user/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTagListApi } from "~/api/tags/tags";

// components
import AsyncCreatableSelect from "react-select/async-creatable";
import ProfileImage from "~/components/setting/ProfileImage";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";
import { useForm } from "react-hook-form";
import { isRouteErrorResponse, useActionData, useFetcher, useRouteError } from "@remix-run/react";
import { useImageUploadMutation } from "~/api/files/hooks/useImageUploadMutation";
import { useDebouncedCallback } from "use-debounce";

// types
import type { SubmitHandler } from "react-hook-form";
import type { ActionArgs } from "@remix-run/cloudflare";
import type { MultiValue } from "react-select";
import type { UserUpdateBody } from "~/api/user/validation/update";

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();
  const _input_body = formData.get("body")?.toString();
  if (!_input_body) {
    return;
  }
  const _input_json_body = Json.parse<FormFieldValues>(_input_body);
  try {
    const body = await userUpdateSchema.safeParseAsync(_input_json_body);
    if (!body.success) {
      return json(body.error, { status: 400 });
    }
    await putUserUpdateApi(body.data, args);
    return json({});
  } catch (error) {
    const error_validation = userUpdateValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation);
    }
    const error_http = await userUpdateHTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors);
    }
    throw json(error);
  }
};

export type SettingAction = typeof action;

export type FormFieldValues = UserUpdateBody;

export default function Profile() {
  const fetcher = useFetcher();
  const [inputValue, setInputValue] = useState("");
  const error = useActionData<SettingAction>();
  const session = useOptionalSession();

  const { register, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: session?.profile?.name ?? "",
      username: session?.username ?? "",
      email: session?.email ?? "",
      tagline: session?.profile?.tagline ?? undefined,
      avatarUrl: session?.profile?.avatarUrl ?? undefined,
      location: session?.profile?.location ?? undefined,
      bio: session?.profile?.bio ?? undefined,
      skills: session?.skills?.map((skill) => skill.name) ?? [],
      availableText: session?.profile?.availableText ?? undefined,
      socials: {
        github: session?.socials?.github ?? undefined,
        facebook: session?.socials?.facebook ?? undefined,
        twitter: session?.socials?.twitter ?? undefined,
        instagram: session?.socials?.instagram ?? undefined,
        website: session?.socials?.website ?? undefined,
      },
    },
    reValidateMode: "onChange",
  });

  const { isLoading, mutate } = useImageUploadMutation({
    onSuccess(data) {
      const { result } = data.result;
      setValue("avatarUrl", result.url, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    onError() {
      setValue("avatarUrl", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    fetcher.submit(
      {
        body: Json.stringify(input),
      },
      {
        method: "POST",
        action: "/settings?index",
      }
    );
  };

  const watchAvailableText = watch("availableText");
  const watchAvatarUrl = watch("avatarUrl");
  const watchSkills = watch("skills");

  const onImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        throw new Error("No file selected");
      }

      const objectUrl = URL.createObjectURL(file);
      // validation checj file sizes 1600 x 800 px
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = objectUrl;
      });

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      if (image.width > 1600 || image.height > 800) {
        throw new Error("Image size is too small");
      }

      mutate({
        file,
        uploadType: "PROFILE",
        mediaType: "IMAGE",
      });
    },
    [mutate]
  );

  const onImageDelete = useCallback(() => {
    setValue("avatarUrl", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue]);

  const loadOptions = useDebouncedCallback(async (inputValue) => {
    const { result } = await getTagListApi({
      name: inputValue,
      limit: 10,
    });
    const list = result?.result?.list ?? [];
    return list.map((tag) => ({
      label: tag.name,
      value: tag.name,
    }));
  }, 250);

  const onChangeTags = useCallback(
    (value: MultiValue<any>) => {
      const tags = value.map((item) => item.value);
      setValue("skills", tags, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  return (
    <form className="content" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name")}
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
              {...register("tagline")}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="customFile" className="input-label">
              Profile Photo
            </label>
            {isLoading && <ProfileImage.Loading />}
            {!isLoading && watchAvatarUrl && (
              <ProfileImage.Success
                url={watchAvatarUrl}
                onDelete={onImageDelete}
              />
            )}
            {!isLoading && !watchAvatarUrl && (
              <ProfileImage onChange={onImageUpload} />
            )}
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
              {...register("location")}
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
              {...register("bio")}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="skills" className="input-label">
              Tech Stack
            </label>
            <AsyncCreatableSelect
              inputValue={inputValue}
              isClearable
              cacheOptions
              isMulti
              className="min-h-30"
              placeholder="Search technologies, topics, more…"
              loadOptions={loadOptions}
              onChange={onChangeTags}
              onInputChange={(newValue) => setInputValue(newValue)}
              value={watchSkills?.map((tag) => ({ label: tag, value: tag }))}
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
              {...register("availableText")}
            />
            <small className="ml-2 mt-1 block leading-tight text-slate-600">
              {watchAvailableText?.length ?? 0}/140
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
              {...register("socials.twitter")}
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
              {...register("socials.instagram")}
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
              {...register("socials.github")}
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
              {...register("socials.facebook")}
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
              {...register("socials.website")}
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
                {...register("username")}
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
                {...register("email")}
              />
              <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-4">
        <button className="btn-submit" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
