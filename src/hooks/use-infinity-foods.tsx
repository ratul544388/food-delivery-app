import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinityFoods = ({
  queryKey,
  type,
  category,
  batch,
  q,
  foodId,
}: {
  queryKey: string;
  type?: string;
  category?: string;
  batch?: number;
  q?: string;
  foodId?: string;
}) => {
  const { inView, ref } = useInView();

  const fetchData = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: "/api/foods",
        query: {
          cursor: pageParam,
          type,
          category,
          batch,
          foodId,
          q,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    const res = await fetch(url);
    return res.json();
  };

  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchData,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return {
    data,
    ref,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
    refetch,
  };
};
