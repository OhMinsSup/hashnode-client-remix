import React from "react";
import styles from "./styles.module.css";
import { Link, useLoaderData, Form, useActionData } from "@remix-run/react";
import { type RoutesLoaderData } from "~/server/routes/n-layout/n-layout-loader.server";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { Icons } from "~/components/shared/Icons";
import type { RoutesActionData } from "~/server/routes/n-layout/n-layout-action.server";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { schema } from "~/services/validate/tag-follow-api.validate";

interface TagBoxWithHashnodeListProps {
  children: React.ReactNode;
}

export default function TagBoxWithHashnodeList({
  children,
}: TagBoxWithHashnodeListProps) {
  return (
    <>
      <div className={styles.root}>
        <TagBoxWithHashnodeList.Mobile />
        <TagBoxWithHashnodeList.Desktop />
      </div>
      {children}
    </>
  );
}

TagBoxWithHashnodeList.Mobile = function TagBoxWithHashnodeListMobile() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <>
      <div className="sm:hidden flex flex-row justify-between w-full items-start">
        <div className="relative flex items-center w-[64px] h-[64px] rounded-full overflow-visible ">
          <img
            alt={data?.result?.name}
            loading="lazy"
            src={ASSET_URL.SHAP}
            className="object-cover rounded-full w-12 h-12"
          />
          <Icons.V2.TagBox className="absolute -top-[168px] -left-[176px] z-0" />
        </div>
        <div className="flex flex-row gap-2 justify-end z-10">
          <TagBoxWithHashnodeList.ShareLink />
          <TagBoxWithHashnodeList.RssLink />
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-between sm:hidden">
        <div className={styles.tag_info}>
          <span>{data?.result?.followCount} followers</span>
          <span className="block font-bold">·</span>
          <span>{data?.result?.postCount} articles</span>
        </div>
      </div>
    </>
  );
};

TagBoxWithHashnodeList.Desktop = function TagBoxWithHashnodeListDesktop() {
  const data = useLoaderData<RoutesLoaderData>();
  const actionData = useActionData<RoutesActionData>();

  const [form, fields] = useForm({
    id: "tag-follow-form",
    defaultValue: {
      slug: data?.result?.name,
    },
    // Sync the result of last submission
    lastResult:
      actionData?.status === "error" ? actionData.submission.error : undefined,
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    // Validate the form on blur event triggered
    shouldRevalidate: "onSubmit",
  });

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-start gap-0.5">
          <div className={styles.tag}>{data?.result?.name}</div>
          <div className="flex-row gap-2 hidden sm:flex">
            <div className={styles.tag_info}>
              <span className="z-10">#{data?.result?.name}</span>
              <span className={styles.dot}>·</span>
            </div>
            <div className={styles.tag_info}>
              <span>{data?.result?.followCount} followers</span>
              <span className={styles.dot_2}>·</span>
              <span>{data?.result?.postCount} articles</span>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className={styles.tag_info}>
              <span className="z-10">#{data?.result?.name}</span>
              <span className={styles.dot}>·</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="relative flex items-center w-[64px] h-[64px] rounded-full overflow-visible">
            <img
              alt={data?.result?.name}
              loading="lazy"
              src={ASSET_URL.SHAP}
              className="object-cover rounded-full w-12 h-12"
            />
            <Icons.V2.TagBox className="absolute -top-[168px] -left-[176px] z-0" />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center z-10 ">
        <div className="flex flex-row gap-2 align-middle z-10">
          <Form method="post" {...getFormProps(form)}>
            <input
              hidden
              {...getInputProps(fields.slug, {
                type: "text",
              })}
            />
            {data?.result?.isFollowing ? (
              <button type="submit" className={styles.btn_following}>
                <div className={styles.btn_following_wrapper}>
                  <Icons.V2.TagFollowing />
                  <span>Following</span>
                </div>
              </button>
            ) : (
              <button type="submit" className={styles.btn_follow}>
                <span className="text-sm">Follow Tag</span>
              </button>
            )}
          </Form>
          <Link
            className={styles.link_write}
            to={{
              pathname: PAGE_ENDPOINTS.WRITE.ROOT,
              search: `?tag=${data?.result?.name}`,
            }}
          >
            <span className="text-sm">Write an article</span>
          </Link>
        </div>
        <div className="sm:flex hidden">
          <div className="flex flex-row gap-2 justify-end z-10">
            <TagBoxWithHashnodeList.ShareLink />
            <TagBoxWithHashnodeList.RssLink />
          </div>
        </div>
      </div>
    </>
  );
};

TagBoxWithHashnodeList.ShareLink = function ShareLink() {
  return (
    <button type="button" className={styles.btn_info}>
      <Icons.V2.ShareLink />
    </button>
  );
};

TagBoxWithHashnodeList.RssLink = function RssLink() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <a
      target="_blank"
      href={PAGE_ENDPOINTS.N.TAG_RSS(data.result.name)}
      rel="noreferrer"
    >
      <button className={styles.btn_info}>
        <Icons.V2.RssLink />
      </button>
    </a>
  );
};
