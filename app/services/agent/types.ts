export interface AgentFetchHandlerResponse {
  status: number;
  headers: Headers | Record<string, unknown> | undefined;
  body: unknown;
}

export interface AgentFetchHandlerOptions {
  uri: string;
  method: string;
  headers: Headers | Record<string, unknown> | undefined;
  reqBody: unknown;
}

export type AgentFetchHandler = (
  opts: AgentFetchHandlerOptions
) => Promise<AgentFetchHandlerResponse>;

export interface AgentConfigureOptions {
  fetch: AgentFetchHandler;
}

export interface AgentOpts {
  service: string | URL;
  prefix?: string;
}
