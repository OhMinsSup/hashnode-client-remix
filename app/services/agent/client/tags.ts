import { constructMethodCallUri } from "~/services/agent/fetch/utils";
import type { CallOptions } from "~/services/agent/client/types";
import type { ServiceClient } from "~/services/agent/client";
import { API_ENDPOINTS } from "./constants";

export class TagsNamespace {
  _service: ServiceClient;

  _defineApis = API_ENDPOINTS.TAGS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  get defineApis() {
    return this._defineApis;
  }
}
