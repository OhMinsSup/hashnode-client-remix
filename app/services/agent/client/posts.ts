import { constructMethodCallUri } from "~/services/agent/fetch/utils";
import type { CallOptions } from "~/services/agent/client/types";
import type { ServiceClient } from "~/services/agent/client";
import type { QueryParams } from "~/services/agent/fetch/types";
import { API_ENDPOINTS } from "./constants";

export class PostsNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.POSTS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
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

  delete(id: string, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ID(id)),
      this._service.uri
    );
    const httpHeaders = opts?.headers;

    return this._service._baseClient.fetch({
      uri: httpUri,
      method: "DELETE",
      headers: httpHeaders,
      reqBody: undefined,
    });
  }

  update(id: string, body: any, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.ID(id)),
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

  getPost(id: string, opts?: CallOptions | undefined) {
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

  getPosts(params: QueryParams, opts?: CallOptions | undefined) {
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

  getDeletedPosts(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.GET_DELETED_POSTS),
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

  getDraftPosts(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.GET_DRAFT_POSTS),
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

  getLikedPosts(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.GET_LIKES),
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

  getTopPosts(params: QueryParams, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.GET_TOP_POSTS),
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
}
