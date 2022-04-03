import {
  FC,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Company, JobPost, UserRole } from "@prisma/client";
import {
  Box,
  Heading,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useAuth } from "services/User";
import { formatRelative } from "date-fns";
import { capitalize } from "utils/string-manipulations";
import Image from "next/image";
import Link from "next/link";
import salaryPeriodMapping from "constants/mappings/salaryPeriod";
import salaryTypeMapping from "constants/mappings/salaryType";
import { FaEdit, FaCalendarTimes } from "react-icons/fa";
import { getSalaryContent, jobPostIsExpired } from "utils/job-post";
import { useRouter } from "next/router";
import { clientErrorHandler } from "utils/error-handlers";
import JobPostService from "services/JobPost";

type Props = {
  jobPost: JobPost & { company: Company };
  lastItem: boolean;
  setJobPostIdToRemove: Dispatch<SetStateAction<string | null>>;
};

const JobListItem: FC<Props> = ({
  jobPost,
  lastItem,
  setJobPostIdToRemove,
}) => {
  const {
    company,
    createdAt,
    currency,
    id,
    isSuperPost,
    location,
    maxSalary,
    minSalary,
    salary,
    salaryPeriod,
    salaryType,
    title,
  } = jobPost;
  const router = useRouter();
  const { user } = useAuth();
  const [deactivatingPost, setDeactivatingPost] = useState(false);

  const isExpired = jobPostIsExpired(jobPost);
  const isRecruiter = user?.role === UserRole.RECRUITER;
  const canEditJobPost = jobPost.createdById === user?.id;
  const showCompanyData = !isRecruiter;
  const showCompanyLogo = showCompanyData && !!company.logoURL;
  const showSalary =
    salaryPeriod &&
    salaryType &&
    currency &&
    (salary || minSalary || maxSalary);

  const salaryContent = getSalaryContent(jobPost);

  const handleEditJobPost: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    router.push("/jobs/[id]/edit", `/jobs/${jobPost.id}/edit`);
  };

  const handleDeactivatePost: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    try {
      setDeactivatingPost(true);

      await JobPostService.updateJobPost(jobPost.id, { expiresAt: new Date() });

      setDeactivatingPost(false);
    } catch (error) {
      setDeactivatingPost(false);
      clientErrorHandler(error);
    }
  };

  const handleShowDeletePostModal: MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();
    setJobPostIdToRemove(jobPost.id);
  };

  return (
    <Link href="/jobs/[id]" as={`/jobs/${id}`} passHref>
      <Box
        as="a"
        display="flex"
        mb={lastItem ? 0 : 4}
        pb={4}
        borderBottomColor="gray.200"
        borderBottomWidth={lastItem ? "0" : "1px"}
        borderStyle="solid"
        role="group"
        position="relative"
      >
        <Box
          position="absolute"
          height="calc(100% + 1rem)"
          transition="0.1s ease-in-out"
          width="0"
          backgroundColor="primary.400"
          top="-4"
          zIndex="1"
          borderEndRadius="md"
          _groupHover={{
            width: 2,
          }}
        />
        {showCompanyLogo && (
          <Box
            position="relative"
            transition="0.1s ease-in-out"
            minWidth="20"
            height="20"
            mr="2"
            _groupHover={{ ml: 2 }}
          >
            <Image
              src={company.logoURL as string}
              objectFit="contain"
              layout="fill"
            />
          </Box>
        )}
        <Box
          transition="0.1s ease-in-out"
          _groupHover={{ ml: showCompanyLogo ? 0 : 6 }}
        >
          <Heading
            as="h4"
            size="md"
            mb="1"
            transition="color 0.1s ease-in-out"
            color="black"
            _groupHover={{
              color: "primary.400",
            }}
          >
            {title}
          </Heading>
          {showCompanyData && (
            <Text fontSize="sm" color="gray.400">
              {company.name}
            </Text>
          )}
          <Text fontSize="sm" color="gray.400">
            {location}
          </Text>
          <Text mt="2" fontSize="xs" color="gray.400">
            {isSuperPost ? "Promoted | " : ""}
            {capitalize(formatRelative(new Date(createdAt), new Date()))}
          </Text>
          {isExpired && (
            <Text fontSize="xs" color="red.400">
              {canEditJobPost
                ? "Job post deactivated"
                : "Not accepting new candidates"}
            </Text>
          )}
        </Box>
        {showSalary && (
          <Box marginLeft="auto" alignSelf="center">
            <Text color="gray.500" textAlign="end">
              {salaryContent}
            </Text>
            <Text color="gray.500" textAlign="end">
              {capitalize(salaryPeriodMapping[salaryPeriod].label)},{" "}
              {salaryTypeMapping[salaryType].label}
            </Text>
          </Box>
        )}
        {canEditJobPost && (
          <Box
            marginLeft={showSalary ? 4 : "auto"}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            transition="opacity 0.1s ease-in-out"
            opacity={[1, 1, 1, 0]}
            _groupHover={{
              opacity: 1,
            }}
          >
            <Tooltip label="Modify job post">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Modify job post"
                onClick={handleEditJobPost}
                icon={<Icon as={FaEdit} />}
              />
            </Tooltip>
            {!isExpired && (
              <Tooltip label="Deactivate post">
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorScheme="gray"
                  aria-label="Deactivate post"
                  isLoading={deactivatingPost}
                  onClick={handleDeactivatePost}
                  icon={<Icon as={FaCalendarTimes} />}
                />
              </Tooltip>
            )}
            <Tooltip label="Remove post">
              <IconButton
                variant="ghost"
                size="sm"
                colorScheme="red"
                aria-label="Remove post"
                onClick={handleShowDeletePostModal}
                icon={<Icon as={FaCalendarTimes} />}
              />
            </Tooltip>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default JobListItem;
