import { API_ENDPOINTS } from "../../../constants/constant";
import { type ServiceClient } from ".";
import {
  FetchOptions,
  FetchResponse,
  FetchWithoutRequestHandler,
  MappedResponseType,
  ResponseType,
} from "../fetch/types";

export class PostNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.POSTS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getPublishedHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.PUBLISHED),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };

  getIdHandler = async <T = unknown, R extends ResponseType = "json">(
    id: string,
    options?: FetchOptions<R>
  ): Promise<FetchResponse<MappedResponseType<R, T>>> => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ID(id)),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };

  getOwnerByIdHandler = async <T = unknown, R extends ResponseType = "json">(
    id: string,
    options?: FetchOptions<R>
  ): Promise<FetchResponse<MappedResponseType<R, T>>> => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.BY_OWNER(id)),
      {
        method: "GET",
        baseURL: this._service.uri.toString(),
        ...options,
      }
    );
  };
}
