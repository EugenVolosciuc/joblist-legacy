import { FC, useState } from "react";
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
  Currency,
  JobPost as TJobPost,
  SalaryPeriod,
  SalaryType,
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
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

const AddJobPostModal: FC<Props> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ModalMode>(ModalMode.EDIT);
  const { user } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUnregister: false,
    defaultValues: {
      expiresAt: add(new Date(), { months: 2 }),
    },
  });

  console.log("user", user);

  const toggleMode = () =>
    setMode(mode === ModalMode.EDIT ? ModalMode.PREVIEW : ModalMode.EDIT);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const dataToSend: Partial<TJobPost> = {
      title: data.title,
      description: data.description,
      location: data.location,
      expiresAt: data.expiresAt,
      createdById: user?.id,
      companyId: user?.companyId as string,
    };

    if (data.includeSalary) {
      dataToSend.currency = data.currency;
      dataToSend.salaryType = data.salaryType;
      dataToSend.salaryPeriod = data.salaryPeriod;

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
      await JobPostService.createJobPost(dataToSend);

      toast({
        description: "Job post created",
        status: "success",
        ...appConfig.componentVariants.toast,
      });
      setIsLoading(false);
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <ModalHeader>Create a new job post</ModalHeader>
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
            <JobPost jobPost={{ ...getValues(), company: user?.company }} />
          )}
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Box>
            <Button variant="ghost" mr={3} onClick={toggleMode}>
              {mode === ModalMode.EDIT ? "Preview" : "Edit"}
            </Button>
            <Button isLoading={isLoading} type="submit">
              Add job post
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddJobPostModal;
