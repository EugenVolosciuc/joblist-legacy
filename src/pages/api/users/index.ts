import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = await prisma.user.create({ data: req.body });

    return res.json(user);
  } else {
    return res.status(404).json({ message: "Route not found" });
  }
};
