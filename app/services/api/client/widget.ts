import { type ServiceClient } from '.';
import { API_ENDPOINTS } from '../../../constants/constant';
import { type FetchWithoutRequestHandler } from '../fetch/types';

export class WidgetNamespace {
  _service: ServiceClient;

  endpoint = API_ENDPOINTS.WIDGETS;

  constructor(service: ServiceClient) {
    this._service = service;
  }

  getLeftSidePostCountHandler: FetchWithoutRequestHandler = async (options) => {
    return await this._service._baseClient.fetch(
      this._service.constructMethodCallUri(
        this.endpoint.GET_LEFTSIDE_POST_COUNT,
      ),
      {
        method: 'GET',
        baseURL: this._service.uri.toString(),
        ...options,
      },
    );
  };
}
