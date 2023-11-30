"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import qs from "query-string";
import { useEffect, useState } from "react";
import Loader from "./loaders/loader";
interface PaginationProps {
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount }) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1;
    setIsLoading(true);

    const currentQuery = qs.parse(params.toString());

    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        ...currentQuery,
        page: selectedPage,
      },
    });

    router.push(url);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [params]);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextClassName="px-3 py-1 cursor-pointer hover:scale-105 transition-all"
        previousClassName="px-3 py-1 cursor-pointer hover:scale-105 transition-all"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="cursor-pointer hover:scale-105 transition-all"
        activeClassName="bg-primary text-white rounded-md px-3 py-1"
        className="flex items-center gap-3.5 bg-accent px-2 rounded-xl py-2 w-fit ml-auto mt-3 transition-all duration-300"
      />
      {isLoading && <Loader />}
    </>
  );
};

export default Pagination;
