export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type PaginatedResponse<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
}