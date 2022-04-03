import type { NextApiRequest, NextApiResponse } from "next";

import createUser from "api/handlers/users/createUser";
import notFound from "api/handlers/notFound";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await createUser(req, res);
  } else {
    return notFound(res);
  }
};
