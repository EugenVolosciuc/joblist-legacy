import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

const jobPostPropertiesToFetch = {
  id: true,
  title: true,
  createdAt: true,
  company: true,
  currency: true,
  maxSalary: true,
  minSalary: true,
  salary: true,
  expiresAt: true,
  isFixedSalary: true,
  salaryPeriod: true,
  salaryType: true,
  shortDescription: true,
  isSuperPost: true,
  location: true,
};

const getJobPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobPosts = await prisma.jobPost.findMany({
    select: jobPostPropertiesToFetch,
  });
  return res.json(jobPosts);
};

export default getJobPosts;
