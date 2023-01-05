import type { Nullable } from "./api";

export interface DraftSchema {
  id: number;
  title?: string;
  subTitle?: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  tags?: string;
  disabledComment?: boolean;
  isPublic?: boolean;
  hasPublishedTime?: boolean;
  publishingDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
}
