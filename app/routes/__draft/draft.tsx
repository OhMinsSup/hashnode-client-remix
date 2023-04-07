import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import DraftEditor from "~/components/draft/DraftEditor";
import isEqual from "lodash-es/isEqual";

// hooks
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useFormContext } from "react-hook-form";
import { useBeforeUnload } from "@remix-run/react";

import { isBrowser } from "~/libs/browser-utils";
import { hashnodeDB } from "~/libs/db/db";

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

function useIsHydrating(queryString: string) {
  const [isHydrating] = useState(
    () => isBrowser && Boolean(document.querySelector(queryString))
  );
  return isHydrating;
}

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

export default function DraftPage() {
  const { watch } = useFormContext<FormFieldValues>();

  const { transition, draftId, changeDraftId, changeTransition } =
    useDraftContext();
  const { getSnapShot, setSnapShot } = useSnapShot<FormFieldValues>();

  const hydrating = useIsHydrating("[data-hydrating-signal]");

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

  useBeforeUnload(
    useCallback(() => {
      if (draftId) {
        // sessionStorage.setItem("hashnode:draftId", draftId.toString());
      }
    }, [draftId])
  );

  useSSRLayoutEffect(() => {
    if (!hydrating) return;

    // const _draftId = sessionStorage.getItem("hashnode:draftId");
    // if (!_draftId) return;

    // const draftId = parseInt(_draftId, 10);
    // if (Number.isNaN(draftId)) return;

    // changeDraftId(draftId);

    // return () => {
    //   sessionStorage.removeItem("hashnode:draftId");
    // };
  }, [hydrating]);

  return <DraftEditor />;
}

export function CatchBoundary() {
  return <DraftPage />;
}
