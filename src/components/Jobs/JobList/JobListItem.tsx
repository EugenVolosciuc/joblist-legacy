import { FC } from "react";
import { Company, JobPost, UserRole } from "@prisma/client";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "services/User";
import { formatRelative } from "date-fns";
import { capitalize } from "utils/string-manipulations";
import Image from "next/image";
import Link from "next/link";

type Props = {
  jobPost: JobPost & { company: Company };
  lastItem: boolean;
};

const JobListItem: FC<Props> = ({ jobPost, lastItem }) => {
  const {
    title,
    company,
    shortDescription,
    location,
    isSuperPost,
    createdAt,
    id,
  } = jobPost;
  const { user } = useAuth();

  const isRecruiter = user?.role === UserRole.RECRUITER;
  // const showCompanyData = !isRecruiter;
  const showCompanyData = true;
  const showCompanyLogo = true;

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
          _groupHover={{ ml: showCompanyLogo ? 0 : 2 }}
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
        <Box></Box>
      </Box>
    </Link>
  );
};

export default JobListItem;
