import type { NextApiRequest, NextApiResponse } from "next";

import createJobPost from "api/handlers/job-posts/createJobPost";
import notFound from "api/handlers/notFound";
import getJobPosts from "api/handlers/job-posts/getJobPosts";
import authenticated from "api/guards/authenticated";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await authenticated(req, res, getJobPosts);
    case "POST":
      return await authenticated(req, res, createJobPost);
    default:
      return notFound(res);
  }
};
