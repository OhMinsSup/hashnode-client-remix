import { API_ENDPOINTS } from "../../../constants/constant";
import { type ServiceClient } from ".";
import { type FetchWithoutRequestHandler } from "../fetch/types";

export class TagNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.TAGS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getWidgetHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.WIDGET),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };
}
