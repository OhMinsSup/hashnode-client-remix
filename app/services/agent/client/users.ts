import { constructMethodCallUri } from "~/services/agent/fetch/utils";
import type { CallOptions } from "~/services/agent/client/types";
import type { ServiceClient } from "~/services/agent/client";
import { API_ENDPOINTS } from "./constants";
import type { QueryParams } from "~/services/agent/fetch/types";

export class UsersNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.USERS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
  }

  follow(body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.USER_FOLLOW),
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

  update(body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ROOT),
      this._service.uri
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = body as unknown;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "PUT",
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }

  delete(body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ME),
      this._service.uri
    );
    const httpHeaders = opts?.headers;
    const httpReqBody = body as unknown;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "DELETE",
      headers: httpHeaders,
      reqBody: httpReqBody,
    });
  }

  getUser(username: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ID(username)),
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

  getHistories(username: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.HISTORTIES(username)),
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

  getOwnPost(username: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.OWNER_POSTS.ID(username)),
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

  getUserList(params: QueryParams, opts?: CallOptions | undefined) {
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

  getMe(opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ME),
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
}
