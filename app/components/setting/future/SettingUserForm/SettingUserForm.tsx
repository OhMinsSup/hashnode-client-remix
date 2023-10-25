import React, { useCallback } from "react";
import Json from "superjson";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "services/validate/user-update-api.validate";

import { useOptionalSession } from "services/hooks/useSession";
import { useForm, FormProvider } from "react-hook-form";
import { useFetcher } from "@remix-run/react";

// types
import type { SubmitHandler } from "react-hook-form";
import type { FormFieldValues } from "services/validate/user-update-api.validate";

interface SettingUserFormProps {
  children: React.ReactNode;
}

export default function SettingUserForm({ children }: SettingUserFormProps) {
  const fetcher = useFetcher();
  const session = useOptionalSession();

  const methods = useForm({
    resolver: zodResolver(schema),
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
