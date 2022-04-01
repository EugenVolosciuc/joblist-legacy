import { SalaryType } from "@prisma/client";

type SalaryTypeMapping = {
  [key in keyof typeof SalaryType]: {
    label: string;
    value: string;
  };
};

const salaryTypeMapping: SalaryTypeMapping = {
  [SalaryType.GROSS]: {
    label: "gross",
    value: SalaryType.GROSS,
  },
  [SalaryType.NET]: {
    label: "net",
    value: SalaryType.NET,
  },
};

export default salaryTypeMapping;
