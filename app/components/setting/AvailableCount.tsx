import React from "react";
import { useFormContext } from "react-hook-form";

import type { FormFieldValues } from "services/validate/user-update-api.validate";

export default function AvailableCount() {
  const { watch } = useFormContext<FormFieldValues>();
  const watchAvailableText = watch("availableText");
  return (
    <small className="ml-2 mt-1 block leading-tight text-slate-600">
      {watchAvailableText?.length ?? 0}/140
    </small>
  );
}
