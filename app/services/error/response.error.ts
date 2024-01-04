import { BaseError } from "./base.error";
import { ErrorType } from "./types";

export class ResponseError extends BaseError {
  public response: Response;
  public request: Request;

  constructor(response: Response, request: Request, options: any) {
    const code =
      response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";

    super(ErrorType.HTTPError, `HTTP Error: ${reason}`, code, options);

    this.name = ErrorType.HTTPError;
    this.response = response;
    this.request = request;
    this.options = options;
  }

  getResponseErrorData() {
    return {
      response: this.response,
      request: this.request,
      data: this.data,
      options: this.options,
    };
  }
}
