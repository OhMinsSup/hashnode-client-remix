import type { Nullable } from "./api";

export interface TagSchema {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: Nullable<number>;
}
