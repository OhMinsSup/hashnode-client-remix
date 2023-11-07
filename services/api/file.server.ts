import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";

import { z } from "zod";
import { schema } from "services/validate/cf-file.validate";

import {
  postCfDirectUploadApi,
  postCfUploadApi,
  postFileUploadApi,
} from "services/fetch/files/cf-file.server";

import { FetchError } from "services/fetch/fetch.error";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "services/app/server.server";
import type { FormFieldValues } from "services/validate/cf-file.validate";
import { RESULT_CODE } from "~/constants/constant";

export class FileApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService
  ) {}

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
      if (!directUploadResp) {
        return {
          data: this._getDefaultValues(),
          status: 400,
        };
      }
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

    let uploaded: FetchRespSchema.CfUploadResp | null = null;
    try {
      uploaded = await postCfUploadApi({
        uploadUrl: directUploadResp.result.uploadURL,
        formFields: body,
      });
      if (!uploaded) {
        return {
          data: this._getDefaultValues(),
          status: 400,
        };
      }
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
      const response = await postFileUploadApi(
        {
          cfId: uploaded.result.id,
          filename: body.file.name,
          mimeType: body.file.type,
          publicUrl: uploaded.result.variants[0],
          mediaType: body.mediaType as FetchSchema.MediaType,
          uploadType: body.uploadType as FetchSchema.UploadType,
        },
        {
          request,
        }
      );
      const result =
        await this.$server.toJSON<FetchRespSchema.FileResp>(response);
      if (result.resultCode !== RESULT_CODE.OK) {
        return {
          data: this._getDefaultValues(),
          status: 400,
        };
      }
      return {
        data: {
          ...this._getDefaultValues(),
          success: true,
          result: result.result,
        },
        status: 200,
      };
    } catch (error) {
      if (error instanceof FetchError) {
        const $response = error.response;
        const data = await $response.json();
        return {
          data: {
            ...this._getDefaultValues(),
            result: data,
          },
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
