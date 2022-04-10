import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const checkJobPostIsFavourited = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const jobPost = await prisma.jobPost.findFirst({
      where: {
        id: req.query.id as string,
        favouritedBy: { some: { id: req.query.userId as string } },
      },
    });

    return res.json(!!jobPost);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default checkJobPostIsFavourited;
