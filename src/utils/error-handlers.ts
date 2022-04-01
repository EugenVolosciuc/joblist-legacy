import { NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import axios from "axios";

import { createStandaloneToast } from "@chakra-ui/react";
import appConfig from "config/app";

const toast = createStandaloneToast({ theme: appConfig.theme });

export const serverErrorHandler = (res: NextApiResponse, error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res
        .status(error.response.status || 500)
        .json({ message: error.message, error: error });
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      return res.status(500).json({ message: error.message, error: error });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({ message: error.message, error: error });
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(500).json({ message: "A Prisma error has occured" });
  } else {
    return res.status(500).json({ message: error.message, error: error });
  }
};

export const clientErrorHandler = (error: any) => {
  if (!appConfig.isProduction)
    console.error("An error occured on the client", error);

  if (axios.isAxiosError(error)) {
    let description: string;
    if (error.response) {
      description =
        error.response.data.error ||
        error.response.data.message ||
        error.response.statusText;
    } else if (error.request) {
      description = error.message;
    } else {
      description = error.message;
    }

    toast({
      title: "Hold on there, a request error occured",
      description,
      status: "error",
      ...appConfig.componentVariants.toast,
    });
  } else {
    toast({
      title: "That's on us, an error occured",
      description: error.message,
      status: "error",
      ...appConfig.componentVariants.toast,
    });
  }
};
