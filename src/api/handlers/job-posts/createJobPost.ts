import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const createJobPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobPost = await prisma.jobPost.create({ data: req.body });

    return res.status(201).json(jobPost);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default createJobPost;
