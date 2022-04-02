import { PaginationQuery } from "types/misc";

export const paginationToOffset = ({ page, pageSize }: PaginationQuery) => {
  return {
    skip: page * pageSize - pageSize,
    take: pageSize,
  };
};
