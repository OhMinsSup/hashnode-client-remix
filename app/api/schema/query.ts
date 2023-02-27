export interface PaginationQuery {
  limit?: number;
  cursor?: number;
}

export interface TagListQuery extends PaginationQuery {
  name?: string;
  type?: "popular" | "recent";
}

export interface PostListQuery extends PaginationQuery {
  keyword?: string;
  type?: "recent" | "featured" | "past" | "personalized";
  startDate?: string;
  endDate?: string;
}

export interface GetTopPostsQuery {
  duration: number;
}
