import { useState, FC } from "react";
import { useRouter } from "next/router";
import qs from "qs";
import { Box } from "@chakra-ui/react";
import { Company, JobPost } from "@prisma/client";

import Pagination from "components/shared/Pagination";
import { PaginatedPageQuery } from "types/misc";
import JobListItem from "components/Jobs/JobList/JobListItem";
import DeleteJobPostModal from "components/Jobs/DeleteJobPostModal";

type Props = {
  jobPosts: (JobPost & { company: Company })[];
  query: PaginatedPageQuery;
};

const JobList: FC<Props> = ({ jobPosts, query }) => {
  const router = useRouter();
  const [jobPostIdToRemove, setJobPostIdToRemove] = useState<string | null>(
    null
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    const parsedQuery = qs.parse(router.asPath.split("?")[1]);

    const as = `${router.pathname}?${qs.stringify({
      ...parsedQuery,
      page: selected + 1,
    })}`;

    router.push(router.pathname, as);
  };

  return (
    <>
      <DeleteJobPostModal
        jobPostID={jobPostIdToRemove}
        onClose={() => setJobPostIdToRemove(null)}
      />
      <Box my="4">
        {jobPosts.map((jobPost, index) => (
          <JobListItem
            key={jobPost.id}
            jobPost={jobPost}
            lastItem={index === jobPosts.length - 1}
            setJobPostIdToRemove={setJobPostIdToRemove}
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
    </>
  );
};

export default JobList;
