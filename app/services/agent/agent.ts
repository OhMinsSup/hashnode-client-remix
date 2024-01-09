import { BaseError, ErrorType } from "~/services/error";
import { defaultFetchHandler } from "~/services/agent/fetch";
import { BaseClient } from "~/services/agent/client";

import type { ServiceClient } from "~/services/agent/client";
import type { FetchHandlerOptions } from "~/services/agent/fetch/types";
import type {
  AgentConfigureOptions,
  AgentFetchHandler,
  AgentOpts,
} from "./types";

export class Agent {
  service: URL;
  prefix?: string;
  api: ServiceClient;

  private _baseClient: BaseClient;

  static fetch: AgentFetchHandler | undefined = defaultFetchHandler;

  static configure(opts: AgentConfigureOptions) {
    Agent.fetch = opts.fetch;
  }

  constructor(opts: AgentOpts) {
    this.service =
      opts.service instanceof URL ? opts.service : new URL(opts.service);
    this.prefix = opts.prefix;

    this._baseClient = new BaseClient();
    this._baseClient.fetch = this._fetch.bind(this); // patch its fetch implementation
    this.api = this._baseClient.service(opts.service, opts.prefix);
  }

  private async _fetch(opts: FetchHandlerOptions) {
    if (!Agent.fetch) {
      throw new BaseError(
        ErrorType.AgentError,
        "AtpAgent fetch() method not configured"
      );
    }

    // send the request
    const res = await Agent.fetch({
      uri: opts.uri,
      method: opts.method,
      headers: opts.headers,
      reqBody: opts.reqBody,
    });

    return res;
  }
}
