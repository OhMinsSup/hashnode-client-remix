import type { Nullable } from "./api";

export interface DraftSchema {
  id: number;
  title?: string;
  json?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Nullable<Date>;
}
