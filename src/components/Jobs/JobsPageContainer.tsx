import { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Icon,
  useDisclosure,
  Center,
  Heading,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { UserRole } from "@prisma/client";

import { useAuth } from "services/User";
import JobPostService from "services/JobPost";
import AddEditJobPostModal from "components/Jobs/AddEditJobPostModal";
import AddCompanyModal from "components/Jobs/AddCompanyModal";
import JobList from "components/Jobs/JobList";
import Empty from "components/shared/Empty";
import Loader from "components/shared/Loader";
import { usePageQuery } from "components/Layout/usePageQuery";
import Sider from "components/Jobs/JobList/Sider";
import { PaginatedPageQuery } from "types/misc";
import Card from "components/shared/Card";
import { JobPostFilters } from "types/jobPost";

type Props = {
  query: {
    page: number;
    pageSize: number;
  };
};

const JobsContainer: FC<Props> = ({ query: initialQuery }) => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<JobPostFilters>({});
  const query = usePageQuery(initialQuery) as PaginatedPageQuery;
  const { data: jobPosts, isLoading } = JobPostService.useJobPosts(
    query,
    filters,
    [!!user]
  );

  const { isOpen: jobPostModalIsOpen, onToggle: toggleJobPostModal } =
    useDisclosure();
  const { isOpen: addCompanyModalIsOpen, onToggle: toggleAddCompanyModal } =
    useDisclosure();

  const handleNewJobPostClick = () => {
    if (!user?.companyId) {
      toggleAddCompanyModal();
    } else {
      toggleJobPostModal();
    }
  };

  useEffect(() => {
    if (user && user.role === UserRole.RECRUITER)
      setFilters({ companyId: user.companyId as string });
  }, [user]);

  const gotJobPosts = !isLoading && jobPosts?.data && jobPosts.data.length > 0;

  return (
    <Box width="full" mb="4">
      <Box width="full" display="flex" justifyContent="space-between" my="4">
        <Heading fontSize="xl">Job posts</Heading>
        {user?.role === UserRole.RECRUITER && (
          <>
            <Button
              size="sm"
              variant="solid"
              leftIcon={<Icon as={FaPlus} />}
              onClick={handleNewJobPostClick}
            >
              New job post
            </Button>
            {!user?.companyId && (
              <AddCompanyModal
                isOpen={addCompanyModalIsOpen}
                onClose={toggleAddCompanyModal}
                callback={toggleJobPostModal}
              />
            )}
            <AddEditJobPostModal
              isOpen={jobPostModalIsOpen}
              onClose={toggleJobPostModal}
            />
          </>
        )}
      </Box>
      <Box display="flex" flexWrap="wrap">
        <Sider filters={filters} setFilters={setFilters} />
        <Box flex="1" pl={[0, 0, 4, 4, 6]} mt={[4, 4, 0]}>
          <Card>
            {isLoading ? (
              <Center my="8">
                <Loader />
              </Center>
            ) : !gotJobPosts ? (
              <Center my="8">
                <Empty />
              </Center>
            ) : (
              <JobList jobPosts={jobPosts.data} query={query} />
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default JobsContainer;
