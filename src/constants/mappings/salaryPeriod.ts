import { SalaryPeriod } from "@prisma/client";

type SalaryPeriodMapping = {
  [key in keyof typeof SalaryPeriod]: {
    label: string;
    value: string;
  };
};

const salaryPeriodMapping: SalaryPeriodMapping = {
  [SalaryPeriod.PER_HOUR]: {
    label: "per hour",
    value: SalaryPeriod.PER_HOUR,
  },
  [SalaryPeriod.PER_MONTH]: {
    label: "per month",
    value: SalaryPeriod.PER_MONTH,
  },
  [SalaryPeriod.PER_WEEK]: {
    label: "per week",
    value: SalaryPeriod.PER_WEEK,
  },
  [SalaryPeriod.PER_YEAR]: {
    label: "per year",
    value: SalaryPeriod.PER_YEAR,
  },
};

export default salaryPeriodMapping;
