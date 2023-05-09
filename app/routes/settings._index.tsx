import React, { useCallback, useMemo, useState } from "react";
import { json } from "@remix-run/cloudflare";
import Json from "superjson";
import classNames from "classnames";

// api
import { userUpdateSchema } from "~/api/user/validation/update";
import { putUserApi } from "~/api/user/update.server";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTagListApi } from "~/api/tags/tagList";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

// components
import AsyncCreatableSelect from "react-select/async-creatable";
import ProfileImage from "~/components/setting/ProfileImage";
import ErrorMessage from "~/components/shared/ErrorMessage";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";
import { useForm } from "react-hook-form";
import {
  isRouteErrorResponse,
  useFetcher,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { useImageUploadMutation } from "~/api/files/hooks/useImageUploadMutation";
import { useDebouncedCallback } from "use-debounce";

// types
import type { SubmitHandler } from "react-hook-form";
import type { ActionArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import type { MultiValue } from "react-select";
import type { UserUpdateBody } from "~/api/user/validation/update";

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

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();
  const _input_body = formData.get("body")?.toString();

  try {
    if (!_input_body) {
      throw new Response("Missing body", { status: 400 });
    }
    const _input_json_body = Json.parse<FormFieldValues>(_input_body);
    const body = await userUpdateSchema.safeParseAsync(_input_json_body);
    if (!body.success) {
      return json(body.error, { status: 400 });
    }
    await putUserApi(body.data, {
      actionArgs: args,
    });
    return json({ ok: true });
  } catch (error) {
    const error_validation = ValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation.errors, {
        status: error_validation.statusCode,
      });
    }
    const error_http = await HTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors, {
        status: error_http.statusCode,
      });
    }
    throw json(error);
  }
};

export type SettingAction = typeof action;

export type FormFieldValues = UserUpdateBody;

export default function Profile() {
  const fetcher = useFetcher();
  const [inputValue, setInputValue] = useState("");
  const session = useOptionalSession();
  const navigation = useNavigation();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const { register, watch, setValue, handleSubmit, formState } = useForm({
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
      const { result } = data.json;
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
        replace: true,
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
    const { json: result } = await getTagListApi({
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
              className={classNames("input-text", {
                error: !!formState.errors.name,
              })}
              id="nameField"
              placeholder="Enter your full name"
              {...register("name")}
            />
            <ErrorMessage
              error={formState.errors.name?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="tagline" className="input-label">
              Profile Tagline
            </label>
            <input
              type="text"
              className={classNames("input-text", {
                error: !!formState.errors.tagline,
              })}
              id="tagline"
              placeholder="Software Developer @ …"
              {...register("tagline")}
            />
            <ErrorMessage
              error={formState.errors.tagline?.message}
              isSubmitting={isSubmitting}
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
            <ErrorMessage
              error={formState.errors.avatarUrl?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="input-label">
              Location
            </label>
            <input
              type="text"
              className={classNames("input-text", {
                error: !!formState.errors.location,
              })}
              id="location"
              placeholder="California, US"
              {...register("location")}
            />
            <ErrorMessage
              error={formState.errors.location?.message}
              isSubmitting={isSubmitting}
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
              className={classNames("input-text min-h-30", {
                error: !!formState.errors.bio,
              })}
              id="moreAboutYou"
              placeholder="I am a developer from …"
              {...register("bio")}
            />
            <ErrorMessage
              error={formState.errors.bio?.message}
              isSubmitting={isSubmitting}
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
              className={classNames("min-h-30", {
                error: !!formState.errors.skills,
              })}
              placeholder="Search technologies, topics, more…"
              loadOptions={loadOptions}
              onChange={onChangeTags}
              onInputChange={(newValue) => setInputValue(newValue)}
              value={watchSkills?.map((tag) => ({ label: tag, value: tag }))}
            />
            <ErrorMessage
              error={formState.errors.skills?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="availableFor" className="input-label">
              Available for
            </label>
            <textarea
              className={classNames("input-text min-h-30", {
                error: !!formState.errors.availableText,
              })}
              id="availableFor"
              placeholder="I am available for mentoring, …"
              {...register("availableText")}
            />
            <ErrorMessage
              error={formState.errors.availableText?.message}
              isSubmitting={isSubmitting}
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
              className={classNames("input-text", {
                error: !!formState.errors.socials?.twitter,
              })}
              id="twitter"
              placeholder="https://twitter.com/johndoe"
              {...register("socials.twitter")}
            />
            <ErrorMessage
              error={formState.errors.socials?.twitter?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="instagram" className="input-label">
              Instagram Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://instagram\.com\/(.+)|(http|https)://www\.instagram\.com\/(.+)"
              className={classNames("input-text", {
                error: !!formState.errors.socials?.instagram,
              })}
              id="instagram"
              placeholder="https://instagram.com/johndoe"
              {...register("socials.instagram")}
            />
            <ErrorMessage
              error={formState.errors.socials?.instagram?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="github" className="input-label">
              GitHub Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://github\.com\/(.+)|(http|https)://www\.github\.com\/(.+)"
              className={classNames("input-text", {
                error: !!formState.errors.socials?.github,
              })}
              id="github"
              placeholder="https://github.com/hashnode"
              {...register("socials.github")}
            />
            <ErrorMessage
              error={formState.errors.socials?.github?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="facebook" className="input-label">
              Facebook Profile
            </label>
            <input
              type="url"
              pattern="(http|https)://facebook\.com\/(.+)|(http|https)://www\.facebook\.com\/(.+)|(http|https)://fb\.com\/(.+)|(http|https)://www\.fb\.com\/(.+)"
              className={classNames("input-text", {
                error: !!formState.errors.socials?.facebook,
              })}
              id="facebook"
              placeholder="https://facebook.com/johndoe"
              {...register("socials.facebook")}
            />
            <ErrorMessage
              error={formState.errors.socials?.facebook?.message}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="website" className="input-label">
              Website URL
            </label>
            <input
              type="url"
              className={classNames("input-text", {
                error: !!formState.errors.socials?.website,
              })}
              id="website"
              placeholder="https://johndoe.com"
              {...register("socials.website")}
            />
            <ErrorMessage
              error={formState.errors.socials?.website?.message}
              isSubmitting={isSubmitting}
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
                className={classNames("input-text", {
                  error: !!formState.errors.username,
                })}
                id="username"
                {...register("username")}
              />
              <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
              <ErrorMessage
                error={formState.errors.username?.message}
                isSubmitting={isSubmitting}
              />
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
                className={classNames("input-text", {
                  error: !!formState.errors.email,
                })}
                id="email"
                {...register("email")}
              />
              <div className="z-100 absolute right-0 top-0 mr-4 mt-4"></div>
              <ErrorMessage
                error={formState.errors.email?.message}
                isSubmitting={isSubmitting}
              />
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
