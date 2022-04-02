import { FC } from "react";
import { useRouter } from "next/router";
import qs from "qs";
import { Box } from "@chakra-ui/react";
import { Company, JobPost } from "@prisma/client";

import Pagination from "components/shared/Pagination";
import { PaginatedPageQuery } from "types/misc";
import JobListItem from "components/Jobs/JobList/JobListItem";

type Props = {
  jobPosts: (JobPost & { company: Company })[];
  query: PaginatedPageQuery;
};

const JobList: FC<Props> = ({ jobPosts, query }) => {
  const router = useRouter();

  const handlePageChange = ({ selected }: { selected: number }) => {
    const parsedQuery = qs.parse(router.asPath.split("?")[1]);

    const as = `${router.pathname}?${qs.stringify({
      ...parsedQuery,
      page: selected + 1,
    })}`;

    router.push(router.pathname, as);
  };

  return (
    <Box>
      <Box my="4">
        {jobPosts.map((jobPost, index) => (
          <JobListItem
            key={jobPost.id}
            jobPost={jobPost}
            lastItem={index === jobPosts.length - 1}
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="end">
        <Pagination
          pageCount={query.pages || 1}
          page={query.page}
          handlePageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default JobList;
