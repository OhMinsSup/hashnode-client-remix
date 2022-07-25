import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

// text state

const textAtom = atom({
  key: "textAtom", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export function useSearchTextValues() {
  return useRecoilValue(textAtom);
}

export function useSetSearchTextValue() {
  return useSetRecoilState(textAtom);
}

export function useSearchTextAtom() {
  return useRecoilState(textAtom);
}

// api state
export const searchAtom = atom({
  key: "searchAtom",
  default: {
    isPending: false,
    list: [],
    isLoading: false,
  },
});
