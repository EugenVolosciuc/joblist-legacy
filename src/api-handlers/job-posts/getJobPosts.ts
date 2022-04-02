import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

const getJobPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobPosts = await prisma.jobPost.findMany();
  return res.json(jobPosts);
};

export default getJobPosts;
