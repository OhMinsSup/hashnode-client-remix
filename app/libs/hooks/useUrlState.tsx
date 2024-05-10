import { useRef } from 'react';
import { useSearchParams } from '@remix-run/react';

import { useMemoizedFn } from './useMemoizedFn';

export interface Options {
  addMode?: 'set' | 'append';
}

type ParamKeyValuePair = [string, string];
type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type UrlState = URLSearchParamsInit;

export const useUrlState = <S extends UrlState = UrlState>(
  initialState?: S | (() => S),
) => {
  const initialStateRef = useRef(
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState || {},
  );

  const [searchParams, setSearchParams] = useSearchParams(
    initialStateRef.current,
  );

  const _internalSetState = (
    params: URLSearchParams | Record<string, any> | any[],
  ) => {
    const input =
      params instanceof URLSearchParams
        ? params.entries()
        : Array.isArray(params)
          ? params
          : Object.entries(params);

    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of input) {
      if (typeof value === 'undefined' || value === null) continue;
      if (Array.isArray(value)) {
        newSearchParams.set(key, value.join(','));
        continue;
      }

      const hasToString = Object.prototype.hasOwnProperty.call(
        value,
        'toString',
      );

      if (hasToString) {
        newSearchParams.set(key, value.toString());
      } else {
        newSearchParams.set(key, `${value}`);
      }
    }

    return newSearchParams;
  };

  const setState = (
    params: URLSearchParamsInit,
    navigateOpts?: Parameters<typeof setSearchParams>[1],
  ) => {
    if (
      !params ||
      !(params instanceof URLSearchParams) ||
      typeof params === 'string'
    ) {
      setSearchParams(searchParams, navigateOpts);
      return;
    }

    const newSearchParams = _internalSetState(params);
    setSearchParams(newSearchParams, navigateOpts);
  };

  const removeState = (
    params: string | string[],
    navigateOpts?: Parameters<typeof setSearchParams>[1],
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (typeof params === 'string') {
      newSearchParams.delete(params);
    } else {
      params.forEach((key) => {
        newSearchParams.delete(key);
      });
    }
    setSearchParams(newSearchParams, navigateOpts);
  };

  return [
    searchParams,
    useMemoizedFn(setState),
    useMemoizedFn(removeState),
  ] as const;
};
