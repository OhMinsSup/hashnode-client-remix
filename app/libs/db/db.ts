import Dexie, { type Table, type IndexableType } from "dexie";
import type { FileSchema } from "~/api/schema/file";

export interface Draft {
  id?: number;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> | null;
  description: string;
  disabledComment: boolean;
  publishingDate: Date;
  tags: string[];
}

export class HashnodeDexie extends Dexie {
  drafts!: Table<Partial<Draft>>;

  constructor() {
    super("hashnode:app");
    this.version(1).stores({
      drafts: "++id, title, description",
    });
  }

  async addDraft(draft: Partial<Draft>, key?: IndexableType | undefined) {
    return this.transaction("rw", this.drafts, () => {
      return this.drafts.add(draft, key);
    });
  }

  async updateDraft(
    key: Partial<Draft> | IndexableType,
    changes: {
      [keyPath: string]: any;
    }
  ) {
    return this.transaction("rw", this.drafts, () => {
      return this.drafts.update(key, changes);
    });
  }

  async deleteDraft(key: IndexableType) {
    return this.transaction("rw", this.drafts, () => {
      return this.drafts.delete(key);
    });
  }

  async getDraft(key: IndexableType) {
    return this.drafts.get(key);
  }

  async getHashTitleDrafts(keyword?: string) {
    const [_list, _totalCount] = await Promise.all([
      hashnodeDB.drafts.where("title").above(keyword).toArray(),
      hashnodeDB.drafts.where("title").above(keyword).count(),
    ]);
    return { list: _list, totalCount: _totalCount };
  }
}

export const hashnodeDB = new HashnodeDexie();
