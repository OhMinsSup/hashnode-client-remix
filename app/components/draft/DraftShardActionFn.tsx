import React, { useCallback, useEffect, useRef } from "react";
import isEqual from "lodash-es/isEqual";

// hooks
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";

// db
import { hashnodeDB } from "~/libs/db/db";

// types
import { Transition } from "~/context/useDraftContext";
import type { FormFieldValues } from "~/routes/draft";

interface DraftShardActionFnProps {
  children: React.ReactNode;
}

function DraftShardActionFn({ children }: DraftShardActionFnProps) {
  const { watch } = useFormContext<FormFieldValues>();

  const { transition, draftId, changeDraftId, changeTransition } =
    useDraftContext();
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

      if (draftId) {
        try {
          await hashnodeDB.updateDraft(draftId, body);
        } catch (error) {
          console.error(error);
        } finally {
          changeTransition(Transition.IDLE);
        }
        return;
      }

      try {
        const indexableType = await hashnodeDB.addDraft(body);
        const idx = parseInt(indexableType.toString(), 10);
        if (indexableType && !Number.isNaN(idx)) {
          changeDraftId(idx);
        }
      } catch (error) {
        console.error(error);
      } finally {
        changeTransition(Transition.IDLE);
      }
    },
    {
      wait: 500,
      trailing: true,
    }
  );

  useEffect(() => {
    if (transition === Transition.UPDATING) {
      debounced.run(watchAll);
    }
  }, [transition, watchAll]);

  return <>{children}</>;
}

export default DraftShardActionFn;

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
