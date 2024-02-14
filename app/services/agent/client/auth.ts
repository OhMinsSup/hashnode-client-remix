import { constructMethodCallUri } from "~/services/agent/fetch/utils";
import type { CallOptions } from "~/services/agent/client/types";
import type { ServiceClient } from "~/services/agent/client";
import { API_ENDPOINTS } from "./constants";

export class AuthNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.AUTH;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
  }

  signup(body: unknown, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.SIGNUP),
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

  signin(body: unknown, opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.SIGNIN),
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
