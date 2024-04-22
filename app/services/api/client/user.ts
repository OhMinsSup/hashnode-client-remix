import { API_ENDPOINTS } from "../../../constants/constant";
import { type ServiceClient } from ".";
import { type FetchWithoutRequestHandler } from "../fetch/types";

export class UserNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.USERS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getMyInfoHandler: FetchWithoutRequestHandler = (options) => {
    return this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };
}
