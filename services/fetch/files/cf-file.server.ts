import type { FormFieldValues } from "services/validate/cf-file.validate";
import { FetchError } from "../fetch.error";

type CfDirectUploadParams = {
  cfApiToken: string;
  cfAccountId: string;
  formFields: FormFieldValues;
};

export const postCfDirectUploadApi = async ({
  cfAccountId,
  cfApiToken,
  formFields,
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

export const getPathDirectUpload = (cfId: string) => {
  return `https://api.cloudflare.com/client/v4/accounts/${cfId}/images/v2/direct_upload`;
};
