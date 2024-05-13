import { type ServiceClient } from '.';
import { API_ENDPOINTS } from '../../../constants/constant';
import { type FetchWithoutRequestHandler } from '../fetch/types';

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
}
