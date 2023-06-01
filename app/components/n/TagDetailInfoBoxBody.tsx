import React, { useCallback } from "react";

// components
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS, REMIX_ACTIONS_KEY } from "~/constants/constant";

// hooks
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

// types
import type { nTagLoader } from "~/routes/_n.n.$tag";

export default function TagDetailInfoBoxBody() {
  const fetcher = useFetcher();
  const { tagInfo } = useLoaderData<nTagLoader>();
  const navigation = useNavigation();

  const onTagFollow = useCallback(() => {
    fetcher.submit(null, {
      replace: true,
      method: tagInfo.isFollowing ? "DELETE" : "POST",
      action: REMIX_ACTIONS_KEY.TAG_FOLLOW,
    });
  }, [fetcher, tagInfo.isFollowing]);

  return (
    <div className="tag-detail-info-box__body">
      <button
        type="button"
        className="btn__follow"
        onClick={onTagFollow}
        disabled={navigation.state === "submitting"}
      >
        {tagInfo.isFollowing ? (
          <>
            <Icons.Check className="icon__base mr-2 fill-current" />
            Following
          </>
        ) : (
          <>
            <Icons.Plus className="icon__base mr-2 fill-current" />
            Follow Tag
          </>
        )}
      </button>
      <Link
        className="btn__draft"
        aria-label="move to draft page"
        to={PAGE_ENDPOINTS.DRAFT.ROOT}
      >
        <Icons.Pen className="icon__sm mr-2 fill-current" />
        <span>Write An Article</span>
      </Link>
    </div>
  );
}