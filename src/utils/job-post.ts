import { Currency, JobPost } from "@prisma/client";
import { formatCurrency } from "utils/string-manipulations";

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
