import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

const createJobPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobPost = await prisma.jobPost.create({ data: req.body });

  return res.status(201).json(jobPost);
};

export default createJobPost;
