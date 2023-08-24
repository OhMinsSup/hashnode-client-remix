import Json from "superjson";
import {
  redirect,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";

import { z } from "zod";
import { schema } from "services/validate/cf-file.validate";

import {
  postCfDirectUploadApi,
  postCfUploadApi,
} from "services/fetch/files/cf-file.server";
import { uploadApi } from "~/api/files/upload.server";
import { uploadSchema } from "~/api/files/validation/upload";

// constants
import { STATUS_CODE } from "~/constants/constant";

import { FetchError } from "services/fetch/fetch.error";

// types
import type { Env } from "../env";
import type { ServerService } from "services/app/server";
import type { FormFieldValues } from "services/validate/cf-file.validate";

export class FileApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService
  ) {}

  /**
   * @deprecated
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
   * @deprecated
   * @description FormData 읽기
   * @param {Request} request
   * @returns {Promise<FormData>}
   */
  private async readFormData(request: Request): Promise<FormData> {
    return await request.formData();
  }

  /**
   * @version 2023-08-24
   * @description Cloudflare Images 를 사용하여 파일 업로드
   * @param {Request} request
   */
  async uploadWithCfImages(request: Request) {
    let body: FormFieldValues | null = null;

    try {
      const MAX_FILE_SIZE = 5_000_000; // 5MB
      const uploadHandler = createMemoryUploadHandler({
        maxPartSize: MAX_FILE_SIZE,
      });

      const formData = await parseMultipartFormData(request, uploadHandler);

      body = await schema.parseAsync({
        file: formData.get("file"),
        uploadType: formData.get("uploadType"),
        mediaType: formData.get("mediaType"),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: {
            ...this._getDefaultValues(),
            errors: error.errors.map((e) => {
              const { message } = e;
              return { code: -1, message };
            }),
          },
          status: 400,
        };
      }
      return {
        data: this._getDefaultValues(),
        status: 500,
      };
    }

    let directUploadResp: FetchRespSchema.CfDirectUploadResp | null = null;
    try {
      directUploadResp = await postCfDirectUploadApi({
        cfAccountId: this.env.CF_ID,
        cfApiToken: this.env.CF_API_TOKEN,
        formFields: body,
      });
    } catch (error) {
      if (error instanceof FetchError) {
        const $response = error.response;
        const data = await $response.json<FetchRespSchema.CfCommonResp<null>>();
        return {
          data,
          status: $response.status,
        };
      }
      return {
        data: this._getDefaultValues(),
        status: 500,
      };
    }

    try {
      const uploaded = await postCfUploadApi({
        uploadUrl: directUploadResp.result.uploadURL,
        formFields: body,
      });
      return {
        data: uploaded,
        status: 200,
      };
    } catch (error) {
      if (error instanceof FetchError) {
        const $response = error.response;
        const data = await $response.json<FetchRespSchema.CfCommonResp<null>>();
        return {
          data,
          status: $response.status,
        };
      }
      return {
        data: this._getDefaultValues(),
        status: 500,
      };
    }
  }

  private _getDefaultValues() {
    return {
      result: null,
      success: false,
      errors: [],
      messages: [],
    };
  }
}
