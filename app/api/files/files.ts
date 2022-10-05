import ky from "ky-universal";
import { apiClient } from "../client";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "~/constants/constant";

import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { UploadBody } from "../schema/body";
import type { SignedUrlRespSchema, UploadRespSchema } from "../schema/resp";

export async function imageUploadApi(body: UploadBody, options?: Options) {
  const { headers, ...opts } = options ?? {};
  const response = await apiClient.post(API_ENDPOINTS.FILES.SIGNED_URL, {
    json: {
      filename: body.file.name,
      uploadType: body.uploadType,
      mediaType: body.mediaType,
    },
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });

  const {
    result: { uploadUrl },
  } = await response.json<AppAPI<SignedUrlRespSchema>>();

  // aws s3 put upload
  await ky.put(uploadUrl, {
    body: body.file,
    headers: {
      "content-type": body.file.type,
    },
  });

  const uplaod = await apiClient.post(API_ENDPOINTS.FILES.UPLOAD, {
    json: {
      filename: body.file.name,
      uploadType: body.uploadType,
      mediaType: body.mediaType,
    },
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(headers ?? {}),
    },
    ...opts,
  });
  const result = await uplaod.json<AppAPI<UploadRespSchema>>();

  return { result };
}

export function useImageUploadMutation() {
  return useMutation(imageUploadApi);
}
