import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const updateJobPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobPost = await prisma.jobPost.update({
      where: { id: req.query.id as string },
      data: req.body,
    });

    return res.json(jobPost);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default updateJobPost;
