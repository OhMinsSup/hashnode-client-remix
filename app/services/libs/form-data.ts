import type { FieldErrors, FieldValues, Resolver } from 'react-hook-form';

export const createFormData = <T extends FieldValues>(
  data: T,
  stringifyAll = true,
): FormData => {
  const formData = new FormData();
  if (!data) {
    return formData;
  }
  Object.entries(data).map(([key, value]) => {
    if (value instanceof FileList) {
      for (let i = 0; i < value.length; i++) {
        formData.append(key, value[i]);
      }
      return;
    }
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else {
      if (stringifyAll) {
        formData.append(key, JSON.stringify(value));
      } else {
        if (typeof value === 'string') {
          formData.append(key, value);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, JSON.stringify(value));
        }
      }
    }
  });

  return formData;
};

export const isGet = (request: Pick<Request, 'method'>) =>
  request.method === 'GET' || request.method === 'get';

const tryParseJSON = (jsonString: string) => {
  try {
    const json = JSON.parse(jsonString);

    return json;
  } catch (e) {
    return jsonString;
  }
};

export const generateFormData = (
  formData: FormData | URLSearchParams,
  preserveStringified = false,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outputObject: Record<any, any> = {};

  for (const [key, value] of formData.entries()) {
    const data = preserveStringified ? value : tryParseJSON(value.toString());
    const keyParts = key.split('.');
    let currentObject = outputObject;

    for (let i = 0; i < keyParts.length - 1; i++) {
      const keyPart = keyParts[i];
      if (!currentObject[keyPart]) {
        currentObject[keyPart] = /^\d+$/.test(keyParts[i + 1]) ? [] : {};
      }
      currentObject = currentObject[keyPart];
    }

    const lastKeyPart = keyParts[keyParts.length - 1];
    const lastKeyPartIsArray = /\[\d*\]$|\[\]$/.test(lastKeyPart);

    if (lastKeyPartIsArray) {
      const key = lastKeyPart.replace(/\[\d*\]$|\[\]$/, '');
      if (!currentObject[key]) {
        currentObject[key] = [];
      }

      currentObject[key].push(data);
    }

    if (!lastKeyPartIsArray) {
      if (/^\d+$/.test(lastKeyPart)) {
        currentObject.push(data);
      } else {
        currentObject[lastKeyPart] = data;
      }
    }
  }

  // Return the output object.
  return outputObject;
};

export const validateFormData = async <T extends FieldValues>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  resolver: Resolver<T>,
) => {
  const dataToValidate =
    data instanceof FormData ? Object.fromEntries(data) : data;
  const { errors, values } = await resolver(
    dataToValidate,
    {},
    { shouldUseNativeValidation: false, fields: {} },
  );

  if (Object.keys(errors).length > 0) {
    return { errors: errors as FieldErrors<T>, data: undefined };
  }

  return { errors: undefined, data: values as T };
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
export const parseFormData = async <T extends any>(
  request: Request | FormData,
  preserveStringified = false,
): Promise<T> => {
  const formData =
    request instanceof Request ? await request.formData() : request;
  return generateFormData(formData, preserveStringified);
};

export const getFormDataFromSearchParams = (
  request: Pick<Request, 'url'>,
  preserveStringified = false,
) => {
  const searchParams = new URL(request.url).searchParams;
  return generateFormData(searchParams, preserveStringified);
};

export const getValidatedFormData = async <T extends FieldValues>(
  request: Request,
  resolver: Resolver<T>,
  preserveStringified = false,
) => {
  const data = isGet(request)
    ? getFormDataFromSearchParams(request, preserveStringified)
    : await parseFormData<T>(request, preserveStringified);

  const validatedOutput = await validateFormData<T>(data, resolver);
  return { ...validatedOutput, receivedValues: data };
};
