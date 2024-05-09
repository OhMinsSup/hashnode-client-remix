import type { FetchHandler } from "../fetch/types";
import { fetchHandler } from "../fetch";
import { AuthNamespace } from "./auth";
import { UserNamespace } from "./user";
import { DraftNamespace } from "./draft";
import { PostNamespace } from "./post";
import { FileNamespace } from "./file";
import { TagNamespace } from "./tags";
import { WidgetNamespace } from "./widget";

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

  constructMethodCallUri(endpoint: string): string {
    return `${this.prefix ? `${this.prefix}/${endpoint}` : endpoint}`;
  }
}

export class AppNamespace {
  _service: ServiceClient;
  auth: AuthNamespace;
  user: UserNamespace;
  draft: DraftNamespace;
  post: PostNamespace;
  file: FileNamespace;
  tag: TagNamespace;
  widget: WidgetNamespace;

  constructor(service: ServiceClient) {
    this._service = service;
    this.auth = new AuthNamespace(service);
    this.user = new UserNamespace(service);
    this.draft = new DraftNamespace(service);
    this.post = new PostNamespace(service);
    this.file = new FileNamespace(service);
    this.tag = new TagNamespace(service);
    this.widget = new WidgetNamespace(service);
  }
}
