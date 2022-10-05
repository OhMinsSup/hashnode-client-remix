import ky from "ky-universal";
import { apiClient } from "../client";
import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "~/constants/constant";

import type { Options } from "ky-universal";
import type { AppAPI } from "../schema/api";
import type { UploadBody } from "../schema/body";
import type { UploadRespSchema } from "../schema/resp";

export async function imageUploadApi(body: UploadBody, options?: Options) {
  const { headers, ...opts } = options ?? {};

  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("uploadType", body.uploadType);
  formData.append("mediaType", body.mediaType);
  formData.append("filename", body.file.name);

  await apiClient.post(API_ENDPOINTS.FILES.UPLOAD_URL, {
    body: formData,
    credentials: "include",
    ...opts,
  });

  const resp = await apiClient.post(API_ENDPOINTS.FILES.UPLOAD, {
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
  const result = await resp.json<AppAPI<UploadRespSchema>>();

  return { result };
}

export function useImageUploadMutation() {
  return useMutation(imageUploadApi);
}
