import { useState, FC, MouseEventHandler } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";

import JobPostService from "services/JobPost";
import { clientErrorHandler } from "utils/error-handlers";
import appConfig from "config/app";

type Props = {
  jobPostID: string | null;
  onClose: Function;
};

const DeleteJobPostModal: FC<Props> = ({ jobPostID, onClose }) => {
  const toast = useToast();
  const [removingPost, setRemovingPost] = useState(false);

  const handleRemovePost = async () => {
    try {
      if (jobPostID) {
        setRemovingPost(true);

        await JobPostService.removeJobPost(jobPostID);

        toast({
          description: "Job post deleted",
          status: "success",
          ...appConfig.componentVariants.toast,
        });
        setRemovingPost(false);
      }
    } catch (error) {
      setRemovingPost(false);
      clientErrorHandler(error);
    }
  };

  return (
    <Modal isOpen={!!jobPostID} onClose={onClose as () => void}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleRemovePost}>
        <ModalHeader>Delete job post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to remove this job post? You cannot revert this
          action afterwards.
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button
            variant="ghost"
            mr={3}
            onClick={onClose as MouseEventHandler<HTMLButtonElement>}
          >
            Close
          </Button>
          <Button isLoading={removingPost} colorScheme="red" type="submit">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteJobPostModal;
