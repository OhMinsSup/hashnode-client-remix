import type { FetchHandler } from "../fetch/types";
import { fetchHandler } from "../fetch";
import { TestNamespace } from "./test";

export class BaseClient {
  fetch: FetchHandler = fetchHandler;

  service(serviceUri: string | URL, prefix?: string): ServiceClient {
    return new ServiceClient(this, serviceUri, prefix);
  }
}

export class ServiceClient {
  _baseClient: BaseClient;

  uri: URL;
  prefix?: string;
  app: AppNamespace;

  constructor(
    baseClient: BaseClient,
    serviceUri: string | URL,
    prefix?: string
  ) {
    this._baseClient = baseClient;
    this.uri =
      typeof serviceUri === "string" ? new URL(serviceUri) : serviceUri;
    this.prefix = prefix;
    this.app = new AppNamespace(this);
  }
}

export class AppNamespace {
  _service: ServiceClient;
  test: TestNamespace;

  constructor(service: ServiceClient) {
    this._service = service;
    this.test = new TestNamespace(service);
  }
}
