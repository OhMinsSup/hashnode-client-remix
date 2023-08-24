// api
import { ApiService } from "../client";

// constants
import { API_ENDPOINTS } from "~/constants/constant";

// types
import type { BaseApiOptions } from "../client";
import type { UploadRespSchema } from "../schema/resp";

/**
 * @deprecated
 * @description 파일 업로드 API
 * @param {FormData} body
 * @param {BaseApiOptions?} options
 */
export async function uploadApi(body: FormData, options?: BaseApiOptions) {
  const { json } = await ApiService.postFormData<UploadRespSchema>(
    API_ENDPOINTS.FILES.UPLOAD,
    body,
    ApiService.autoAuthticated(ApiService.setAuthticated(options))?.init
  );
  return { json };
}
