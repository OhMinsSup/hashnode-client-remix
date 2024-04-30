import { API_ENDPOINTS } from "../../../constants/constant";
import { type ServiceClient } from ".";
import { FetchWithoutRequestHandler } from "../fetch/types";

export class DraftNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.DRAFTS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getDraftsHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };

  getSubmittedDraftsHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.SUBMITTED),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };

  postDraftHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: "POST",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };

  postSyncDraftHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.SYNC),
      {
        method: "POST",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };
}
