import type { NextApiResponse } from "next";

const notFound = (res: NextApiResponse) => {
  return res.status(404).json({ message: "Route not found" });
};

export default notFound;
