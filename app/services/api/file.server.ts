import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";

import { z } from "zod";
import { schema } from "~/services/validate/cf-file.validate";

import {
  postCfDirectUploadApi,
  postCfUploadApi,
  postFileUploadApi,
} from "~/services/fetch/files/cf-file.server";
import { getFilesApi as $getFilesApi } from "~/services/fetch/files/gets-api.server";

import { FetchError } from "~/services/fetch/fetch.error";

import { RESULT_CODE } from "~/constants/constant";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";
import type { FormFieldValues } from "~/services/validate/cf-file.validate";
import { parseUrlParams } from "~/utils/util";

export class FileApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService
  ) {}

  /**
   * @description 파일 리스트
   * @param {FetchQuerySchema.Pagination} query
   * @param {Request} request
   */
  async list(query: FetchQuerySchema.Pagination, request: Request) {
    return await $getFilesApi(query, {
      request,
    });
  }

  /**
   * @version 2023-08-16
   * @description loader에서 호출 할 때 사용하는 함수 (일반)
   * @param {FetchQuerySchema.Pagination} params
   * @param {Request} request
   */
  async getFilesByBaseList(
    params: FetchQuerySchema.Pagination,
    request: Request
  ) {
    try {
      const response = await this.list(params, request);
      const json =
        await this.$server.toJSON<FetchRespSchema.FileListResp>(response);
      if (json.resultCode !== RESULT_CODE.OK) {
        return this.getDefaultFileList();
      }
      const result = json.result;
      return {
        list: result.list,
        pageInfo: result.pageInfo,
        totalCount: result.totalCount,
      };
    } catch (error) {
      return this.getDefaultFileList();
    }
  }

  /**
   * @version 2023-08-17
   * @description 파일 리스트 가져오기
   * @param {Request} request
   */
  async getFiles(request: Request) {
    const params = parseUrlParams(request.url);
    return this.getFilesByBaseList(params, request);
  }

  /**
   * @version 2023-08-24
   * @description Cloudflare Images 를 사용하여 파일 업로드
   * @param {Request} request
   */
  async uploadWithCfImages(request: Request) {
    let body: FormFieldValues | null = null;

    this.$server.readValidateMethod(request, "POST", request.url);

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

  /**
   * @version 2023-08-17
   * @description 기본 포스트 리스트
   */
  private getDefaultFileList() {
    return {
      list: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
      },
      totalCount: 0,
    };
  }
}
