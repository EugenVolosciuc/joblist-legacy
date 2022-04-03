import { FC, MouseEventHandler, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Company,
  Currency,
  JobPost as TJobPost,
  SalaryPeriod,
  SalaryType,
  User,
} from "@prisma/client";
import { add } from "date-fns";

import GeneralInfo from "components/Jobs/AddEditJobPostModal/GeneralInfo";
import SalaryDetails from "components/Jobs/AddEditJobPostModal/SalaryDetails";
import BoostPostSection from "components/Jobs/AddEditJobPostModal/BoostPost";
import { clientErrorHandler } from "utils/error-handlers";
import JobPostService from "services/JobPost";
import appConfig from "config/app";
import { useAuth } from "services/User";
import JobPost from "components/Jobs/JobPost";
import { getDefaultJobPostValues } from "utils/job-post";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  onClose: Function;
  jobPost?: TJobPost | null;
  closeOnOverlayClick?: boolean;
};

enum ModalMode {
  EDIT = "EDIT",
  PREVIEW = "PREVIEW",
}

export type Inputs = {
  title: string;
  description: string;
  location: string;
  expiresAt: Date;
  includeSalary: boolean;
  currency: Currency;
  fixedSalary: boolean;
  salaryType: SalaryType;
  salaryPeriod: SalaryPeriod;
  salary: number;
  minSalary: number;
  maxSalary: number;
  isSuperPost: boolean;
};

const AddEditJobPostModal: FC<Props> = ({
  isOpen,
  onClose,
  jobPost,
  closeOnOverlayClick = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ModalMode>(ModalMode.EDIT);

  const isUpdateModal = !!jobPost;
  const defaultValues = isUpdateModal
    ? getDefaultJobPostValues(jobPost)
    : {
        expiresAt: add(new Date(), { months: 2 }),
      };

  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUnregister: false,
    defaultValues,
  });

  const toggleMode = () =>
    setMode(mode === ModalMode.EDIT ? ModalMode.PREVIEW : ModalMode.EDIT);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataToSend: Partial<TJobPost> = {
      title: data.title,
      description: data.description,
      location: data.location,
      expiresAt: data.expiresAt,
      isSuperPost: data.isSuperPost,
    };

    if (!isUpdateModal) {
      dataToSend.createdById = user?.id;
      dataToSend.companyId = user?.companyId as string;
    }

    if (data.includeSalary) {
      // For some reason we get the entire select option instead of just the value, no time to fix
      // @ts-ignore
      dataToSend.currency = data.currency.value;
      // @ts-ignore
      dataToSend.salaryType = data.salaryType.value;
      // @ts-ignore
      dataToSend.salaryPeriod = data.salaryPeriod.value;

      if (data.fixedSalary) {
        dataToSend.isFixedSalary = data.fixedSalary;
        dataToSend.salary = data.salary;
      } else {
        if (data.minSalary) dataToSend.minSalary = data.minSalary;
        if (data.maxSalary) dataToSend.maxSalary = data.maxSalary;
      }
    }

    try {
      setIsLoading(true);
      let newJobPost: TJobPost;
      if (!isUpdateModal) {
        newJobPost = await JobPostService.createJobPost(dataToSend);
      } else {
        newJobPost = await JobPostService.updateJobPost(
          (jobPost as unknown as TJobPost).id,
          dataToSend
        );
      }

      reset();

      toast({
        description: `Job post ${isUpdateModal ? "modified" : "created"}`,
        status: "success",
        ...appConfig.componentVariants.toast,
      });
      router.push("/jobs/[id]", `/jobs/${newJobPost.id}`);

      onClose();
    } catch (error) {
      setIsLoading(false);
      clientErrorHandler(error);
    }
  };

  const includeSalary = watch("includeSalary");
  const description = watch("description");
  const currency = watch("currency");
  const fixedSalary = watch("fixedSalary");
  const minSalary = watch("minSalary");
  const maxSalary = watch("maxSalary");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose as () => void}
      size="xl"
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEsc={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <ModalHeader>
          {isUpdateModal ? "Modify job post" : "Create a new job post"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pt="0">
          {mode === ModalMode.EDIT ? (
            <>
              <GeneralInfo
                register={register}
                control={control}
                errors={errors}
                initialDescription={description}
              />
              {includeSalary && (
                <SalaryDetails
                  register={register}
                  control={control}
                  errors={errors}
                  // @ts-ignore
                  currency={currency?.value}
                  fixedSalary={fixedSalary}
                  minSalary={minSalary}
                  maxSalary={maxSalary}
                />
              )}
              <Divider mt={includeSalary ? 2 : 6} mb="6" />
              <BoostPostSection register={register} />
            </>
          ) : (
            <JobPost
              jobPost={{
                ...getValues(),
                company: user?.company as Company,
                createdBy: user as User,
                // @ts-ignore
                currency: currency?.value,
                ...(jobPost?.createdAt && { createdAt: jobPost.createdAt }),
              }}
              isPreview
            />
          )}
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button
            variant="ghost"
            mr={3}
            onClick={onClose as MouseEventHandler<HTMLButtonElement>}
          >
            Close
          </Button>
          <Box>
            <Button variant="ghost" mr={3} onClick={toggleMode}>
              {mode === ModalMode.EDIT ? "Preview" : "Edit"}
            </Button>
            <Button isLoading={isLoading} type="submit">
              {isUpdateModal ? "Modify" : "Add job post"}
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEditJobPostModal;
