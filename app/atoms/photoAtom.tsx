import {
  type RecoilValue,
  selectorFamily,
  useRecoilRefresher_UNSTABLE,
} from "recoil";
import { picsumClient } from "~/api/client";

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const currentPhotoQuery = selectorFamily({
  key: "currentPhotoQuery",
  get: (params: { page: number; limit: number }) => async (get) => {
    const { page, limit } = params;
    const resp = await picsumClient.get(`?page=${page}&limit=${limit}`);
    const jsonData = await resp.json<Photo[]>();
    return jsonData;
  },
});

export const useRecoilCacheRefresh = (state: RecoilValue<any>) => {
  return useRecoilRefresher_UNSTABLE(state);
};
