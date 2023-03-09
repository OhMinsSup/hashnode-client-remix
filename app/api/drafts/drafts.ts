import { apiClient } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { applyHeaders } from "~/libs/server/utils";

// types
import type { Options } from "ky-universal";
import type { DraftListRespSchema, DraftRespSchema } from "../schema/resp";
import type { AppAPI } from "../schema/api";
import type { PostBody } from "../schema/body";
import type { LoaderArgs } from "@remix-run/cloudflare";

export async function createDraftsApi(
  body: Partial<PostBody>,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.DRAFTS.NEW, {
    json: body,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<DraftRespSchema>>();
  return { result };
}

export async function saveDraftsApi(
  body: Partial<PostBody & { draftId: number | string }>,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.DRAFTS.SAVE_DATA, {
    json: body,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<DraftRespSchema>>();
  return { result };
}

// [Post] Path: /api/v1/drafts/new
export interface NewDraftApiBody extends Partial<PostBody> {}

export type NewDraftApiReturnValue = {
  result: AppAPI<DraftRespSchema>;
};

/**
 * @description 초안 포스트 저장 API
 * @param {NewDraftApiBody} body
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _postNewDraftApi(
  body: NewDraftApiBody,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.post(API_ENDPOINTS.DRAFTS.NEW, {
    credentials: "include",
    headers,
    json: body,
    ...opts,
  });
  return response;
}

/**
 * @description 초안 포스트 저장 API
 * @param {NewDraftApiBody} body
 * @param {Options?} options
 * @returns {Promise<NewDraftApiReturnValue>}
 */
export async function postNewDraftApi(
  body: NewDraftApiBody,
  args?: LoaderArgs
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _postNewDraftApi(body, {
    headers,
  });
  const result = await response.json<AppAPI<DraftRespSchema>>();
  return { result };
}

// [Post] Path: /api/v1/drafts/save-data
export interface SaveDraftApiBody extends Partial<PostBody> {
  draftId?: string | number | undefined;
}

export type SaveDraftApiReturnValue = {
  result: AppAPI<DraftRespSchema>;
};

/**
 * @description 초안 포스트 저장 API
 * @param {SaveDraftApiBody} body
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _postSaveDraftApi(
  body: SaveDraftApiBody,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.post(API_ENDPOINTS.DRAFTS.SAVE_DATA, {
    credentials: "include",
    headers,
    json: body,
    ...opts,
  });
  return response;
}

/**
 * @description 초안 포스트 저장 API
 * @param {SaveDraftApiBody} body
 * @param {Options?} options
 * @returns {Promise<SaveDraftApiReturnValue>}
 */
export async function postSaveDraftApi(
  body: SaveDraftApiBody,
  args?: LoaderArgs
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _postSaveDraftApi(body, {
    headers,
  });
  const result = await response.json<AppAPI<DraftRespSchema>>();
  return { result };
}

// [Get] Path: /api/v1/drafts

interface GetDraftListApiSearchParams {
  limit?: number;
  cursor?: number;
  keyword?: string;
}

interface GetDraftListApiParams extends LoaderArgs {}

/**
 * @description 초안 포스트 리스트 API
 * @param {GetDraftListApiSearchParams?} query
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _getDraftListApi(
  query?: GetDraftListApiSearchParams,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const searchParams = new URLSearchParams();
  if (query?.limit) {
    searchParams.set("limit", query.limit.toString());
  } else {
    searchParams.set("limit", "10");
  }
  if (query?.cursor) {
    searchParams.set("cursor", query.cursor.toString());
  }
  if (query?.keyword) {
    searchParams.set("keyword", query.keyword);
  }
  const response = await apiClient.get(API_ENDPOINTS.DRAFTS.ROOT, {
    credentials: "include",
    headers,
    searchParams,
    ...opts,
  });
  return response;
}

/**
 * @description 초안 포스트 리스트 API
 * @param {GetDraftListApiSearchParams?} query
 * @param {GetDraftListApiParams?} args
 * @returns {Promise<{ result: AppAPI<DraftListRespSchema> }>}
 */
export async function getDraftsListApi(
  query?: GetDraftListApiSearchParams,
  args?: GetDraftListApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _getDraftListApi(query, {
    headers,
  });
  const result = await response.json<AppAPI<DraftListRespSchema>>();
  return { result };
}

// [Delete] Path: /api/v1/drafts/:draftId

export type DeleteDraftApiReturnValue = {
  result: AppAPI<boolean>;
};

interface DeleteDraftApiParams extends LoaderArgs {}

/**
 * @description 초안 포스트 삭제 API
 * @param {string | number} draftId
 * @param {Options?} options
 * @returns {Promise<import('ky-universal').KyResponse>}
 */
export async function _deleteDraftApi(
  draftId: string | number,
  options?: Options
) {
  const { headers: h, ...opts } = options ?? {};
  const headers = applyHeaders(h);
  headers.append("content-type", "application/json");
  const response = await apiClient.delete(API_ENDPOINTS.DRAFTS.ID(draftId), {
    credentials: "include",
    headers,
    ...opts,
  });
  return response;
}

/**
 * @description 초안 포스트 삭제 API
 * @param {string | number} draftId
 * @param {DeleteDraftApiParams?} args
 * @returns {Promise<SaveDraftApiReturnValue>}
 */
export async function deleteDraftApi(
  draftId: string | number,
  args?: DeleteDraftApiParams
) {
  const headers = new Headers();
  if (args && args.request) {
    const { request } = args;
    const cookie = request.headers.get("Cookie") ?? null;
    if (cookie) {
      headers.append("Cookie", cookie);
    }
  }
  const response = await _deleteDraftApi(draftId, {
    headers,
  });
  const result = await response.json<AppAPI<boolean>>();
  return { result };
}
