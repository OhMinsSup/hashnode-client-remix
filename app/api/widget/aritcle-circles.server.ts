// api
import { ApiService } from "../client.next";

// constants
import { API_ENDPOINTS } from "~/constants/constant";
import { isString } from "~/utils/assertion";

// types
import type { BaseApiOptions } from "../client.next";
import type { GetAritcleCirclesRespSchema } from "../schema/resp";

interface GetAritcleCirclesApiSearchParams {
  userId?: string | number;
}

/**
 * @description article-circles 조회 API
 * @param {GetAritcleCirclesApiSearchParams?} query
 * @param {BaseApiOptions?} options
 */
export async function getAritcleCirclesApi(
  query?: GetAritcleCirclesApiSearchParams,
  options?: BaseApiOptions
) {
  const _nextOpts = ApiService.middlewareSetAuthticated(options);
  const __nextOpts = ApiService.middlewareForAuth(_nextOpts);
  let searchParams: URLSearchParams | undefined = undefined;
  if (query?.userId) {
    searchParams = new URLSearchParams();
    searchParams.set(
      "userId",
      isString(query.userId) ? query.userId : query.userId.toString()
    );
  }
  const { json } = await ApiService.getJson<GetAritcleCirclesRespSchema>(
    ApiService.middlewareForSearchParams(
      API_ENDPOINTS.WIDGET.ARTICLE_CIRCLES,
      searchParams
    ),
    __nextOpts?.init
  );
  return { json };
}