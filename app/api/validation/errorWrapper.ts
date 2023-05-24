import { json } from "@remix-run/cloudflare";
import { HTTPErrorWrapper, ValidationErrorWrapper } from "./common";

export const actionErrorWrapper = async (fn: any): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    const error_validation = ValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation.errors, {
        status: error_validation.statusCode,
      });
    }
    const error_http = await HTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors, {
        status: error_http.statusCode,
      });
    }
    throw error;
  }
};
