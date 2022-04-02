import { FC } from "react";
import { JobPost, Company, User } from "@prisma/client";
import {
  Box,
  Heading,
  Text,
  Image,
  Icon,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

import Editor from "components/shared/Editor";
import { formatRelative, sub } from "date-fns";
import {
  FaBriefcase,
  FaClock,
  FaMapMarkedAlt,
  FaMoneyBill,
  FaStar,
} from "react-icons/fa";
import { getSalaryContent } from "utils/job-post";

type Props = {
  jobPost: Partial<JobPost> & { company: Company; createdBy: User };
  isPreview?: boolean;
};

const JobPost: FC<Props> = ({ jobPost, isPreview = false }) => {
  const {
    company,
    createdAt,
    createdBy,
    currency,
    description,
    expiresAt,
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
  console.log("jobPost", jobPost);

  const showSalary =
    salaryPeriod &&
    salaryType &&
    currency &&
    (salary || minSalary || maxSalary);

  return (
    <Box>
      {title && (
        <Heading size="lg" mb="4">
          {title}
        </Heading>
      )}
      <List spacing={2}>
        <ListItem display="flex" alignItems="center">
          <ListIcon as={FaBriefcase} color={"primary.400"} />
          <Text>{company.name}</Text>
        </ListItem>
        <ListItem display="flex" alignItems="center">
          <ListIcon as={FaClock} color={"primary.400"} />
          <Text>
            {"Posted "}
            {formatRelative(
              isPreview
                ? sub(new Date(), { days: 6 })
                : new Date(createdAt as unknown as string),
              new Date()
            )}
          </Text>
        </ListItem>
        {location && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={FaMapMarkedAlt} color={"primary.400"} />
            <Text>{location}</Text>
          </ListItem>
        )}
        {isSuperPost && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={FaStar} color={"primary.400"} />
            Promoted
          </ListItem>
        )}
        {showSalary && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={FaMoneyBill} color={"primary.400"} />
            {getSalaryContent(jobPost as JobPost)}
          </ListItem>
        )}
      </List>
      <Editor initialEditorContent={description} readMode />
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          {createdBy.avatarURL && (
            <Box width="14" height="14" display="flex" alignItems="center">
              <Image
                boxSize="12"
                borderRadius="full"
                src={createdBy.avatarURL}
              />
            </Box>
          )}
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Text fontSize="xs" color="gray.500">
              Posted by
            </Text>
            <Text fontSize="sm" fontWeight="semibold">
              {createdBy.username}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobPost;
