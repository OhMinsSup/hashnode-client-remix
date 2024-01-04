import { constructMethodCallUri } from "~/services/agent/fetch/utils";
import { API_ENDPOINTS, CLOUDFLARE } from "./constants";
import type { CallOptions } from "~/services/agent/client/types";
import type { ServiceClient } from "~/services/agent/client";
import type { QueryParams } from "~/services/agent/fetch/types";

export class FilesNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.FILES;

  _cloudflareApis = CLOUDFLARE;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
  }

  getFileList(query: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ROOT),
      this._service.uri,
      query
    );
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "GET",
      headers: httpHeaders,
      reqBody: undefined,
    });
  }

  create(body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ROOT),
      this._service.uri
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = body as unknown;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "POST",
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }

  directUpload(
    accountId: string,
    token: string,
    opts?: CallOptions | undefined
  ) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(
        this._cloudflareApis.CF_DIRECT_UPLOAD(accountId)
      ),
      this._cloudflareApis.uri
    );
    const httpHeaders = {
      ...opts?.headers,
      Authorization: `Bearer ${token}`,
    };

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "POST",
      headers: httpHeaders,
      reqBody: undefined,
    });
  }

  cloudflareUpload(
    uploadUrl: string,
    file: File,
    opts?: CallOptions | undefined
  ) {
    const httpUri = uploadUrl;
    const httpHeaders = opts?.headers;
    const formData = new FormData();
    formData.append("file", file);
    const httpReqBody = formData;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "POST",
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }
}
