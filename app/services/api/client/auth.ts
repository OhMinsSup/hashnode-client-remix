import { API_ENDPOINTS } from "../../../constants/constant";
import { type ServiceClient } from ".";
import { type FetchWithoutRequestHandler } from "../fetch/types";

export class AuthNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.AUTH;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  signupHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.SIGNUP),
      {
        method: "POST",
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };

  signinHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.SIGNIN),
      {
        method: "POST",
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };
}
