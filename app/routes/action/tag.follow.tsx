import { json } from "@remix-run/cloudflare";

// api
import { postTagFollowApi } from "~/api/tags/follow.server";
import { deleteTagFollowApi } from "~/api/tags/unfollow.server";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

// schema
import { tagFollowSchema } from "~/api/tags/validation/follow";

// constants
import { RESULT_CODE } from "~/constants/constant";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async (args: ActionArgs) => {
  try {
    const formData = await args.request.formData();
    const tag = formData.get("tag");

    if (!tag) {
      throw new Response("Not Found", { status: 404 });
    }

    const parse = await tagFollowSchema.parseAsync({
      tag,
    });
    switch (args.request.method) {
      case "POST": {
        const { json: data } = await postTagFollowApi(parse.tag, {
          request: args.request,
        });
        return json({
          ok: data.resultCode == RESULT_CODE.OK,
          respData: data,
        });
      }
      case "DELETE": {
        const { json: data } = await deleteTagFollowApi(parse.tag, {
          request: args.request,
        });
        return json({
          ok: data.resultCode == RESULT_CODE.OK,
          respData: data,
        });
      }
      default:
        throw new Response("Method not allowed", { status: 405 });
    }
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

export type TagFollowAction = typeof action;
