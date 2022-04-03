import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const modifyUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const user = await prisma.user.update({
      where: { id: id as string },
      data: req.body,
    });

    return res.json(user);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default modifyUser;
