import { atom, useRecoilState } from "recoil";

interface SubTitleAtom {
  visible: boolean;
  subTitle: string;
}

export const subTitleAtom = atom<SubTitleAtom>({
  key: "subTitleAtom",
  default: {
    visible: false,
    subTitle: "",
  },
});

export function useSubTitleAtom() {
  return useRecoilState(subTitleAtom);
}

type CoverType = "Upload" | "Unsplash";

interface CoverAtom {
  tabType: CoverType;
}

export const coverAtom = atom<CoverAtom>({
  key: "coverAtom",
  default: {
    tabType: "Upload",
  },
});
