import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const deleteJobPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.jobPost.delete({ where: { id: req.query.id as string } });

    return res.json({ message: "Job post deleted" });
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default deleteJobPost;
