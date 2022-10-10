import { apiClient } from "../client";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { UploadBody } from "../schema/body";
import type { FileListRespSchema, UploadRespSchema } from "../schema/resp";
import type { PaginationQuery } from "../schema/query";

export async function imageUploadApi(body: UploadBody, options?: Options) {
  const { headers, ...opts } = options ?? {};

  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("uploadType", body.uploadType);
  formData.append("mediaType", body.mediaType);
  formData.append("filename", body.file.name);

  const resp = await apiClient.post(API_ENDPOINTS.FILES.UPLOAD, {
    body: formData,
    credentials: "include",
    ...opts,
  });

  const result = await resp.json<AppAPI<UploadRespSchema>>();

  return { result };
}

export function useImageUploadMutation() {
  return useMutation(imageUploadApi);
}

export async function getFileListApi(
  query?: PaginationQuery,
  options?: Options
) {
  const { headers, ...opts } = options ?? {};
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set("limit", query.limit.toString());
  }
  if (query?.cursor) {
    search.set("cursor", query.cursor.toString());
  }

  let url = API_ENDPOINTS.FILES.ROOT;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }

  const response = await apiClient.get(url, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await response.json<AppAPI<FileListRespSchema>>();
  return { result };
}
