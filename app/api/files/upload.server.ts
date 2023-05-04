// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions, BaseResponse } from "../client.next";
import type { UploadBody } from "./validation/upload";
import type { UploadRespSchema } from "../schema/resp";

export type ImageUploadApiReturnValue = {
  result: BaseResponse<UploadRespSchema>;
};

/**
 * @description 파일 업로드 API
 * @param {UploadBody} body
 * @param {BaseApiOptions?} options
 */
export async function uploadApi(body: UploadBody, options?: BaseApiOptions) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("uploadType", body.uploadType);
  formData.append("mediaType", body.mediaType);
  formData.append("filename", body.file.name);
  const { json } = await ApiService.postFormData<UploadRespSchema>(
    API_ENDPOINTS.FILES.UPLOAD,
    formData,
    __nextOpts?.init
  );
  return { json };
}
