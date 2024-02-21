import { ErrorType } from "./types";

export class ResponseError extends Error {
  public response: Response;
  public request: Request;
  public options: unknown;

  constructor(response: Response, request: Request, options: unknown) {
    const code =
      response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";

    super(reason);

    this.name = ErrorType.ResponseError;
    this.response = response;
    this.request = request;
    this.options = options;
  }

  getErrorData() {
    return {
      name: this.name,
      message: this.message,
      response: this.response,
      request: this.request,
      options: this.options,
    };
  }
}
