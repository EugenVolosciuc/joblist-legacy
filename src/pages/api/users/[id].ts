import type { NextApiRequest, NextApiResponse } from "next";

import modifyUser from "api/handlers/users/modifyUser";
import getUserById from "api/handlers/users/getUserById";
import notFound from "api/handlers/notFound";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await getUserById(req, res);
  } else if (req.method === "PATCH") {
    return await modifyUser(req, res);
  } else {
    return notFound(res);
  }
};
