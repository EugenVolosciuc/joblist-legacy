import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import qs from "qs";

import { PageQuery, PaginatedPageQuery } from "types/misc";

export const usePageQuery = (initialQuery: PageQuery | PaginatedPageQuery) => {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const isPaginatedQuery = !!initialQuery.page;

  useEffect(() => {
    const parsedQuery = qs.parse(router.asPath.split("?")[1]);
    const updatedPage = parseInt(
      (parsedQuery.page as string) || "1",
      10
    ) as number;

    setQuery({
      ...query,
      ...(isPaginatedQuery && { page: updatedPage || query.page }),
    });
  }, [router.asPath]);

  return query;
};
