import React, { FC } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Company, JobPost as TJobPost, User } from "@prisma/client";
import Image from "next/image";

import Card from "components/shared/Card";
import JobPost from "components/Jobs/JobPost";

type Props = {
  jobPost: TJobPost & { company: Company; createdBy: User };
};

const JobPageContainer: FC<Props> = ({ jobPost }) => {
  return (
    <Box
      width="full"
      my="4"
      display="flex"
      flexWrap="wrap"
      flexDirection={["column-reverse", "column-reverse", "row"]}
    >
      <Box as="aside" width={["full", "full", "250px", "300px"]} mt={[4, 4, 0]}>
        <Card>
          <Heading as="h3" size="md">
            About the employer
          </Heading>
          <Box display="flex">
            <Box>
              <Box position="relative" minWidth="16" height="16">
                <Image
                  src={jobPost.company.logoURL as string}
                  objectFit="contain"
                  layout="fill"
                  priority
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" pl="2">
              <Text fontWeight="semibold">{jobPost.company.name}</Text>
            </Box>
          </Box>
          <Text color="gray.600">{jobPost.company.description}</Text>
        </Card>
      </Box>
      <Box flex="1" pl={[0, 0, 4, 4, 6]}>
        <Card>
          <JobPost jobPost={jobPost} />
        </Card>
      </Box>
    </Box>
  );
};

export default JobPageContainer;
