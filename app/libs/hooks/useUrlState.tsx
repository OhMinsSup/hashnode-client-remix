import { useRef } from "react";
import { useSearchParams } from "@remix-run/react";
import {
  isArray,
  isEmpty,
  isFunction,
  isNull,
  isString,
  isUndefined,
} from "~/utils/assertion";
import { useMemoizedFn } from "./useMemoizedFn";

export interface Options {
  addMode?: "set" | "append";
}

type ParamKeyValuePair = [string, string];
type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type UrlState = URLSearchParamsInit;

export const useUrlState = <S extends UrlState = UrlState>(
  initialState?: S | (() => S)
) => {
  const initialStateRef = useRef(
    isFunction(initialState) ? (initialState as () => S)() : initialState || {}
  );

  const [searchParams, setSearchParams] = useSearchParams(
    initialStateRef.current
  );

  const setState = (
    params: URLSearchParamsInit,
    navigateOpts?: Parameters<typeof setSearchParams>[1]
  ) => {
    if (!params || isEmpty(params) || isString(params)) {
      setSearchParams(searchParams, navigateOpts);
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);
    if (params instanceof URLSearchParams) {
      params.forEach((value, key) => {
        if (isArray(value)) {
          newSearchParams.set(key, value.join(","));
        } else {
          if (isUndefined(value) || isNull(value)) return;
          const hasToString = Object.prototype.hasOwnProperty.call(
            value,
            "toString"
          );
          if (hasToString) {
            newSearchParams.set(key, value.toString());
          } else {
            newSearchParams.set(key, `${value}`);
          }
        }
      });
      setSearchParams(newSearchParams, navigateOpts);
      return;
    }

    if (isArray(params)) {
      params.forEach(([key, value]) => {
        if (isArray(value)) {
          newSearchParams.set(key, value.join(","));
        } else {
          if (isUndefined(value) || isNull(value)) return;
          const hasToString = Object.prototype.hasOwnProperty.call(
            value,
            "toString"
          );
          if (hasToString) {
            newSearchParams.set(key, value.toString());
          } else {
            newSearchParams.set(key, `${value}`);
          }
        }
      });
      setSearchParams(newSearchParams, navigateOpts);
      return;
    }

    Object.keys(params).forEach((key) => {
      // @ts-ignore TODO: fix this
      const value = params[key];
      if (Array.isArray(value)) {
        newSearchParams.set(key, value.join(","));
      } else {
        if (isUndefined(value) || isNull(value)) return;
        const hasToString = Object.prototype.hasOwnProperty.call(
          value,
          "toString"
        );
        if (hasToString) {
          newSearchParams.set(key, value.toString());
        } else {
          newSearchParams.set(key, `${value}`);
        }
      }
    });

    setSearchParams(newSearchParams, navigateOpts);
  };

  return [searchParams, useMemoizedFn(setState)] as const;
};
