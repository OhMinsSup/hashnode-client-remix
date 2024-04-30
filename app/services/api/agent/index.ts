import type { ServiceClient } from "../client";
import type {
  AgentConfigureOptions,
  AgentOpts,
  FetchHandler,
} from "../fetch/types";
import { BaseClient } from "../client";
import { fetchHandler } from "../fetch";

export class Agent {
  service: URL;
  prefix?: string;
  api: ServiceClient;

  private _baseClient: BaseClient;

  static fetch: FetchHandler | undefined = fetchHandler;

  static configure(opts: AgentConfigureOptions): void {
    Agent.fetch = opts.fetch;
  }

  constructor(opts: AgentOpts) {
    this.service =
      opts.service instanceof URL ? opts.service : new URL(opts.service);
    this.prefix = opts.prefix;

    this._baseClient = new BaseClient();
    this._baseClient.fetch = this._fetch.bind(this);
    this.api = this._baseClient.service(opts.service, opts.prefix);
  }

  private _fetch: FetchHandler = async (request, options) => {
    if (!Agent.fetch) {
      throw new Error("Agent fetch() method not configured");
    }
    return await Agent.fetch(request, options);
  };
}
