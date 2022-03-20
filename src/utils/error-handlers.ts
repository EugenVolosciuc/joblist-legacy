import axios from "axios";
import { NextApiResponse } from "next";

export const serverErrorHandler = (res: NextApiResponse, error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
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
      console.log("Error", error.message);
      return res.status(500).json({ message: error.message, error: error });
    }
  } else {
    return res.status(500).json({ message: error.message, error: error });
  }
};

export const clientErrorHandler = (error: any) => {
  console.log("An error occured", error);
};
