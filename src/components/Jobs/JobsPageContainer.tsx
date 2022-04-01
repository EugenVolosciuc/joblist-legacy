import { FC } from "react";
import { Box, Text, Button, Icon, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { UserRole } from "@prisma/client";

import { useAuth } from "services/User";
import AddEditJobPostModal from "components/Jobs/AddEditJobPostModal";
import AddCompanyModal from "components/Jobs/AddCompanyModal";

type Props = {
  title?: string;
};

const JobsContainer: FC<Props> = ({ title }) => {
  const { isOpen: jobPostModalIsOpen, onToggle: toggleJobPostModal } =
    useDisclosure();
  const { isOpen: addCompanyModalIsOpen, onToggle: toggleAddCompanyModal } =
    useDisclosure();
  const { user } = useAuth();

  const handleNewJobPostClick = () => {
    if (!user?.companyId) {
      toggleAddCompanyModal();
    } else {
      toggleJobPostModal();
    }
  };

  return (
    <Box width="full" px={[4, 4, 8]}>
      <Box width="full" display="flex" justifyContent="space-between" my="4">
        {title ? <Text>{title}</Text> : <span />}
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
      <Box></Box>
    </Box>
  );
};

export default JobsContainer;
