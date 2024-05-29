import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { API_ENDPOINTS } from '~/constants/constant';
import { mutationFn } from '~/services/react-query';
import { sharedMutationKey } from '~/services/react-query/shared';
import { useEnvStore } from '~/services/store/env-store-provider';
import { type FormFieldValues } from '~/services/validate/cf-file.validate';

type Data = FetchRespSchema.File;

type DataSchema = FetchRespSchema.Success<Data>;

type Variables = FormFieldValues;

interface UseFileUploadMutationParams
  extends UseMutationOptions<DataSchema, Error, Variables> {}

export function useFileUploadMutation(
  params?: Omit<UseFileUploadMutationParams, 'mutationFn' | 'mutationKey'>,
) {
  const getApiHost = useEnvStore((state) => state.getApiHost);

  const mutationKey: QueriesTypes.BaseMutationKey = [
    sharedMutationKey,
    useFileUploadMutation.name,
  ];

  const getPath = () => {
    return API_ENDPOINTS.FILES.UPLOAD;
  };

  return useMutation<DataSchema, Error, Variables>({
    mutationKey,
    mutationFn: mutationFn(getPath, {
      options: {
        method: 'POST',
        baseURL: getApiHost(),
        credentials: 'include',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    }),
    ...params,
  });
}
