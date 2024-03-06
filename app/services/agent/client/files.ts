import {
  constructMethodCallUri,
  httpResponseBodyParse,
  normalizeResponseHeaders,
} from "../fetch/utils";
import { API_ENDPOINTS, CLOUDFLARE } from "./constants";
import type { CallOptions } from "../client/types";
import type { ServiceClient } from "../client";
import type { QueryParams } from "../fetch/types";
import { ResponseError } from "../../error";

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

  create(body: unknown, opts?: CallOptions | undefined) {
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
      this._cloudflareApis.CF_DIRECT_UPLOAD(accountId),
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

  async cloudflareUpload(
    uploadUrl: string,
    file: File,
    opts?: CallOptions | undefined
  ) {
    const httpUri = uploadUrl;
    const httpReqBody = new FormData();
    httpReqBody.append("file", file);

    const request = new Request(httpUri, {
      method: "POST",
      body: httpReqBody,
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new ResponseError(response, request, opts);
    }

    const contentType = response.headers.get("content-type");
    return {
      status: response.status,
      headers: normalizeResponseHeaders(response.headers),
      body: await httpResponseBodyParse(contentType, response),
    };
  }
}
