import Json from "superjson";
import { redirect } from "@remix-run/cloudflare";
import { uploadApi } from "~/api/files/upload.server";

// constants
import { STATUS_CODE } from "~/constants/constant";

// types
import type { Env } from "../env";
import { uploadSchema } from "~/api/files/validation/upload";

export class FileApiService {
  constructor(private readonly env: Env) {}

  /**
   * @description 파일 업로드
   * @param {Request} request
   * @returns {Promise<ReturnType<typeof uploadApi>>}
   */
  async uploadFile(request: Request): Promise<ReturnType<typeof uploadApi>> {
    const formData = await this.readFormData(request);
    const bodyString = formData.get("body")?.toString();
    if (!bodyString) {
      const pathname = new URL(request.url).pathname;
      throw redirect(pathname, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    const jsonData = Json.parse(bodyString);
    const input = await uploadSchema.parseAsync(jsonData);
    const newFormData = new FormData();
    formData.append("file", input.file);
    formData.append("uploadType", input.uploadType);
    formData.append("mediaType", input.mediaType);
    formData.append("filename", input.file.name);
    return uploadApi(newFormData, {
      request,
    });
  }

  /**
   * @description FormData 읽기
   * @param {Request} request
   * @returns {Promise<FormData>}
   */
  private async readFormData(request: Request): Promise<FormData> {
    return await request.formData();
  }
}
