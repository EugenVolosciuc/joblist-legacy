import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const getJobPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobPost = await prisma.jobPost.findUnique({
      where: { id: req.query.id as string },
      include: { company: true, createdBy: true },
    });

    return res.json(jobPost);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default getJobPosts;
