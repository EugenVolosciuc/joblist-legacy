import type { NextApiRequest, NextApiResponse } from "next";

import notFound from "api/handlers/notFound";
import favouriteJobPost from "api/handlers/job-posts/favouriteJobPost";
import unfavouriteJobPost from "api/handlers/job-posts/unfavouriteJobPost";
import checkJobPostIsFavourited from "api/handlers/job-posts/checkJobPostIsFavourited";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await checkJobPostIsFavourited(req, res);
    case "PATCH":
      // TODO: add guard "canModifyJobPost"
      return await favouriteJobPost(req, res);
    case "DELETE":
      // TODO: add guard "canModifyJobPost"
      return await unfavouriteJobPost(req, res);
    default:
      return notFound(res);
  }
};
