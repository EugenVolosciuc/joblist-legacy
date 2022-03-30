import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const jobPost = await prisma.jobPost.create({ data: req.body });

    return res.status(201).json(jobPost);
  } else {
    return res.status(404).json({ message: "Route not found" });
  }
};
