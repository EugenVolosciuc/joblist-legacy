import { FC } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  pageCount: number;
  page: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
};

const Pagination: FC<Props> = ({
  pageCount,
  page: initialPage,
  handlePageChange,
}) => {
  const page = initialPage > pageCount ? 0 : initialPage - 1;

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={page} // React paginate is using 0 based index
      onPageChange={handlePageChange}
      containerClassName="pagination"
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
