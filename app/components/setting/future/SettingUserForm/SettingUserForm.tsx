import React, { useCallback } from "react";
import Json from "superjson";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "~/services/validate/user-update-api.validate";

import { useOptionalSession } from "~/services/hooks/useSession";
import { useForm, FormProvider } from "react-hook-form";
import { useFetcher } from "@remix-run/react";

// types
import type { SubmitHandler } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/user-update-api.validate";

interface SettingUserFormProps {
  children: React.ReactNode;
}

export default function SettingUserForm({ children }: SettingUserFormProps) {
  const fetcher = useFetcher();
  const session = useOptionalSession();

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: session?.userProfile?.nickname ?? "",
      username: session?.userProfile?.username ?? "",
      email: session?.email ?? "",
      tagline: session?.userProfile?.tagline ?? undefined,
      avatarUrl: session?.userImage?.avatarUrl ?? undefined,
      location: session?.userProfile?.location ?? undefined,
      bio: session?.userProfile?.bio ?? undefined,
      skills: session?.userTags?.map((skill) => skill.name) ?? [],
      availableText: session?.userProfile?.availableText ?? undefined,
      socials: {
        github: session?.userSocial?.github ?? undefined,
        facebook: session?.userSocial?.facebook ?? undefined,
        twitter: session?.userSocial?.twitter ?? undefined,
        instagram: session?.userSocial?.instagram ?? undefined,
        website: session?.userSocial?.website ?? undefined,
      },
    },
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFieldValues> = useCallback(
    (input) => {
      fetcher.submit(
        {
          body: Json.stringify(input),
        },
        {
          method: "POST",
          action: "/settings?index",
        }
      );
    },
    [fetcher]
  );

  return (
    <FormProvider {...methods}>
      <form className="content" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
