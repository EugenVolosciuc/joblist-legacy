import { Currency, JobPost, SalaryPeriod, SalaryType } from "@prisma/client";
import currencyMapping from "constants/mappings/currency";
import salaryPeriodMapping from "constants/mappings/salaryPeriod";
import salaryTypeMapping from "constants/mappings/salaryType";
import { isBefore } from "date-fns";
import { capitalize, formatCurrency } from "utils/string-manipulations";

export const getSalaryContent = ({
  salary,
  currency,
  minSalary,
  maxSalary,
}: JobPost) => {
  let salaryContent = "";

  if (salary) {
    salaryContent = formatCurrency(salary, currency as Currency);
  } else if (minSalary && maxSalary) {
    const minSalaryStr = formatCurrency(minSalary, currency as Currency);
    const maxSalaryStr = formatCurrency(maxSalary, currency as Currency);
    salaryContent = `${minSalaryStr} - ${maxSalaryStr}`;
  } else if (minSalary) {
    salaryContent = `From ${formatCurrency(minSalary, currency as Currency)}`;
  } else if (maxSalary) {
    salaryContent = `From ${formatCurrency(maxSalary, currency as Currency)}`;
  }

  return salaryContent;
};

export const getDefaultJobPostValues = (jobPost: JobPost) => {
  let defaultValues: any = {};

  defaultValues.title = jobPost.title;
  defaultValues.description = jobPost.description;
  defaultValues.location = jobPost.location;
  defaultValues.expiresAt = jobPost.expiresAt;

  if (jobPost.salaryPeriod) {
    const currency = {
      label: currencyMapping[jobPost.currency as Currency].value,
      value: currencyMapping[jobPost.currency as Currency].value,
    };
    const salaryPeriod = {
      label: capitalize(
        salaryPeriodMapping[jobPost.salaryPeriod as SalaryPeriod].label
      ),
      value: salaryPeriodMapping[jobPost.salaryPeriod as SalaryPeriod].value,
    };
    const salaryType = {
      label: capitalize(
        salaryTypeMapping[jobPost.salaryType as SalaryType].label
      ),
      value: salaryTypeMapping[jobPost.salaryType as SalaryType].value,
    };
    defaultValues.currency = currency;
    defaultValues.isFixedSalary = jobPost.isFixedSalary;
    defaultValues.isSuperPost = jobPost.isSuperPost;
    defaultValues.includeSalary = true;
    defaultValues.salaryPeriod = salaryPeriod;
    defaultValues.salaryType = salaryType;

    if (jobPost.salary) defaultValues.salary = jobPost.salary;
    if (jobPost.minSalary) defaultValues.minSalary = jobPost.minSalary;
    if (jobPost.maxSalary) defaultValues.maxSalary = jobPost.maxSalary;
  }

  return defaultValues;
};

export const jobPostIsExpired = (jobPost: JobPost) => {
  return isBefore(new Date(jobPost.expiresAt), new Date());
};
