import React, { useEffect, useCallback, useRef } from "react";
import DraftEditor from "~/components/draft/DraftEditor";
import isEqual from "lodash-es/isEqual";

// hooks
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useFormContext } from "react-hook-form";

// types
import { Transition, useDraftContext } from "~/context/useDraftContext";
import type { ActionFunction } from "@remix-run/cloudflare";
import type { FormFieldValues } from "../__draft";

export const action: ActionFunction = async ({ request }) => {};

const useSnapShot = <T extends Record<string, any>>() => {
  const ref = useRef<T>();

  const setSnapShot = useCallback((value: T) => {
    ref.current = value;
  }, []);

  const getSnapShot = useCallback(() => {
    return ref.current;
  }, []);

  return {
    setSnapShot,
    getSnapShot,
  };
};

export default function DraftPage() {
  const { watch } = useFormContext<FormFieldValues>();
  const { transition } = useDraftContext();
  const { getSnapShot, setSnapShot } = useSnapShot<FormFieldValues>();

  const watchAll = watch();

  const debounced = useDebounceFn(
    async (input: FormFieldValues) => {
      const snapShot = getSnapShot();

      const body = {
        ...input,
      };

      if (isEqual(snapShot, body)) {
        return;
      }

      setSnapShot(body);

      console.log("body::", body);
    },
    {
      wait: 500,
      trailing: true,
    }
  );

  useEffect(() => {
    console.log("Transition Status::", transition);
    if (transition === Transition.UPDATING) {
      debounced.run(watchAll);
    }
  }, [transition, watchAll]);

  return <DraftEditor />;
}

export function CatchBoundary() {
  return <DraftPage />;
}
