import { Dispatch, FC, SetStateAction } from "react";
import { Box } from "@chakra-ui/react";

import Filters from "components/Jobs/JobList/Sider/Filters";
import { JobPostFilters } from "types/jobPost";

type Props = {
  filters: JobPostFilters;
  setFilters: Dispatch<SetStateAction<JobPostFilters>>;
};

const Sider: FC<Props> = ({ filters, setFilters }) => {
  return (
    <Box as="aside" width={["full", "full", "250px", "300px"]}>
      <Filters filters={filters} setFilters={setFilters} />
    </Box>
  );
};

export default Sider;
