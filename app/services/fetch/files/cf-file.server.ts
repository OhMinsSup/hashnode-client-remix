import type { FormFieldValues } from "~/services/validate/cf-file.validate";
import { FetchError } from "~/services/fetch/fetch.error";
import { FetchService } from "~/services/fetch/fetch.api";
import type { ApiOptions } from "~/services/fetch/fetch.type";

type CfDirectUploadParams = {
  cfApiToken: string;
  cfAccountId: string;
};

export const postCfDirectUploadApi = async ({
  cfAccountId,
  cfApiToken,
}: CfDirectUploadParams) => {
  const init = new Request(getPathDirectUpload(cfAccountId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfApiToken}`,
    },
  });
  const response = await fetch(init);
  if (!response.ok) {
    throw new FetchError(response, init, {});
  }
  return response.json<FetchRespSchema.CfDirectUploadResp>();
};

type CfUploadParams = {
  uploadUrl: string;
  formFields: FormFieldValues;
};

export const postCfUploadApi = async ({
  uploadUrl,
  formFields,
}: CfUploadParams) => {
  const formData = new FormData();
  formData.append("file", formFields.file);

  const init = new Request(uploadUrl, {
    method: "POST",
    body: formData,
  });

  const response = await fetch(init);
  if (!response.ok) {
    throw new FetchError(response, init, {});
  }
  return response.json<FetchRespSchema.CfUploadResp>();
};

type FileUploadParams = {
  cfId: string;
  filename: string;
  mimeType: string;
  publicUrl: string;
  mediaType: FetchSchema.MediaType;
  uploadType: FetchSchema.UploadType;
};

export const postFileUploadApi = async (
  body: FileUploadParams,
  options?: ApiOptions
) => {
  return FetchService.post(getPath(), body, options);
};

export const getPathDirectUpload = (cfId: string) => {
  return `https://api.cloudflare.com/client/v4/accounts/${cfId}/images/v2/direct_upload`;
};

/**
 * @version 2023-08-17
 * @description 로그아웃 API Path
 */
export const getPath = () => {
  return FetchService.defineApis.FILES.ROOT;
};
