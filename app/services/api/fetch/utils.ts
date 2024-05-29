import type { FetchOptions, ResponseMapType } from './types';

export function mergeFetchOptions<R extends ResponseMapType = 'json'>(
  input: FetchOptions<R> | undefined,
  defaults: FetchOptions<R> | undefined,
  Headers = globalThis.Headers,
): FetchOptions<R> {
  const merged: FetchOptions<R> = {
    ...defaults,
    ...input,
  };

  // Merge params and query
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults.params,
      ...input.params,
    };
  }
  if (defaults?.query && input?.query) {
    const inputQuery =
      input.query instanceof URLSearchParams
        ? input.query
        : new URLSearchParams(input.query);

    const defaultQuery =
      defaults.query instanceof URLSearchParams
        ? defaults.query
        : new URLSearchParams(defaults.query);

    merged.query = {
      ...Object.fromEntries(defaultQuery),
      ...Object.fromEntries(inputQuery),
    };
  }

  // Merge headers
  if (defaults?.headers && input?.headers) {
    const _defaultHeaders = new Headers(defaults.headers ?? {});
    const _merged = new Headers(input.headers ?? {});
    merged.headers = _defaultHeaders;
    for (const [key, value] of _merged) {
      merged.headers.set(key, value);
    }
  }

  return merged;
}

export function isJSONSerializable(value: unknown): boolean {
  if (value === undefined) {
    return false;
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  ) {
    return true;
  }

  if (typeof value !== 'object') {
    return false; // bigint, function, symbol, undefined
  }

  if (Array.isArray(value)) {
    return true;
  }

  if (value instanceof ArrayBuffer) {
    return false;
  }

  if (value instanceof FormData) {
    return false;
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- safe
    (value.constructor && value.constructor.name === 'Object') ||
    ('toJSON' in value && typeof value.toJSON === 'function')
  );
}

const textTypes = new Set([
  'image/svg',
  'application/xml',
  'application/xhtml',
  'application/html',
]);

const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(?<temp1>;.+)?$/i;

export function detectResponseType(_contentType = ''): ResponseMapType {
  if (!_contentType) {
    return 'json';
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- safe
  const contentType = _contentType.split(';').shift() || '';

  if (JSON_RE.test(contentType)) {
    return 'json';
  }

  if (textTypes.has(contentType) || contentType.startsWith('text/')) {
    return 'text';
  }

  return 'blob';
}
