import type {
  FetchOptions,
  FetchResponse,
  FetchWithoutRequestHandler,
  MappedResponseType,
  ResponseType,
} from '../fetch/types';
import { type ServiceClient } from '.';
import { API_ENDPOINTS } from '../../../constants/constant';

export class UserNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.USERS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getMyInfoHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: 'GET',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };

  getUserInfoHandler = async <T = unknown, R extends ResponseType = 'json'>(
    username: string,
    options?: FetchOptions<R>,
  ): Promise<FetchResponse<MappedResponseType<R, T>>> => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.USERNAME(username)),
      {
        method: 'GET',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };

  /**
   * @deprecated
   */
  getWidgetHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.WIDGET),
      {
        method: 'GET',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };

  putHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: 'PUT',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };

  deleteHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.ROOT),
      {
        method: 'DELETE',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };

  putEmailPreferencesHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(this.endpoint.EMIAL_PREFERENCES),
      {
        method: 'PUT',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };
}
