import { FC, useState } from "react";
import { JobPost as TJobPost, Company, User, UserRole } from "@prisma/client";
import {
  Box,
  Heading,
  Text,
  Image,
  List,
  ListItem,
  ListIcon,
  Divider,
  Button,
  Icon,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { formatRelative, sub } from "date-fns";
import {
  FaBan,
  FaBriefcase,
  FaClock,
  FaEdit,
  FaMapMarkedAlt,
  FaMapPin,
  FaMoneyBill,
  FaStar,
} from "react-icons/fa";

import Editor from "components/shared/Editor";
import { getSalaryContent, jobPostIsExpired } from "utils/job-post";
import { useAuth } from "services/User";
import { useRouter } from "next/router";
import salaryPeriodMapping from "constants/mappings/salaryPeriod";
import salaryTypeMapping from "constants/mappings/salaryType";
import JobPostService from "services/JobPost";
import { clientErrorHandler } from "utils/error-handlers";
import appConfig from "config/app";

type Props = {
  jobPost: Partial<TJobPost> & { company: Company; createdBy: User };
  isPreview?: boolean;
  showActions?: boolean;
};

const JobPost: FC<Props> = ({
  jobPost,
  isPreview = false,
  showActions = true,
}) => {
  showActions = isPreview ? false : showActions;

  const [changingFavourite, setChangingFavourite] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const canFavourite = user?.role === UserRole.JOB_SEEKER;

  const {
    data: jobPostIsFavourited,
    isFetched: checkedIfJobPostWasFavourited,
  } = JobPostService.useJobPostIsFavouritedCheck(
    jobPost.id as string,
    user?.id as string,
    [canFavourite]
  );

  const {
    company,
    createdAt,
    createdBy,
    createdById,
    currency,
    description,
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

  const isExpired = jobPostIsExpired(jobPost as TJobPost);
  const showSalary =
    salaryPeriod &&
    salaryType &&
    currency &&
    (salary || minSalary || maxSalary);

  const canEditJobPost = createdById === user?.id;

  const handleEditJobPost = () => {
    router.push("/jobs/[id]/edit", `/jobs/${id}/edit`);
  };

  const handleFavourite = async (action: "favourite" | "unfavourite") => {
    try {
      setChangingFavourite(true);

      const willFavourite = action === "favourite";

      if (willFavourite) {
        await JobPostService.favouriteJobPost(id as string, user?.id as string);
      } else {
        await JobPostService.unfavouriteJobPost(
          id as string,
          user?.id as string
        );
      }

      toast({
        title: `Job post ${willFavourite ? "pinned" : "unpinned"}`,
        status: "success",
        ...appConfig.componentVariants.toast,
      });

      setChangingFavourite(false);
    } catch (error) {
      setChangingFavourite(false);
      clientErrorHandler(error);
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="4"
      >
        {title && <Heading size="lg">{title}</Heading>}
        <Box>
          {checkedIfJobPostWasFavourited && (
            <Button
              isLoading={changingFavourite}
              size="sm"
              variant="ghost"
              leftIcon={<Icon as={FaMapPin} />}
              onClick={() =>
                handleFavourite(
                  jobPostIsFavourited ? "unfavourite" : "favourite"
                )
              }
            >
              {jobPostIsFavourited ? "Unpin" : "Pin"}
            </Button>
          )}
          {canEditJobPost && (
            <>
              <Button
                display={["none", "none", "none", "inline-flex"]}
                onClick={handleEditJobPost}
                variant="ghost"
                size="sm"
                leftIcon={<Icon as={FaEdit} />}
              >
                Edit job post
              </Button>
              <IconButton
                aria-label="Edit job post"
                icon={<Icon as={FaEdit} />}
                size="sm"
                variant="ghost"
                onClick={handleEditJobPost}
                display={["inline-flex", "inline-flex", "inline-flex", "none"]}
              />
            </>
          )}
        </Box>
      </Box>
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
              !createdAt
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
            <Text>Promoted</Text>
          </ListItem>
        )}
        {showSalary && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={FaMoneyBill} color={"primary.400"} />
            <Text>
              {getSalaryContent(jobPost as TJobPost)}{" "}
              {salaryPeriodMapping[salaryPeriod].label.replace("per", "/")},{" "}
              {salaryTypeMapping[salaryType].label}
            </Text>
          </ListItem>
        )}
        {isExpired && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={FaBan} color={"red.400"} />
            <Text color="red.400">
              {canEditJobPost
                ? "Job post deactivated"
                : "Not accepting new candidates"}
            </Text>
          </ListItem>
        )}
      </List>
      <Divider mt="4" />
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
