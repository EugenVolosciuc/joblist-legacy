import type { NextApiRequest, NextApiResponse } from "next";

import notFound from "api/handlers/notFound";
import getJobPost from "api/handlers/job-posts/getJobPost";
import updateJobPost from "api/handlers/job-posts/updateJobPost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getJobPost(req, res);
    case "PATCH":
      // TODO: add guard "canModifyJobPost"
      return await updateJobPost(req, res);
    default:
      return notFound(res);
  }
};
