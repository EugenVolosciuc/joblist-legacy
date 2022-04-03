import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const user = await prisma.user.findUnique({
      where: { id: id as string },
      include: { company: true },
    });

    return res.json(user);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default getUserById;
