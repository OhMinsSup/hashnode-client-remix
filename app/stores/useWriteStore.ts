import create from "zustand";

interface VisibleState {
  subTitle: boolean;
}

interface UploadState {
  status: "idle" | "uploading" | "success" | "error";
}

interface WriteStore {
  visible: VisibleState;
  upload: UploadState;
  openSubTitle: () => void;
  closeSubTitle: () => void;
  changeUploadStatus: (status: UploadState["status"]) => void;
}

export const useWriteStore = create<WriteStore>((set) => ({
  visible: {
    subTitle: false,
  },
  upload: {
    status: "idle",
  },
  openSubTitle: () =>
    set((prev) => ({ ...prev, visible: { ...prev.visible, subTitle: true } })),
  closeSubTitle: () =>
    set((prev) => ({ ...prev, visible: { ...prev.visible, subTitle: false } })),
  changeUploadStatus: (status) =>
    set((prev) => ({ ...prev, upload: { ...prev.upload, status } })),
}));
