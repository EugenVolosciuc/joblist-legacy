import { Currency } from "@prisma/client";

type CurrencyMapping = {
  [key in keyof typeof Currency]: {
    label: {
      singular: string;
      plural: string;
    };
    value: string;
  };
};

const currencyMapping: CurrencyMapping = {
  [Currency.EUR]: {
    label: {
      singular: "euro",
      plural: "euros",
    },
    value: Currency.EUR,
  },
  [Currency.USD]: {
    label: {
      singular: "dollar",
      plural: "dollars",
    },
    value: Currency.USD,
  },
};

export default currencyMapping;
