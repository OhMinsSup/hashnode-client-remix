import { constructMethodCallUri } from "../fetch/utils";
import type { CallOptions } from "../client/types";
import type { ServiceClient } from "../client";
import { API_ENDPOINTS } from "./constants";
import type { QueryParams } from "../fetch/types";

export class TagsNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.TAGS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
  }

  getTagId(id: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ID(id)),
      this._service.uri
    );
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "GET",
      headers: httpHeaders,
      reqBody: undefined,
    });
  }

  getTag(name: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.SLUG(name)),
      this._service.uri
    );
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "GET",
      headers: httpHeaders,
      reqBody: undefined,
    });
  }

  getTags(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ROOT),
      this._service.uri,
      params
    );
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "GET",
      headers: httpHeaders,
      reqBody: undefined,
    });
  }

  follow(body: unknown, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.FOLLOW),
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
}
