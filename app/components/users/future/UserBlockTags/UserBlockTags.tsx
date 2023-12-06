import React from "react";
import styles from "./styles.module.css";
import { useLoaderData, Link } from "@remix-run/react";
import { BlockBox } from "../BlockBox";
import { isEmpty, isNull, isUndefined } from "~/utils/assertion";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { RoutesLoader } from "~/routes/_user.(@).$userId._index";

export default function UserBlockTags() {
  const data = useLoaderData<RoutesLoader>();
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <BlockBox
          index={0}
          title="About Me"
          linkText="Add Bio"
          link="/settings#moreAboutYou"
          desciption={
            data?.userProfile?.bio
              ? undefined
              : `Your bio is empty. Tell the world who you are by writing a short description about you.`
          }
        >
          {data?.userProfile?.bio}
        </BlockBox>
        <BlockBox
          index={1}
          title="My Tech Stack"
          linkText="Add your skills"
          link="/settings#skills"
        >
          {isUndefined(data?.userTags) ||
          isNull(data?.userTags) ||
          isEmpty(data?.userTags) ? undefined : (
            <div className={styles.tag_list}>
              {data?.userTags?.map((tag) => (
                <Link
                  to={PAGE_ENDPOINTS.N.TAG(tag.name)}
                  key={`tag-${tag.name}-${tag.id}`}
                  className={styles.tag}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          )}
        </BlockBox>
        <BlockBox
          index={2}
          title="I am available for"
          linkText="Add Available For"
          link="/settings#availableFor"
        >
          {data?.userProfile?.availableText}
        </BlockBox>
      </div>
    </div>
  );
}
