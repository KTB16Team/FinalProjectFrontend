export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
}