export interface PaginationQuery {
  limit?: number;
  cursor?: number;
}

export interface TagListQuery extends PaginationQuery {
  name?: string;
}
