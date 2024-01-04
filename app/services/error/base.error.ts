import { ErrorType } from "./types";

export class BaseError<Data = any, Options = any> extends Error {
  public data?: Data;
  public options?: Options;

  constructor(name: string, message: string, data?: Data, options?: Options) {
    super(message);

    this.name = name || ErrorType.BaseError;
    this.data = data;
    this.options = options;
  }

  getBaseErrorData() {
    return {
      data: this.data,
      options: this.options,
    };
  }
}
