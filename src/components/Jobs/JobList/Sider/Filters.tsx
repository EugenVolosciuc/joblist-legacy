import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@chakra-ui/react";

import Card from "components/shared/Card";
import { useAuth } from "services/User";
import { JobPostFilters } from "types/jobPost";

type Props = {
  filters: JobPostFilters;
  setFilters: Dispatch<SetStateAction<JobPostFilters>>;
};

const Filters: FC<Props> = ({ filters, setFilters }) => {
  const { user } = useAuth();

  const filterByCompanyPosts = () => {
    setFilters({ companyId: user?.companyId as string });
  };

  const filterByUserPosts = () => {
    setFilters({ createdById: user?.id });
  };

  return (
    <Card>
      {user?.company && (
        <Button
          variant="link"
          onClick={filterByCompanyPosts}
          isActive={filters?.companyId === user?.companyId}
        >
          All {user?.company?.name} job openings
        </Button>
      )}
      <Button
        variant="link"
        mb="1"
        onClick={filterByUserPosts}
        isActive={filters?.createdById === user?.id}
      >
        Job posts created by me
      </Button>
    </Card>
  );
};

export default Filters;
