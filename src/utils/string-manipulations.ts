import { Currency } from "@prisma/client";

export const truncate = (text: string, len: number) => {
  if (text.length > len && text.length > 0) {
    return `${text.split(" ").slice(0, len).join(" ")}...`;
  } else {
    return text;
  }
};

export const capitalize = (txt: string) =>
  txt.charAt(0).toUpperCase() + txt.slice(1);

export const formatCurrency = (num: number, currency: Currency) => {
  const initialFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);

  return initialFormat.slice(0, -3);
};
