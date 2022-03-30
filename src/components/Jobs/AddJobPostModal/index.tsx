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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Currency, SalaryPeriod, SalaryType } from "@prisma/client";

import GeneralInfo from "components/Jobs/AddJobPostModal/GeneralInfo";
import SalaryDetails from "components/Jobs/AddJobPostModal/SalaryDetails";
import { add } from "date-fns";

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
  salaryType: SalaryType;
  salaryPeriod: SalaryPeriod;
  salaryMin: number;
  salaryMax: number;
  isSuperPost: boolean;
};

const AddJobPostModal: FC<Props> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<ModalMode>(ModalMode.EDIT);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUnregister: false,
    defaultValues: {
      expiresAt: add(new Date(), { months: 2 }),
    },
  });

  const toggleMode = () =>
    setMode(mode === ModalMode.EDIT ? ModalMode.PREVIEW : ModalMode.EDIT);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
  };

  const includeSalary = watch("includeSalary");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <ModalHeader>Create a new job post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt="0">
          <GeneralInfo register={register} control={control} errors={errors} />
          {includeSalary && (
            <SalaryDetails
              register={register}
              control={control}
              errors={errors}
            />
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
            <Button type="submit">Add job post</Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddJobPostModal;
