import type { NextApiRequest, NextApiResponse } from "next";

import createJobPost from "api-handlers/job-posts/createJobPost";
import notFound from "api-handlers/notFound";
import getJobPosts from "api-handlers/job-posts/getJobPosts";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await getJobPosts(req, res);
    case "POST":
      return await createJobPost(req, res);
    default:
      return notFound(res);
  }
};
