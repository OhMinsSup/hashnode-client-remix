const UPLOAD_TYPE = {
  PROFILE: "PROFILE",
  IMAGE: "IMAGE",
  POST_THUMBNAIL: "POST_THUMBNAIL",
};

export type UploadType = keyof typeof UPLOAD_TYPE;

const MEDIA_TYPE = {
  IMAGE: "IMAGE",
};

export type MediaType = keyof typeof MEDIA_TYPE;

export interface FileSchema {
  id: number;
  name: string;
  url: string;
  uploadType: UploadType;
  mediaType: MediaType;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
