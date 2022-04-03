import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

const updateJobPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobPost = await prisma.jobPost.update({
    where: { id: req.query.id as string },
    data: req.body,
  });

  return res.json(jobPost);
};

export default updateJobPost;
