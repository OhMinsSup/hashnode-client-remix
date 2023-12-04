import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";

import { schema } from "~/services/validate/cf-file.validate";
import { parseUrlParams } from "~/utils/util";

import {
  postCfDirectUploadApi,
  postCfUploadApi,
  postFileUploadApi,
} from "~/services/fetch/files/cf-file.server";
import { getFilesApi as $getFilesApi } from "~/services/fetch/files/gets-api.server";

import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
import type { Env } from "../app/env.server";
import type { ServerService } from "~/services/app/server.server";
import type { ToastService } from "../app/toast.server";

export class FileApiService {
  constructor(
    private readonly env: Env,
    private readonly $server: ServerService,
    private readonly $toast: ToastService
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
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    this.$server.readValidateMethod(request, "POST", request.url);

    const defaultToastOpts = {
      title: "error",
      description: "failed to follow the user. Please try again later.",
      type: "error" as const,
    };

    const redirectUrl = searchParams.get("redirectUrl") || PAGE_ENDPOINTS.ROOT;

    const MAX_FILE_SIZE = 5_000_000; // 5MB
    const uploadHandler = createMemoryUploadHandler({
      maxPartSize: MAX_FILE_SIZE,
    });

    const formData = await parseMultipartFormData(request, uploadHandler);

    const validate = await schema.safeParseAsync({
      file: formData.get("file"),
      uploadType: formData.get("uploadType"),
      mediaType: formData.get("mediaType"),
    });
    if (!validate.success) {
      throw await this.$server.redirectWithToast(
        redirectUrl.toString(),
        {
          ...defaultToastOpts,
          description:
            Object.values(validate.error ?? {})?.at(0) ??
            "An error occurred while signing in. Please try again later.",
        },
        this.$toast.createToastHeaders
      );
    }

    const body = validate.data;

    let directUploadResp: FetchRespSchema.CfDirectUploadResp | null = null;
    try {
      directUploadResp = await postCfDirectUploadApi({
        cfAccountId: this.env.CF_ID,
        cfApiToken: this.env.CF_API_TOKEN,
      });
    } catch (error) {
      const error_fetch = await this.$server.readCfFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          redirectUrl.toString(),
          {
            ...defaultToastOpts,
            description: "cloudflare direct upload error",
          },
          this.$toast.createToastHeaders
        );
      }
    }

    if (!directUploadResp) {
      throw await this.$server.redirectWithToast(
        redirectUrl.toString(),
        {
          ...defaultToastOpts,
          description: "cloudflare direct upload error",
        },
        this.$toast.createToastHeaders
      );
    }

    let uploaded: FetchRespSchema.CfUploadResp | null = null;
    try {
      uploaded = await postCfUploadApi({
        uploadUrl: directUploadResp.result.uploadURL,
        formFields: body,
      });
    } catch (error) {
      const error_fetch = await this.$server.readCfFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          redirectUrl.toString(),
          {
            ...defaultToastOpts,
            description: "cloudflare upload error",
          },
          this.$toast.createToastHeaders
        );
      }
    }

    if (!uploaded) {
      throw await this.$server.redirectWithToast(
        redirectUrl.toString(),
        {
          ...defaultToastOpts,
          description: "cloudflare upload error",
        },
        this.$toast.createToastHeaders
      );
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
      return result.result;
    } catch (error) {
      const error_fetch = await this.$server.readFetchError(error);
      if (error_fetch) {
        throw await this.$server.redirectWithToast(
          redirectUrl,
          {
            ...defaultToastOpts,
            description:
              Object.values(error_fetch.error ?? {})?.at(0) ??
              "An error occurred while signing in. Please try again later.",
          },
          this.$toast.createToastHeaders
        );
      }
    }
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
