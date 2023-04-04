import Dexie, { type Table, type IndexableType } from "dexie";

export interface Draft {
  id?: number;
  title: string;
  subTitle: string;
  content: string;
  thumbnail: string;
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
}

export const db = new HashnodeDexie();
