import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

const getJobPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobPost = await prisma.jobPost.findUnique({
    where: { id: req.query.id as string },
    include: { company: true, createdBy: true },
  });

  return res.json(jobPost);
};

export default getJobPosts;
