import React, { useCallback } from "react";
import Json from "superjson";

import { useFetcher } from "@remix-run/react";
import { useSettingUserFormContext } from "~/components/setting/context/form";

// types
import type { SubmitHandler } from "react-hook-form";
import type { FormFieldValues } from "~/services/validate/user-update-api.validate";

interface SettingUserFormProps {
  children: React.ReactNode;
}

export default function SettingUserForm({ children }: SettingUserFormProps) {
  const fetcher = useFetcher();
  const { handleSubmit } = useSettingUserFormContext();

  const onSubmit: SubmitHandler<FormFieldValues> = useCallback(
    (input) => {
      fetcher.submit(
        {
          body: Json.stringify(input),
        },
        {
          method: "PUT",
          action: "/settings?index",
        }
      );
    },
    [fetcher]
  );

  return (
    <form className="content" onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}
