export interface AgentFetchHandlerResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

export interface AgentFetchHandlerOptions {
  uri: string;
  method: string;
  headers: Headers | Record<string, string> | undefined;
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
