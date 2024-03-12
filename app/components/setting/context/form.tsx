import React from "react";
import {
  schema,
  type FormFieldValues,
} from "~/services/validate/user-update-api.validate";
import { useSession } from "~/services/hooks/useSession";
import {
  FormProvider,
  FormStateInput,
  getFormProps,
  useForm,
} from "@conform-to/react";
import { Form, useActionData } from "@remix-run/react";
import { parseWithZod } from "@conform-to/zod";

interface SettingUserFormProps {
  children: React.ReactNode;
}

export const FORM_ID = "setting-user-form";

export default function SettingUserFormProvider({
  children,
}: SettingUserFormProps) {
  const [form, fields] = useSettingUserFormContext();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-expect-error - We are adding a new prop to the children
      return React.cloneElement(child, { formId: form.id, fields });
    }
    return child;
  });

  return (
    <FormProvider context={form.context}>
      <Form replace method="post" className="content" {...getFormProps(form)}>
        {childrenWithProps}
      </Form>
      <FormStateInput />
    </FormProvider>
  );
}

export function useSettingUserFormContext() {
  const session = useSession();

  // Last submission returned by the server
  const lastResult = useActionData<Record<string, unknown>>();

  return useForm<FormFieldValues>({
    id: FORM_ID,
    // Sync the result of last submission
    lastResult,
    defaultValue: {
      nickname: session?.userProfile?.nickname ?? "",
      username: session?.userProfile?.username ?? "",
      email: session?.email ?? "",
      tagline: session?.userProfile?.tagline ?? undefined,
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
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onSubmit",
  });
}
