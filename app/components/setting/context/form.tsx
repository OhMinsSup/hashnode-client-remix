import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  type FormFieldValues,
} from "~/services/validate/user-update-api.validate";

import { useSession } from "~/services/hooks/useSession";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

interface SettingUserFormProps {
  children: React.ReactNode;
}

export default function SettingUserFormProvider({
  children,
}: SettingUserFormProps) {
  const session = useSession();
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nickname: session?.userProfile?.nickname ?? "",
      username: session?.userProfile?.username ?? "",
      email: session?.email ?? "",
      tagline: session?.userProfile?.tagline ?? undefined,
      avatarUrl: session?.userImage?.avatarUrl ?? undefined,
      image: {
        id: undefined,
        url: session?.userImage?.avatarUrl ?? undefined,
      },
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
    reValidateMode: "onSubmit",
    criteriaMode: "firstError",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useSettingUserFormContext() {
  return useFormContext<FormFieldValues>();
}
