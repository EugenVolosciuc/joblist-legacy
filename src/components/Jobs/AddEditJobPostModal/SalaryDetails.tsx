import { FC } from "react";
import {
  UseFormRegister,
  FieldError,
  Control,
  Controller,
} from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Switch,
  NumberInput,
  NumberInputField,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";

import { Inputs } from "components/Jobs/AddEditJobPostModal";
import currencyMapping from "constants/mappings/currency";
import salaryTypeMapping from "constants/mappings/salaryType";
import { INPUT_SIZE } from "constants/INPUT";
import { capitalize } from "utils/string-manipulations";
import { Currency } from "@prisma/client";
import salaryPeriodMapping from "constants/mappings/salaryPeriod";

type Props = {
  register: UseFormRegister<Inputs>;
  control: Control<Inputs, object>;
  errors: Record<keyof Inputs | string, FieldError>;
  currency: Currency;
  fixedSalary: boolean;
  minSalary?: number;
  maxSalary?: number;
};

const currencyOptions = Object.values(currencyMapping).map(({ value }) => ({
  label: value,
  value,
}));

const salaryTypeOptions = Object.values(salaryTypeMapping).map(
  ({ label, value }) => ({
    label: capitalize(label),
    value,
  })
);

const salaryPeriodOptions = Object.values(salaryPeriodMapping).map(
  ({ label, value }) => ({
    label: capitalize(label),
    value,
  })
);

const SalaryDetailsSection: FC<Props> = ({
  register,
  control,
  errors,
  currency,
  fixedSalary,
  minSalary,
  maxSalary,
}) => {
  const salaryCurrencyLabel = currency && (
    <InputRightElement
      children={
        <Text color="gray.400" pr="2">
          {currencyMapping[currency].value}
        </Text>
      }
    />
  );

  return (
    <>
      <Box display="flex">
        <FormControl
          width="50%"
          pr="3"
          mb="4"
          isInvalid={!!errors.currency}
          isRequired
        >
          <FormLabel htmlFor="currency">Currency</FormLabel>
          <Controller
            name="currency"
            control={control}
            rules={{
              required: "Currency is required",
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                id="currency"
                size={INPUT_SIZE}
                // @ts-ignore
                options={currencyOptions}
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                }}
                value={value}
                placeholder=""
              />
            )}
          />
          {errors.currency && (
            <FormErrorMessage>{errors.currency.message}</FormErrorMessage>
          )}
        </FormControl>
      </Box>
      <FormControl
        width="50%"
        mb="2"
        mt="4"
        display="flex"
        alignItems="end"
        pb="3"
      >
        <FormLabel mb="0">Fixed salary</FormLabel>
        <Switch id="fixedSalary" {...register("fixedSalary")} />
      </FormControl>
      <Box display="flex">
        {fixedSalary ? (
          <FormControl
            mb="4"
            width="50%"
            pr="3"
            isInvalid={!!errors.salary}
            isRequired
          >
            <FormLabel htmlFor="salary">Salary</FormLabel>
            <NumberInput
              id="salary"
              allowMouseWheel={false}
              size={INPUT_SIZE}
              isDisabled={!currency}
            >
              <NumberInputField
                {...register("salary", {
                  valueAsNumber: true,
                  required: "Salary is required",
                })}
              />
              {salaryCurrencyLabel}
            </NumberInput>
            {errors.salary && (
              <FormErrorMessage>{errors.salary.message}</FormErrorMessage>
            )}
          </FormControl>
        ) : (
          <>
            <FormControl
              mb="4"
              flex="1"
              pr="2"
              isInvalid={!!errors.minSalary}
              isRequired
            >
              <FormLabel htmlFor="minSalary">Salary</FormLabel>
              <NumberInput
                id="minSalary"
                allowMouseWheel={false}
                size={INPUT_SIZE}
                isDisabled={!currency}
              >
                <NumberInputField
                  {...register("minSalary", {
                    valueAsNumber: true,
                    validate: {
                      writeMinOrMax: () =>
                        !!minSalary ||
                        !!maxSalary ||
                        "Write the minimum or maximum salary, or both",
                    },
                  })}
                />
                {salaryCurrencyLabel}
              </NumberInput>
              {errors.minSalary && (
                <FormErrorMessage>{errors.minSalary.message}</FormErrorMessage>
              )}
            </FormControl>
            <Text alignSelf="flex-start" mt="9">
              {" "}
              -{" "}
            </Text>
            <FormControl
              mb="4"
              flex="1"
              pl="2"
              alignSelf="flex-start"
              isInvalid={!!errors.maxSalary}
            >
              <FormLabel htmlFor="minSalary" visibility="hidden">
                Salary max
              </FormLabel>
              <NumberInput
                id="maxSalary"
                allowMouseWheel={false}
                size={INPUT_SIZE}
                isDisabled={!currency}
              >
                <NumberInputField
                  {...register("maxSalary", {
                    valueAsNumber: true,
                    validate: {
                      cannotBeLessThanMin: (v) => {
                        if (minSalary && v) {
                          return (
                            v > minSalary ||
                            "Max salary cannot be less than min salary"
                          );
                        }

                        return true;
                      },
                    },
                  })}
                />
                {salaryCurrencyLabel}
              </NumberInput>
              {errors.maxSalary && (
                <FormErrorMessage>{errors.maxSalary.message}</FormErrorMessage>
              )}
            </FormControl>
          </>
        )}
      </Box>
      <Box display="flex">
        <FormControl
          width="50%"
          pr="3"
          mb="4"
          isInvalid={!!errors.salaryType}
          isRequired
        >
          <FormLabel htmlFor="salaryType">Salary type</FormLabel>
          <Controller
            name="salaryType"
            control={control}
            rules={{
              required: "Salary type is required",
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                id="salaryType"
                size={INPUT_SIZE}
                // @ts-ignore
                options={salaryTypeOptions}
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                }}
                value={value}
                placeholder=""
              />
            )}
          />
          {errors.salaryType && (
            <FormErrorMessage>{errors.salaryType.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          width="50%"
          pl="3"
          mb="4"
          isInvalid={!!errors.salaryPeriod}
          isRequired
        >
          <FormLabel htmlFor="salaryPeriod">Payment period</FormLabel>
          <Controller
            name="salaryPeriod"
            control={control}
            rules={{
              required: "Payment period is required",
            }}
            render={({ field: { value, onChange } }) => (
              <Select
                id="salaryPeriod"
                size={INPUT_SIZE}
                // @ts-ignore
                options={salaryPeriodOptions}
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                }}
                value={value}
                placeholder=""
              />
            )}
          />
          {errors.salaryPeriod && (
            <FormErrorMessage>{errors.salaryPeriod.message}</FormErrorMessage>
          )}
        </FormControl>
      </Box>
    </>
  );
};

export default SalaryDetailsSection;
