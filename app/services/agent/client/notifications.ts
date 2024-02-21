import { constructMethodCallUri } from "../fetch/utils";
import type { CallOptions } from "../client/types";
import type { ServiceClient } from "../client";
import { API_ENDPOINTS } from "./constants";

export class NotificationsNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.NOTIFICATIONS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
  }

  getCount(opts?: CallOptions | undefined) {
    const httpUri = constructMethodCallUri(
      this._service.makePathname(this._defineApis.COUNT),
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
