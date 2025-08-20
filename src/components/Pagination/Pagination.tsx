import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onChange: (page: number) => void;
  page: number;
}
export default function Pagination({
  totalPages,
  onChange,
  page,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      onPageChange={({ selected }: { selected: number }) =>
        onChange(selected + 1)
      }
      pageRangeDisplayed={5}
      forcePage={page - 1}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
