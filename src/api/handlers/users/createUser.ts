import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.create({ data: req.body });

    return res.json(user);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default createUser;
