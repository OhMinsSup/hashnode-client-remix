import { apiClient } from "../client";
import { API_ENDPOINTS } from "~/constants/constant";
import { applyHeaders } from "~/libs/server/utils";
import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { FileListRespSchema, UploadRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";
import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import type { MediaType, UploadType } from "../schema/file";

export interface UploadBody {
  file: File;
  uploadType: UploadType;
  mediaType: MediaType;
}

// [Post] Path: /api/files/upload

export interface PostImageUploadApiBody extends UploadBody {}

export interface PostImageUploadApiParams extends ActionArgs {}

export type ImageUploadApiReturnValue = {
  result: AppAPI<UploadRespSchema>;
};

/**
 * @description 이미지 업로드
 * @param {PostImageUploadApiBody?} body
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _postImageUploadApi(
  body: PostImageUploadApiBody,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);

  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("uploadType", body.uploadType);
  formData.append("mediaType", body.mediaType);
  formData.append("filename", body.file.name);

  const response = await apiClient.post(API_ENDPOINTS.FILES.UPLOAD, {
    credentials: "include",
    body: formData,
    headers,
    ...opts,
  });
  return response;
}

/**
 * @description 이미지 업로드
 * @param {PostImageUploadApiBody?} body
 * @param {PostImageUploadApiParams?} args
 * @returns {Promise<{ result: AppAPI<UploadRespSchema> }>}
 */
export async function postImageUploadApi(
  body: PostImageUploadApiBody,
  args?: PostImageUploadApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _postImageUploadApi(body, {
    headers,
  });

  const result = await response.json<AppAPI<UploadRespSchema>>();
  return { result };
}

//  [Get] Path: app/api/files

export interface GetImageFilesApiSearchParams extends PaginationQuery {}

export interface GetImageFilesApiParams extends LoaderArgs {}

/**
 * @description 업로드된 이미지 리스트 가져오기
 * @param {GetImageFilesApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getImageFilesApi(
  query?: GetImageFilesApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "15");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  const response = await apiClient.get(API_ENDPOINTS.FILES.ROOT, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description Get posts
 * @param {GetPostsApiSearchParams?} query
 * @param {GetImageFilesApiParams?} args
 * @returns {Promise<{ result: AppAPI<FileListRespSchema> }>}
 */
export async function getImageFilesApi(
  query?: GetImageFilesApiSearchParams,
  args?: GetImageFilesApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getImageFilesApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<FileListRespSchema>>();
  return { result };
}
