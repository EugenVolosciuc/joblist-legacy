import { ToastPositionWithLogical } from "@chakra-ui/react";

import toastVariants from "./toast";

export type ToastConfig = {
  position: ToastPositionWithLogical;
  variant: string;
};

export type ToastVariant = keyof typeof toastVariants;

export default { toastVariants };
