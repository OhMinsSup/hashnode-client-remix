// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { UploadBody } from "./validation/upload";
import type { UploadRespSchema } from "../schema/resp";

/**
 * @description 파일 업로드 API
 * @param {UploadBody} body
 * @param {BaseApiOptions?} options
 */
export async function uploadApi(body: UploadBody, options?: BaseApiOptions) {
  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("uploadType", body.uploadType);
  formData.append("mediaType", body.mediaType);
  formData.append("filename", body.file.name);
  const { json } = await ApiService.postFormData<UploadRespSchema>(
    API_ENDPOINTS.FILES.UPLOAD,
    formData,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
