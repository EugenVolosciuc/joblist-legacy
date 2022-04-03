import { FC, MouseEventHandler } from "react";
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
import { FaEdit } from "react-icons/fa";
import { getSalaryContent } from "utils/job-post";
import { useRouter } from "next/router";

type Props = {
  jobPost: JobPost & { company: Company };
  lastItem: boolean;
};

const JobListItem: FC<Props> = ({ jobPost, lastItem }) => {
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

  // TODO: style expired job posts

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
          <Box marginLeft={showSalary ? 4 : "auto"}>
            <Tooltip label="Edit job post">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Edit job post"
                onClick={handleEditJobPost}
                icon={<Icon as={FaEdit} />}
              />
            </Tooltip>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default JobListItem;
