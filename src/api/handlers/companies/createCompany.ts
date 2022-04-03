import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { serverErrorHandler } from "utils/error-handlers";

const createCompany = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const company = await prisma.company.create({ data: req.body });

    return res.status(201).json(company);
  } catch (error) {
    serverErrorHandler(res, error);
  }
};

export default createCompany;
