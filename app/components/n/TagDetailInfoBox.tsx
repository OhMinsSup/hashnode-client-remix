import React, { useCallback, useMemo } from "react";
import {
  Link,
  useSubmit,
  useLoaderData,
  useNavigation,
  useActionData,
} from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// tyeps
import type { NDataLoader, NDataAction } from "~/routes/_n.n";
import { numberToEnglishUnit } from "~/utils/util";

function TagDetailInfoBox() {
  return (
    <div className="tag-detail-info-box">
      <TagDetailInfoBox.Header />
      <TagDetailInfoBox.Body />
      <TagDetailInfoBox.Footer />
    </div>
  );
}

export default TagDetailInfoBox;

TagDetailInfoBox.Header = function TagDetailInfoBoxHeader() {
  const { tagInfo } = useLoaderData<NDataLoader>();

  const to = useMemo(() => {
    if (!tagInfo.name) return PAGE_ENDPOINTS.ROOT;
    return PAGE_ENDPOINTS.N.TAG(tagInfo.name);
  }, [tagInfo]);

  return (
    <div className="tag-detail-info-box__header">
      <Link to={to} className="image">
        <img
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1607082785538/EryuLRriM.png?w=100&h=100&fit=crop&crop=entropy&auto=compress,format&format=webp"
          alt=""
        />
      </Link>
      <div className="leading-[1.375]">
        <h1>
          <Link to={to} aria-label={tagInfo.name}>
            {tagInfo.name}
          </Link>
        </h1>
        <p>
          <Link to={to} aria-label={tagInfo.name}>
            #{tagInfo.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

TagDetailInfoBox.Body = function TagDetailInfoBoxBody() {
  const submit = useSubmit();
  const { tagInfo } = useLoaderData<NDataLoader>();
  const data = useActionData<NDataAction>();
  const navigation = useNavigation();

  const onTagFollow = useCallback(() => {
    const formData = new FormData();
    formData.append("tag", tagInfo.name);
    submit(formData, {
      replace: true,
      method: tagInfo.isFollowing ? "DELETE" : "POST",
    });
  }, [submit, tagInfo.isFollowing, tagInfo.name]);

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
};

TagDetailInfoBox.Footer = function TagDetailInfoBoxFooter() {
  const { tagInfo } = useLoaderData<NDataLoader>();
  return (
    <div className="tag-detail-info-box__footer">
      <div className="count-container">
        <div className="count-item">
          <Icons.Users className="icon__base mr-2 fill-current" />
          <span>{numberToEnglishUnit(tagInfo.followCount)} Followers</span>
        </div>
        <span className="mx-4 block text-slate-400">·</span>
        <div className="count-item">
          <Icons.Article className="icon__base mr-2 fill-current" />
          <span>{numberToEnglishUnit(tagInfo.postCount)} Articles</span>
        </div>
      </div>
      <div className="meta-container"></div>
    </div>
  );
};
