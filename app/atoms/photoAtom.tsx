import { useRef } from "react";
import {
  selectorFamily,
  atom,
  useRecoilCallback,
  useRecoilValue,
  selector,
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

const photosAtom = atom<Photo[][]>({
  key: "photosAtom",
  default: [],
});

export const fetchPhotoSelector = selectorFamily({
  key: "fetchPhotoSelector",
  get: (params: { page: number; limit: number }) => async () => {
    const { page, limit } = params;
    const resp = await picsumClient.get(`?page=${page}&limit=${limit}`);
    return await resp.json<Photo[]>();
  },
});

export const photosQuery = selector({
  key: "photosQuery",
  get: ({ get }) => {
    const originVlaue = get(photosAtom);
    return originVlaue.flatMap((i) => i);
  },
});

export function usePhotoQuery() {
  const stateRef = useRef({
    page: 1,
  });

  const originValues = useRecoilValue(photosQuery);

  const newValues = useRecoilValue(
    fetchPhotoSelector({
      page: stateRef.current.page,
      limit: 15,
    })
  );

  const fetchNext = useRecoilCallback(({ snapshot, set }) => async () => {
    const state = stateRef.current;

    const next = state.page + 1;

    console.log("next", next);

    const origin = await snapshot.getPromise(
      fetchPhotoSelector({
        page: next,
        limit: 15,
      })
    );

    stateRef.current.page = next;

    set(photosAtom, (old) => [...old, origin]);
  });

  return {
    photos: originValues.concat(newValues),
    fetchNext,
  };
}
