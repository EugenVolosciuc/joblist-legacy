import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";
import { paginationToOffset } from "utils/pagination";

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
  isSuperPost: true,
  location: true,
  createdById: true,
};

const getJobPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = {
    page: parseInt((req.query.page as string) || "1", 10),
    pageSize: parseInt((req.query.pageSize as string) || "15", 10),
    filters: JSON.parse((req.query.filters as string) || "{}"),
  };

  const { skip, take } = paginationToOffset(query);

  const jobPostsCount = await prisma.jobPost.count({
    where: query.filters,
  });

  const jobPosts = await prisma.jobPost.findMany({
    skip,
    take,
    select: jobPostPropertiesToFetch,
    where: query.filters,
  });

  const pages = Math.ceil(jobPostsCount / query.pageSize);

  return res.json({ data: jobPosts, query: { ...query, pages } });
};

export default getJobPosts;
