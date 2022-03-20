import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "config/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { id: id as string },
    });

    res.json(user);
  } else if (req.method === "PATCH") {
    const user = await prisma.user.update({
      where: { id: id as string },
      data: req.body,
    });

    return res.json(user);
  } else {
    return res.status(404).json({ message: "Route not found" });
  }
};
