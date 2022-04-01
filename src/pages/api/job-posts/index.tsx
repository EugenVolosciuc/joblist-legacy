import type { NextApiRequest, NextApiResponse } from "next";

import createJobPost from "api-handlers/job-posts/createJobPost";
import notFound from "api-handlers/notFound";
import { serverErrorHandler } from "utils/error-handlers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      return await createJobPost(req, res);
    } else {
      return notFound(res);
    }
  } catch (error) {
    console.log("got to the error!!!!!!!!!!!!!!!!", error);
    serverErrorHandler(res, error);
  }
};
