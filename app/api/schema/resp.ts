import type { Nullable } from "./api";
import type { FileSchema } from "./file";
import type { UserSchema } from "./user";
import type { TagSchema } from "./tag";

export interface ListRespSchema<Item = Record<string, any>> {
  list: Item[];
  totalCount: number;
  pageInfo: {
    endCursor: Nullable<number>;
    hasNextPage: boolean;
  };
}

export interface AuthRespSchema {
  userId: number;
  accessToken: string;
}

export interface UserRespSchema extends UserSchema {}

export interface PostRespSchema {
  dataId: number;
}

export interface UploadRespSchema
  extends Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> {}

export interface FileListRespSchema
  extends ListRespSchema<Omit<FileSchema, "deletedAt">> {}

export interface TagListRespSchema
  extends ListRespSchema<Omit<TagSchema, "deletedAt">> {}
