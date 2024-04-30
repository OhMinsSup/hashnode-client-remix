import { type ServiceClient } from ".";
import { API_ENDPOINTS } from "../../../constants/constant";
import { fetchHandler } from "../fetch";
import {
  type FetchWithoutRequestHandler,
  type FetchOptions,
} from "../fetch/types";

export const CLOUDFLARE = {
  URL: new URL("https://api.cloudflare.com"),
  CF_DIRECT_UPLOAD: (cfId: string) =>
    `/client/v4/accounts/${cfId}/images/v2/direct_upload`,
};

export class FileNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.FILES;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  postFileCreateHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: "POST",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };

  postDirectUploadHandler = <Data = unknown>(
    accountId: string,
    token: string,
    opts?: FetchOptions<"json"> | undefined
  ) => {
    const request = new URL(
      CLOUDFLARE.CF_DIRECT_UPLOAD(accountId),
      CLOUDFLARE.URL
    );

    return fetchHandler<Data, "json">(request.toString(), {
      ...opts,
      method: "POST",
      headers: {
        ...opts?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  postCloudflareUploadHandler = <Data = unknown>(
    uploadUrl: string,
    file: File,
    opts?: FetchOptions<"json"> | undefined
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchHandler<Data, "json">(uploadUrl, {
      ...opts,
      method: "POST",
      body: file,
    });
  };
}
