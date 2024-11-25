export type Pagination<T> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  products: T[];
};
